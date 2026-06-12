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
    ticker: "The verdict just flipped — 41 countries are voting right now",
    groupStage: "Group stage · Match 18", brazil: "Brazil", morocco: "Morocco", japan: "Japan",
    question: "Was that really a penalty?",
    questionDetail: "The referee pointed to the spot after a late challenge. VAR upheld the call.",
    saintSide: "Saint side", villainSide: "Villain side", absolutely: "Absolutely",
    never: "Never", clearPenalty: "Clear penalty. No debate.", robbery: "A robbery in plain sight.",
    worldSplit: "The world is split", verdicts: "verdicts", shareVerdict: "Share verdict",
    versus: "versus", globalPulse: "Global pulse", countriesLive: "countries live",
    sayPenalty: "say penalty", nationClash: "Nation clash",
    nationCopy: "These two nations could not disagree more.", upNext: "Up next",
    nextQuestion: "Who is carrying the blame?", breakingCourt: "Breaking court",
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
    shareCopy: "Send this verdict to someone who thinks you're wrong.",
    shareNow: "Share now", copyLink: "Copy link",
    minoritySaint: "You joined the narrow majority. The argument is far from over.",
    minorityVillain: "You joined the global minority. Stand your ground.",
    copied: "Link copied to clipboard.", nextLoaded: "Next case loaded.",
  },
  "zh-CN": {
    navCourt: "实时审判", navStories: "爆点", navRankings: "榜单",
    liveNow: "正在直播", breaking: "突发",
    ticker: "全球判决刚刚反转，41个国家正在投票",
    groupStage: "小组赛 · 第18场", brazil: "巴西", morocco: "摩洛哥", japan: "日本",
    question: "这真的是点球吗？",
    questionDetail: "一次禁区内的迟到铲抢后，裁判指向点球点，VAR维持原判。",
    saintSide: "圣徒阵营", villainSide: "恶人阵营", absolutely: "绝对是",
    never: "绝对不是", clearPenalty: "明确的点球，毫无争议。", robbery: "这是明目张胆的误判。",
    worldSplit: "全球意见撕裂", verdicts: "次判决", shareVerdict: "分享判决",
    versus: "对阵", globalPulse: "全球脉搏", countriesLive: "个国家在线",
    sayPenalty: "认为是点球", nationClash: "国家对撞",
    nationCopy: "这两个国家的意见完全相反。", upNext: "下一案",
    nextQuestion: "谁应该为此背锅？", breakingCourt: "实时爆点",
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
    shareCopy: "把这份判决发给那个认为你错了的人。",
    shareNow: "立即分享", copyLink: "复制链接",
    minoritySaint: "你加入了微弱多数，争论远未结束。",
    minorityVillain: "你站在全球少数派，别退让。",
    copied: "链接已复制。", nextLoaded: "下一案件已加载。",
  },
  es: {
    navCourt: "Tribunal en vivo", navStories: "Última hora", navRankings: "Clasificación",
    liveNow: "En vivo", breaking: "Urgente",
    ticker: "El veredicto acaba de cambiar — 41 países están votando",
    groupStage: "Fase de grupos · Partido 18", brazil: "Brasil", morocco: "Marruecos", japan: "Japón",
    question: "¿DE VERDAD FUE PENALTI?",
    questionDetail: "El árbitro señaló el punto tras una entrada tardía. El VAR confirmó la decisión.",
    saintSide: "Lado santo", villainSide: "Lado villano", absolutely: "Sin duda",
    never: "Jamás", clearPenalty: "Penalti claro. Sin discusión.", robbery: "Un robo a plena vista.",
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
    shareCopy: "Envía este veredicto a quien cree que estás equivocado.",
    shareNow: "Compartir ahora", copyLink: "Copiar enlace",
    minoritySaint: "Te uniste a la estrecha mayoría. La discusión sigue.",
    minorityVillain: "Te uniste a la minoría global. Mantén tu posición.",
    copied: "Enlace copiado.", nextLoaded: "Siguiente caso cargado.",
  },
  ja: {
    navCourt: "ライブ法廷", navStories: "速報", navRankings: "ランキング",
    liveNow: "ライブ中", breaking: "速報",
    ticker: "判決が逆転 — 現在41カ国が投票中",
    groupStage: "グループステージ · 第18試合", brazil: "ブラジル", morocco: "モロッコ", japan: "日本",
    question: "本当にPKだった？",
    questionDetail: "遅れたタックルの後、主審はPKを宣告。VARも判定を支持した。",
    saintSide: "セイント側", villainSide: "ヴィラン側", absolutely: "間違いない",
    never: "絶対に違う", clearPenalty: "明らかなPK。議論の余地なし。", robbery: "目の前で起きた誤審。",
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
    shareCopy: "あなたが間違っていると思う相手に送ろう。",
    shareNow: "今すぐシェア", copyLink: "リンクをコピー",
    minoritySaint: "わずかな多数派に加わりました。議論はまだ続きます。",
    minorityVillain: "世界の少数派です。その立場を貫こう。",
    copied: "リンクをコピーしました。", nextLoaded: "次のケースを読み込みました。",
  },
  ko: {
    navCourt: "라이브 법정", navStories: "속보", navRankings: "랭킹",
    liveNow: "라이브", breaking: "속보",
    ticker: "판결이 뒤집혔습니다 — 현재 41개국이 투표 중",
    groupStage: "조별리그 · 18경기", brazil: "브라질", morocco: "모로코", japan: "일본",
    question: "정말 페널티킥이었을까?",
    questionDetail: "늦은 태클 후 주심이 페널티킥을 선언했고 VAR도 판정을 유지했습니다.",
    saintSide: "세인트 편", villainSide: "빌런 편", absolutely: "명백하다",
    never: "절대 아니다", clearPenalty: "논쟁의 여지 없는 페널티킥.", robbery: "눈앞에서 벌어진 오심.",
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
    shareCopy: "당신이 틀렸다고 생각하는 사람에게 보내세요.",
    shareNow: "지금 공유", copyLink: "링크 복사",
    minoritySaint: "근소한 다수에 합류했습니다. 논쟁은 끝나지 않았습니다.",
    minorityVillain: "세계의 소수 편입니다. 입장을 지키세요.",
    copied: "링크가 복사되었습니다.", nextLoaded: "다음 사건을 불러왔습니다.",
  },
};

const fallbackCopy = copy.en;
const state = {
  language: localStorage.getItem("vs-language") || detectLanguage(),
  vote: localStorage.getItem("vs-vote") || null,
  saint: 51,
  villain: 49,
  total: 4892771,
};

const languageDialog = document.querySelector("#languageDialog");
const shareDialog = document.querySelector("#shareDialog");
const languageGrid = document.querySelector("#languageGrid");
const languageSearch = document.querySelector("#languageSearch");
const resultPanel = document.querySelector("#resultPanel");
const toast = document.querySelector("#toast");

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
  state.total += 1;

  if (choice === "saint") {
    state.saint = 51;
    state.villain = 49;
  } else {
    state.saint = 50;
    state.villain = 50;
  }

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
  document.querySelector("#totalVotes").textContent = state.total.toLocaleString();
  document.querySelector("#saintPercent").textContent = state.saint;
  document.querySelector("#villainPercent").textContent = state.villain;
  document.querySelector("#saintBar").style.width = `${state.saint}%`;
  document.querySelector("#villainBar").style.width = `${state.villain}%`;
  document.querySelector(".split-bar i").style.left = `${state.saint}%`;
  document.querySelector("#minorityCopy").textContent =
    state.vote === "villain" ? currentCopy().minorityVillain : currentCopy().minoritySaint;
  document.querySelector("#posterChoice").textContent =
    state.vote === "villain"
      ? `I SAID: ${currentCopy().never.toUpperCase()}.`
      : `I SAID: ${currentCopy().absolutely.toUpperCase()}.`;
  document.querySelector(".poster-result strong").textContent =
    state.vote === "villain" ? `${state.villain}%` : `${state.saint}%`;
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

translate();
if (state.vote) castVote(state.vote);
