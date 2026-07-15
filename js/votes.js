/**
 * VileSaint Vote System
 * Side A / Side B voting with real-time updates.
 */
const Votes = (() => {
  let currentCaseSlug = CONFIG.defaultCaseSlug;
  let userVote = null;
  let voteCounts = { side_a: 0, side_b: 0, total: 0 };
  let votesChannel = null;

  async function init(caseSlug) {
    currentCaseSlug = caseSlug || CONFIG.defaultCaseSlug;
    await loadVoteState();
    subscribeToUpdates();
  }

  async function loadVoteState() {
    // Load counts
    voteCounts = await SupabaseClient.getVoteCounts(currentCaseSlug);

    // Load user vote
    const userId = Auth.getUserId();
    if (userId) {
      userVote = await SupabaseClient.getUserVote(currentCaseSlug, userId);
    }

    render();
  }

  function subscribeToUpdates() {
    if (votesChannel) votesChannel.unsubscribe();
    votesChannel = SupabaseClient.subscribeToVotes(currentCaseSlug, async () => {
      voteCounts = await SupabaseClient.getVoteCounts(currentCaseSlug);
      render();
    });
  }

  async function castVote(side) {
    if (!Auth.isAuthenticated()) {
      await Auth.init();
    }
    if (!Auth.isAuthenticated()) {
      showToast(t('toastAuthFail', AppState.lang), 'error');
      return;
    }

    // Check rate limit
    if (!RateLimiter.canVote()) {
      showToast(t('toastRateLimited', AppState.lang), 'error');
      return;
    }

    const result = await SupabaseClient.castVote(currentCaseSlug, side);
    if (result.error) {
      showToast(t('toastVoteFail', AppState.lang), 'error');
      return;
    }

    userVote = side;
    RateLimiter.recordVote();
    voteCounts = await SupabaseClient.getVoteCounts(currentCaseSlug);
    render();
    showToast(t('toastVoted', AppState.lang), 'success');
  }

  function render() {
    const btnA = document.getElementById('btnSideA');
    const btnB = document.getElementById('btnSideB');
    const voteResult = document.getElementById('voteResult');
    const voteSection = document.getElementById('voteSection');
    const resultBarA = document.getElementById('resultBarA');
    const resultBarB = document.getElementById('resultBarB');
    const resultPctA = document.getElementById('resultPctA');
    const resultPctB = document.getElementById('resultPctB');
    const resultTotal = document.getElementById('resultTotal');

    // Update button states
    if (btnA) {
      btnA.classList.toggle('selected', userVote === 'a');
    }
    if (btnB) {
      btnB.classList.toggle('selected', userVote === 'b');
    }

    // Show results
    if (voteSection) voteSection.style.display = 'flex';
    if (voteResult) voteResult.style.display = 'block';

    const total = voteCounts.total || 0;
    const pctA = total > 0 ? Math.round((voteCounts.side_a / total) * 100) : 0;
    const pctB = total > 0 ? Math.round((voteCounts.side_b / total) * 100) : 0;

    if (resultBarA) resultBarA.style.width = `${pctA}%`;
    if (resultBarB) resultBarB.style.width = `${pctB}%`;
    if (resultPctA) resultPctA.textContent = `${pctA}%`;
    if (resultPctB) resultPctB.textContent = `${pctB}%`;
    if (resultTotal) {
      resultTotal.textContent = `${t('voteTotal', AppState.lang)}: ${total.toLocaleString()}`;
    }
  }

  function getUserVote() {
    return userVote;
  }

  function getCurrentCase() {
    return currentCaseSlug;
  }

  return {
    init,
    castVote,
    getUserVote,
    getCurrentCase,
    render,
  };
})();
