const STORAGE_KEY = "sora_guild_app_dev";
const QUESTS_KEY = "sora_guild_app_quests_dev";
const LEGACY_CUSTOM_QUESTS_KEY = "sora_guild_app_custom_quests_dev";
const REWARDS_KEY = "sora_guild_app_rewards_dev";
const REWARD_HISTORY_KEY = "sora_guild_app_reward_history_dev";
const NOTIFY_URL = "https://script.google.com/macros/s/AKfycbzPl6o5pJGvx_3F2GGuGz7PbC1ZmYKUnz9ewcx_F_hr1s7uEQmeNmDn-vZK2hQMUa13Dg/exec";
const isTestMode = false;
const PARENT_PIN = "1234";

const defaultProgress = {
  name: "そら",
  xp: 0,
  gold: 0,
  completedQuestIds: [],
  streak: {
    current: 0,
    best: 0,
    lastCompletedDate: "",
  },
  activityLog: [],
  titleHistory: [],
};

const defaultQuests = [
  {
    id: "homework",
    type: "normal",
    title: "宿題を終える",
    description: "今日の宿題を最後まで片づける。",
    xpReward: 40,
    goldReward: 30,
  },
  {
    id: "reading",
    type: "normal",
    title: "音読をする",
    description: "声に出して読み、聞いてもらう。",
    xpReward: 30,
    goldReward: 20,
  },
  {
    id: "help",
    type: "normal",
    title: "お手伝いをする",
    description: "家の中で一つ、誰かの助けになる。",
    xpReward: 35,
    goldReward: 25,
  },
];

const TITLES = [
  { level: 1, name: "一歩目の見習い", desc: "はじめての挑戦をした" },
  { level: 2, name: "小さな挑戦者", desc: "少しずつ行動を始めた" },
  { level: 3, name: "がんばりの芽", desc: "努力のタネが芽を出した" },
  { level: 4, name: "はじめの一歩", desc: "自分で動き出せた" },
  { level: 5, name: "ちいさな勇気", desc: "ちょっとの勇気を出せた" },
  { level: 6, name: "習慣のたね", desc: "続ける力が生まれ始めた" },
  { level: 7, name: "やる気の光", desc: "前向きな気持ちが見えてきた" },
  { level: 8, name: "コツコツの達人", desc: "少しずつ積み重ねている" },
  { level: 9, name: "つづける人", desc: "続ける力が身についてきた" },
  { level: 10, name: "ちいさな努力家", desc: "毎日の努力ができている" },
  { level: 11, name: "学びの旅人", desc: "学ぶことを楽しみ始めた" },
  { level: 12, name: "できた！コレクター", desc: "小さな成功を集めている" },
  { level: 13, name: "まいにち冒険者", desc: "日々の挑戦を続けている" },
  { level: 14, name: "おてつだいの風", desc: "周りを助ける力が出てきた" },
  { level: 15, name: "生活の守り手", desc: "生活を整える意識がある" },
  { level: 16, name: "コツコツ騎士見習い", desc: "継続する強さを持ち始めた" },
  { level: 17, name: "がんばりの戦士", desc: "努力することが習慣に" },
  { level: 18, name: "時間の使い手", desc: "時間を意識し始めた" },
  { level: 19, name: "整えの使者", desc: "身の回りを整えられる" },
  { level: 20, name: "しっかり者の芽", desc: "責任感が育ってきた" },
  { level: 21, name: "学びの騎士", desc: "勉強に向き合えるようになった" },
  { level: 22, name: "習慣マスター見習い", desc: "良い習慣が増えている" },
  { level: 23, name: "ちからをためる者", desc: "自分の力を育てている" },
  { level: 24, name: "やさしさの剣士", desc: "人に優しくできる" },
  { level: 25, name: "バランスの旅人", desc: "勉強と生活を両立できる" },
  { level: 26, name: "コツコツの騎士", desc: "積み重ねが安定してきた" },
  { level: 27, name: "続ける勇者の卵", desc: "勇者への一歩を踏み出した" },
  { level: 28, name: "自分に勝つ者", desc: "自分の弱さに負けない" },
  { level: 29, name: "ていねいの達人", desc: "丁寧に取り組める" },
  { level: 30, name: "小さなリーダー", desc: "自分で考えて動ける" },
  { level: 31, name: "学びの守護者", desc: "学びを大切にできる" },
  { level: 32, name: "習慣の守り手", desc: "良い習慣を守れる" },
  { level: 33, name: "おてつだい騎士", desc: "家のことに貢献している" },
  { level: 34, name: "生活マスター見習い", desc: "日常を整える力がある" },
  { level: 35, name: "まじめな冒険者", desc: "コツコツ努力を続ける" },
  { level: 36, name: "自分育ての達人", desc: "自分を成長させている" },
  { level: 37, name: "やりぬく者", desc: "最後までやりきれる" },
  { level: 38, name: "きちんと勇者", desc: "ルールを守れる" },
  { level: 39, name: "しっかり騎士", desc: "安定した行動ができる" },
  { level: 40, name: "努力の守護騎士", desc: "努力を続ける力が強い" },
  { level: 41, name: "学びの賢者見習い", desc: "学びを理解し始めた" },
  { level: 42, name: "習慣の賢者見習い", desc: "良い流れができている" },
  { level: 43, name: "自立の冒険者", desc: "自分で考えて行動できる" },
  { level: 44, name: "前向きの騎士", desc: "気持ちを切り替えられる" },
  { level: 45, name: "成長の戦士", desc: "どんどん成長している" },
  { level: 46, name: "生活の達人", desc: "生活習慣が整っている" },
  { level: 47, name: "時間の賢者", desc: "時間管理ができる" },
  { level: 48, name: "継続の達人", desc: "続ける力が強い" },
  { level: 49, name: "努力の英雄見習い", desc: "大きな努力を続けている" },
  { level: 50, name: "半分の達成者", desc: "ここまでよく頑張った" },
  { level: 51, name: "努力の騎士団員", desc: "仲間として頼れる存在" },
  { level: 52, name: "学びの探求者", desc: "深く考える力がある" },
  { level: 53, name: "しっかりリーダー", desc: "周りを引っ張れる" },
  { level: 54, name: "生活の守護者", desc: "良い習慣を守り続ける" },
  { level: 55, name: "コツコツ英雄の芽", desc: "英雄への成長途中" },
  { level: 56, name: "やりきりの達人", desc: "途中で投げない強さ" },
  { level: 57, name: "自信の戦士", desc: "自分を信じている" },
  { level: 58, name: "習慣の達人", desc: "良い習慣が完成してきた" },
  { level: 59, name: "努力の賢者", desc: "努力の意味を理解している" },
  { level: 60, name: "強い心の騎士", desc: "心が折れにくい" },
  { level: 61, name: "学びの賢者", desc: "深く理解できる" },
  { level: 62, name: "成長の守護者", desc: "成長を支えられる" },
  { level: 63, name: "自立の達人", desc: "自分で進める力がある" },
  { level: 64, name: "時間の達人", desc: "効率よく動ける" },
  { level: 65, name: "努力の英雄", desc: "努力が大きな力に" },
  { level: 66, name: "習慣の英雄", desc: "良い生活が完成" },
  { level: 67, name: "継続の英雄", desc: "続ける力が最強に" },
  { level: 68, name: "前向きの英雄", desc: "どんな時も前を向く" },
  { level: 69, name: "学びの英雄", desc: "学ぶ力が高い" },
  { level: 70, name: "信頼の騎士団長", desc: "周りから信頼される" },
  { level: 71, name: "成長の賢者", desc: "成長の意味を理解" },
  { level: 72, name: "自立の英雄", desc: "自分の力で進める" },
  { level: 73, name: "努力の王子", desc: "高い努力を続ける" },
  { level: 74, name: "習慣の王子", desc: "完璧に習慣化できた" },
  { level: 75, name: "バランスの英雄", desc: "全てをバランスよく" },
  { level: 76, name: "学びの王", desc: "知識を使いこなす" },
  { level: 77, name: "努力の王", desc: "努力の頂点へ近づく" },
  { level: 78, name: "継続の王", desc: "続ける力が極まる" },
  { level: 79, name: "生活の王", desc: "理想的な生活を送る" },
  { level: 80, name: "自立の王", desc: "完全に自立した存在" },
  { level: 81, name: "成長の王", desc: "常に成長し続ける" },
  { level: 82, name: "習慣の王", desc: "完璧な習慣の持ち主" },
  { level: 83, name: "学びの伝承者", desc: "学びを伝えられる" },
  { level: 84, name: "努力の伝承者", desc: "努力を教えられる" },
  { level: 85, name: "生活の伝承者", desc: "良い生活を広げる" },
  { level: 86, name: "継続の伝説", desc: "続ける力が伝説級" },
  { level: 87, name: "学びの伝説", desc: "学びの頂点" },
  { level: 88, name: "成長の伝説", desc: "成長し続ける存在" },
  { level: 89, name: "自立の伝説", desc: "自分で道を切り開く" },
  { level: 90, name: "習慣の伝説", desc: "完璧な日常" },
  { level: 91, name: "努力の伝説", desc: "努力の象徴" },
  { level: 92, name: "みんなのヒーロー", desc: "周りに良い影響を与える" },
  { level: 93, name: "光の冒険王", desc: "明るく導く存在" },
  { level: 94, name: "希望の守護者", desc: "希望を与える存在" },
  { level: 95, name: "未来の導き手", desc: "周りを導く力" },
  { level: 96, name: "伝説の勇者", desc: "誰もが認める存在" },
  { level: 97, name: "大いなる英雄", desc: "大きな影響力を持つ" },
  { level: 98, name: "光の英雄王", desc: "みんなの憧れ" },
  { level: 99, name: "最高の冒険者", desc: "全てをやりきった" },
  { level: 100, name: "伝説のギルドマスター", desc: "仲間を導く最高の存在" },
];

const characterStages = [
  {
    minLevel: 1,
    src: "assets/characters/novice.png",
  },
  {
    minLevel: 5,
    src: "assets/characters/apprentice.png",
  },
  {
    minLevel: 10,
    src: "assets/characters/adept.png",
  },
  {
    minLevel: 15,
    src: "assets/characters/veteran.png",
  },
  {
    minLevel: 20,
    src: "assets/characters/hero.png",
  },
];

let progress = loadProgress();
let managedQuests = loadManagedQuests();
let rewards = loadRewards();
let rewardHistory = loadRewardHistory();
let rewardToastTimer;
let clearToastTimer;
let levelUpTimer;
let evolutionTimer;
let xpChangeTimer;
let pendingXpAnimationStart = null;
let currentCharacterSrc = "";
let currentTitleName = "";
let isParentUnlocked = false;
let isParentMode = false;
let editingQuestId = null;
let editingRewardId = null;
let isQuestCreateOpen = false;

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...defaultProgress };
    }

    const parsed = JSON.parse(stored);
    return {
      ...defaultProgress,
      ...parsed,
      completedQuestIds: Array.isArray(parsed.completedQuestIds) ? parsed.completedQuestIds : [],
      xp: Number.isFinite(parsed.xp) ? parsed.xp : defaultProgress.xp,
      gold: Number.isFinite(parsed.gold) ? parsed.gold : defaultProgress.gold,
      streak: normalizeStreak(parsed.streak),
      activityLog: Array.isArray(parsed.activityLog) ? parsed.activityLog.map(normalizeActivityLogItem).filter(Boolean) : [],
      titleHistory: Array.isArray(parsed.titleHistory) ? parsed.titleHistory.map(normalizeTitleHistoryItem).filter(Boolean) : [],
    };
  } catch {
    return { ...defaultProgress };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayDifference(fromDateKey, toDateKey) {
  const fromParts = String(fromDateKey).split("-").map(Number);
  const toParts = String(toDateKey).split("-").map(Number);
  if (fromParts.length !== 3 || toParts.length !== 3 || fromParts.some(Number.isNaN) || toParts.some(Number.isNaN)) {
    return Number.POSITIVE_INFINITY;
  }

  const fromDate = new Date(fromParts[0], fromParts[1] - 1, fromParts[2]);
  const toDate = new Date(toParts[0], toParts[1] - 1, toParts[2]);
  return Math.round((toDate - fromDate) / 86400000);
}

function normalizeStreak(rawStreak = {}) {
  const today = getDateKey();
  const lastCompletedDate = typeof rawStreak.lastCompletedDate === "string" ? rawStreak.lastCompletedDate : "";
  const current = Number.isFinite(rawStreak.current) ? Math.max(0, rawStreak.current) : 0;
  const best = Number.isFinite(rawStreak.best) ? Math.max(0, rawStreak.best) : 0;
  const missedDays = lastCompletedDate ? getDayDifference(lastCompletedDate, today) > 1 : false;
  const normalizedCurrent = missedDays ? 0 : current;

  return {
    current: normalizedCurrent,
    best: Math.max(best, normalizedCurrent),
    lastCompletedDate,
  };
}

function applyDailyStreakReset() {
  const normalized = normalizeStreak(progress.streak);
  const changed =
    normalized.current !== progress.streak?.current ||
    normalized.best !== progress.streak?.best ||
    normalized.lastCompletedDate !== progress.streak?.lastCompletedDate;

  if (changed) {
    progress = {
      ...progress,
      streak: normalized,
    };
    saveProgress();
  }
}

function updateStreakOnQuestComplete(streak) {
  const today = getDateKey();
  const normalized = normalizeStreak(streak);

  if (normalized.lastCompletedDate === today) {
    return normalized;
  }

  const isContinuing = normalized.lastCompletedDate && getDayDifference(normalized.lastCompletedDate, today) === 1;
  const current = isContinuing ? normalized.current + 1 : 1;

  return {
    current,
    best: Math.max(normalized.best, current),
    lastCompletedDate: today,
  };
}

function normalizeActivityLogItem(rawItem) {
  const questTitle = String(rawItem.questTitle || "").trim();
  const xpReward = Number(rawItem.xpReward);
  const goldReward = Number(rawItem.goldReward);
  const completedAt = typeof rawItem.completedAt === "string" ? rawItem.completedAt : new Date().toISOString();

  if (!questTitle || !Number.isFinite(xpReward) || !Number.isFinite(goldReward)) {
    return null;
  }

  return {
    id: String(rawItem.id || `activity-${Date.now()}`),
    questTitle,
    xpReward: Math.max(0, Math.round(xpReward)),
    goldReward: Math.max(0, Math.round(goldReward)),
    completedAt,
    dateKey: typeof rawItem.dateKey === "string" ? rawItem.dateKey : getDateKey(new Date(completedAt)),
  };
}

function normalizeTitleHistoryItem(rawItem) {
  const name = String(rawItem.name || "").trim();
  const desc = String(rawItem.desc || "").trim();
  const level = Number(rawItem.level);

  if (!name || !Number.isFinite(level)) {
    return null;
  }

  return {
    level: Math.max(1, Math.round(level)),
    name,
    desc,
    achievedAt: typeof rawItem.achievedAt === "string" ? rawItem.achievedAt : new Date().toISOString(),
  };
}

function normalizeQuest(rawQuest) {
  const xpReward = Number(rawQuest.xpReward);
  const goldReward = Number(rawQuest.goldReward);
  const title = String(rawQuest.title || "").trim();
  const type = ["normal", "urgent", "boss"].includes(rawQuest.type) ? rawQuest.type : "normal";

  if (!title || !Number.isFinite(xpReward) || !Number.isFinite(goldReward)) {
    return null;
  }

  return {
    id: String(rawQuest.id || `parent-${Date.now()}`),
    title,
    type,
    description: String(rawQuest.description || "").trim(),
    xpReward: Math.max(0, Math.round(xpReward)),
    goldReward: Math.max(0, Math.round(goldReward)),
    createdBy: rawQuest.createdBy === "system" ? "system" : "parent",
  };
}

function getDefaultManagedQuests() {
  return defaultQuests.map((quest) => normalizeQuest({ ...quest, createdBy: "system" })).filter(Boolean);
}

function loadLegacyCustomQuests() {
  try {
    const stored = localStorage.getItem(LEGACY_CUSTOM_QUESTS_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeQuest).filter(Boolean);
  } catch {
    return [];
  }
}

function loadManagedQuests() {
  try {
    const stored = localStorage.getItem(QUESTS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeQuest).filter(Boolean);
      }
    }
  } catch {
    return isTestMode ? getDefaultManagedQuests() : [];
  }

  const legacyQuests = loadLegacyCustomQuests();
  if (legacyQuests.length > 0) {
    localStorage.setItem(QUESTS_KEY, JSON.stringify(legacyQuests));
    return legacyQuests;
  }

  if (isTestMode) {
    const testQuests = getDefaultManagedQuests();
    localStorage.setItem(QUESTS_KEY, JSON.stringify(testQuests));
    return testQuests;
  }

  return [];
}

function saveManagedQuests() {
  localStorage.setItem(QUESTS_KEY, JSON.stringify(managedQuests));
}

function normalizeReward(rawReward) {
  const name = String(rawReward.name || "").trim();
  const cost = Number(rawReward.cost);
  if (!name || !Number.isFinite(cost)) {
    return null;
  }

  return {
    id: String(rawReward.id || `reward-${Date.now()}`),
    name,
    cost: Math.max(1, Math.round(cost)),
  };
}

function loadRewards() {
  try {
    const stored = localStorage.getItem(REWARDS_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeReward).filter(Boolean);
  } catch {
    return [];
  }
}

function saveRewards() {
  localStorage.setItem(REWARDS_KEY, JSON.stringify(rewards));
}

function normalizeRewardHistoryItem(rawItem) {
  const cost = Number(rawItem.cost);
  const rewardName = String(rawItem.rewardName || "").trim();
  if (!rewardName || !Number.isFinite(cost)) {
    return null;
  }

  return {
    id: String(rawItem.id || `history-${Date.now()}`),
    rewardName,
    cost: Math.max(1, Math.round(cost)),
    redeemedAt: typeof rawItem.redeemedAt === "string" ? rawItem.redeemedAt : new Date().toISOString(),
  };
}

function loadRewardHistory() {
  try {
    const stored = localStorage.getItem(REWARD_HISTORY_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeRewardHistoryItem).filter(Boolean);
  } catch {
    return [];
  }
}

function saveRewardHistory() {
  localStorage.setItem(REWARD_HISTORY_KEY, JSON.stringify(rewardHistory));
}

function notifyRewardExchange(historyItem) {
  if (!NOTIFY_URL) {
    return Promise.resolve(true);
  }

  const data = {
    name: progress.name || "そら",
    reward: historyItem.rewardName || "ご褒美",
    gold: Number.isFinite(historyItem.cost) ? historyItem.cost : 0,
    remainingGold: Number.isFinite(progress.gold) ? progress.gold : 0,
    date: new Date(historyItem.redeemedAt).toLocaleString("ja-JP"),
  };

  return fetch(NOTIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Notify failed: ${response.status}`);
      }
      return true;
    })
    .catch((error) => {
      console.warn("ご褒美交換通知に失敗しました", error);
      return false;
    });
}

function getAllQuests() {
  return managedQuests;
}

function getQuestTypeLabel(type) {
  if (type === "urgent") {
    return "緊急";
  }
  if (type === "boss") {
    return "BOSS";
  }
  return "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

function getTitle(level) {
  return TITLES.find((title) => title.level === level) || TITLES[TITLES.length - 1];
}

function createTitleHistoryItem(level, achievedAt = new Date().toISOString()) {
  const title = getTitle(level);
  return {
    level,
    name: title.name,
    desc: title.desc,
    achievedAt,
  };
}

function updateTitleHistory(history, previousLevel, nextLevel, achievedAt) {
  const previousTitle = getTitle(previousLevel);
  const nextTitle = getTitle(nextLevel);
  const normalizedHistory = history.map(normalizeTitleHistoryItem).filter(Boolean);

  if (previousTitle.name === nextTitle.name) {
    return normalizedHistory;
  }

  const previousEntry =
    normalizedHistory.find((item) => item.name === previousTitle.name) || createTitleHistoryItem(previousLevel, achievedAt);
  return [
    createTitleHistoryItem(nextLevel, achievedAt),
    previousEntry,
    ...normalizedHistory.filter((item) => item.name !== nextTitle.name && item.name !== previousTitle.name),
  ].slice(0, 20);
}

function getTodayGrowth() {
  const today = getDateKey();
  return progress.activityLog
    .filter((item) => item.dateKey === today)
    .reduce(
      (summary, item) => ({
        completed: summary.completed + 1,
        xp: summary.xp + item.xpReward,
        gold: summary.gold + item.goldReward,
      }),
      { completed: 0, xp: 0, gold: 0 },
    );
}

function getEstimatedQuestCountToLevel(xp) {
  const averageXp =
    getAllQuests().reduce((total, quest) => total + quest.xpReward, 0) / Math.max(getAllQuests().length, 1);
  return Math.max(1, Math.ceil(getXpToNextLevel(xp) / Math.max(averageXp, 1)));
}

function getPreviousTitleForRecord(level) {
  const currentTitle = getTitle(level);
  const storedPrevious = progress.titleHistory.find((item) => item.name !== currentTitle.name);
  if (storedPrevious) {
    return storedPrevious.name;
  }

  if (level <= 1) {
    return "まだありません";
  }

  const previousTitle = getTitle(level - 1);
  return previousTitle.name === currentTitle.name ? "まだありません" : previousTitle.name;
}

function getLevelProgress(xp) {
  return xp % 100;
}

function getXpToNextLevel(xp) {
  const levelProgress = getLevelProgress(xp);
  return levelProgress === 0 ? 100 : 100 - levelProgress;
}

function isEvolutionLevel(level) {
  return level > 1 && level % 5 === 0;
}

function getCharacterImageCandidatesForLevel(level) {
  const candidates = [];

  for (let index = characterStages.length - 1; index >= 0; index -= 1) {
    if (level >= characterStages[index].minLevel) {
      candidates.push(characterStages[index].src);
    }
  }

  return candidates.length > 0 ? candidates : [characterStages[0].src];
}

function completeQuest(questId, sourceElement) {
  const quest = getAllQuests().find((item) => item.id === questId);
  if (!quest || progress.completedQuestIds.includes(questId)) {
    return;
  }

  const previousLevel = getLevel(progress.xp);
  const previousLevelProgress = getLevelProgress(progress.xp);
  const sourceRect = sourceElement?.getBoundingClientRect();
  const completedAt = new Date();
  const completedAtIso = completedAt.toISOString();
  const nextXp = progress.xp + quest.xpReward;
  const nextLevel = getLevel(nextXp);

  progress = {
    ...progress,
    xp: nextXp,
    gold: progress.gold + quest.goldReward,
    completedQuestIds: [...progress.completedQuestIds, questId],
    streak: updateStreakOnQuestComplete(progress.streak),
    activityLog: [
      {
        id: `activity-${Date.now()}`,
        questTitle: quest.title,
        xpReward: quest.xpReward,
        goldReward: quest.goldReward,
        completedAt: completedAtIso,
        dateKey: getDateKey(completedAt),
      },
      ...progress.activityLog,
    ].slice(0, 50),
    titleHistory: updateTitleHistory(progress.titleHistory, previousLevel, nextLevel, completedAtIso),
  };

  const shouldPlayEvolution = nextLevel > previousLevel && isEvolutionLevel(nextLevel);
  if (shouldPlayEvolution) {
    queueCharacterEvolution();
  }

  saveProgress();
  render();
  queueXpChangeAnimation(getLevel(progress.xp) > previousLevel ? 0 : previousLevelProgress);
  showRewardFeedback(quest);
  showFloatingReward(quest, sourceRect);
  showClearFeedback();

  if (getLevel(progress.xp) > previousLevel) {
    playLevelUpAnimation();
  }

  if (shouldPlayEvolution) {
    playEvolutionAnimation();
  }
}

function resetProgress() {
  if (!isParentMode) {
    return;
  }

  const confirmed = window.confirm("進行状況をリセットしますか？");
  if (!confirmed) {
    return;
  }

  progress = { ...defaultProgress };
  saveProgress();
  render();
}

function renderDevTools() {
  document.querySelectorAll("[data-dev-tools]").forEach((tool) => {
    if (!isTestMode) {
      tool.remove();
      return;
    }

    tool.hidden = false;
  });
}

function renderModeControls() {
  document.querySelectorAll("[data-test-only]").forEach((element) => {
    element.hidden = !isTestMode;
  });
}

function renderParentModeControls() {
  document.querySelectorAll("[data-parent-mode-only]").forEach((element) => {
    element.hidden = !isParentMode;
  });
}

function devLevelUp() {
  const previousLevel = getLevel(progress.xp);
  const previousLevelProgress = getLevelProgress(progress.xp);

  progress = {
    ...progress,
    xp: progress.xp + 100,
  };

  const nextLevel = getLevel(progress.xp);
  const shouldPlayEvolution = nextLevel > previousLevel && isEvolutionLevel(nextLevel);
  if (shouldPlayEvolution) {
    queueCharacterEvolution();
  }

  saveProgress();
  render();
  queueXpChangeAnimation(previousLevelProgress);
  playLevelUpAnimation();

  if (shouldPlayEvolution) {
    playEvolutionAnimation();
  }
}

function switchScreen(screenId) {
  document.querySelectorAll("[data-screen]").forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === screenId);
  });

  const activeNavId = screenId === "admin-auth" ? "admin" : screenId;
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.nav === activeNavId);
  });

  if (screenId === "home" && pendingXpAnimationStart !== null) {
    animateXpBarFrom(pendingXpAnimationStart);
    pendingXpAnimationStart = null;
  }
}

function showParentAuth() {
  switchScreen("admin-auth");
  const input = document.querySelector("[data-parent-pin]");
  const message = document.querySelector("[data-parent-auth-message]");
  if (message) {
    message.textContent = "";
  }
  if (input) {
    input.value = "";
    window.setTimeout(() => input.focus(), 80);
  }
}

function handleParentAuthSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("[data-parent-pin]");
  const message = document.querySelector("[data-parent-auth-message]");
  const pin = input?.value.trim() || "";

  if (pin === PARENT_PIN) {
    isParentUnlocked = true;
    isParentMode = true;
    if (message) {
      message.textContent = "";
    }
    renderParentModeControls();
    switchScreen("admin");
    return;
  }

  if (message) {
    message.textContent = "PINが違います";
  }
  input?.select();
}

function exitParentMode() {
  isParentMode = false;
  isParentUnlocked = false;
  editingQuestId = null;
  editingRewardId = null;
  isQuestCreateOpen = false;
  render();
  switchScreen("home");
}

function handleQuestCreateSubmit(event) {
  event.preventDefault();
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const form = event.currentTarget;
  const message = form.querySelector("[data-quest-create-message]");
  const formData = new FormData(form);
  const quest = normalizeQuest({
    id: `parent-${Date.now()}`,
    type: formData.get("type"),
    title: formData.get("title"),
    description: formData.get("description"),
    xpReward: formData.get("xp"),
    goldReward: formData.get("gold"),
  });

  if (!quest || quest.xpReward <= 0 || quest.goldReward <= 0) {
    if (message) {
      message.textContent = "クエスト名、XP、Goldを入力してください";
    }
    return;
  }

  managedQuests = [quest, ...managedQuests];
  editingQuestId = null;
  saveManagedQuests();
  form.reset();
  isQuestCreateOpen = false;
  if (message) {
    message.textContent = "クエストを追加しました";
  }
  render();
}

function renderQuestCreateForm() {
  const form = document.querySelector("[data-quest-create-form]");
  const toggleButton = document.querySelector("[data-toggle-quest-create]");
  if (!form) {
    return;
  }

  if (!isTestMode) {
    toggleButton?.remove();
    form.hidden = false;
    return;
  }

  if (!toggleButton) {
    return;
  }

  toggleButton.hidden = false;
  form.hidden = !isQuestCreateOpen;
  toggleButton.setAttribute("aria-expanded", String(isQuestCreateOpen));
  toggleButton.textContent = isQuestCreateOpen ? "追加フォームを閉じる" : "新しいクエスト追加";
}

function renderQuestManager() {
  const list = document.querySelector("[data-managed-quest-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";

  if (managedQuests.length === 0) {
    const empty = document.createElement("p");
    empty.className = "managed-quest-empty";
    empty.textContent = "表示できるクエストはまだありません。";
    list.append(empty);
    return;
  }

  managedQuests.forEach((quest) => {
    const item = document.createElement("article");
    const typeLabel = getQuestTypeLabel(quest.type);
    item.className = `managed-quest-item managed-quest-${quest.type}`;

    if (quest.id === editingQuestId) {
      item.innerHTML = `
        <form class="managed-quest-edit" data-edit-quest-form="${escapeHtml(quest.id)}">
          <label>
            クエスト種別
            <select name="type">
              <option value="normal"${quest.type === "normal" ? " selected" : ""}>通常クエスト</option>
              <option value="urgent"${quest.type === "urgent" ? " selected" : ""}>緊急クエスト</option>
              <option value="boss"${quest.type === "boss" ? " selected" : ""}>ボスクエスト</option>
            </select>
          </label>
          <label>
            クエスト名
            <input type="text" name="title" value="${escapeHtml(quest.title)}" required>
          </label>
          <label>
            説明
            <textarea name="description" rows="3">${escapeHtml(quest.description)}</textarea>
          </label>
          <div class="reward-input-grid">
            <label>
              XP
              <input type="number" name="xp" inputmode="numeric" min="1" max="999" value="${quest.xpReward}" required>
            </label>
            <label>
              Gold
              <input type="number" name="gold" inputmode="numeric" min="1" max="999" value="${quest.goldReward}" required>
            </label>
          </div>
          <p class="form-message" data-edit-quest-message aria-live="polite"></p>
          <div class="managed-quest-actions">
            <button class="quest-manage-button" type="submit">保存</button>
            <button class="quest-manage-button is-secondary" type="button" data-cancel-edit-quest>キャンセル</button>
          </div>
        </form>
      `;
    } else {
      item.innerHTML = `
        <div class="managed-quest-copy">
          <div class="managed-quest-title-row">
            <h4>${escapeHtml(quest.title)}</h4>
            ${typeLabel ? `<span class="quest-type-badge quest-type-${quest.type}">${typeLabel}</span>` : ""}
          </div>
          <p>${escapeHtml(quest.description)}</p>
          <div class="reward-row">
            <span class="reward-badge">XP +${quest.xpReward}</span>
            <span class="reward-badge">Gold +${quest.goldReward}</span>
          </div>
        </div>
        <div class="managed-quest-actions">
          <button class="quest-manage-button" type="button" data-edit-quest="${escapeHtml(quest.id)}">編集</button>
          <button class="quest-manage-button is-danger" type="button" data-delete-quest="${escapeHtml(quest.id)}">削除</button>
        </div>
      `;
    }

    list.append(item);
  });
}

function handleQuestEditSubmit(event) {
  const form = event.target.closest("[data-edit-quest-form]");
  if (!form) {
    return;
  }

  event.preventDefault();
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const questId = form.dataset.editQuestForm;
  const formData = new FormData(form);
  const quest = normalizeQuest({
    id: questId,
    type: formData.get("type"),
    title: formData.get("title"),
    description: formData.get("description"),
    xpReward: formData.get("xp"),
    goldReward: formData.get("gold"),
  });
  const message = form.querySelector("[data-edit-quest-message]");

  if (!quest || quest.xpReward <= 0 || quest.goldReward <= 0) {
    if (message) {
      message.textContent = "クエスト名、XP、Goldを入力してください";
    }
    return;
  }

  managedQuests = managedQuests.map((item) => (item.id === questId ? quest : item));
  editingQuestId = null;
  saveManagedQuests();
  render();
}

function deleteManagedQuest(questId) {
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const quest = managedQuests.find((item) => item.id === questId);
  if (!quest) {
    return;
  }

  const confirmed = window.confirm(`「${quest.title}」を削除しますか？`);
  if (!confirmed) {
    return;
  }

  managedQuests = managedQuests.filter((item) => item.id !== questId);
  progress = {
    ...progress,
    completedQuestIds: progress.completedQuestIds.filter((id) => id !== questId),
  };
  if (editingQuestId === questId) {
    editingQuestId = null;
  }
  saveManagedQuests();
  saveProgress();
  render();
}

function handleRewardCreateSubmit(event) {
  event.preventDefault();
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const form = event.currentTarget;
  const message = form.querySelector("[data-reward-create-message]");
  const formData = new FormData(form);
  const reward = normalizeReward({
    id: `reward-${Date.now()}`,
    name: formData.get("name"),
    cost: formData.get("cost"),
  });

  if (!reward) {
    if (message) {
      message.textContent = "ご褒美名と必要Goldを入力してください";
    }
    return;
  }

  rewards = [reward, ...rewards];
  editingRewardId = null;
  saveRewards();
  form.reset();
  if (message) {
    message.textContent = "ご褒美を追加しました";
  }
  render();
}

function renderRewardShop() {
  const list = document.querySelector("[data-reward-shop-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";
  const availableRewards = rewards.filter((reward) => progress.gold >= reward.cost);

  if (availableRewards.length === 0) {
    const empty = document.createElement("p");
    empty.className = "reward-shop-empty";
    empty.textContent = rewards.length === 0 ? "交換できるご褒美はまだありません。" : "いま交換できるご褒美はありません。";
    list.append(empty);
    return;
  }

  availableRewards.forEach((reward) => {
    const item = document.createElement("article");
    item.className = "reward-shop-item";
    item.innerHTML = `
      <div>
        <h4>${escapeHtml(reward.name)}</h4>
        <p>${reward.cost}Gで交換できます</p>
      </div>
      <button type="button" data-exchange-reward="${escapeHtml(reward.id)}">交換</button>
    `;
    list.append(item);
  });
}

function renderRewardManager() {
  const list = document.querySelector("[data-managed-reward-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";
  if (rewards.length === 0) {
    const empty = document.createElement("p");
    empty.className = "managed-quest-empty";
    empty.textContent = "まだご褒美はありません。";
    list.append(empty);
    return;
  }

  rewards.forEach((reward) => {
    const item = document.createElement("article");
    item.className = "managed-quest-item managed-reward-item";

    if (reward.id === editingRewardId) {
      item.innerHTML = `
        <form class="managed-quest-edit" data-edit-reward-form="${escapeHtml(reward.id)}">
          <label>
            ご褒美名
            <input type="text" name="name" value="${escapeHtml(reward.name)}" required>
          </label>
          <label>
            必要Gold
            <input type="number" name="cost" inputmode="numeric" min="1" max="9999" value="${reward.cost}" required>
          </label>
          <p class="form-message" data-edit-reward-message aria-live="polite"></p>
          <div class="managed-quest-actions">
            <button class="quest-manage-button" type="submit">保存</button>
            <button class="quest-manage-button is-secondary" type="button" data-cancel-edit-reward>キャンセル</button>
          </div>
        </form>
      `;
    } else {
      item.innerHTML = `
        <div class="managed-quest-copy">
          <div class="managed-quest-title-row">
            <h4>${escapeHtml(reward.name)}</h4>
            <span class="reward-badge">${reward.cost}G</span>
          </div>
        </div>
        <div class="managed-quest-actions">
          <button class="quest-manage-button" type="button" data-edit-reward="${escapeHtml(reward.id)}">編集</button>
          <button class="quest-manage-button is-danger" type="button" data-delete-reward="${escapeHtml(reward.id)}">削除</button>
        </div>
      `;
    }

    list.append(item);
  });
}

function renderRewardHistory() {
  const list = document.querySelector("[data-reward-history-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";
  if (rewardHistory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "managed-quest-empty";
    empty.textContent = "まだ交換履歴はありません。";
    list.append(empty);
    return;
  }

  rewardHistory.slice(0, 10).forEach((historyItem) => {
    const item = document.createElement("article");
    const date = new Date(historyItem.redeemedAt);
    const dateLabel = Number.isNaN(date.getTime()) ? "" : `${date.getMonth() + 1}/${date.getDate()}`;
    item.className = "reward-history-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(historyItem.rewardName)}</strong>
        <span>${dateLabel}</span>
      </div>
      <span>${historyItem.cost}G</span>
    `;
    list.append(item);
  });
}

function handleRewardEditSubmit(event) {
  const form = event.target.closest("[data-edit-reward-form]");
  if (!form) {
    return;
  }

  event.preventDefault();
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const rewardId = form.dataset.editRewardForm;
  const formData = new FormData(form);
  const reward = normalizeReward({
    id: rewardId,
    name: formData.get("name"),
    cost: formData.get("cost"),
  });
  const message = form.querySelector("[data-edit-reward-message]");

  if (!reward) {
    if (message) {
      message.textContent = "ご褒美名と必要Goldを入力してください";
    }
    return;
  }

  rewards = rewards.map((item) => (item.id === rewardId ? reward : item));
  editingRewardId = null;
  saveRewards();
  render();
}

function deleteReward(rewardId) {
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const reward = rewards.find((item) => item.id === rewardId);
  if (!reward) {
    return;
  }

  const confirmed = window.confirm(`「${reward.name}」を削除しますか？`);
  if (!confirmed) {
    return;
  }

  rewards = rewards.filter((item) => item.id !== rewardId);
  if (editingRewardId === rewardId) {
    editingRewardId = null;
  }
  saveRewards();
  render();
}

function exchangeReward(rewardId) {
  const reward = rewards.find((item) => item.id === rewardId);
  if (!reward || progress.gold < reward.cost) {
    return;
  }

  const confirmed = window.confirm(`「${reward.name}」を${reward.cost}Gで交換しますか？`);
  if (!confirmed) {
    return;
  }

  progress = {
    ...progress,
    gold: progress.gold - reward.cost,
  };
  const historyItem = {
    id: `history-${Date.now()}`,
    rewardName: reward.name,
    cost: reward.cost,
    redeemedAt: new Date().toISOString(),
  };
  rewardHistory = [historyItem, ...rewardHistory];
  saveProgress();
  saveRewardHistory();
  render();
  notifyRewardExchange(historyItem).then((notified) => {
    if (!notified) {
      window.alert("交換は完了しました。通知だけ失敗しました。");
    }
  });
  window.alert("ご褒美を交換しました");
}

function renderQuests() {
  const list = document.querySelector("[data-quest-list]");
  list.innerHTML = "";

  getAllQuests().forEach((quest) => {
    const completed = progress.completedQuestIds.includes(quest.id);
    const typeLabel = getQuestTypeLabel(quest.type);
    const card = document.createElement("article");
    card.className = `quest-card quest-card-${quest.type}${completed ? " is-completed" : ""}`;

    card.innerHTML = `
      <div class="quest-title-row">
        <h3>${escapeHtml(quest.title)}</h3>
        <div class="quest-title-badges">
          ${typeLabel ? `<span class="quest-type-badge quest-type-${quest.type}">${typeLabel}</span>` : ""}
          ${completed ? '<span class="status-badge">完了済み</span>' : ""}
        </div>
      </div>
      <p>${escapeHtml(quest.description)}</p>
      <div class="reward-row">
        <span class="reward-badge">XP +${quest.xpReward}</span>
        <span class="reward-badge">Gold +${quest.goldReward}</span>
      </div>
      <button class="complete-button" type="button" data-complete="${quest.id}" ${completed ? "disabled" : ""}>
        ${completed ? "達成済み" : "完了"}
      </button>
    `;

    list.append(card);
  });
}

function renderTodayQuests() {
  const list = document.querySelector("[data-today-quest-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";

  getAllQuests().slice(0, 3).forEach((quest) => {
    const completed = progress.completedQuestIds.includes(quest.id);
    const typeLabel = getQuestTypeLabel(quest.type);
    const item = document.createElement("article");
    item.className = `today-quest-item today-quest-${quest.type}${completed ? " is-completed" : ""}`;

    item.innerHTML = `
      <div>
        <div class="today-quest-title-row">
          <h4>${escapeHtml(quest.title)}</h4>
          ${typeLabel ? `<span class="quest-type-badge quest-type-${quest.type}">${typeLabel}</span>` : ""}
        </div>
        <p>${escapeHtml(quest.description)}</p>
      </div>
      <span>${completed ? "済" : `+${quest.xpReward}XP`}</span>
    `;

    list.append(item);
  });
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function renderXpBar() {
  const levelProgress = getLevelProgress(progress.xp);
  const level = getLevel(progress.xp);
  const xpFill = document.querySelector("[data-xp-fill]");
  const xpProgress = document.querySelector("[data-xp-progress]");
  const xpNext = document.querySelector("[data-xp-next]");

  xpFill.style.width = `${levelProgress}%`;
  xpProgress.textContent = progress.xp === 0 ? "はじまりの一歩" : `Lv${level} / ${levelProgress}XP進行中`;
  xpNext.textContent = `次のLvまで あと${getXpToNextLevel(progress.xp)}XP`;
}

function renderCharacter(level) {
  const image = document.querySelector("[data-character-image]");
  if (!image) {
    return;
  }

  const candidates = getCharacterImageCandidatesForLevel(level);
  const nextSrc = candidates[0];
  if (image.dataset.targetSrc === nextSrc) {
    return;
  }

  image.dataset.characterCandidates = JSON.stringify(candidates);
  image.dataset.characterCandidateIndex = "0";
  image.dataset.targetSrc = nextSrc;
  image.classList.remove("is-changing", "is-evolving");

  const changeImage = () => {
    image.hidden = true;
    image.classList.remove("is-fading-out");
    image.src = nextSrc;
  };

  if (!image.hidden) {
    image.classList.add("is-fading-out");
    window.setTimeout(changeImage, 140);
    return;
  }

  changeImage();
}

function queueCharacterEvolution() {
  const image = document.querySelector("[data-character-image]");
  if (!image) {
    return;
  }

  image.dataset.evolutionPending = "true";
}

function playXpChangeAnimation() {
  const levelPanel = document.querySelector("[data-level-panel]");
  if (!levelPanel) {
    return;
  }

  levelPanel.classList.remove("is-xp-changing");
  void levelPanel.offsetWidth;
  levelPanel.classList.add("is-xp-changing");

  window.clearTimeout(xpChangeTimer);
  xpChangeTimer = window.setTimeout(() => levelPanel.classList.remove("is-xp-changing"), 760);
}

function animateXpBarFrom(previousLevelProgress) {
  const xpFill = document.querySelector("[data-xp-fill]");
  if (!xpFill) {
    return;
  }

  xpFill.style.transition = "none";
  xpFill.style.width = `${previousLevelProgress}%`;
  void xpFill.offsetWidth;
  xpFill.style.transition = "";
  renderXpBar();
  playXpChangeAnimation();
}

function queueXpChangeAnimation(previousLevelProgress) {
  const homeScreen = document.querySelector('[data-screen="home"]');
  if (homeScreen?.classList.contains("is-active")) {
    animateXpBarFrom(previousLevelProgress);
    return;
  }

  pendingXpAnimationStart = previousLevelProgress;
}

function playLevelUpAnimation() {
  const levelPanel = document.querySelector("[data-level-panel]");
  const levelUpToast = document.querySelector("[data-level-up-toast]");
  const characterFrame = document.querySelector(".character-frame");
  const characterImage = document.querySelector("[data-character-image]");
  if (!levelPanel || !levelUpToast) {
    return;
  }

  document.body.classList.remove("is-level-up-flash");
  levelPanel.classList.remove("is-level-up");
  characterFrame?.classList.remove("is-level-up");
  characterImage?.classList.remove("is-level-up");
  levelUpToast.classList.remove("is-visible");
  void levelPanel.offsetWidth;
  document.body.classList.add("is-level-up-flash");
  levelPanel.classList.add("is-level-up");
  characterFrame?.classList.add("is-level-up");
  if (characterImage && characterImage.dataset.evolutionPending !== "true") {
    characterImage.classList.add("is-level-up");
  }
  levelUpToast.classList.add("is-visible");

  window.clearTimeout(levelUpTimer);
  levelUpTimer = window.setTimeout(() => {
    document.body.classList.remove("is-level-up-flash");
    levelPanel.classList.remove("is-level-up");
    characterFrame?.classList.remove("is-level-up");
    characterImage?.classList.remove("is-level-up");
    levelUpToast.classList.remove("is-visible");
  }, 1250);
}

function playEvolutionAnimation() {
  const toast = document.querySelector("[data-evolution-toast]");
  if (!toast) {
    return;
  }

  const messages = ["進化！", "ランクアップ！"];
  toast.textContent = messages[getLevel(progress.xp) % messages.length];
  toast.classList.remove("is-visible");
  document.body.classList.remove("is-evolution-flash");
  void toast.offsetWidth;
  toast.classList.add("is-visible");
  document.body.classList.add("is-evolution-flash");

  window.clearTimeout(evolutionTimer);
  evolutionTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    document.body.classList.remove("is-evolution-flash");
  }, 1080);
}

function showRewardFeedback(quest) {
  const toast = document.querySelector("[data-reward-toast]");
  if (!toast) {
    return;
  }

  toast.textContent = `+${quest.xpReward} XP / +${quest.goldReward} G`;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  window.clearTimeout(rewardToastTimer);
  rewardToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1200);
}

function appendGainBadges(layer, quest) {
  layer.innerHTML = "";

  [
    { label: `+${quest.xpReward}XP`, type: "xp" },
    { label: `+${quest.goldReward}G`, type: "gold" },
  ].forEach((gain, index) => {
    const badge = document.createElement("span");
    badge.className = `gain-float gain-float-${gain.type}`;
    badge.textContent = gain.label;
    badge.style.animationDelay = `${index * 90}ms`;
    layer.append(badge);
  });
}

function showFloatingReward(quest, sourceRect) {
  const xpLayer = document.querySelector("[data-gain-float-layer]");
  if (xpLayer) {
    appendGainBadges(xpLayer, quest);
  }

  if (!sourceRect) {
    return;
  }

  const layer = document.createElement("div");
  const left = Math.max(14, Math.min(sourceRect.left + sourceRect.width / 2 - 58, window.innerWidth - 142));
  const top = Math.max(86, sourceRect.top - 12);
  layer.className = "gain-float-layer gain-float-card-layer";
  layer.style.left = `${left}px`;
  layer.style.top = `${top}px`;
  appendGainBadges(layer, quest);
  document.body.append(layer);

  window.setTimeout(() => layer.remove(), 1200);
}

function showClearFeedback() {
  const toast = document.querySelector("[data-clear-toast]");
  if (!toast) {
    return;
  }

  const messages = ["達成！", "よくやった！"];
  const messageIndex = Math.max(progress.completedQuestIds.length - 1, 0) % messages.length;
  toast.textContent = messages[messageIndex];
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  window.clearTimeout(clearToastTimer);
  clearToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1050);
}

function renderGrowthRecord(level, title) {
  const todayGrowth = getTodayGrowth();
  const xpToNext = getXpToNextLevel(progress.xp);
  const estimatedCount = getEstimatedQuestCountToLevel(progress.xp);

  setText("[data-today-completed]", todayGrowth.completed);
  setText("[data-today-xp]", todayGrowth.xp);
  setText("[data-today-gold]", todayGrowth.gold);
  setText("[data-record-streak-current]", progress.streak.current);
  setText("[data-record-streak-best]", progress.streak.best);
  setText("[data-goal-xp]", `あと${xpToNext}XP`);
  setText("[data-goal-count]", `あと${estimatedCount}回くらいでレベルアップ`);
  setText("[data-current-title-record]", title.name);
  setText("[data-previous-title-record]", getPreviousTitleForRecord(level));
  renderActivityLog();
}

function renderActivityLog() {
  const list = document.querySelector("[data-activity-log-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";
  const recentItems = progress.activityLog.slice(0, 5);
  if (recentItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "activity-log-empty";
    empty.textContent = "まだ活動ログはありません。";
    list.append(empty);
    return;
  }

  recentItems.forEach((logItem) => {
    const item = document.createElement("article");
    const completedAt = new Date(logItem.completedAt);
    const dateLabel = Number.isNaN(completedAt.getTime()) ? "" : `${completedAt.getMonth() + 1}/${completedAt.getDate()}`;
    item.className = "activity-log-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(logItem.questTitle)}</strong>
        <span>${dateLabel}</span>
      </div>
      <span>+${logItem.xpReward}XP</span>
    `;
    list.append(item);
  });
}

function render() {
  applyDailyStreakReset();
  const level = getLevel(progress.xp);
  const title = getTitle(level);
  const titleNameElement = document.querySelector("[data-title-name]");
  const titleDescElement = document.querySelector("[data-title-desc]");
  const titleChanged = currentTitleName !== "" && currentTitleName !== title.name;

  if (titleNameElement) {
    titleNameElement.textContent = title.name;
  }
  if (titleDescElement) {
    titleDescElement.textContent = title.desc;
  }
  if (titleChanged && titleNameElement) {
    const titleBlock = titleNameElement.closest(".adventurer-copy");
    titleBlock?.classList.remove("is-title-changing");
    void titleBlock?.offsetWidth;
    titleBlock?.classList.add("is-title-changing");
    window.setTimeout(() => titleBlock?.classList.remove("is-title-changing"), 760);
  }
  currentTitleName = title.name;
  setText("[data-level]", level);
  setText("[data-xp]", progress.xp);
  setText("[data-gold]", progress.gold);
  setText("[data-streak-current]", `${progress.streak.current}日`);
  setText("[data-streak-best]", `${progress.streak.best}日`);
  setText("[data-record-level]", level);
  setText("[data-record-xp]", progress.xp);
  setText("[data-record-gold]", progress.gold);
  setText("[data-record-completed]", progress.completedQuestIds.length);

  renderGrowthRecord(level, title);
  renderXpBar();
  renderCharacter(level);
  renderQuests();
  renderTodayQuests();
  renderRewardShop();
  renderModeControls();
  renderParentModeControls();
  renderDevTools();
  renderQuestCreateForm();
  renderQuestManager();
  renderRewardManager();
  renderRewardHistory();
}

document.querySelector("[data-character-image]")?.addEventListener("load", (event) => {
  const image = event.currentTarget;
  const isEvolution = image.dataset.evolutionPending === "true";
  image.closest(".character-frame")?.classList.add("has-character-image");
  image.hidden = false;
  image.classList.remove("is-changing", "is-evolving", "is-fading-out");

  if (image.src !== currentCharacterSrc) {
    currentCharacterSrc = image.src;
    void image.offsetWidth;
    image.classList.add(isEvolution ? "is-evolving" : "is-changing");
  }

  delete image.dataset.evolutionPending;
});

document.querySelector("[data-character-image]")?.addEventListener("error", (event) => {
  const image = event.currentTarget;
  const candidates = JSON.parse(image.dataset.characterCandidates || "[]");
  const currentIndex = Number(image.dataset.characterCandidateIndex || 0);
  const nextIndex = currentIndex + 1;

  if (candidates[nextIndex]) {
    image.dataset.characterCandidateIndex = String(nextIndex);
    image.src = candidates[nextIndex];
    return;
  }

  const fallbackSrc = image.dataset.fallbackSrc;

  if (fallbackSrc && !image.src.endsWith(fallbackSrc)) {
    image.src = fallbackSrc;
    return;
  }

  image.hidden = true;
  image.closest(".character-frame")?.classList.remove("has-character-image");
});

document.querySelectorAll("[data-nav-icon-image]").forEach((image) => {
  image.addEventListener("load", () => {
    image.closest(".nav-icon")?.classList.add("is-image-ready");
  });

  image.addEventListener("error", () => {
    image.closest(".nav-icon")?.classList.remove("is-image-ready");
    image.hidden = true;
  });

  if (image.complete && image.naturalWidth > 0) {
    image.closest(".nav-icon")?.classList.add("is-image-ready");
  }
});

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-nav]");
  if (navButton) {
    if (navButton.dataset.nav === "admin" && !isParentUnlocked) {
      showParentAuth();
      return;
    }
    switchScreen(navButton.dataset.nav);
    return;
  }

  const completeButton = event.target.closest("[data-complete]");
  if (completeButton) {
    completeButton.classList.add("is-pressing");
    window.setTimeout(() => {
      completeQuest(completeButton.dataset.complete, completeButton);
    }, 180);
    return;
  }

  const devLevelButton = event.target.closest("[data-dev-level-up]");
  if (devLevelButton && isTestMode) {
    devLevelUp();
    return;
  }

  const parentModeExitButton = event.target.closest("[data-parent-mode-exit]");
  if (parentModeExitButton) {
    exitParentMode();
    return;
  }

  const toggleQuestCreateButton = event.target.closest("[data-toggle-quest-create]");
  if (toggleQuestCreateButton) {
    if (!isParentUnlocked) {
      showParentAuth();
      return;
    }
    isQuestCreateOpen = !isQuestCreateOpen;
    renderQuestCreateForm();
    return;
  }

  const editQuestButton = event.target.closest("[data-edit-quest]");
  if (editQuestButton) {
    if (!isParentUnlocked) {
      showParentAuth();
      return;
    }
    editingQuestId = editQuestButton.dataset.editQuest;
    renderQuestManager();
    return;
  }

  const cancelEditButton = event.target.closest("[data-cancel-edit-quest]");
  if (cancelEditButton) {
    editingQuestId = null;
    renderQuestManager();
    return;
  }

  const deleteQuestButton = event.target.closest("[data-delete-quest]");
  if (deleteQuestButton) {
    deleteManagedQuest(deleteQuestButton.dataset.deleteQuest);
    return;
  }

  const exchangeRewardButton = event.target.closest("[data-exchange-reward]");
  if (exchangeRewardButton) {
    exchangeReward(exchangeRewardButton.dataset.exchangeReward);
    return;
  }

  const editRewardButton = event.target.closest("[data-edit-reward]");
  if (editRewardButton) {
    if (!isParentUnlocked) {
      showParentAuth();
      return;
    }
    editingRewardId = editRewardButton.dataset.editReward;
    renderRewardManager();
    return;
  }

  const cancelEditRewardButton = event.target.closest("[data-cancel-edit-reward]");
  if (cancelEditRewardButton) {
    editingRewardId = null;
    renderRewardManager();
    return;
  }

  const deleteRewardButton = event.target.closest("[data-delete-reward]");
  if (deleteRewardButton) {
    deleteReward(deleteRewardButton.dataset.deleteReward);
  }
});

document.querySelector("[data-parent-auth-form]")?.addEventListener("submit", handleParentAuthSubmit);
document.querySelector("[data-quest-create-form]")?.addEventListener("submit", handleQuestCreateSubmit);
document.querySelector("[data-reward-create-form]")?.addEventListener("submit", handleRewardCreateSubmit);
document.addEventListener("submit", handleQuestEditSubmit);
document.addEventListener("submit", handleRewardEditSubmit);
document.querySelector("[data-reset]").addEventListener("click", resetProgress);

render();
