/**
 * VileSaint Supabase Client
 * Handles database, auth, and realtime connections.
 */
const SupabaseClient = (() => {
  let supabase = null;
  let channel = null;

  function init() {
    if (supabase) return supabase;
    try {
      supabase = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true },
        realtime: { params: { eventsPerSecond: 10 } },
      });
      return supabase;
    } catch (err) {
      console.error('Supabase init failed:', err);
      return null;
    }
  }

  function getClient() {
    return init();
  }

  // ---- Auth ----
  async function signInAnonymously() {
    const client = getClient();
    if (!client) return null;
    const { data, error } = await client.auth.signInAnonymously();
    if (error) throw error;
    return data;
  }

  async function getSession() {
    const client = getClient();
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session;
  }

  async function refreshSession() {
    const client = getClient();
    if (!client) return null;
    const { data } = await client.auth.refreshSession();
    return data.session;
  }

  function onAuthStateChange(callback) {
    const client = getClient();
    if (!client) return null;
    return client.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }

  // ---- Votes ----
  async function castVote(caseSlug, side) {
    const client = getClient();
    if (!client) return { error: 'Client not initialized' };
    const session = await getSession();
    if (!session) return { error: 'Not authenticated' };
    const { data, error } = await client
      .from('votes')
      .upsert({
        case_slug: caseSlug,
        user_id: session.user.id,
        side: side,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'case_slug,user_id' });
    return { data, error };
  }

  async function getVoteCounts(caseSlug) {
    const client = getClient();
    if (!client) return { sideA: 0, sideB: 0, total: 0 };
    const { data, error } = await client
      .from('votes')
      .select('side')
      .eq('case_slug', caseSlug);
    if (error) return { sideA: 0, sideB: 0, total: 0 };
    const counts = { side_a: 0, side_b: 0, total: (data || []).length };
    (data || []).forEach(v => {
      if (v.side === 'a') counts.side_a++;
      else if (v.side === 'b') counts.side_b++;
    });
    return counts;
  }

  async function getUserVote(caseSlug, userId) {
    const client = getClient();
    if (!client) return null;
    const { data } = await client
      .from('votes')
      .select('side')
      .eq('case_slug', caseSlug)
      .eq('user_id', userId)
      .maybeSingle();
    return data ? data.side : null;
  }

  // ---- Comments ----
  async function postComment(caseSlug, body, parentId = null) {
    const client = getClient();
    if (!client) return { error: 'Client not initialized' };
    const session = await getSession();
    if (!session) return { error: 'Not authenticated' };
    const fanTag = getFanTag(session.user.id);
    const { data, error } = await client
      .from('comments')
      .insert({
        case_slug: caseSlug,
        author_id: session.user.id,
        fan_tag: fanTag,
        parent_id: parentId,
        body: body,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  }

  async function getComments(caseSlug, sort = 'hot', limit = 50, offset = 0) {
    const client = getClient();
    if (!client) return { data: [], error: 'Client not initialized' };

    let query = client
      .from('comments')
      .select('*')
      .eq('case_slug', caseSlug)
      .is('parent_id', null);

    if (sort === 'new') {
      query = query.order('created_at', { ascending: false });
    } else {
      // hot: by likes count descending (simplified)
      query = query.order('created_at', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);
    const { data, error } = await query;
    return { data, error };
  }

  async function getCommentReplies(parentId) {
    const client = getClient();
    if (!client) return { data: [] };
    const { data } = await client
      .from('comments')
      .select('*')
      .eq('parent_id', parentId)
      .order('created_at', { ascending: true })
      .limit(50);
    return { data };
  }

  async function getCommentById(commentId) {
    const client = getClient();
    if (!client) return null;
    const { data } = await client
      .from('comments')
      .select('*')
      .eq('id', commentId)
      .single();
    return data;
  }

  // ---- Likes ----
  async function toggleLike(commentId, userId) {
    const client = getClient();
    if (!client) return { error: 'Client not initialized' };
    // Check if already liked
    const { data: existing } = await client
      .from('comment_likes')
      .select('*')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      // Unlike
      const { error } = await client
        .from('comment_likes')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', userId);
      return { liked: false, error };
    } else {
      // Like
      const { error } = await client
        .from('comment_likes')
        .insert({
          comment_id: commentId,
          user_id: userId,
          created_at: new Date().toISOString(),
        });
      return { liked: true, error };
    }
  }

  async function getCommentLikes(commentIds) {
    const client = getClient();
    if (!client) return {};
    const { data } = await client
      .from('comment_likes')
      .select('comment_id, user_id')
      .in('comment_id', commentIds);
    const map = {};
    (data || []).forEach(l => {
      if (!map[l.comment_id]) map[l.comment_id] = [];
      map[l.comment_id].push(l.user_id);
    });
    return map;
  }

  // ---- Realtime Subscriptions ----
  function subscribeToComments(caseSlug, onInsert, onUpdate, onDelete) {
    const client = getClient();
    if (!client) return null;
    channel = client
      .channel(`comments-${caseSlug}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `case_slug=eq.${caseSlug}`,
      }, (payload) => { if (onInsert) onInsert(payload.new); })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'comments',
        filter: `case_slug=eq.${caseSlug}`,
      }, (payload) => { if (onUpdate) onUpdate(payload.new); })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'comments',
        filter: `case_slug=eq.${caseSlug}`,
      }, (payload) => { if (onDelete) onDelete(payload.old); })
      .subscribe();
    return channel;
  }

  function subscribeToVotes(caseSlug, onUpdate) {
    const client = getClient();
    if (!client) return null;
    return client
      .channel(`votes-${caseSlug}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'votes',
        filter: `case_slug=eq.${caseSlug}`,
      }, () => { if (onUpdate) onUpdate(); })
      .subscribe();
  }

  function unsubscribeAll() {
    if (channel) {
      channel.unsubscribe();
      channel = null;
    }
  }

  // ---- Fan Profiles ----
  async function upsertFanProfile(userId, fanTag, lang) {
    const client = getClient();
    if (!client) return;
    await client.from('fan_profiles').upsert({
      user_id: userId,
      fan_tag: fanTag,
      language: lang,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      device_class: getDeviceClass(),
      created_at: new Date().toISOString(),
      last_seen_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  }

  // ---- Helpers ----
  function getFanTag(userId) {
    // Generate VS-XXXXXX tag from userId
    if (!userId) return 'VS-000000';
    const hash = userId.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xFFFFFFFF, 0);
    const hex = (hash >>> 0).toString(16).toUpperCase().slice(0, 6).padStart(6, '0');
    return `VS-${hex}`;
  }

  function getDeviceClass() {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  }

  // ---- Duplicate Detection ----
  function isRecentDuplicate(body, recentComments) {
    return recentComments.some(c => c.body === body);
  }

  return {
    init,
    getClient,
    signInAnonymously,
    getSession,
    refreshSession,
    onAuthStateChange,
    castVote,
    getVoteCounts,
    getUserVote,
    postComment,
    getComments,
    getCommentReplies,
    getCommentById,
    toggleLike,
    getCommentLikes,
    subscribeToComments,
    subscribeToVotes,
    unsubscribeAll,
    upsertFanProfile,
    getFanTag,
    getDeviceClass,
    isRecentDuplicate,
  };
})();
