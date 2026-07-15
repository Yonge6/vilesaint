/**
 * VileSaint Comment System
 * Post, reply, like, sort, and realtime updates.
 */
const Comments = (() => {
  let currentCaseSlug = CONFIG.defaultCaseSlug;
  let sortMode = 'hot';
  let comments = [];
  let likesMap = {};
  let pageOffset = 0;
  let hasMore = true;
  let highlightCommentId = null;
  let recentComments = []; // for duplicate detection

  async function init(caseSlug) {
    currentCaseSlug = caseSlug || CONFIG.defaultCaseSlug;
    comments = [];
    pageOffset = 0;
    hasMore = true;
    await loadComments();
    subscribeToRealtime();
    bindEvents();
  }

  async function loadComments(reset = true) {
    if (reset) {
      pageOffset = 0;
      comments = [];
    }

    const { data } = await SupabaseClient.getComments(currentCaseSlug, sortMode, CONFIG.comments.pageSize, pageOffset);
    const loaded = data || [];

    if (reset) {
      comments = loaded;
    } else {
      comments = [...comments, ...loaded];
    }

    hasMore = loaded.length >= CONFIG.comments.pageSize;
    pageOffset += loaded.length;

    // Load likes for all comments
    if (comments.length > 0) {
      const ids = comments.map(c => c.id);
      likesMap = await SupabaseClient.getCommentLikes(ids);
    }

    render();
  }

  async function loadMore() {
    if (!hasMore) return;
    const btn = document.getElementById('btnLoadMore');
    if (btn) btn.style.display = 'none';
    const loading = document.getElementById('commentsLoading');
    if (loading) loading.style.display = 'block';
    await loadComments(false);
    if (loading) loading.style.display = 'none';
    if (btn) btn.style.display = hasMore ? 'block' : 'none';
  }

  async function postComment(body, parentId = null) {
    if (!Auth.isAuthenticated()) {
      await Auth.init();
    }
    if (!Auth.isAuthenticated()) {
      showToast(t('toastAuthFail', AppState.lang), 'error');
      return;
    }

    // Validate
    if (!body || !body.trim()) return;
    if (body.length > CONFIG.comments.maxLength) {
      showToast(`Max ${CONFIG.comments.maxLength} characters`, 'error');
      return;
    }

    // Duplicate check
    if (SupabaseClient.isRecentDuplicate(body, recentComments)) {
      showToast(t('toastDuplicate', AppState.lang), 'error');
      return;
    }

    // Rate limit
    if (!RateLimiter.canComment()) {
      showToast(t('toastRateLimited', AppState.lang), 'error');
      return;
    }

    const { data, error } = await SupabaseClient.postComment(currentCaseSlug, body.trim(), parentId);
    if (error) {
      showToast(t('toastCommentFail', AppState.lang), 'error');
      return;
    }

    // Track for duplicate detection
    recentComments.push({ body: body.trim(), time: Date.now() });
    if (recentComments.length > 20) recentComments.shift();

    RateLimiter.recordComment();

    if (!parentId) {
      // Prepend to list
      comments.unshift(data);
      render();
    }
    showToast(t('toastCommentPosted', AppState.lang), 'success');
    clearCommentInput();
  }

  async function toggleLike(commentId) {
    if (!Auth.isAuthenticated()) {
      await Auth.init();
    }
    if (!Auth.isAuthenticated()) return;

    const result = await SupabaseClient.toggleLike(commentId, Auth.getUserId());
    if (result.error) return;

    const userId = Auth.getUserId();
    if (!likesMap[commentId]) likesMap[commentId] = [];
    if (result.liked) {
      if (!likesMap[commentId].includes(userId)) {
        likesMap[commentId].push(userId);
      }
    } else {
      likesMap[commentId] = likesMap[commentId].filter(id => id !== userId);
    }
    render();
  }

  function getLikeCount(commentId) {
    return (likesMap[commentId] || []).length;
  }

  function isLiked(commentId) {
    const userId = Auth.getUserId();
    return (likesMap[commentId] || []).includes(userId);
  }

  function subscribeToRealtime() {
    SupabaseClient.subscribeToComments(
      currentCaseSlug,
      (newComment) => {
        // Insert
        if (!newComment.parent_id) {
          const exists = comments.find(c => c.id === newComment.id);
          if (!exists) {
            comments.unshift(newComment);
            render();
          }
        }
      },
      (updated) => {
        // Update
        const idx = comments.findIndex(c => c.id === updated.id);
        if (idx !== -1) {
          comments[idx] = { ...comments[idx], ...updated };
          render();
        }
      },
      (deleted) => {
        // Delete
        comments = comments.filter(c => c.id !== deleted.id);
        render();
      }
    );
  }

  function render() {
    const list = document.getElementById('commentsList');
    if (!list) return;

    const userId = Auth.getUserId();

    if (comments.length === 0) {
      list.innerHTML = `<div style="color:var(--text-muted);text-align:center;padding:2rem 0;font-size:0.85rem;">Be the first to join the trial.</div>`;
    } else {
      list.innerHTML = comments.map(c => renderComment(c, userId, 0)).join('');
    }

    // Highlight target comment
    if (highlightCommentId) {
      const el = document.getElementById(`comment-${highlightCommentId}`);
      if (el) {
        el.classList.add('highlight');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightCommentId = null;
      }
    }

    // Update load more button
    const btn = document.getElementById('btnLoadMore');
    if (btn) btn.style.display = hasMore ? 'block' : 'none';
  }

  function renderComment(comment, userId, depth) {
    const likeCount = getLikeCount(comment.id);
    const liked = isLiked(comment.id);
    const isSelf = userId && comment.author_id === userId;
    const timeStr = timeAgoStr(new Date(comment.created_at));

    return `
      <div class="comment-item" id="comment-${comment.id}" style="margin-left:${depth > 0 ? '2rem' : '0'}">
        <div class="comment-header">
          <div class="comment-avatar">${(comment.fan_tag || 'VS').slice(0,2)}</div>
          <span class="comment-author ${isSelf ? 'comment-author-self' : ''}">${comment.fan_tag || 'VS-000000'}${isSelf ? ` ${t('commentSelf', AppState.lang)}` : ''}</span>
          <span class="comment-time">${timeStr}</span>
        </div>
        <div class="comment-body">${escapeHtml(comment.body || '')}</div>
        <div class="comment-actions">
          <button class="comment-action ${liked ? 'liked' : ''}" onclick="Comments.toggleLike(${comment.id})">
            <svg viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
            ${likeCount}
          </button>
          <button class="comment-action" onclick="Comments.showReplyComposer(${comment.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></svg>
            ${t('commentReply', AppState.lang)}
          </button>
          <button class="comment-action" onclick="Comments.shareComment(${comment.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            ${t('commentShare', AppState.lang)}
          </button>
        </div>
        <div class="reply-composer" id="reply-composer-${comment.id}">
          <textarea placeholder="Write a reply..." maxlength="500" id="reply-input-${comment.id}" rows="2"></textarea>
          <div class="reply-actions">
            <button class="btn btn-secondary btn-sm" onclick="Comments.cancelReply(${comment.id})">${t('commentCancel', AppState.lang)}</button>
            <button class="btn btn-primary btn-sm" onclick="Comments.submitReply(${comment.id})">${t('commentReply', AppState.lang)}</button>
          </div>
        </div>
      </div>
    `;
  }

  function showReplyComposer(parentId) {
    // Hide all other reply composers
    document.querySelectorAll('.reply-composer.active').forEach(el => el.classList.remove('active'));
    const composer = document.getElementById(`reply-composer-${parentId}`);
    if (composer) {
      composer.classList.toggle('active');
      const input = document.getElementById(`reply-input-${parentId}`);
      if (input) input.focus();
    }
  }

  function cancelReply(parentId) {
    const composer = document.getElementById(`reply-composer-${parentId}`);
    if (composer) composer.classList.remove('active');
  }

  async function submitReply(parentId) {
    const input = document.getElementById(`reply-input-${parentId}`);
    if (!input) return;
    const body = input.value.trim();
    if (!body) return;
    await postComment(body, parentId);
    input.value = '';
    cancelReply(parentId);
  }

  async function shareComment(commentId) {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    const caseData = {
      slug: currentCaseSlug,
      personName: AppState.currentCase ? AppState.currentCase.personName : 'Raúl Jiménez',
      question: AppState.currentCase ? AppState.currentCase.question : '',
    };

    AppState.shareComment = { caseData, comment };
    await CanvasPoster.generateCommentPoster(caseData, comment);
    openCommentShareModal();
  }

  function highlightComment(commentId) {
    highlightCommentId = commentId;
    if (comments.length > 0) {
      render();
    }
  }

  function setSort(mode) {
    sortMode = mode;
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(mode === 'hot' ? 'sortHot' : 'sortNew').classList.add('active');
    loadComments();
  }

  function clearCommentInput() {
    const input = document.getElementById('commentInput');
    if (input) input.value = '';
    updateCharCount();
  }

  function bindEvents() {
    // Sort buttons
    document.getElementById('sortHot')?.addEventListener('click', () => setSort('hot'));
    document.getElementById('sortNew')?.addEventListener('click', () => setSort('new'));

    // Comment input
    const input = document.getElementById('commentInput');
    if (input) {
      input.addEventListener('input', updateCharCount);
    }

    // Load more
    document.getElementById('btnLoadMore')?.addEventListener('click', loadMore);
  }

  function updateCharCount() {
    const input = document.getElementById('commentInput');
    const counter = document.getElementById('charCount');
    if (!input || !counter) return;
    const len = input.value.length;
    counter.textContent = `${len}/${CONFIG.comments.maxLength}`;
    counter.className = 'char-count';
    if (len > CONFIG.comments.maxLength * 0.9) counter.classList.add('danger');
    else if (len > CONFIG.comments.maxLength * 0.7) counter.classList.add('warning');
  }

  function timeAgoStr(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    return date.toLocaleDateString();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return {
    init,
    loadMore,
    postComment,
    toggleLike,
    getLikeCount,
    isLiked,
    showReplyComposer,
    cancelReply,
    submitReply,
    shareComment,
    highlightComment,
    setSort,
    render,
  };
})();
