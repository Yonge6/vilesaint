const languages = [
  { code: "en", short: "EN", name: "English", region: "Global" },
  { code: "es", short: "ES", name: "Español", region: "España / LATAM" },
  { code: "pt-BR", short: "PT", name: "Português", region: "Brasil" },
  { code: "fr", short: "FR", name: "Français", region: "France" },
  { code: "de", short: "DE", name: "Deutsch", region: "Deutschland" },
  { code: "it", short: "IT", name: "Italiano", region: "Italia" },
  { code: "nl", short: "NL", name: "Nederlands", region: "Nederland" },
  { code: "pl", short: "PL", name: "Polski", region: "Polska" },
  { code: "tr", short: "TR", name: "Türkçe", region: "Türkiye" },
  { code: "ar", short: "AR", name: "العربية", region: "العالم العربي" },
  { code: "id", short: "ID", name: "Bahasa Indonesia", region: "Indonesia" },
  { code: "vi", short: "VI", name: "Tiếng Việt", region: "Việt Nam" },
  { code: "th", short: "TH", name: "ไทย", region: "ประเทศไทย" },
  { code: "zh-CN", short: "简", name: "简体中文", region: "中国大陆" },
  { code: "zh-TW", short: "繁", name: "繁體中文", region: "台灣 / 香港" },
  { code: "ja", short: "日", name: "日本語", region: "日本" },
  { code: "ko", short: "한", name: "한국어", region: "대한민국" },
  { code: "hi", short: "HI", name: "हिन्दी", region: "भारत" },
];

const copy = {
  en: {
    navCourt: "Live Court", navStories: "Breaking", navRankings: "Rankings",
    liveNow: "Live now", breaking: "Breaking",
    ticker: "Final: Mexico 2–0 South Africa · Korea Republic 2–1 Czechia",
    groupStage: "Group A · Match complete", mexico: "Mexico", southAfrica: "South Africa",
    question: "TITLE CONTENDER OR HOME ADVANTAGE?",
    questionDetail: "Mexico opened the tournament with a verified 2–0 win over South Africa.",
    saintSide: "Contender", villainSide: "Sceptic", absolutely: "TITLE FORM",
    never: "HOME BOOST", clearPenalty: "A convincing opening statement.", robbery: "The hosts still have more to prove.",
    worldSplit: "Your view", verdictRecorded: "Your verdict is recorded", shareVerdict: "Share verdict",
    officialResult: "official result", verifiedByFifa: "verified by FIFA",
    versus: "versus", globalPulse: "Global pulse", countriesLive: "countries live",
    sayPenalty: "say penalty", nationClash: "Nation clash",
    nationCopy: "Goals: Julián Quiñones and Raúl Jiménez.", upNext: "Also finished",
    nextQuestion: "Korea Republic 2–1 Czechia", breakingCourt: "Breaking court",
    worldOnTrial: "The world is on trial.",
    storiesIntro: "AI-detected moments rising across live matches, official sources and global conversation.",
    storyOneTitle: "The call that split five continents",
    storyOneCopy: "The majority changed sides after the replay. The argument is accelerating.",
    nationsDivided: "nations divided", enterCase: "Enter case",
    storyTwoTitle: "One tackle. A nation furious.",
    storyTwoCopy: "67% say he destroyed his team's last chance.", judgeNow: "Judge now",
    storyThreeTitle: "From the bench to immortality",
    storyThreeCopy: "A 94th-minute goal made him today's global Saint.", seeVerdict: "See verdict",
    liveRankings: "Live rankings", today: "Today", tournament: "Tournament",
    manifestoTop: "Every match creates", manifestoBottom: "The world decides which is which.",
    castFirst: "Cast your first verdict", share: "Share", chooseLanguage: "Choose your language",
    searchLanguages: "Search languages", worldAgrees: "of the world agrees",
    scanVote: "Scan to vote", yourVerdict: "Your verdict", makeNoise: "Make some noise.",
    verdictPrefix: "I said",
    shareCopy: "Send this verdict to someone who thinks you're wrong.",
    shareNow: "Share now", copyLink: "Copy link",
    minoritySaint: "You joined the narrow majority. The argument is far from over.",
    minorityVillain: "You joined the global minority. Stand your ground.",
    copied: "Link copied to clipboard.", nextLoaded: "Next case loaded.",
    fanZoneEyebrow: "FAN WAR ROOM", fanZoneTitle: "Fan war room",
    yourFanId: "Your anonymous fan ID", connectingFan: "Connecting...",
    commentPlaceholder: "Say what you think. Back it up if challenged.",
    postComment: "Post", loadingComments: "Connecting to the fan room...",
    commentsEmpty: "No takes yet. Start the argument.", reply: "Reply", like: "Like", shareComment: "Share",
    replyingTo: "Replying to", cancelReply: "Cancel reply", you: "YOU",
    commentReady: "Live comments", commentFailed: "Comments are temporarily unavailable.",
    commentTooFast: "Too fast. Wait a moment before posting again.", commentLinkCopied: "Comment link copied.",
  },
  "zh-CN": {
    navCourt: "实时审判", navStories: "爆点", navRankings: "榜单",
    liveNow: "正在直播", breaking: "突发",
    ticker: "已完赛：墨西哥 2–0 南非 · 韩国 2–1 捷克",
    groupStage: "A组 · 比赛结束", mexico: "墨西哥", southAfrica: "南非",
    question: "墨西哥是冠军相，还是主场加成？",
    questionDetail: "墨西哥在揭幕战中以2–0击败南非，赛果已由FIFA确认。",
    saintSide: "看好派", villainSide: "质疑派", absolutely: "冠军相",
    never: "主场加成", clearPenalty: "这是一场有说服力的开局。", robbery: "东道主仍需要更多比赛证明自己。",
    worldSplit: "你的观点", verdictRecorded: "你的判决已记录", shareVerdict: "分享判决",
    officialResult: "官方赛果", verifiedByFifa: "FIFA已确认",
    versus: "对阵", globalPulse: "全球脉搏", countriesLive: "个国家在线",
    sayPenalty: "认为是点球", nationClash: "国家对撞",
    nationCopy: "进球球员：胡利安·基尼奥内斯、劳尔·希门尼斯。", upNext: "另一场已完赛",
    nextQuestion: "韩国 2–1 捷克", breakingCourt: "实时爆点",
    worldOnTrial: "全世界正在受审。",
    storiesIntro: "AI从比赛、官方消息与全球讨论中自动发现正在爆发的争议。",
    storyOneTitle: "一个判罚，撕裂五大洲",
    storyOneCopy: "回放出现后，多数意见发生反转，争论还在加速。",
    nationsDivided: "个国家意见撕裂", enterCase: "进入审判",
    storyTwoTitle: "一次铲球，激怒一个国家",
    storyTwoCopy: "67%的用户认为他毁掉了球队最后的机会。", judgeNow: "立即审判",
    storyThreeTitle: "从替补席走向不朽",
    storyThreeCopy: "第94分钟的进球让他成为今日全球圣徒。", seeVerdict: "查看判决",
    liveRankings: "实时榜单", today: "今天", tournament: "整届赛事",
    manifestoTop: "每一场比赛都会诞生", manifestoBottom: "谁是圣徒，谁是恶人，由全世界决定。",
    castFirst: "投下你的第一票", share: "分享", chooseLanguage: "选择你的语言",
    searchLanguages: "搜索语言", worldAgrees: "的全球用户同意你",
    scanVote: "扫码参与审判", yourVerdict: "你的判决", makeNoise: "让全世界听见。",
    verdictPrefix: "我的判决",
    shareCopy: "把这份判决发给那个认为你错了的人。",
    shareNow: "立即分享", copyLink: "复制链接",
    minoritySaint: "你加入了微弱多数，争论远未结束。",
    minorityVillain: "你站在全球少数派，别退让。",
    copied: "链接已复制。", nextLoaded: "下一案件已加载。",
    fanZoneEyebrow: "球迷战场", fanZoneTitle: "球迷互喷区",
    yourFanId: "你的匿名球迷号", connectingFan: "连接中...",
    commentPlaceholder: "说出你的观点，不服就来辩。",
    postComment: "发布观点", loadingComments: "正在连接球迷现场...",
    commentsEmpty: "还没人开喷，你来打响第一枪。", reply: "回复", like: "赞", shareComment: "分享",
    replyingTo: "正在回复", cancelReply: "取消回复", you: "本人",
    commentReady: "实时评论", commentFailed: "评论区暂时无法连接，请稍后重试。",
    commentTooFast: "发得太快了，稍等片刻再试。", commentLinkCopied: "评论链接已复制。",
  },
  es: {
    navCourt: "Tribunal en vivo", navStories: "Última hora", navRankings: "Clasificación",
    liveNow: "En vivo", breaking: "Urgente",
    ticker: "Final: México 2–0 Sudáfrica · República de Corea 2–1 Chequia",
    groupStage: "Fase de grupos · Partido 18", brazil: "Brasil", morocco: "Marruecos", japan: "Japón",
    mexico: "México", southAfrica: "Sudáfrica", question: "¿CANDIDATO AL TÍTULO O VENTAJA LOCAL?",
    questionDetail: "México abrió el torneo con una victoria verificada por 2–0 ante Sudáfrica.",
    saintSide: "Candidato", villainSide: "Escéptico", absolutely: "FORMA DE CAMPEÓN",
    never: "IMPULSO LOCAL", clearPenalty: "Un comienzo convincente.", robbery: "El anfitrión aún debe demostrar más.",
    verdictRecorded: "Tu veredicto quedó registrado", officialResult: "resultado oficial", verifiedByFifa: "verificado por FIFA",
    worldSplit: "El mundo está dividido", verdicts: "veredictos", shareVerdict: "Compartir veredicto",
    versus: "contra", globalPulse: "Pulso global", countriesLive: "países en vivo",
    sayPenalty: "dicen penalti", nationClash: "Choque de naciones",
    nationCopy: "Estos dos países no podrían discrepar más.", upNext: "A continuación",
    nextQuestion: "¿Quién carga con la culpa?", breakingCourt: "Tribunal urgente",
    worldOnTrial: "El mundo está a juicio.",
    storiesIntro: "Momentos detectados por IA en partidos, fuentes oficiales y conversación global.",
    storyOneTitle: "La decisión que dividió cinco continentes",
    storyOneCopy: "La mayoría cambió de lado tras la repetición.", nationsDivided: "naciones divididas",
    enterCase: "Entrar al caso", storyTwoTitle: "Una entrada. Un país furioso.",
    storyTwoCopy: "El 67% dice que destruyó la última oportunidad.", judgeNow: "Juzgar ahora",
    storyThreeTitle: "Del banquillo a la inmortalidad",
    storyThreeCopy: "Un gol en el 94 lo convirtió en el Santo global.", seeVerdict: "Ver veredicto",
    liveRankings: "Clasificación en vivo", today: "Hoy", tournament: "Torneo",
    manifestoTop: "Cada partido crea", manifestoBottom: "El mundo decide quién es quién.",
    castFirst: "Emite tu primer veredicto", share: "Compartir", chooseLanguage: "Elige tu idioma",
    searchLanguages: "Buscar idiomas", worldAgrees: "del mundo está de acuerdo",
    scanVote: "Escanea para votar", yourVerdict: "Tu veredicto", makeNoise: "Haz ruido.",
    verdictPrefix: "Mi veredicto",
    shareCopy: "Envía este veredicto a quien cree que estás equivocado.",
    shareNow: "Compartir ahora", copyLink: "Copiar enlace",
    minoritySaint: "Te uniste a la estrecha mayoría. La discusión sigue.",
    minorityVillain: "Te uniste a la minoría global. Mantén tu posición.",
    copied: "Enlace copiado.", nextLoaded: "Siguiente caso cargado.",
    fanZoneEyebrow: "GUERRA DE AFICIONES", fanZoneTitle: "Zona de debate",
    yourFanId: "Tu ID anónimo", connectingFan: "Conectando...",
    commentPlaceholder: "Di lo que piensas y defiéndelo.",
    postComment: "Publicar", loadingComments: "Conectando con la grada...",
    commentsEmpty: "Todavía no hay opiniones. Abre el debate.", reply: "Responder", like: "Me gusta", shareComment: "Compartir",
    replyingTo: "Respondiendo a", cancelReply: "Cancelar", you: "TÚ",
    commentReady: "Comentarios en vivo", commentFailed: "Los comentarios no están disponibles.",
    commentTooFast: "Demasiado rápido. Espera un momento.", commentLinkCopied: "Enlace del comentario copiado.",
  },
  ja: {
    navCourt: "ライブ法廷", navStories: "速報", navRankings: "ランキング",
    liveNow: "ライブ中", breaking: "速報",
    ticker: "試合終了：メキシコ 2–0 南アフリカ · 韓国 2–1 チェコ",
    groupStage: "グループステージ · 第18試合", brazil: "ブラジル", morocco: "モロッコ", japan: "日本",
    mexico: "メキシコ", southAfrica: "南アフリカ", question: "優勝候補か、ホームの勢いか？",
    questionDetail: "メキシコは開幕戦で南アフリカに2–0で勝利。FIFA確認済みの結果です。",
    saintSide: "期待派", villainSide: "慎重派", absolutely: "優勝候補",
    never: "ホーム効果", clearPenalty: "説得力のあるスタート。", robbery: "まだ証明すべきことがある。",
    verdictRecorded: "判決を記録しました", officialResult: "公式結果", verifiedByFifa: "FIFA確認済み",
    worldSplit: "世界は真っ二つ", verdicts: "票", shareVerdict: "判決をシェア",
    versus: "対", globalPulse: "世界の反応", countriesLive: "カ国が参加中",
    sayPenalty: "がPKと判断", nationClash: "国別対決",
    nationCopy: "この2カ国の意見は完全に対立。", upNext: "次の審判",
    nextQuestion: "責任を負うべきは誰？", breakingCourt: "速報法廷",
    worldOnTrial: "世界が裁かれる。",
    storiesIntro: "AIがライブ試合、公式情報、世界の会話から急上昇の瞬間を検出。",
    storyOneTitle: "五大陸を分断した判定", storyOneCopy: "リプレイ後、多数派が逆転した。",
    nationsDivided: "カ国で意見が分裂", enterCase: "審判に入る",
    storyTwoTitle: "一度のタックル。国中が激怒。",
    storyTwoCopy: "67%が最後のチャンスを壊したと判断。", judgeNow: "今すぐ裁く",
    storyThreeTitle: "ベンチから伝説へ",
    storyThreeCopy: "94分のゴールで今日の世界的セイントに。", seeVerdict: "判決を見る",
    liveRankings: "ライブランキング", today: "今日", tournament: "大会",
    manifestoTop: "すべての試合が生む", manifestoBottom: "どちらかを決めるのは世界だ。",
    castFirst: "最初の判決を下す", share: "シェア", chooseLanguage: "言語を選択",
    searchLanguages: "言語を検索", worldAgrees: "があなたに同意",
    scanVote: "スキャンして投票", yourVerdict: "あなたの判決", makeNoise: "世界に示せ。",
    verdictPrefix: "私の判決",
    shareCopy: "あなたが間違っていると思う相手に送ろう。",
    shareNow: "今すぐシェア", copyLink: "リンクをコピー",
    minoritySaint: "わずかな多数派に加わりました。議論はまだ続きます。",
    minorityVillain: "世界の少数派です。その立場を貫こう。",
    copied: "リンクをコピーしました。", nextLoaded: "次のケースを読み込みました。",
    fanZoneEyebrow: "ファン討論場", fanZoneTitle: "ファンバトル",
    yourFanId: "匿名ファンID", connectingFan: "接続中...",
    commentPlaceholder: "意見を書いて、反論に備えよう。",
    postComment: "投稿", loadingComments: "ファンルームに接続中...",
    commentsEmpty: "まだ投稿はありません。最初の意見をどうぞ。", reply: "返信", like: "いいね", shareComment: "共有",
    replyingTo: "返信先", cancelReply: "返信を取消", you: "自分",
    commentReady: "ライブコメント", commentFailed: "コメントを読み込めません。",
    commentTooFast: "投稿が速すぎます。少し待ってください。", commentLinkCopied: "コメントリンクをコピーしました。",
  },
  ko: {
    navCourt: "라이브 법정", navStories: "속보", navRankings: "랭킹",
    liveNow: "라이브", breaking: "속보",
    ticker: "경기 종료: 멕시코 2–0 남아공 · 대한민국 2–1 체코",
    groupStage: "조별리그 · 18경기", brazil: "브라질", morocco: "모로코", japan: "일본",
    mexico: "멕시코", southAfrica: "남아프리카공화국", question: "우승 후보인가, 홈 이점인가?",
    questionDetail: "멕시코는 개막전에서 남아공을 2–0으로 이겼으며 FIFA가 확인한 결과입니다.",
    saintSide: "기대", villainSide: "신중", absolutely: "우승 후보",
    never: "홈 효과", clearPenalty: "설득력 있는 출발.", robbery: "아직 더 증명해야 한다.",
    verdictRecorded: "판결이 기록되었습니다", officialResult: "공식 결과", verifiedByFifa: "FIFA 확인",
    worldSplit: "세계가 갈라졌다", verdicts: "표", shareVerdict: "판결 공유",
    versus: "대", globalPulse: "글로벌 반응", countriesLive: "개국 참여 중",
    sayPenalty: "가 페널티킥", nationClash: "국가 대결",
    nationCopy: "두 국가의 의견이 완전히 엇갈립니다.", upNext: "다음 사건",
    nextQuestion: "누가 책임져야 할까?", breakingCourt: "속보 법정",
    worldOnTrial: "세계가 재판대에 올랐다.",
    storiesIntro: "AI가 경기, 공식 소식, 세계의 대화에서 폭발하는 순간을 감지합니다.",
    storyOneTitle: "다섯 대륙을 갈라놓은 판정", storyOneCopy: "리플레이 후 다수 의견이 뒤집혔습니다.",
    nationsDivided: "개국 의견 분열", enterCase: "사건 입장",
    storyTwoTitle: "한 번의 태클. 분노한 국가.",
    storyTwoCopy: "67%가 마지막 기회를 망쳤다고 판단.", judgeNow: "지금 판결",
    storyThreeTitle: "벤치에서 불멸로",
    storyThreeCopy: "94분 골로 오늘의 글로벌 세인트가 되었습니다.", seeVerdict: "판결 보기",
    liveRankings: "실시간 랭킹", today: "오늘", tournament: "대회",
    manifestoTop: "모든 경기는 만든다", manifestoBottom: "누가 누구인지는 세계가 결정한다.",
    castFirst: "첫 판결 내리기", share: "공유", chooseLanguage: "언어 선택",
    searchLanguages: "언어 검색", worldAgrees: "의 세계가 동의",
    scanVote: "스캔하고 투표", yourVerdict: "당신의 판결", makeNoise: "세상에 알려라.",
    verdictPrefix: "나의 판결",
    shareCopy: "당신이 틀렸다고 생각하는 사람에게 보내세요.",
    shareNow: "지금 공유", copyLink: "링크 복사",
    minoritySaint: "근소한 다수에 합류했습니다. 논쟁은 끝나지 않았습니다.",
    minorityVillain: "세계의 소수 편입니다. 입장을 지키세요.",
    copied: "링크가 복사되었습니다.", nextLoaded: "다음 사건을 불러왔습니다.",
    fanZoneEyebrow: "팬 토론장", fanZoneTitle: "팬 배틀",
    yourFanId: "익명 팬 ID", connectingFan: "연결 중...",
    commentPlaceholder: "당신의 의견을 남기고 반론에 답하세요.",
    postComment: "게시", loadingComments: "팬 공간에 연결 중...",
    commentsEmpty: "아직 의견이 없습니다. 첫 논쟁을 시작하세요.", reply: "답글", like: "좋아요", shareComment: "공유",
    replyingTo: "답글 대상", cancelReply: "답글 취소", you: "나",
    commentReady: "실시간 댓글", commentFailed: "댓글을 불러올 수 없습니다.",
    commentTooFast: "너무 빠릅니다. 잠시 후 다시 시도하세요.", commentLinkCopied: "댓글 링크를 복사했습니다.",
  },
};

const fallbackCopy = copy.en;
const SUPABASE_URL = "https://vzbjghfepucqffgzuzdj.supabase.co";
const SUPABASE_KEY = "sb_publishable_dLbm8KnThyH-sch7aGRS0A_q_CEuO6a";
const COMMENT_CASE = "mexico-south-africa-2026";
const state = {
  language: localStorage.getItem("vs-language") || detectLanguage(),
  vote: localStorage.getItem("vs-vote") || null,
};

const languageDialog = document.querySelector("#languageDialog");
const shareDialog = document.querySelector("#shareDialog");
const languageGrid = document.querySelector("#languageGrid");
const languageSearch = document.querySelector("#languageSearch");
const resultPanel = document.querySelector("#resultPanel");
const toast = document.querySelector("#toast");
const commentFeed = document.querySelector("#commentFeed");
const commentStatus = document.querySelector("#commentStatus");
const commentInput = document.querySelector("#commentInput");
const commentSubmit = document.querySelector("#commentSubmit");
const fanId = document.querySelector("#fanId");
const commentForm = document.querySelector("#commentForm");
const commentCount = document.querySelector("#commentCount");
const composerAvatar = document.querySelector("#composerAvatar");
const replyTarget = document.querySelector("#replyTarget");
const replyTargetText = document.querySelector("#replyTargetText");
const cancelReply = document.querySelector("#cancelReply");
let commentsClient;
let commentUser;
let commentProfile;
let comments = [];
let replyingTo = null;
let commentsChannel;
let reloadCommentsTimer;

function detectLanguage() {
  const browser = navigator.language || "en";
  const exact = languages.find((item) => item.code.toLowerCase() === browser.toLowerCase());
  if (exact) return exact.code;
  const base = browser.split("-")[0];
  const partial = languages.find((item) => item.code.split("-")[0] === base);
  return partial?.code || "en";
}

function currentCopy() {
  return copy[state.language] || fallbackCopy;
}

function translate() {
  const selected = languages.find((item) => item.code === state.language) || languages[0];
  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
  document.querySelector("#currentLanguage").textContent = selected.short;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = currentCopy()[key] || fallbackCopy[key] || element.textContent;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = currentCopy()[key] || fallbackCopy[key] || element.placeholder;
  });
  renderLanguages(languageSearch.value);
  updateVoteCopy();
  renderComments();
  updateReplyTarget();
}

function renderLanguages(filter = "") {
  const search = filter.trim().toLocaleLowerCase();
  languageGrid.innerHTML = "";
  languages
    .filter((item) => `${item.name} ${item.region} ${item.code}`.toLocaleLowerCase().includes(search))
    .forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `language-option${item.code === state.language ? " active" : ""}`;
      button.innerHTML = `<strong>${item.name}</strong><small>${item.region}</small>`;
      button.addEventListener("click", () => {
        state.language = item.code;
        localStorage.setItem("vs-language", item.code);
        translate();
        languageDialog.close();
      });
      languageGrid.appendChild(button);
    });
}

function castVote(choice) {
  state.vote = choice;
  localStorage.setItem("vs-vote", choice);

  document.querySelectorAll(".vote-option").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.vote === choice ? "true" : "false");
    button.style.opacity = button.dataset.vote === choice ? "1" : "0.48";
  });
  updateVoteCopy();
  resultPanel.classList.add("visible");
  if (window.innerWidth < 720) {
    setTimeout(() => resultPanel.scrollIntoView({ behavior: "smooth", block: "center" }), 240);
  }
}

function updateVoteCopy() {
  const choice = state.vote === "villain" ? currentCopy().never : currentCopy().absolutely;
  const isCjk = /^(zh|ja|ko)/.test(state.language);
  document.querySelector("#posterChoice").textContent =
    `${currentCopy().verdictPrefix || fallbackCopy.verdictPrefix}${isCjk ? "：" : ": "}` +
    `${isCjk ? choice : choice.toUpperCase()}${isCjk ? "。" : "."}`;
}

function openShare() {
  if (!state.vote) castVote("saint");
  shareDialog.showModal();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("visible"), 2200);
}

async function shareCurrentVerdict() {
  const shareData = {
    title: "VileSaint — Cast Your Verdict",
    text: `${currentCopy().question} ${state.vote === "villain" ? currentCopy().never : currentCopy().absolutely}`,
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  await copyCurrentLink();
}

async function copyCurrentLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    document.querySelector("#copyStatus").textContent = currentCopy().copied;
    showToast(currentCopy().copied);
  } catch {
    document.querySelector("#copyStatus").textContent = window.location.href;
  }
}

function getDeviceClass() {
  const shortestSide = Math.min(window.screen.width, window.screen.height);
  if (shortestSide < 600) return "mobile";
  if (shortestSide < 1024 || navigator.maxTouchPoints > 1) return "tablet";
  return "desktop";
}

function setCommentStatus(message, failed = false) {
  commentStatus.textContent = message;
  commentStatus.classList.toggle("failed", failed);
}

function relativeTime(dateString) {
  const seconds = Math.round((new Date(dateString).getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat(state.language, { numeric: "auto" });
  if (Math.abs(seconds) < 60) return formatter.format(seconds, "second");
  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) return formatter.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return formatter.format(hours, "hour");
  return formatter.format(Math.round(hours / 24), "day");
}

function makeActionButton(label, className, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

function renderCommentCard(comment, isReply = false) {
  const card = document.createElement("article");
  card.className = `comment-card${isReply ? " reply" : ""}`;
  card.id = `comment-${comment.id}`;

  const avatar = document.createElement("div");
  avatar.className = "comment-avatar";
  avatar.textContent = comment.fanTag.slice(-2);

  const content = document.createElement("div");
  const meta = document.createElement("div");
  meta.className = "comment-meta";
  const author = document.createElement("strong");
  author.textContent = comment.fanTag;
  meta.append(author);
  if (comment.author_id === commentUser?.id) {
    const badge = document.createElement("span");
    badge.className = "you-badge";
    badge.textContent = currentCopy().you;
    meta.append(badge);
  }
  const time = document.createElement("time");
  time.dateTime = comment.created_at;
  time.textContent = relativeTime(comment.created_at);
  meta.append(time);

  const body = document.createElement("p");
  body.className = "comment-body";
  body.textContent = comment.body;

  const actions = document.createElement("div");
  actions.className = "comment-actions";
  actions.append(
    makeActionButton(`${currentCopy().reply} ↩`, "reply-action", () => beginReply(comment)),
    makeActionButton(
      `♥ ${comment.likes.length || ""}`.trim(),
      `like-action${comment.likes.includes(commentUser?.id) ? " liked" : ""}`,
      () => toggleCommentLike(comment)
    ),
    makeActionButton(`${currentCopy().shareComment} ↗`, "share-comment-action", () => shareComment(comment))
  );
  content.append(meta, body, actions);
  card.append(avatar, content);
  return card;
}

async function shareComment(comment) {
  const url = new URL(window.location.href);
  url.hash = `comment-${comment.id}`;
  const shareData = {
    title: `${comment.fanTag} · VileSaint`,
    text: `"${comment.body.slice(0, 140)}"`,
    url: url.toString(),
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(url.toString());
    showToast(currentCopy().commentLinkCopied);
  } catch {
    showToast(url.toString());
  }
}

function focusSharedComment() {
  if (!location.hash.startsWith("#comment-")) return;
  const target = document.querySelector(location.hash);
  if (!target) return;
  target.classList.add("shared-comment");
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => target.classList.remove("shared-comment"), 4200);
}

function renderComments() {
  if (!commentFeed) return;
  commentFeed.replaceChildren();
  if (!comments.length) {
    const empty = document.createElement("div");
    empty.className = "comment-empty";
    empty.textContent = currentCopy().commentsEmpty;
    commentFeed.append(empty);
    return;
  }

  const roots = comments.filter((comment) => comment.parent_id === null);
  roots.forEach((root) => {
    const thread = document.createElement("div");
    thread.className = "comment-thread";
    thread.append(renderCommentCard(root));
    comments
      .filter((comment) => comment.parent_id === root.id)
      .forEach((reply) => thread.append(renderCommentCard(reply, true)));
    commentFeed.append(thread);
  });
}

function updateComposerState() {
  const length = commentInput.value.length;
  commentCount.textContent = length;
  commentSubmit.disabled = !commentUser || !commentInput.value.trim() || length > 500;
}

function updateReplyTarget() {
  if (!replyTarget) return;
  const target = comments.find((comment) => comment.id === replyingTo);
  replyTarget.hidden = !target;
  if (target) replyTargetText.textContent = `${currentCopy().replyingTo} @${target.fanTag}`;
  cancelReply.setAttribute("aria-label", currentCopy().cancelReply);
}

function beginReply(comment) {
  replyingTo = comment.parent_id || comment.id;
  updateReplyTarget();
  commentInput.focus();
}

function clearReply() {
  replyingTo = null;
  updateReplyTarget();
}

async function loadComments() {
  const { data: rows, error } = await commentsClient
    .from("comments")
    .select("id, case_slug, author_id, parent_id, body, created_at")
    .eq("case_slug", COMMENT_CASE)
    .order("created_at", { ascending: true })
    .limit(250);
  if (error) throw error;

  const authorIds = [...new Set(rows.map((row) => row.author_id))];
  const commentIds = rows.map((row) => row.id);
  const [profilesResult, likesResult] = await Promise.all([
    authorIds.length
      ? commentsClient.from("fan_profiles").select("user_id, fan_tag").in("user_id", authorIds)
      : Promise.resolve({ data: [], error: null }),
    commentIds.length
      ? commentsClient.from("comment_likes").select("comment_id, user_id").in("comment_id", commentIds)
      : Promise.resolve({ data: [], error: null }),
  ]);
  if (profilesResult.error) throw profilesResult.error;
  if (likesResult.error) throw likesResult.error;

  const tags = new Map(profilesResult.data.map((profile) => [profile.user_id, profile.fan_tag]));
  comments = rows.map((row) => ({
    ...row,
    fanTag: tags.get(row.author_id) || "VS-??????",
    likes: likesResult.data.filter((like) => like.comment_id === row.id).map((like) => like.user_id),
  }));
  renderComments();
  setCommentStatus(`${currentCopy().commentReady} · ${comments.length}`);
  focusSharedComment();
}

function scheduleCommentsReload() {
  clearTimeout(reloadCommentsTimer);
  reloadCommentsTimer = setTimeout(() => loadComments().catch(handleCommentError), 250);
}

async function toggleCommentLike(comment) {
  if (!commentUser) return;
  const liked = comment.likes.includes(commentUser.id);
  const query = commentsClient.from("comment_likes");
  const { error } = liked
    ? await query.delete().eq("comment_id", comment.id).eq("user_id", commentUser.id)
    : await query.insert({ comment_id: comment.id, user_id: commentUser.id });
  if (error) return handleCommentError(error);
  scheduleCommentsReload();
}

function handleCommentError(error) {
  console.error("VileSaint comments:", error);
  const message = /rate|too many|duplicate/i.test(error?.message || "")
    ? currentCopy().commentTooFast
    : currentCopy().commentFailed;
  setCommentStatus(message, true);
}

async function submitComment(event) {
  event.preventDefault();
  const body = commentInput.value.trim();
  if (!commentUser || !body) return;
  commentSubmit.disabled = true;
  const { error } = await commentsClient.from("comments").insert({
    case_slug: COMMENT_CASE,
    author_id: commentUser.id,
    parent_id: replyingTo,
    body,
  });
  if (error) {
    handleCommentError(error);
    updateComposerState();
    return;
  }
  commentInput.value = "";
  clearReply();
  updateComposerState();
  await loadComments().catch(handleCommentError);
}

async function getFanProfile() {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const { data, error } = await commentsClient
      .from("fan_profiles")
      .select("user_id, fan_tag")
      .eq("user_id", commentUser.id)
      .maybeSingle();
    if (error) throw error;
    if (data) return data;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error("Fan profile was not created");
}

async function initComments() {
  if (!window.supabase?.createClient) {
    handleCommentError(new Error("Supabase client unavailable"));
    return;
  }
  commentsClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  });

  let { data: sessionData } = await commentsClient.auth.getSession();
  if (!sessionData.session) {
    const { data, error } = await commentsClient.auth.signInAnonymously();
    if (error) throw error;
    sessionData = data;
  }
  commentUser = sessionData.session?.user || sessionData.user;
  if (!commentUser) throw new Error("Anonymous session unavailable");

  commentProfile = await getFanProfile();
  fanId.textContent = commentProfile.fan_tag;
  composerAvatar.textContent = commentProfile.fan_tag.slice(-2);
  updateComposerState();

  await commentsClient
    .from("fan_profiles")
    .update({
      language: state.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      device_class: getDeviceClass(),
      last_seen_at: new Date().toISOString(),
    })
    .eq("user_id", commentUser.id);

  await loadComments();
  commentsChannel = commentsClient
    .channel(`comments:${COMMENT_CASE}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "comments", filter: `case_slug=eq.${COMMENT_CASE}` }, scheduleCommentsReload)
    .on("postgres_changes", { event: "*", schema: "public", table: "comment_likes" }, scheduleCommentsReload)
    .subscribe();
}

function setActiveNavigation() {
  const links = [...document.querySelectorAll(".desktop-nav a, .mobile-nav a")];
  const sections = ["court", "stories", "rankings"];
  const active = sections
    .map((id) => document.querySelector(`#${id}`))
    .filter(Boolean)
    .reduce((current, section) => {
      const distance = Math.abs(section.getBoundingClientRect().top - 120);
      return distance < current.distance ? { id: section.id, distance } : current;
    }, { id: "court", distance: Infinity }).id;

  links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${active}`));
}

document.querySelector("#languageTrigger").addEventListener("click", () => languageDialog.showModal());
languageSearch.addEventListener("input", (event) => renderLanguages(event.target.value));
document.querySelectorAll(".vote-option").forEach((button) =>
  button.addEventListener("click", () => castVote(button.dataset.vote))
);
document.querySelector("#shareButton").addEventListener("click", openShare);
document.querySelector("#mobileShare").addEventListener("click", openShare);
document.querySelector("#shareClose").addEventListener("click", () => shareDialog.close());
document.querySelector("#nativeShare").addEventListener("click", shareCurrentVerdict);
document.querySelector("#copyLink").addEventListener("click", copyCurrentLink);
document.querySelector("#nextCase").addEventListener("click", () => {
  showToast(currentCopy().nextLoaded);
  document.querySelector("#stories").scrollIntoView({ behavior: "smooth" });
});
document.querySelectorAll(".story-link").forEach((button) =>
  button.addEventListener("click", () => document.querySelector("#court").scrollIntoView({ behavior: "smooth" }))
);
document.querySelectorAll(".ranking-tabs button").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelectorAll(".ranking-tabs button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  })
);
window.addEventListener("scroll", setActiveNavigation, { passive: true });
window.addEventListener("hashchange", focusSharedComment);
commentInput.addEventListener("input", updateComposerState);
commentForm.addEventListener("submit", submitComment);
cancelReply.addEventListener("click", clearReply);
window.addEventListener("beforeunload", () => {
  if (commentsChannel) commentsClient.removeChannel(commentsChannel);
});

translate();
if (state.vote) castVote(state.vote);
initComments().catch(handleCommentError);
