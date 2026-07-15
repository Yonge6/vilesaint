/**
 * VileSaint Application — Main Entry Point
 * Initializes all modules, manages global state, language, modals.
 */
const AppState = {
  lang: CONFIG.defaultLanguage,
  currentCase: {
    slug: CONFIG.defaultCaseSlug,
    personName: 'Raúl Jiménez',
    personRole: 'Forward · Mexico',
    personInitials: 'RJ',
    teamA: 'Mexico',
    teamB: 'South Africa',
    score: '2 – 0',
    stage: 'Group Stage',
    status: 'FINAL',
    question: 'Match-winner or home advantage beneficiary?',
    sideA: 'Match-winner',
    sideB: 'Home advantage',
    fact: 'Verified: Scored in Mexico\'s 2–0 win over South Africa in the opening match.',
  },
  shareComment: null,
};

const RateLimiter = {
  voteTimes: [],
  commentTimes: [],
  maxVotesPerMin: 10,
  maxCommentsPerMin: CONFIG.rateLimit.maxCommentsPerMinute,

  canVote() {
    const now = Date.now();
    this.voteTimes = this.voteTimes.filter(t => now - t < 60000);
    return this.voteTimes.length < this.maxVotesPerMin;
  },
  recordVote() {
    this.voteTimes.push(Date.now());
  },
  canComment() {
    const now = Date.now();
    this.commentTimes = this.commentTimes.filter(t => now - t < 60000);
    return this.commentTimes.length < this.maxCommentsPerMin;
  },
  recordComment() {
    this.commentTimes.push(Date.now());
  },
};

// ---- Initialization ----
async function initApp() {
  // Detect language
  detectLanguage();

  // Init Supabase
  SupabaseClient.init();

  // Init auth
  await Auth.init();

  // Parse URL params for deep links
  parseURLParams();

  // Load case data
  loadCaseData();

  // Init votes
  await Votes.init(AppState.currentCase.slug);

  // Init comments
  await Comments.init(AppState.currentCase.slug);

  // Build language selector
  buildLangGrid();

  // Apply language to UI
  applyLanguage();
}

// ---- Language ----
function detectLanguage() {
  // 1. Check localStorage
  const stored = localStorage.getItem('vilesaint_lang');
  if (stored && I18N[stored]) {
    AppState.lang = stored;
    return;
  }
  // 2. Check browser language
  const browserLang = navigator.language || 'en';
  const short = browserLang.split('-')[0];
  if (I18N[browserLang]) {
    AppState.lang = browserLang;
  } else if (I18N[`${short}-${short.toUpperCase()}`]) {
    AppState.lang = `${short}-${short.toUpperCase()}`;
  } else {
    // Try matching short code to full code
    const match = Object.keys(I18N).find(k => k.startsWith(short));
    AppState.lang = match || CONFIG.defaultLanguage;
  }
}

function setLanguage(lang) {
  if (!I18N[lang]) return;
  AppState.lang = lang;
  localStorage.setItem('vilesaint_lang', lang);

  // Update dir attribute
  document.documentElement.lang = lang;
  document.documentElement.dir = getDir(lang);

  // Update UI
  applyLanguage();
  buildLangGrid();
  closeLangModal();
}

function applyLanguage() {
  const lang = AppState.lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = getDir(lang);

  // Update text elements
  setText('currentLangLabel', t('langLabel', lang));
  setText('matchVerifiedLabel', t('matchVerified', lang));
  setText('matchStage', t('matchStageLabel', lang));
  setText('scoreStatus', t('finalLabel', lang));
  setText('sideALabel', t('voteSideA', lang));
  setText('sideBLabel', t('voteSideB', lang));
  setText('btnShareLabel', t('shareJudgment', lang));
  setText('personCardsTitle', t('personCardsTitle', lang));
  setText('commentTitle', t('commentTitle', lang));
  setText('commentPlaceholder', t('commentPlaceholder', lang));
  setText('btnPostComment', t('commentPost', lang));
  setText('sortHot', t('commentSortHot', lang));
  setText('sortNew', t('commentSortNew', lang));
  setText('btnLoadMore', t('commentLoadMore', lang));
  setText('manifestoTagline', t('manifestoTagline', lang));
  setText('manifestoSub', t('manifestoSub', lang));
  setText('footerTagline', t('footerTagline', lang));
  setText('linkAbout', t('manifestoAbout', lang));
  setText('linkGuidelines', t('manifestoGuidelines', lang));
  setText('linkPrivacy', t('manifestoPrivacy', lang));
  setText('linkTerms', t('manifestoTerms', lang));
  setText('shareModalTitle', t('shareModalTitle', lang));
  setText('btnSaveShare', t('shareSave', lang));
  setText('btnCopyLink', t('shareCopy', lang));

  // Update judgment with lang-specific content
  updateJudgmentContent();
}

function updateJudgmentContent() {
  const lang = AppState.lang;
  // For Chinese, update with CHN-specific translations
  if (lang === 'zh-CN' || lang === 'zh-TW') {
    setText('judgmentQuestion', '关键先生，还是吃了东道主红利？');
    setText('sideALabel', '关键先生');
    setText('sideBLabel', '东道主红利');
    setText('judgmentFact', '已核验：在墨西哥 2–0 战胜南非的揭幕战中打入进球。');
  } else if (lang === 'ja') {
    setText('judgmentQuestion', 'キーマンか、それともホームアドバンテージか？');
    setText('sideALabel', 'キーマン');
    setText('sideBLabel', 'ホームアドバンテージ');
    setText('judgmentFact', '確認済み：メキシコ対南アフリカ戦（2-0）で得点。');
  } else if (lang === 'ko') {
    setText('judgmentQuestion', '핵심 선수인가, 홈 어드밴티지인가?');
    setText('sideALabel', '핵심 선수');
    setText('sideBLabel', '홈 어드밴티지');
    setText('judgmentFact', '확인됨: 멕시코 대 남아공 2-0 승리에서 득점.');
  } else if (lang === 'es') {
    setText('judgmentQuestion', '¿Hombre clave o beneficiario de la ventaja local?');
    setText('sideALabel', 'Hombre clave');
    setText('sideBLabel', 'Ventaja local');
    setText('judgmentFact', 'Verificado: Marcó en la victoria 2-0 de México sobre Sudáfrica en el partido inaugural.');
  } else {
    setText('judgmentQuestion', AppState.currentCase.question);
    setText('sideALabel', AppState.currentCase.sideA);
    setText('sideBLabel', AppState.currentCase.sideB);
    setText('judgmentFact', AppState.currentCase.fact);
  }
}

function loadCaseData() {
  const c = AppState.currentCase;
  setText('teamAFlag', getFlagEmoji(c.teamA));
  setText('teamAName', c.teamA);
  setText('teamBFlag', getFlagEmoji(c.teamB));
  setText('teamBName', c.teamB);
  setText('scoreFull', c.score);
  setText('scoreStatus', c.status === 'FINAL' ? 'FINAL' : c.status);
  setText('personName', c.personName);
  setText('personRole', c.personRole);
  setText('personAvatar', c.personInitials);

  // Status badge
  const badge = document.querySelector('.status-badge');
  if (badge) {
    badge.textContent = c.status === 'FINAL' ? 'VERIFIED' : c.status;
    badge.className = `status-badge status-${c.status === 'FINAL' ? 'verified' : c.status.toLowerCase()}`;
  }
}

function getFlagEmoji(team) {
  const flags = {
    'Mexico': '🇲🇽',
    'South Africa': '🇿🇦',
    'Argentina': '🇦🇷',
    'Brazil': '🇧🇷',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
    'Netherlands': '🇳🇱',
    'Portugal': '🇵🇹',
    'Japan': '🇯🇵',
    'South Korea': '🇰🇷',
    'USA': '🇺🇸',
    'Croatia': '🇭🇷',
    'Uruguay': '🇺🇾',
  };
  return flags[team] || '⚽';
}

function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  const caseSlug = params.get('case');
  const commentId = params.get('comment');
  if (caseSlug) {
    AppState.currentCase.slug = caseSlug;
  }
  if (commentId) {
    setTimeout(() => {
      Comments.highlightComment(parseInt(commentId));
    }, 1000);
  }
}

// ---- Language Selector ----
function buildLangGrid() {
  const grid = document.getElementById('langGrid');
  if (!grid) return;
  grid.innerHTML = SUPPORTED_LANGUAGES.map(code => {
    const dict = I18N[code];
    const active = code === AppState.lang ? ' active' : '';
    return `<button class="lang-option${active}" onclick="setLanguage('${code}')">${dict.langNative}</button>`;
  }).join('');
  setText('langModalTitle', 'Select Language');
}

function openLangModal() {
  document.getElementById('langModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLangModal() {
  document.getElementById('langModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ---- Share Modal ----
async function openShareModal() {
  const canvas = await CanvasPoster.generateJudgmentPoster(AppState.currentCase, Votes.getUserVote());
  if (!canvas) return;
  document.getElementById('shareModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('active');
  document.body.style.overflow = '';
}

async function saveShareImage() {
  const canvas = document.getElementById('shareCanvas');
  const success = await CanvasPoster.shareCanvas(canvas, 'vilesaint-judgment.png');
  if (success) {
    showToast(t('toastImageSaved', AppState.lang), 'success');
  } else {
    showToast(t('toastImageFail', AppState.lang), 'error');
  }
}

function copyShareLink() {
  const url = `${CONFIG.siteUrl}?case=${AppState.currentCase.slug}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(t('toastLinkCopied', AppState.lang), 'success');
  }).catch(() => {
    showToast(t('toastLinkCopied', AppState.lang), 'success');
  });
}

// ---- Comment Share Modal ----
function openCommentShareModal() {
  document.getElementById('commentShareModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCommentShareModal() {
  document.getElementById('commentShareModal').classList.remove('active');
  document.body.style.overflow = '';
}

async function saveCommentShareImage() {
  const canvas = document.getElementById('commentShareCanvas');
  const success = await CanvasPoster.shareCanvas(canvas, 'vilesaint-comment.png');
  if (success) {
    showToast(t('toastImageSaved', AppState.lang), 'success');
  } else {
    showToast(t('toastImageFail', AppState.lang), 'error');
  }
}

function copyCommentShareLink() {
  if (!AppState.shareComment) return;
  const url = `${CONFIG.siteUrl}?case=${AppState.shareComment.caseData.slug}&comment=${AppState.shareComment.comment.id}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(t('toastLinkCopied', AppState.lang), 'success');
  }).catch(() => {
    showToast(t('toastLinkCopied', AppState.lang), 'success');
  });
}

// ---- Vote ----
function castVote(side) {
  Votes.castVote(side);
}

// ---- Comment ----
function postComment() {
  const input = document.getElementById('commentInput');
  if (!input) return;
  Comments.postComment(input.value);
}

// ---- Toast ----
function showToast(message, type = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

// ---- Utility ----
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Modal close on background click ----
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ---- Modal close on Escape ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// ---- Boot ----
document.addEventListener('DOMContentLoaded', initApp);
