/**
 * VileSaint Anonymous Authentication
 * Auto-creates anonymous identity on first visit.
 * Persists across sessions in same browser.
 */
const Auth = (() => {
  let currentUser = null;
  let currentFanTag = null;

  async function init() {
    try {
      // Check existing session
      const session = await SupabaseClient.getSession();
      if (session && session.user) {
        currentUser = session.user;
        currentFanTag = SupabaseClient.getFanTag(session.user.id);
        await SupabaseClient.upsertFanProfile(session.user.id, currentFanTag, AppState.lang);
        updateUI();
        return { user: currentUser, fanTag: currentFanTag };
      }

      // Create anonymous session
      const data = await SupabaseClient.signInAnonymously();
      if (data && data.user) {
        currentUser = data.user;
        currentFanTag = SupabaseClient.getFanTag(data.user.id);
        await SupabaseClient.upsertFanProfile(data.user.id, currentFanTag, AppState.lang);
        updateUI();
        return { user: currentUser, fanTag: currentFanTag };
      }

      return null;
    } catch (err) {
      console.error('Auth init failed:', err);
      showToast(t('toastAuthFail', AppState.lang), 'error');
      return null;
    }
  }

  async function refresh() {
    try {
      const session = await SupabaseClient.refreshSession();
      if (session && session.user) {
        currentUser = session.user;
        currentFanTag = SupabaseClient.getFanTag(session.user.id);
        updateUI();
      }
    } catch (err) {
      console.error('Auth refresh failed:', err);
    }
  }

  function updateUI() {
    const composerAvatar = document.getElementById('composerAvatar');
    if (composerAvatar && currentFanTag) {
      composerAvatar.textContent = currentFanTag.slice(0, 2);
    }
  }

  function getUserId() {
    return currentUser ? currentUser.id : null;
  }

  function getFanTag() {
    return currentFanTag || 'VS-000000';
  }

  function isAuthenticated() {
    return !!currentUser;
  }

  // Set up auth state listener
  SupabaseClient.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      if (session && session.user) {
        currentUser = session.user;
        currentFanTag = SupabaseClient.getFanTag(session.user.id);
        updateUI();
      }
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      currentFanTag = null;
    }
  });

  return {
    init,
    refresh,
    getUserId,
    getFanTag,
    isAuthenticated,
  };
})();
