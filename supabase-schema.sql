-- ============================================================
-- VileSaint Supabase Database Schema
-- Run this in your Supabase SQL Editor to create all tables
-- and Row Level Security policies.
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. Fan Profiles (Anonymous Users)
-- ============================================================
CREATE TABLE IF NOT EXISTS fan_profiles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  fan_tag TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  timezone TEXT,
  device_class TEXT CHECK (device_class IN ('mobile', 'tablet', 'desktop')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fan_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON fan_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own profile" ON fan_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON fan_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Public read for fan_tag only (needed for displaying comment author)
CREATE POLICY "Anyone can read fan_tag" ON fan_profiles
  FOR SELECT USING (true);

-- ============================================================
-- 2. Cases (Person/Judgment Topics)
-- ============================================================
CREATE TABLE IF NOT EXISTS cases (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  subject_name TEXT NOT NULL,
  subject_type TEXT CHECK (subject_type IN ('player', 'coach', 'referee', 'goalkeeper', 'event')),
  team_name TEXT,
  country TEXT,
  match_slug TEXT,
  verified_fact TEXT NOT NULL,
  question TEXT NOT NULL,
  side_a TEXT NOT NULL,
  side_b TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'verified', 'live', 'closed', 'retracted')),
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read live cases" ON cases
  FOR SELECT USING (status = 'live' OR status = 'verified');

CREATE POLICY "Authenticated can read all cases" ON cases
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- 3. Matches
-- ============================================================
CREATE TABLE IF NOT EXISTS matches (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  team_a TEXT NOT NULL,
  team_b TEXT NOT NULL,
  score_a INTEGER,
  score_b INTEGER,
  stage TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished', 'postponed')),
  verified_at TIMESTAMPTZ,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read matches" ON matches
  FOR SELECT USING (true);

-- ============================================================
-- 4. Votes
-- ============================================================
CREATE TABLE IF NOT EXISTS votes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  case_slug TEXT NOT NULL,
  user_id UUID NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('a', 'b')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (case_slug, user_id)
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read votes" ON votes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own vote" ON votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vote" ON votes
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- 5. Comments
-- ============================================================
CREATE TABLE IF NOT EXISTS comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  case_slug TEXT NOT NULL,
  author_id UUID NOT NULL,
  fan_tag TEXT NOT NULL,
  parent_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ
);

CREATE INDEX idx_comments_case_slug ON comments(case_slug);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own comment" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comment" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own comment" ON comments
  FOR DELETE USING (auth.uid() = author_id);

-- ============================================================
-- 6. Comment Likes
-- ============================================================
CREATE TABLE IF NOT EXISTS comment_likes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  comment_id BIGINT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (comment_id, user_id)
);

CREATE INDEX idx_comment_likes_comment ON comment_likes(comment_id);

ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read likes" ON comment_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own like" ON comment_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own like" ON comment_likes
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 7. Comment Reports
-- ============================================================
CREATE TABLE IF NOT EXISTS comment_reports (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  comment_id BIGINT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can report comments" ON comment_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- ============================================================
-- 8. Share Events (analytics)
-- ============================================================
CREATE TABLE IF NOT EXISTS share_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  case_slug TEXT NOT NULL,
  user_id UUID,
  share_type TEXT CHECK (share_type IN ('judgment', 'comment')),
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE share_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert share event" ON share_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read own share events" ON share_events
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- 9. Translations
-- ============================================================
CREATE TABLE IF NOT EXISTS translations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  case_slug TEXT NOT NULL,
  language TEXT NOT NULL,
  question TEXT NOT NULL,
  side_a TEXT NOT NULL,
  side_b TEXT NOT NULL,
  fact TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (case_slug, language)
);

ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read translations" ON translations
  FOR SELECT USING (true);

-- ============================================================
-- Seed Data: Initial Case
-- ============================================================
INSERT INTO cases (slug, subject_name, subject_type, team_name, country, match_slug, verified_fact, question, side_a, side_b, status, risk_level)
VALUES (
  'raul-jimenez-mexico-south-africa-2026',
  'Raúl Jiménez',
  'player',
  'Mexico',
  'Mexico',
  'mexico-south-africa-2026',
  'Scored in Mexico''s 2–0 win over South Africa in the opening match.',
  'Match-winner or home advantage beneficiary?',
  'Match-winner',
  'Home advantage',
  'live',
  'low'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO matches (slug, team_a, team_b, score_a, score_b, stage, status, verified_at)
VALUES (
  'mexico-south-africa-2026',
  'Mexico',
  'South Africa',
  2,
  0,
  'Group Stage',
  'finished',
  NOW()
) ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Enable Realtime (for Supabase Realtime subscriptions)
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
ALTER PUBLICATION supabase_realtime ADD TABLE comment_likes;

-- ============================================================
-- Anonymous Auth Configuration
-- Run in Supabase Dashboard > Authentication > Settings:
-- 1. Enable "Anonymous Sign-ins"
-- 2. Under "Auth Providers", make sure Anonymous is enabled
-- ============================================================
