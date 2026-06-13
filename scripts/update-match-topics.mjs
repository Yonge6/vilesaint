import { readFile, writeFile } from "node:fs/promises";

const TOPICS_PATH = new URL("../data/topics.json", import.meta.url);
const SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
const TEAM_ZH = {
  Australia: "澳大利亚",
  Brazil: "巴西",
  "Curaçao": "库拉索",
  Czechia: "捷克",
  Ecuador: "厄瓜多尔",
  France: "法国",
  Germany: "德国",
  Haiti: "海地",
  "Ivory Coast": "科特迪瓦",
  Japan: "日本",
  Mexico: "墨西哥",
  Morocco: "摩洛哥",
  Netherlands: "荷兰",
  Portugal: "葡萄牙",
  Qatar: "卡塔尔",
  Scotland: "苏格兰",
  "South Africa": "南非",
  Spain: "西班牙",
  Switzerland: "瑞士",
  Sweden: "瑞典",
  Tunisia: "突尼斯",
  Turkey: "土耳其",
  "Türkiye": "土耳其",
};

function dateKey(date) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

async function getEvents(date) {
  const response = await fetch(`${SCOREBOARD_URL}?dates=${dateKey(date)}`);
  if (!response.ok) throw new Error(`Scoreboard returned ${response.status}`);
  const payload = await response.json();
  return payload.events || [];
}

function translateTeam(name) {
  return TEAM_ZH[name] || name;
}

function eventToTopic(event) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors || [];
  const home = competitors.find((item) => item.homeAway === "home") || competitors[0];
  const away = competitors.find((item) => item.homeAway === "away") || competitors[1];
  if (!home || !away) return null;

  const state = event.status?.type?.state;
  const completed = Boolean(event.status?.type?.completed);
  const live = state === "in";
  const status = completed ? "FINAL" : live ? "LIVE" : "UPCOMING";
  const category = completed ? "final" : live ? "live" : "prematch";
  const homeName = home.team?.displayName || "Home";
  const awayName = away.team?.displayName || "Away";
  const homeZh = translateTeam(homeName);
  const awayZh = translateTeam(awayName);
  const score = `${home.score || "0"}–${away.score || "0"}`;

  return {
    slug: `match-${event.id}`,
    external_event_id: String(event.id),
    generated: true,
    source: "ESPN scoreboard",
    category,
    theme_mode: "back",
    status,
    verified: false,
    subject: `${homeZh} vs ${awayZh}`,
    subject_en: `${homeName} vs ${awayName}`,
    initials: `${home.team?.abbreviation || "H"}${away.team?.abbreviation || "A"}`.slice(0, 3),
    question: completed ? "这场比赛，谁的表现更令人信服？" : live ? "比赛正在进行，你现在看好谁？" : "你看好谁拿下这场比赛？",
    question_en: completed ? "Who impressed you more in this match?" : live ? "The match is live. Who do you back now?" : "Who do you back to win this match?",
    fact: completed
      ? `${homeZh} ${score} ${awayZh}。结果来自实时比分数据源，等待官方复核。`
      : live
        ? `${homeZh} ${score} ${awayZh}，比赛进行中。数据将持续刷新。`
        : `计划开球时间：${new Date(event.date).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}。`,
    fact_en: completed
      ? `${homeName} ${score} ${awayName}. Scoreboard result pending official verification.`
      : live
        ? `${homeName} ${score} ${awayName}. The match is live and updating.`
        : `Scheduled kickoff: ${new Date(event.date).toLocaleString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })} ET.`,
    left: homeZh,
    left_en: homeName,
    right: awayZh,
    right_en: awayName,
    match: completed ? `${homeZh} ${score} ${awayZh}` : live ? `直播 · ${score}` : "赛前预测",
    match_en: completed ? `${homeName} ${score} ${awayName}` : live ? `LIVE · ${score}` : "Pre-match prediction",
    kickoff_at: event.date,
    priority: live ? 120 : completed ? 92 : 86
  };
}

const current = JSON.parse(await readFile(TOPICS_PATH, "utf8"));
const now = new Date();
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const events = [...await getEvents(now), ...await getEvents(tomorrow)];
const uniqueEvents = [...new Map(events.map((event) => [event.id, event])).values()];
const generated = uniqueEvents.map(eventToTopic).filter(Boolean);
const generatedIds = new Set(generated.map((topic) => topic.external_event_id));
const editorial = current.topics.filter((topic) =>
  !topic.generated && (!topic.external_event_id || !generatedIds.has(String(topic.external_event_id)))
);
const nextTopics = [...generated, ...editorial].sort((a, b) => b.priority - a.priority);

const comparableCurrent = JSON.stringify(current.topics);
const comparableNext = JSON.stringify(nextTopics);
if (comparableCurrent !== comparableNext) {
  const next = {
    updated_at: new Date().toISOString(),
    source_note: "Live match states use a scoreboard feed. VERIFIED is reserved for facts checked against official sources.",
    topics: nextTopics,
  };
  await writeFile(TOPICS_PATH, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`Updated ${nextTopics.length} topics.`);
} else {
  console.log("No match-state changes.");
}
