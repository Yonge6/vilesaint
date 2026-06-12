create table if not exists public.fan_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  fan_tag text not null unique check (fan_tag ~ '^VS-[A-F0-9]{6}$'),
  language text not null default 'en' check (char_length(language) between 2 and 12),
  timezone text not null default 'UTC' check (char_length(timezone) between 1 and 64),
  device_class text not null default 'unknown'
    check (device_class in ('mobile', 'tablet', 'desktop', 'unknown')),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.comments (
  id bigint generated always as identity primary key,
  case_slug text not null check (case_slug ~ '^[a-z0-9-]{3,80}$'),
  author_id uuid not null references public.fan_profiles(user_id) on delete cascade,
  parent_id bigint references public.comments(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now(),
  edited_at timestamptz
);

create index if not exists comments_case_created_idx
  on public.comments (case_slug, created_at desc);
create index if not exists comments_parent_idx on public.comments (parent_id);

create table if not exists public.comment_likes (
  comment_id bigint not null references public.comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

create or replace function public.create_fan_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.fan_profiles (user_id, fan_tag)
  values (new.id, 'VS-' || upper(substr(md5(new.id::text), 1, 6)))
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists create_fan_profile_after_signup on auth.users;
create trigger create_fan_profile_after_signup
  after insert on auth.users
  for each row execute function public.create_fan_profile();

create or replace function public.validate_comment_parent()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  parent_case text;
  parent_parent bigint;
begin
  new.body := btrim(new.body);
  if new.parent_id is null then
    return new;
  end if;

  select case_slug, parent_id into parent_case, parent_parent
  from public.comments
  where id = new.parent_id;

  if parent_case is null or parent_case <> new.case_slug then
    raise exception 'Invalid parent comment';
  end if;

  if parent_parent is not null then
    new.parent_id := parent_parent;
  end if;
  return new;
end;
$$;

drop trigger if exists validate_comment_parent_before_write on public.comments;
create trigger validate_comment_parent_before_write
  before insert or update of body, parent_id on public.comments
  for each row execute function public.validate_comment_parent();

create or replace function public.enforce_comment_rate_limit()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if (
    select count(*) >= 5
    from public.comments
    where author_id = new.author_id
      and created_at > now() - interval '1 minute'
  ) then
    raise exception 'Comment rate limit exceeded';
  end if;

  if exists (
    select 1
    from public.comments
    where author_id = new.author_id
      and body = new.body
      and created_at > now() - interval '30 seconds'
  ) then
    raise exception 'Duplicate comment';
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_comment_rate_limit_before_insert on public.comments;
create trigger enforce_comment_rate_limit_before_insert
  before insert on public.comments
  for each row execute function public.enforce_comment_rate_limit();

alter table public.fan_profiles enable row level security;
alter table public.comments enable row level security;
alter table public.comment_likes enable row level security;

drop policy if exists "profiles are publicly readable" on public.fan_profiles;
create policy "profiles are publicly readable"
  on public.fan_profiles for select using (true);

drop policy if exists "users update own profile" on public.fan_profiles;
create policy "users update own profile"
  on public.fan_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "comments are publicly readable" on public.comments;
create policy "comments are publicly readable"
  on public.comments for select using (true);

drop policy if exists "authenticated users create comments" on public.comments;
create policy "authenticated users create comments"
  on public.comments for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "users update own comments" on public.comments;
create policy "users update own comments"
  on public.comments for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "likes are publicly readable" on public.comment_likes;
create policy "likes are publicly readable"
  on public.comment_likes for select using (true);

drop policy if exists "users create own likes" on public.comment_likes;
create policy "users create own likes"
  on public.comment_likes for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users remove own likes" on public.comment_likes;
create policy "users remove own likes"
  on public.comment_likes for delete
  to authenticated
  using (auth.uid() = user_id);

revoke all on public.fan_profiles from anon, authenticated;
grant select (user_id, fan_tag) on public.fan_profiles to anon, authenticated;
grant update (language, timezone, device_class, last_seen_at)
  on public.fan_profiles to authenticated;
grant select on public.comments, public.comment_likes to anon, authenticated;
grant insert, update on public.comments to authenticated;
grant insert, delete on public.comment_likes to authenticated;
grant usage, select on sequence public.comments_id_seq to authenticated;

alter publication supabase_realtime add table public.comments;
alter publication supabase_realtime add table public.comment_likes;
