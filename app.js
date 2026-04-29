const STORAGE_KEY = "sora_guild_app_dev";
const QUESTS_KEY = "sora_guild_app_quests_dev";
const LEGACY_CUSTOM_QUESTS_KEY = "sora_guild_app_custom_quests_dev";
const REWARDS_KEY = "sora_guild_app_rewards_dev";
const REWARD_HISTORY_KEY = "sora_guild_app_reward_history_dev";
const ACHIEVEMENTS_KEY = "guildAchievements";
const WEEKLY_REPORT_HISTORY_KEY = "sora_guild_app_weekly_report_history_dev";
const PARENT_NOTES_KEY = "sora_guild_app_parent_notes_dev";
const NOTIFY_URL = "https://script.google.com/macros/s/AKfycbzPl6o5pJGvx_3F2GGuGz7PbC1ZmYKUnz9ewcx_F_hr1s7uEQmeNmDn-vZK2hQMUa13Dg/exec";
// 週間レポート用GAS WebアプリURL。デプロイ後の /exec URL をここに貼り付けます。
const WEEKLY_REPORT_GAS_URL = "https://script.google.com/macros/s/AKfycbz0-CEA4p6uLRctEVfWKDJo53BSEWpj-V6A8hMOjbTgrT33hMfvqZ6wGFDD6_N4rt4C/exec";
const WEEKLY_REPORT_SENT_WEEK_KEY = "sora_guild_app_last_weekly_report_sent_week_dev";
const isTestMode = false;
const PARENT_PIN = "1234";
const LOGIN_BONUS_GOLD = 10;
const LOGIN_STREAK_BONUS_GOLD = 50;
const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
const ACHIEVEMENT_MENU_IDS = ["home", "quests", "growth", "rewards", "admin"];
const QUEST_PRIORITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
};
const QUEST_CATEGORY_ORDER = ["daily_required", "challenge"];
const BACKUP_STORAGE_KEYS = [
  STORAGE_KEY,
  QUESTS_KEY,
  LEGACY_CUSTOM_QUESTS_KEY,
  REWARDS_KEY,
  REWARD_HISTORY_KEY,
  ACHIEVEMENTS_KEY,
  WEEKLY_REPORT_HISTORY_KEY,
  PARENT_NOTES_KEY,
];

const defaultProgress = {
  name: "そら",
  xp: 0,
  gold: 0,
  stats: {
    STR: 0,
    INT: 0,
    END: 0,
    DEX: 0,
  },
  completedQuestIds: [],
  streak: {
    current: 0,
    best: 0,
    lastCompletedDate: "",
  },
  activityLog: [],
  titleHistory: [],
  lastLoginBonusDate: "",
  loginStreak: 0,
  totalLoginDays: 0,
  totalGoldEarned: 0,
  questCompletedWeekdays: [],
  visitedScreens: [],
};

const defaultQuests = [
  {
    id: "homework",
    type: "normal",
    category: "daily_required",
    title: "宿題を終える",
    description: "今日の宿題を最後まで片づける。",
    frequency: "daily",
    stat: "INT",
    xpReward: 40,
    goldReward: 30,
  },
  {
    id: "reading",
    type: "normal",
    category: "daily_required",
    title: "音読をする",
    description: "声に出して読み、聞いてもらう。",
    frequency: "daily",
    stat: "INT",
    xpReward: 30,
    goldReward: 20,
  },
  {
    id: "help",
    type: "normal",
    category: "daily_required",
    title: "お手伝いをする",
    description: "家の中で一つ、誰かの助けになる。",
    frequency: "daily",
    stat: "END",
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
let unlockedAchievements = loadAchievements();
let weeklyReportHistory = loadWeeklyReportHistory();
progress = reconcileProgressFromHistory(progress);
let rewardToastTimer;
let clearToastTimer;
let levelUpTimer;
let evolutionTimer;
let xpChangeTimer;
let questCompleteTimer;
let loginBonusTimer;
let appReminderTimer;
let achievementToastTimer;
let pendingCompleteQuestId = "";
let pendingCompleteSourceElement = null;
let pendingXpAnimationStart = null;
let currentCharacterSrc = "";
let currentTitleName = "";
let isParentUnlocked = false;
let isParentMode = false;
let editingQuestId = null;
let editingRewardId = null;
let isQuestCreateOpen = false;
let activeQuestCategory = "daily_required";
let questSwipeStartX = 0;
let questSwipeStartY = 0;
let growthChartMode = "xp";
let previousDailyRequiredComplete = false;
let hasRenderedQuestCategoryProgress = false;

function getDefaultProgressState() {
  return {
    ...defaultProgress,
    stats: { ...defaultProgress.stats },
    completedQuestIds: [],
    streak: { ...defaultProgress.streak },
    activityLog: [],
    titleHistory: [],
    questCompletedWeekdays: [],
    visitedScreens: [],
  };
}

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultProgressState();
    }

    const parsed = JSON.parse(stored);
    return {
      ...defaultProgress,
      ...parsed,
      completedQuestIds: Array.isArray(parsed.completedQuestIds) ? parsed.completedQuestIds : [],
      xp: Number.isFinite(parsed.xp) ? parsed.xp : defaultProgress.xp,
      gold: Number.isFinite(parsed.gold) ? parsed.gold : defaultProgress.gold,
      stats: normalizeStats(parsed.stats),
      streak: normalizeStreak(parsed.streak),
      activityLog: Array.isArray(parsed.activityLog) ? parsed.activityLog.map(normalizeActivityLogItem).filter(Boolean) : [],
      titleHistory: Array.isArray(parsed.titleHistory) ? parsed.titleHistory.map(normalizeTitleHistoryItem).filter(Boolean) : [],
      lastLoginBonusDate: typeof parsed.lastLoginBonusDate === "string" ? parsed.lastLoginBonusDate : "",
      loginStreak: Number.isFinite(parsed.loginStreak) ? Math.max(0, Math.round(parsed.loginStreak)) : 0,
      totalLoginDays: Number.isFinite(parsed.totalLoginDays)
        ? Math.max(0, Math.round(parsed.totalLoginDays))
        : Math.max(parsed.loginStreak || 0, parsed.lastLoginBonusDate ? 1 : 0),
      totalGoldEarned: Number.isFinite(parsed.totalGoldEarned) ? Math.max(0, Math.round(parsed.totalGoldEarned)) : Math.max(0, parsed.gold || 0),
      totalQuestCompletions: Number.isFinite(parsed.totalQuestCompletions)
        ? Math.max(0, Math.round(parsed.totalQuestCompletions))
        : Math.max(
            Array.isArray(parsed.activityLog) ? parsed.activityLog.length : 0,
            Array.isArray(parsed.completedQuestIds) ? parsed.completedQuestIds.length : 0,
          ),
      questCompletedWeekdays: normalizeNumberList(parsed.questCompletedWeekdays, 0, 6),
      visitedScreens: normalizeStringList(parsed.visitedScreens),
    };
  } catch {
    return getDefaultProgressState();
  }
}

function normalizeStringList(rawList) {
  return Array.isArray(rawList) ? [...new Set(rawList.map(String).filter(Boolean))] : [];
}

function normalizeNumberList(rawList, min, max) {
  if (!Array.isArray(rawList)) {
    return [];
  }
  return [...new Set(rawList.map(Number))]
    .filter((value) => Number.isInteger(value) && value >= min && value <= max)
    .sort((a, b) => a - b);
}

function normalizeStats(rawStats = {}) {
  return {
    STR: Number.isFinite(rawStats.STR) ? Math.max(0, Math.round(rawStats.STR)) : 0,
    INT: Number.isFinite(rawStats.INT) ? Math.max(0, Math.round(rawStats.INT)) : 0,
    END: Number.isFinite(rawStats.END) ? Math.max(0, Math.round(rawStats.END)) : 0,
    DEX: Number.isFinite(rawStats.DEX) ? Math.max(0, Math.round(rawStats.DEX)) : 0,
  };
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadAchievements() {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return normalizeStringList(parsed);
  } catch {
    return [];
  }
}

function saveAchievements() {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlockedAchievements));
}

function loadParentNotes() {
  try {
    const stored = localStorage.getItem(PARENT_NOTES_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed)
        .map(([dateKey, note]) => [dateKey, String(note || "").trim()])
        .filter(([dateKey, note]) => dateKey && note),
    );
  } catch {
    return {};
  }
}

function saveParentNote(dateKey, note) {
  const notes = loadParentNotes();
  const normalizedNote = String(note || "").trim();
  if (normalizedNote) {
    notes[dateKey] = normalizedNote;
  } else {
    delete notes[dateKey];
  }
  localStorage.setItem(PARENT_NOTES_KEY, JSON.stringify(notes));
}

function getParentNote(dateKey = getDateKey()) {
  return loadParentNotes()[dateKey] || "";
}

function normalizeWeeklyReportHistoryItem(rawItem) {
  const weekStart = typeof rawItem.weekStart === "string" ? rawItem.weekStart : "";
  if (!weekStart) {
    return null;
  }

  const stats = normalizeStats(rawItem.stats);
  const statTotal = Number.isFinite(rawItem.statTotal)
    ? Math.max(0, Math.round(rawItem.statTotal))
    : stats.STR + stats.INT + stats.END + stats.DEX;

  return {
    weekStart,
    weekEnd: typeof rawItem.weekEnd === "string" ? rawItem.weekEnd : getWeekEndKey(weekStart),
    completed: Number.isFinite(rawItem.completed) ? Math.max(0, Math.round(rawItem.completed)) : 0,
    xp: Number.isFinite(rawItem.xp) ? Math.max(0, Math.round(rawItem.xp)) : 0,
    gold: Number.isFinite(rawItem.gold) ? Math.max(0, Math.round(rawItem.gold)) : 0,
    stats,
    statTotal,
    loginStreak: Number.isFinite(rawItem.loginStreak) ? Math.max(0, Math.round(rawItem.loginStreak)) : 0,
    savedAt: typeof rawItem.savedAt === "string" ? rawItem.savedAt : new Date().toISOString(),
  };
}

function loadWeeklyReportHistory() {
  try {
    const stored = localStorage.getItem(WEEKLY_REPORT_HISTORY_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map(normalizeWeeklyReportHistoryItem).filter(Boolean);
  } catch {
    return [];
  }
}

function saveWeeklyReportHistory() {
  localStorage.setItem(WEEKLY_REPORT_HISTORY_KEY, JSON.stringify(weeklyReportHistory));
}

function reconcileProgressFromHistory(currentProgress) {
  const spentGold = rewardHistory.reduce((total, item) => total + item.cost, 0);
  return {
    ...currentProgress,
    totalGoldEarned: Math.max(currentProgress.totalGoldEarned || 0, (currentProgress.gold || 0) + spentGold),
    totalQuestCompletions: Math.max(
      currentProgress.totalQuestCompletions || 0,
      currentProgress.activityLog.length,
      currentProgress.completedQuestIds.length,
    ),
    questCompletedWeekdays: normalizeNumberList(currentProgress.questCompletedWeekdays, 0, 6),
    visitedScreens: normalizeStringList(currentProgress.visitedScreens),
  };
}

function applyLoginBonus() {
  const today = getDateKey();
  if (progress.lastLoginBonusDate === today) {
    return {
      granted: false,
      streakBonus: false,
    };
  }

  const dayDifference = progress.lastLoginBonusDate ? getDayDifference(progress.lastLoginBonusDate, today) : Number.POSITIVE_INFINITY;
  const nextLoginStreak = dayDifference === 1 ? Math.max(0, progress.loginStreak) + 1 : 1;
  const streakBonus = nextLoginStreak === 7;

  progress = {
    ...progress,
    gold: progress.gold + LOGIN_BONUS_GOLD + (streakBonus ? LOGIN_STREAK_BONUS_GOLD : 0),
    loginStreak: nextLoginStreak,
    totalLoginDays: Math.max(0, progress.totalLoginDays || 0) + 1,
    totalGoldEarned: Math.max(0, progress.totalGoldEarned || progress.gold || 0) + LOGIN_BONUS_GOLD + (streakBonus ? LOGIN_STREAK_BONUS_GOLD : 0),
    lastLoginBonusDate: today,
  };
  saveProgress();
  return {
    granted: true,
    streakBonus,
  };
}

function getJapanDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("ja-JP-u-ca-gregory", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

function getDateKey(date = new Date()) {
  const { year, month: monthValue, day: dayValue } = getJapanDateParts(date);
  const month = String(monthValue).padStart(2, "0");
  const day = String(dayValue).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekKey(date = new Date()) {
  const { year, month, day } = getJapanDateParts(date);
  const japanDate = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = japanDate.getUTCDay() || 7;
  japanDate.setUTCDate(japanDate.getUTCDate() - dayOfWeek + 1);
  const weekYear = japanDate.getUTCFullYear();
  const weekMonth = String(japanDate.getUTCMonth() + 1).padStart(2, "0");
  const weekDay = String(japanDate.getUTCDate()).padStart(2, "0");
  return `${weekYear}-${weekMonth}-${weekDay}`;
}

function getWeekEndKey(weekStartKey = getWeekKey()) {
  const parts = String(weekStartKey).split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return "";
  }

  const weekEnd = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);
  const year = weekEnd.getUTCFullYear();
  const month = String(weekEnd.getUTCMonth() + 1).padStart(2, "0");
  const day = String(weekEnd.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getJapanDayOfWeek(date = new Date()) {
  const { year, month, day } = getJapanDateParts(date);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function getJapanHour(date = new Date()) {
  const parts = new Intl.DateTimeFormat("ja-JP-u-ca-gregory", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  return Number.isFinite(hour) ? hour : date.getHours();
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
  const stat = ["STR", "INT", "END", "DEX"].includes(rawItem.stat) ? rawItem.stat : inferQuestStat({ title: questTitle });

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
    completedHour: Number.isFinite(rawItem.completedHour) ? Math.max(0, Math.min(23, Math.round(rawItem.completedHour))) : getJapanHour(new Date(completedAt)),
    stat,
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

function inferQuestStat(rawQuest) {
  const text = `${rawQuest.title || ""} ${rawQuest.description || ""}`;

  if (/宿題|勉強|学習|読書|音読|計算|漢字|テスト|プリント/.test(text)) {
    return "INT";
  }
  if (/掃除|片づけ|片付け|お手伝い|手伝い|洗濯|皿|食器|準備/.test(text)) {
    return "END";
  }
  if (/運動|体操|走|筋トレ|スポーツ|散歩|なわとび/.test(text)) {
    return "STR";
  }
  if (/工作|制作|作る|折り紙|絵|描|ぬりえ|料理|手芸/.test(text)) {
    return "DEX";
  }

  return "END";
}

function normalizeScheduleDays(rawDays) {
  if (!Array.isArray(rawDays)) {
    return [];
  }

  return [...new Set(rawDays.map(Number))]
    .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    .sort((a, b) => a - b);
}

function normalizeQuest(rawQuest) {
  const xpReward = Number(rawQuest.xpReward);
  const goldReward = Number(rawQuest.goldReward);
  const title = String(rawQuest.title || "").trim();
  const type = ["normal", "urgent", "boss"].includes(rawQuest.type) ? rawQuest.type : "normal";
  const category = ["daily_required", "challenge"].includes(rawQuest.category) ? rawQuest.category : "daily_required";
  const priority = ["high", "medium", "low"].includes(rawQuest.priority) ? rawQuest.priority : "medium";
  const frequency = ["once", "daily", "weekly", "weekday"].includes(rawQuest.frequency) ? rawQuest.frequency : "daily";
  const stat = ["STR", "INT", "END", "DEX"].includes(rawQuest.stat) ? rawQuest.stat : inferQuestStat(rawQuest);
  const scheduleDays = normalizeScheduleDays(rawQuest.scheduleDays);

  if (!title || !Number.isFinite(xpReward) || !Number.isFinite(goldReward)) {
    return null;
  }

  return {
    id: String(rawQuest.id || `parent-${Date.now()}`),
    title,
    type,
    category,
    priority,
    frequency,
    scheduleDays,
    stat,
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
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.warn("ご褒美交換通知に失敗しました", error);
      return false;
    });
}

function notifyWeeklyReport() {
  if (!NOTIFY_URL) {
    return Promise.resolve(true);
  }

  const report = getWeeklyReport();
  const data = {
    type: "weeklyReport",
    name: progress.name || "そら",
    completed: report.completed,
    xp: report.xp,
    gold: report.gold,
    stats: report.stats,
    statGrowth: formatWeeklyStatGrowth(report.stats),
    loginStreak: progress.loginStreak || 0,
    weekStart: getWeekKey(),
    sentAt: new Date().toISOString(),
  };

  return fetch(NOTIFY_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.warn("週間レポート送信に失敗しました", error);
    return false;
  });
}

function createWeeklyReportPayload() {
  const report = getWeeklyReport();
  const stats = report.stats;
  const weekStart = getWeekKey();

  return {
    weekStart,
    weekEnd: getWeekEndKey(weekStart),
    questsCompleted: report.completed,
    xpEarned: report.xp,
    goldEarned: report.gold,
    strGain: stats.STR || 0,
    intGain: stats.INT || 0,
    endGain: stats.END || 0,
    dexGain: stats.DEX || 0,
    loginStreak: progress.loginStreak || 0,
  };
}

function setWeeklyReportSendMessage(message, isError = false) {
  const elements = document.querySelectorAll("[data-weekly-send-message]");
  if (elements.length === 0) {
    return;
  }

  elements.forEach((element) => {
    element.textContent = message;
    element.classList.toggle("is-error", isError);
  });
}

function sendWeeklyReportToGas(report) {
  if (!WEEKLY_REPORT_GAS_URL) {
    return Promise.reject(new Error("週間レポートGAS URLが未設定です"));
  }

  return fetch(WEEKLY_REPORT_GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`週間レポート送信に失敗しました: ${response.status}`);
    }
    return true;
  });
}

function sendWeeklyReport({ manual = false } = {}) {
  const weekStart = getWeekKey();
  if (!manual && getJapanDayOfWeek() !== 0) {
    return Promise.resolve(false);
  }
  if (!manual && localStorage.getItem(WEEKLY_REPORT_SENT_WEEK_KEY) === weekStart) {
    return Promise.resolve(false);
  }

  const report = createWeeklyReportPayload();
  return sendWeeklyReportToGas(report)
    .then(() => {
      if (!manual) {
        localStorage.setItem(WEEKLY_REPORT_SENT_WEEK_KEY, weekStart);
      }
      if (manual) {
        setWeeklyReportSendMessage("週間レポートを送信しました");
      }
      return true;
    })
    .catch((error) => {
      console.warn("週間レポート送信に失敗しました", error);
      if (manual) {
        setWeeklyReportSendMessage("送信に失敗しました", true);
      }
      return false;
    });
}

function getAllQuests() {
  return managedQuests;
}

function getQuestCompletionKey(quest) {
  if (quest.frequency === "daily") {
    return `${quest.id}:daily:${getDateKey()}`;
  }
  if (quest.frequency === "weekly") {
    return `${quest.id}:weekly:${getWeekKey()}`;
  }
  if (quest.frequency === "weekday") {
    return `${quest.id}:weekday:${getDateKey()}`;
  }
  return quest.id;
}

function isQuestCompleted(quest) {
  return progress.completedQuestIds.includes(getQuestCompletionKey(quest));
}

function isQuestVisible(quest) {
  if (quest.frequency === "once") {
    return !isQuestCompleted(quest);
  }
  if (quest.frequency === "weekday") {
    return normalizeScheduleDays(quest.scheduleDays).includes(getJapanDayOfWeek());
  }
  return true;
}

function sortQuestsForDisplay(quests) {
  const originalOrder = new Map(quests.map((quest, index) => [quest.id, index]));
  return [...quests].sort((a, b) => {
    const completedDiff = Number(isQuestCompleted(a)) - Number(isQuestCompleted(b));
    if (completedDiff !== 0) {
      return completedDiff;
    }

    const priorityDiff = (QUEST_PRIORITY_ORDER[a.priority] ?? QUEST_PRIORITY_ORDER.medium) - (QUEST_PRIORITY_ORDER[b.priority] ?? QUEST_PRIORITY_ORDER.medium);
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return (originalOrder.get(a.id) ?? 0) - (originalOrder.get(b.id) ?? 0);
  });
}

function getVisibleQuests() {
  return sortQuestsForDisplay(getAllQuests().filter(isQuestVisible));
}

function getVisibleQuestsByCategory(category) {
  return sortQuestsForDisplay(getAllQuests().filter((quest) => isQuestVisible(quest) && quest.category === category));
}

function getDailyRequiredQuestSummary() {
  const quests = getVisibleQuestsByCategory("daily_required");
  const completedCount = quests.filter(isQuestCompleted).length;
  const totalCount = quests.length;
  return {
    completedCount,
    totalCount,
    remainingCount: Math.max(0, totalCount - completedCount),
    progressPercent: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    isComplete: totalCount > 0 && completedCount === totalCount,
  };
}

function getQuestCategoryLabel(category) {
  if (category === "challenge") {
    return "追加依頼";
  }
  return "毎日クエスト";
}

function getQuestCategoryFlavor(category) {
  if (category === "challenge") {
    return {
      kicker: "追加依頼",
      emptyTitle: "追加依頼はまだありません",
      emptyText: "余力がある日に挑戦できます。ギルドマスターに依頼を作ってもらいましょう。",
    };
  }
  return {
    kicker: "今日の任務",
    emptyTitle: "任務はまだありません",
    emptyText: "ギルドマスターに今日の任務を作ってもらいましょう。",
  };
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

function getScheduleDaysLabel(scheduleDays) {
  const days = normalizeScheduleDays(scheduleDays);
  if (days.length === 0) {
    return "曜日指定";
  }
  return days.map((day) => WEEKDAY_LABELS[day]).join("・");
}

function getQuestFrequencyLabel(frequency, scheduleDays = []) {
  if (frequency === "once") {
    return "単発";
  }
  if (frequency === "weekly") {
    return "毎週";
  }
  if (frequency === "weekday") {
    return getScheduleDaysLabel(scheduleDays);
  }
  return "毎日";
}

function getQuestPriorityLabel(priority) {
  if (priority === "high") {
    return "優先 高";
  }
  if (priority === "low") {
    return "優先 低";
  }
  return "優先 中";
}

function getStatLabel(stat) {
  const labels = {
    STR: "力",
    INT: "賢さ",
    END: "忍耐力",
    DEX: "器用さ",
  };
  return labels[stat] || labels.END;
}

function getSubTitle(stats) {
  const normalizedStats = normalizeStats(stats);
  const entries = Object.entries(normalizedStats);
  const maxValue = Math.max(...entries.map(([, value]) => value));
  const strongestStats = entries.filter(([, value]) => value === maxValue).map(([stat]) => stat);

  if (strongestStats.length !== 1) {
    return {
      name: "バランスの冒険者",
      strongestStat: "",
    };
  }

  const titles = {
    STR: "力の冒険者",
    INT: "学びの冒険者",
    END: "継続の冒険者",
    DEX: "器用な冒険者",
  };

  return {
    name: titles[strongestStats[0]],
    strongestStat: strongestStats[0],
  };
}

function getPrimaryStat(stats) {
  const normalizedStats = normalizeStats(stats);
  const entries = Object.entries(normalizedStats);
  const maxValue = Math.max(...entries.map(([, value]) => value));
  const strongestStats = entries.filter(([, value]) => value === maxValue).map(([stat]) => stat);

  return strongestStats.length === 1 ? strongestStats[0] : "BALANCED";
}

function getCharacterClass(stats) {
  const classByStat = {
    STR: "warrior",
    INT: "sage",
    END: "guardian",
    DEX: "ranger",
    BALANCED: "hero",
  };

  return classByStat[getPrimaryStat(stats)] || classByStat.BALANCED;
}

function getCharacterTypeLabel(stats) {
  const labels = {
    warrior: "戦士タイプ",
    sage: "賢者タイプ",
    guardian: "守護者タイプ",
    ranger: "レンジャータイプ",
    hero: "勇者タイプ",
  };

  return labels[getCharacterClass(stats)] || labels.hero;
}

function getCharacterStageName(level) {
  if (level >= 61) {
    return "stage-4";
  }
  if (level >= 31) {
    return "stage-3";
  }
  if (level >= 11) {
    return "stage-2";
  }
  return "stage-1";
}

function getCharacterImagePath(level, stats) {
  return `assets/characters/${getCharacterClass(stats)}/${getCharacterStageName(level)}.png`;
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

function getWeeklyReport() {
  const weekStart = getWeekKey();
  const weeklyLogs = progress.activityLog.filter((item) => {
    const diff = getDayDifference(weekStart, item.dateKey);
    return diff >= 0 && diff < 7;
  });

  return weeklyLogs.reduce(
    (summary, item) => {
      const stat = ["STR", "INT", "END", "DEX"].includes(item.stat) ? item.stat : inferQuestStat({ title: item.questTitle });
      return {
        completed: summary.completed + 1,
        xp: summary.xp + item.xpReward,
        gold: summary.gold + item.goldReward,
        stats: {
          ...summary.stats,
          [stat]: summary.stats[stat] + 1,
        },
      };
    },
    {
      completed: 0,
      xp: 0,
      gold: 0,
      stats: {
        STR: 0,
        INT: 0,
        END: 0,
        DEX: 0,
      },
    },
  );
}

function formatWeeklyStatGrowth(stats) {
  const entries = ["STR", "INT", "END", "DEX"]
    .map((stat) => ({ stat, value: stats[stat] || 0 }))
    .filter((item) => item.value > 0);

  if (entries.length === 0) {
    return "まだありません";
  }

  return entries.map((item) => `${getStatLabel(item.stat)} +${item.value}`).join(" / ");
}

function createWeeklyReportHistoryItem(report) {
  const weekStart = getWeekKey();
  const stats = normalizeStats(report.stats);
  return {
    weekStart,
    weekEnd: getWeekEndKey(weekStart),
    completed: report.completed,
    xp: report.xp,
    gold: report.gold,
    stats,
    statTotal: stats.STR + stats.INT + stats.END + stats.DEX,
    loginStreak: progress.loginStreak || 0,
    savedAt: new Date().toISOString(),
  };
}

function updateWeeklyReportHistory(report) {
  const item = createWeeklyReportHistoryItem(report);
  const hasRecord = item.completed > 0 || item.xp > 0 || item.gold > 0 || item.statTotal > 0;
  if (!hasRecord) {
    return;
  }

  weeklyReportHistory = [
    item,
    ...weeklyReportHistory.filter((historyItem) => historyItem.weekStart !== item.weekStart),
  ]
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart))
    .slice(-12);
  saveWeeklyReportHistory();
}

function getEstimatedQuestCountToLevel(xp) {
  const averageXp =
    getAllQuests().reduce((total, quest) => total + quest.xpReward, 0) / Math.max(getAllQuests().length, 1);
  return Math.max(1, Math.ceil(getXpToNextLevel(xp) / Math.max(averageXp, 1)));
}

function makeAchievement(id, name, description, conditionText, icon, isUnlocked) {
  return {
    id,
    name,
    description,
    conditionText,
    icon,
    isUnlocked,
  };
}

const questAchievementData = [
  ["quest-1", "はじめの一歩", 1],
  ["quest-3", "見習い冒険者", 3],
  ["quest-5", "小さな依頼人", 5],
  ["quest-10", "駆け出しの旅人", 10],
  ["quest-15", "村の助っ人", 15],
  ["quest-20", "まじめな冒険者", 20],
  ["quest-30", "依頼の達人", 30],
  ["quest-50", "努力の星", 50],
  ["quest-75", "ギルドの期待株", 75],
  ["quest-100", "百の依頼を越えて", 100],
  ["quest-150", "頼れる仲間", 150],
  ["quest-200", "冒険の職人", 200],
  ["quest-300", "こつこつ勇者", 300],
  ["quest-500", "ギルドの柱", 500],
  ["quest-1000", "伝説への道", 1000],
];

const loginStreakAchievementData = [
  ["login-streak-1", "ただいまギルド", 1],
  ["login-streak-3", "3日続いた旅", 3],
  ["login-streak-7", "7日連続の勇者", 7],
  ["login-streak-10", "10日の足あと", 10],
  ["login-streak-14", "2週間の冒険者", 14],
  ["login-streak-21", "21日の努力家", 21],
  ["login-streak-30", "30日の守り人", 30],
  ["login-streak-60", "季節を越える者", 60],
  ["login-streak-100", "百日修行", 100],
  ["login-streak-365", "毎日の英雄", 365],
];

const totalLoginAchievementData = [
  ["login-total-1", "ギルド初訪問", 1],
  ["login-total-5", "いつもの顔", 5],
  ["login-total-10", "常連冒険者", 10],
  ["login-total-30", "ギルドの住人", 30],
  ["login-total-50", "信頼の旅人", 50],
  ["login-total-100", "百日の記録", 100],
  ["login-total-200", "長旅の仲間", 200],
  ["login-total-365", "年間冒険者", 365],
];

const xpAchievementData = [
  ["xp-100", "はじめての経験", 100],
  ["xp-500", "小さな成長", 500],
  ["xp-1000", "学びの光", 1000],
  ["xp-3000", "努力の結晶", 3000],
  ["xp-5000", "成長の証", 5000],
  ["xp-10000", "経験の旅人", 10000],
  ["xp-30000", "知恵の冒険者", 30000],
  ["xp-50000", "伝説の経験値", 50000],
];

const goldAchievementData = [
  ["gold-10", "はじめての金貨", 10],
  ["gold-50", "小さな財布", 50],
  ["gold-100", "金貨集めの見習い", 100],
  ["gold-300", "がんばり貯金", 300],
  ["gold-500", "黄金の努力家", 500],
  ["gold-1000", "宝箱の管理人", 1000],
  ["gold-3000", "金貨の旅商人", 3000],
  ["gold-5000", "黄金ギルドの仲間", 5000],
];

const rewardAchievementData = [
  ["reward-1", "はじめての交換", 1],
  ["reward-3", "小さな楽しみ", 3],
  ["reward-5", "ご褒美ハンター", 5],
  ["reward-10", "交換の達人", 10],
  ["reward-20", "楽しみ上手", 20],
  ["reward-50", "願いを叶える者", 50],
];

const levelAchievementData = [
  ["level-2", "レベルアップの音", 2],
  ["level-5", "ぐんぐん成長中", 5],
  ["level-10", "若き冒険者", 10],
  ["level-20", "中堅ギルド員", 20],
  ["level-30", "頼れる先輩", 30],
  ["level-50", "熟練の冒険者", 50],
  ["level-75", "英雄候補", 75],
  ["level-100", "伝説の入口", 100],
];

const statAchievementData = [
  ["stat-str-10", "力の芽生え", "STR", "力", 10],
  ["stat-str-30", "力自慢", "STR", "力", 30],
  ["stat-str-50", "剛腕の冒険者", "STR", "力", 50],
  ["stat-int-10", "賢さの芽生え", "INT", "賢さ", 10],
  ["stat-int-30", "ひらめき名人", "INT", "賢さ", 30],
  ["stat-int-50", "知恵の探検家", "INT", "賢さ", 50],
  ["stat-end-10", "忍耐の芽生え", "END", "忍耐力", 10],
  ["stat-end-30", "あきらめない心", "END", "忍耐力", 30],
  ["stat-end-50", "粘り強き勇者", "END", "忍耐力", 50],
  ["stat-dex-10", "器用さの芽生え", "DEX", "器用さ", 10],
  ["stat-dex-30", "手先の名人", "DEX", "器用さ", 30],
  ["stat-dex-50", "技の冒険者", "DEX", "器用さ", 50],
];

const balanceAchievementData = [
  ["balance-10", "そろった力", 10],
  ["balance-20", "バランス冒険者", 20],
  ["balance-30", "四つの才能", 30],
  ["balance-40", "万能の見習い", 40],
  ["balance-50", "ギルドの万能者", 50],
];

const weekdayAchievementData = [
  ["weekday-1", "月曜の一歩", 1, "月曜日"],
  ["weekday-2", "火曜の努力家", 2, "火曜日"],
  ["weekday-3", "水曜のひらめき", 3, "水曜日"],
  ["weekday-4", "木曜のねばり", 4, "木曜日"],
  ["weekday-5", "金曜の達成者", 5, "金曜日"],
  ["weekday-6", "土曜の冒険者", 6, "土曜日"],
  ["weekday-0", "日曜の勇者", 0, "日曜日"],
];

const ACHIEVEMENTS = [
  ...questAchievementData.map(([id, name, count]) =>
    makeAchievement(id, name, "クエスト達成を積み重ねた証", `クエスト${count}回達成`, "📜", (ctx) => ctx.questTotal >= count),
  ),
  ...loginStreakAchievementData.map(([id, name, days]) =>
    makeAchievement(id, name, "毎日ギルドへ通った証", `${days}日連続ログイン`, "🔥", (ctx) => ctx.loginStreak >= days),
  ),
  ...totalLoginAchievementData.map(([id, name, days]) =>
    makeAchievement(id, name, "ギルドを訪れ続けた記録", `累計${days}日ログイン`, "🏰", (ctx) => ctx.totalLoginDays >= days),
  ),
  ...xpAchievementData.map(([id, name, xp]) =>
    makeAchievement(id, name, "経験を積み重ねた証", `累計XP${xp}獲得`, "✨", (ctx) => ctx.xp >= xp),
  ),
  ...goldAchievementData.map(([id, name, gold]) =>
    makeAchievement(id, name, "金貨を集めた努力の証", `累計Gold${gold}獲得`, "🪙", (ctx) => ctx.totalGoldEarned >= gold),
  ),
  ...rewardAchievementData.map(([id, name, count]) =>
    makeAchievement(id, name, "ご褒美を上手に使った証", `ご褒美を${count}回交換`, "🎁", (ctx) => ctx.rewardExchangeCount >= count),
  ),
  ...levelAchievementData.map(([id, name, level]) =>
    makeAchievement(id, name, "レベルアップで成長した証", `Lv${level}到達`, "⭐", (ctx) => ctx.level >= level),
  ),
  ...statAchievementData.map(([id, name, stat, label, value]) =>
    makeAchievement(id, name, "能力が伸びた証", `${label}が${value}到達`, "⚔", (ctx) => ctx.stats[stat] >= value),
  ),
  ...balanceAchievementData.map(([id, name, value]) =>
    makeAchievement(id, name, "4つの能力をバランスよく育てた証", `全ステータス${value}到達`, "⚖", (ctx) => Object.values(ctx.stats).every((stat) => stat >= value)),
  ),
  ...weekdayAchievementData.map(([id, name, day, label]) =>
    makeAchievement(id, name, "曜日ごとの挑戦を達成した証", `${label}にクエスト達成`, "🗓", (ctx) => ctx.questWeekdays.includes(day)),
  ),
  makeAchievement("weekday-all", "一週間制覇", "すべての曜日で挑戦した証", "月〜日すべてでクエスト達成", "🌈", (ctx) => [0, 1, 2, 3, 4, 5, 6].every((day) => ctx.questWeekdays.includes(day))),
  makeAchievement("morning-quest", "朝の冒険者", "午前中に動き出せた証", "午前中にクエスト達成", "🌅", (ctx) => ctx.hasMorningQuest),
  makeAchievement("night-quest", "夜の努力家", "夜にも努力できた証", "夜にクエスト達成", "🌙", (ctx) => ctx.hasNightQuest),
  makeAchievement("today-1", "今日もできた", "今日の一歩を刻んだ証", "1日に1個クエスト達成", "✅", (ctx) => ctx.todayCompleted >= 1),
  makeAchievement("today-3", "すごい集中力", "今日の集中が光った証", "1日に3個クエスト達成", "💫", (ctx) => ctx.todayCompleted >= 3),
  makeAchievement("today-5", "クエストラッシュ", "一気に進めた証", "1日に5個クエスト達成", "⚡", (ctx) => ctx.todayCompleted >= 5),
  makeAchievement("first-stat", "小さな勝利", "はじめて能力が伸びた証", "はじめてステータスが上がる", "🌱", (ctx) => Object.values(ctx.stats).some((stat) => stat > 0)),
  makeAchievement("first-title", "初めての称号", "新しい称号を得た証", "はじめて称号が変わる", "🏷", (ctx) => ctx.level >= 2 || progress.titleHistory.length > 0),
  makeAchievement("first-gold", "宝箱を開く者", "はじめて金貨を受け取った証", "はじめてGoldを受け取る", "🧰", (ctx) => ctx.totalGoldEarned >= 10),
  makeAchievement("view-growth", "成長の記録者", "成長を見つめた証", "成長画面を開く", "📖", (ctx) => ctx.visitedScreens.includes("growth")),
  makeAchievement("all-menu", "ギルドを歩く者", "すべての場所を訪れた証", "全メニューを1回ずつ開く", "🧭", (ctx) => ACHIEVEMENT_MENU_IDS.every((screen) => ctx.visitedScreens.includes(screen))),
  makeAchievement("weekly-10", "続ける才能", "7日間の積み重ねの証", "7日間で合計10クエスト達成", "🕯", (ctx) => ctx.recentQuestCount(7) >= 10),
  makeAchievement("monthly-50", "小さな伝説", "30日間の努力の証", "30日間で合計50クエスト達成", "👑", (ctx) => ctx.recentQuestCount(30) >= 50),
];

function getAchievementContext() {
  const stats = normalizeStats(progress.stats);
  const todayGrowth = getTodayGrowth();
  const questTotal = Math.max(
    progress.totalQuestCompletions || 0,
    progress.activityLog.length,
    progress.completedQuestIds.length,
  );
  const questWeekdays = normalizeNumberList(progress.questCompletedWeekdays, 0, 6);
  const totalGoldEarned = Math.max(progress.totalGoldEarned || 0, progress.gold || 0);
  const recentQuestCount = (days) =>
    progress.activityLog.filter((item) => {
      const diff = getDayDifference(item.dateKey, getDateKey());
      return diff >= 0 && diff < days;
    }).length;

  return {
    questTotal,
    loginStreak: progress.loginStreak || 0,
    totalLoginDays: progress.totalLoginDays || 0,
    xp: progress.xp || 0,
    totalGoldEarned,
    rewardExchangeCount: rewardHistory.length,
    level: getLevel(progress.xp),
    stats,
    questWeekdays,
    todayCompleted: todayGrowth.completed,
    hasMorningQuest: progress.activityLog.some((item) => item.completedHour < 12),
    hasNightQuest: progress.activityLog.some((item) => item.completedHour >= 18),
    visitedScreens: normalizeStringList(progress.visitedScreens),
    recentQuestCount,
  };
}

function checkAchievements({ showToast = true } = {}) {
  const context = getAchievementContext();
  const newlyUnlocked = ACHIEVEMENTS.filter((achievement) => !unlockedAchievements.includes(achievement.id) && achievement.isUnlocked(context));
  if (newlyUnlocked.length === 0) {
    return [];
  }

  unlockedAchievements = [...unlockedAchievements, ...newlyUnlocked.map((achievement) => achievement.id)];
  saveAchievements();
  renderAchievements();
  renderRecentAchievements();
  if (showToast) {
    showAchievementToast(newlyUnlocked);
  }
  return newlyUnlocked;
}

function showAchievementToast(achievements) {
  const toast = document.querySelector("[data-achievement-toast]");
  if (!toast || achievements.length === 0) {
    return;
  }

  const message =
    achievements.length === 1
      ? `実績解除！ ${achievements[0].name}`
      : `実績解除！ ${achievements.length}件の実績を達成`;
  toast.textContent = message;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  window.clearTimeout(achievementToastTimer);
  achievementToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function markScreenVisited(screenId) {
  const achievementScreenId = screenId === "admin-auth" ? "admin" : screenId;
  if (!ACHIEVEMENT_MENU_IDS.includes(achievementScreenId) || progress.visitedScreens.includes(achievementScreenId)) {
    return;
  }

  progress = {
    ...progress,
    visitedScreens: [...progress.visitedScreens, achievementScreenId],
  };
  saveProgress();
  checkAchievements();
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
  const candidates = [getCharacterImagePath(level, progress.stats)];

  for (let index = characterStages.length - 1; index >= 0; index -= 1) {
    if (level >= characterStages[index].minLevel) {
      candidates.push(characterStages[index].src);
    }
  }

  return candidates.length > 0 ? candidates : [characterStages[0].src];
}

function completeQuest(questId, sourceElement) {
  const quest = getAllQuests().find((item) => item.id === questId);
  if (!quest || !isQuestVisible(quest) || isQuestCompleted(quest)) {
    return;
  }

  const previousLevel = getLevel(progress.xp);
  const previousLevelProgress = getLevelProgress(progress.xp);
  const sourceRect = sourceElement?.getBoundingClientRect();
  const completedAt = new Date();
  const completedAtIso = completedAt.toISOString();
  const completedHour = getJapanHour(completedAt);
  const completedWeekday = getJapanDayOfWeek(completedAt);
  const nextXp = progress.xp + quest.xpReward;
  const nextLevel = getLevel(nextXp);
  const currentStats = normalizeStats(progress.stats);

  progress = {
    ...progress,
    xp: nextXp,
    gold: progress.gold + quest.goldReward,
    totalGoldEarned: Math.max(0, progress.totalGoldEarned || progress.gold || 0) + quest.goldReward,
    totalQuestCompletions: Math.max(0, progress.totalQuestCompletions || 0) + 1,
    questCompletedWeekdays: [...new Set([...normalizeNumberList(progress.questCompletedWeekdays, 0, 6), completedWeekday])].sort((a, b) => a - b),
    stats: {
      ...currentStats,
      [quest.stat]: currentStats[quest.stat] + 1,
    },
    completedQuestIds: [...progress.completedQuestIds, getQuestCompletionKey(quest)],
    streak: updateStreakOnQuestComplete(progress.streak),
    activityLog: [
      {
        id: `activity-${Date.now()}`,
        questTitle: quest.title,
        xpReward: quest.xpReward,
        goldReward: quest.goldReward,
        completedAt: completedAtIso,
        dateKey: getDateKey(completedAt),
        completedHour,
        stat: quest.stat,
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
  sendWeeklyReport();
  playQuestCompleteAnimation(quest.id);
  queueXpChangeAnimation(getLevel(progress.xp) > previousLevel ? 0 : previousLevelProgress);
  showRewardFeedback(quest);
  showFloatingReward(quest, sourceRect);
  checkAchievements();
  showClearFeedback();

  if (getLevel(progress.xp) > previousLevel) {
    playLevelUpAnimation();
  }

  if (shouldPlayEvolution) {
    playEvolutionAnimation();
  }
}

function recalculateStreakFromActivityLog(activityLog, previousBest = 0) {
  const completedDates = [...new Set(activityLog.map((item) => item.dateKey).filter(Boolean))].sort();
  const latestDate = completedDates[completedDates.length - 1] || "";
  if (!latestDate || getDayDifference(latestDate, getDateKey()) > 1) {
    return {
      current: 0,
      best: Math.max(0, previousBest),
      lastCompletedDate: latestDate,
    };
  }

  let current = 1;
  for (let index = completedDates.length - 2; index >= 0; index -= 1) {
    if (getDayDifference(completedDates[index], completedDates[index + 1]) !== 1) {
      break;
    }
    current += 1;
  }

  return {
    current,
    best: Math.max(previousBest || 0, current),
    lastCompletedDate: latestDate,
  };
}

function removeQuestActivityLogItem(activityLog, quest) {
  const index = activityLog.findIndex(
    (item) =>
      item.questTitle === quest.title &&
      item.xpReward === quest.xpReward &&
      item.goldReward === quest.goldReward &&
      item.stat === quest.stat,
  );

  if (index < 0) {
    return activityLog;
  }

  return activityLog.filter((_, itemIndex) => itemIndex !== index);
}

function undoQuestCompletion(questId) {
  if (!isParentMode) {
    showParentAuth();
    return;
  }

  const quest = getAllQuests().find((item) => item.id === questId);
  if (!quest || !isQuestCompleted(quest)) {
    return;
  }

  const confirmed = window.confirm("このクエストを未完了に戻しますか？");
  if (!confirmed) {
    return;
  }

  const completionKey = getQuestCompletionKey(quest);
  const currentStats = normalizeStats(progress.stats);
  const nextActivityLog = removeQuestActivityLogItem(progress.activityLog, quest);
  const nextWeekdays = [...new Set(nextActivityLog.map((item) => item.dateKey ? getJapanDayOfWeek(new Date(`${item.dateKey}T00:00:00+09:00`)) : null))]
    .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    .sort((a, b) => a - b);

  progress = {
    ...progress,
    xp: Math.max(0, progress.xp - quest.xpReward),
    gold: Math.max(0, progress.gold - quest.goldReward),
    totalGoldEarned: Math.max(0, (progress.totalGoldEarned || 0) - quest.goldReward),
    totalQuestCompletions: Math.max(0, (progress.totalQuestCompletions || 0) - 1),
    questCompletedWeekdays: nextWeekdays,
    stats: {
      ...currentStats,
      [quest.stat]: Math.max(0, currentStats[quest.stat] - 1),
    },
    completedQuestIds: progress.completedQuestIds.filter((id) => id !== completionKey),
    activityLog: nextActivityLog,
    streak: recalculateStreakFromActivityLog(nextActivityLog, progress.streak?.best || 0),
  };

  saveProgress();
  render();
}

function closeCompleteConfirm() {
  const dialog = document.querySelector("[data-complete-confirm]");
  if (dialog) {
    dialog.hidden = true;
  }
  pendingCompleteQuestId = "";
  pendingCompleteSourceElement = null;
}

function openCompleteConfirm(questId, sourceElement) {
  const quest = getAllQuests().find((item) => item.id === questId);
  if (!quest || !isQuestVisible(quest) || isQuestCompleted(quest)) {
    return;
  }

  const dialog = document.querySelector("[data-complete-confirm]");
  const title = document.querySelector("[data-complete-confirm-title]");
  if (!dialog) {
    completeQuest(questId, sourceElement);
    return;
  }

  pendingCompleteQuestId = questId;
  pendingCompleteSourceElement = sourceElement;
  if (title) {
    title.textContent = `「${quest.title}」を達成しますか？`;
  }
  dialog.hidden = false;
}

function confirmCompleteQuest() {
  const questId = pendingCompleteQuestId;
  const sourceElement = pendingCompleteSourceElement;
  closeCompleteConfirm();
  if (!questId) {
    return;
  }

  sourceElement?.classList.add("is-pressing");
  window.setTimeout(() => {
    sourceElement?.classList.remove("is-pressing");
    completeQuest(questId, sourceElement);
  }, 180);
}

function setBackupMessage(message, isError = false) {
  const element = document.querySelector("[data-backup-message]");
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function createBackupData() {
  const storage = {};
  BACKUP_STORAGE_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      storage[key] = value;
    }
  });

  return {
    app: "sora-quest",
    version: 1,
    exportedAt: new Date().toISOString(),
    storage,
  };
}

function downloadBackup() {
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const backup = createBackupData();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "guild-backup.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setBackupMessage("バックアップを作成しました");
}

function normalizeBackupStorage(parsedBackup) {
  const storage = parsedBackup?.storage && typeof parsedBackup.storage === "object" ? parsedBackup.storage : parsedBackup;
  if (!storage || typeof storage !== "object" || Array.isArray(storage)) {
    return null;
  }

  const normalizedStorage = {};
  BACKUP_STORAGE_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(storage, key)) {
      const value = storage[key];
      normalizedStorage[key] = typeof value === "string" ? value : JSON.stringify(value);
    }
  });

  return Object.keys(normalizedStorage).length > 0 ? normalizedStorage : null;
}

function isValidBackupStorage(storage) {
  return Object.values(storage).every((value) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  });
}

function restoreBackupFromText(text) {
  let parsedBackup;
  try {
    parsedBackup = JSON.parse(text);
  } catch {
    setBackupMessage("バックアップファイルを読み込めませんでした", true);
    return;
  }

  const storage = normalizeBackupStorage(parsedBackup);
  if (!storage) {
    setBackupMessage("そらクエストのバックアップではありません", true);
    return;
  }
  if (!isValidBackupStorage(storage)) {
    setBackupMessage("バックアップの中身が壊れている可能性があります", true);
    return;
  }

  const confirmed = window.confirm("現在のデータをバックアップ内容で上書きします。よろしいですか？");
  if (!confirmed) {
    setBackupMessage("復元をキャンセルしました");
    return;
  }

  Object.entries(storage).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  progress = loadProgress();
  managedQuests = loadManagedQuests();
  rewards = loadRewards();
  rewardHistory = loadRewardHistory();
  unlockedAchievements = loadAchievements();
  weeklyReportHistory = loadWeeklyReportHistory();
  progress = reconcileProgressFromHistory(progress);
  editingQuestId = null;
  editingRewardId = null;
  isQuestCreateOpen = false;
  saveProgress();
  render();
  setBackupMessage("バックアップから復元しました");
}

function handleBackupFileChange(event) {
  if (!isParentUnlocked) {
    showParentAuth();
    return;
  }

  const input = event.currentTarget;
  const file = input.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    restoreBackupFromText(String(reader.result || ""));
    input.value = "";
  });
  reader.addEventListener("error", () => {
    setBackupMessage("ファイルの読み込みに失敗しました", true);
    input.value = "";
  });
  reader.readAsText(file);
}

function setResetMessage(message, isError = false) {
  const element = document.querySelector("[data-reset-message]");
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function getResetTargetLabel(target) {
  const labels = {
    "quest-completions": "クエスト完了状態",
    progress: "Gold / XP / レベル",
    achievements: "実績バッジ",
    login: "ログインボーナス / 連続ログイン",
    all: "すべてのデータ",
  };
  return labels[target] || labels["quest-completions"];
}

function applyResetTarget(target) {
  if (target === "quest-completions") {
    progress = {
      ...progress,
      completedQuestIds: [],
    };
    saveProgress();
    return;
  }

  if (target === "progress") {
    progress = {
      ...progress,
      xp: 0,
      gold: 0,
      totalGoldEarned: 0,
      titleHistory: [],
    };
    saveProgress();
    return;
  }

  if (target === "achievements") {
    unlockedAchievements = [];
    saveAchievements();
    return;
  }

  if (target === "login") {
    progress = {
      ...progress,
      lastLoginBonusDate: "",
      loginStreak: 0,
      totalLoginDays: 0,
    };
    saveProgress();
    return;
  }

  if (target === "all") {
    BACKUP_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    progress = getDefaultProgressState();
    managedQuests = getDefaultManagedQuests();
    rewards = [];
    rewardHistory = [];
    unlockedAchievements = [];
    weeklyReportHistory = [];
    saveProgress();
    saveManagedQuests();
    saveRewards();
    saveRewardHistory();
    saveAchievements();
    saveWeeklyReportHistory();
  }
}

function resetSelectedData() {
  if (!isParentMode) {
    setResetMessage("親モード中のみリセットできます", true);
    return;
  }

  const select = document.querySelector("[data-reset-target]");
  const target = select?.value || "quest-completions";
  const label = getResetTargetLabel(target);
  const firstConfirmed = window.confirm(`${label}をリセットしますか？\n先にバックアップを取ることをおすすめします。`);
  if (!firstConfirmed) {
    setResetMessage("リセットをキャンセルしました");
    return;
  }

  const secondConfirmed = window.confirm("この操作は元に戻せません。実行しますか？");
  if (!secondConfirmed) {
    setResetMessage("リセットをキャンセルしました");
    return;
  }

  applyResetTarget(target);
  editingQuestId = null;
  editingRewardId = null;
  isQuestCreateOpen = false;
  render();
  setResetMessage(`${label}をリセットしました`);
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
  markScreenVisited(activeNavId);
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
    category: formData.get("category"),
    priority: formData.get("priority"),
    frequency: formData.get("frequency"),
    scheduleDays: formData.getAll("scheduleDays"),
    stat: formData.get("stat"),
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

  if (quest.frequency === "weekday" && quest.scheduleDays.length === 0) {
    if (message) {
      message.textContent = "曜日を1つ以上選んでください";
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

function handleParentNoteSubmit(event) {
  event.preventDefault();
  if (!isParentMode) {
    showParentAuth();
    return;
  }

  const form = event.currentTarget;
  const input = form.querySelector("[data-parent-note-input]");
  const message = form.querySelector("[data-parent-note-message]");
  saveParentNote(getDateKey(), input?.value || "");
  renderParentNote();
  if (message) {
    message.textContent = "今日のひとことを保存しました";
  }
}

function clearParentNote() {
  if (!isParentMode) {
    showParentAuth();
    return;
  }

  saveParentNote(getDateKey(), "");
  renderParentNote();
  const message = document.querySelector("[data-parent-note-message]");
  if (message) {
    message.textContent = "今日のひとことを削除しました";
  }
}

function renderWeekdayPicker(selectedDays = [], hidden = true) {
  const normalizedDays = normalizeScheduleDays(selectedDays);
  return `
    <fieldset class="weekday-picker" data-weekday-picker${hidden ? " hidden" : ""}>
      <legend>表示する曜日</legend>
      <div class="weekday-options">
        ${WEEKDAY_LABELS.map(
          (label, day) => `
            <label>
              <input type="checkbox" name="scheduleDays" value="${day}"${normalizedDays.includes(day) ? " checked" : ""}>
              <span>${label}</span>
            </label>
          `,
        ).join("")}
      </div>
    </fieldset>
  `;
}

function updateWeekdayPicker(form) {
  const picker = form?.querySelector("[data-weekday-picker]");
  const frequency = form?.querySelector('[name="frequency"]')?.value;
  if (!picker) {
    return;
  }

  picker.hidden = frequency !== "weekday";
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
    updateWeekdayPicker(form);
    return;
  }

  if (!toggleButton) {
    return;
  }

  toggleButton.hidden = false;
  form.hidden = !isQuestCreateOpen;
  toggleButton.setAttribute("aria-expanded", String(isQuestCreateOpen));
  toggleButton.textContent = isQuestCreateOpen ? "追加フォームを閉じる" : "新しいクエスト追加";
  updateWeekdayPicker(form);
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
    const priorityLabel = getQuestPriorityLabel(quest.priority);
    item.className = `managed-quest-item managed-quest-${quest.type} managed-quest-category-${quest.category}`;

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
            クエスト分類
            <select name="category">
              <option value="daily_required"${quest.category === "daily_required" ? " selected" : ""}>毎日クエスト</option>
              <option value="challenge"${quest.category === "challenge" ? " selected" : ""}>チャレンジクエスト</option>
            </select>
          </label>
          <label>
            優先度
            <select name="priority">
              <option value="high"${quest.priority === "high" ? " selected" : ""}>高</option>
              <option value="medium"${quest.priority === "medium" ? " selected" : ""}>中</option>
              <option value="low"${quest.priority === "low" ? " selected" : ""}>低</option>
            </select>
          </label>
          <label>
            繰り返し設定
            <select name="frequency">
              <option value="daily"${quest.frequency === "daily" ? " selected" : ""}>毎日</option>
              <option value="weekly"${quest.frequency === "weekly" ? " selected" : ""}>毎週</option>
              <option value="weekday"${quest.frequency === "weekday" ? " selected" : ""}>曜日指定</option>
              <option value="once"${quest.frequency === "once" ? " selected" : ""}>単発</option>
            </select>
          </label>
          ${renderWeekdayPicker(quest.scheduleDays, quest.frequency !== "weekday")}
          <label>
            成長する能力
            <select name="stat">
              <option value="STR"${quest.stat === "STR" ? " selected" : ""}>力</option>
              <option value="INT"${quest.stat === "INT" ? " selected" : ""}>賢さ</option>
              <option value="END"${quest.stat === "END" ? " selected" : ""}>忍耐力</option>
              <option value="DEX"${quest.stat === "DEX" ? " selected" : ""}>器用さ</option>
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
            <div class="quest-title-badges">
              ${typeLabel ? `<span class="quest-type-badge quest-type-${quest.type}">${typeLabel}</span>` : ""}
              <span class="quest-category-badge quest-category-${quest.category}">${getQuestCategoryLabel(quest.category)}</span>
              <span class="quest-priority-badge priority-${quest.priority}">${priorityLabel}</span>
              <span class="quest-frequency-badge">${getQuestFrequencyLabel(quest.frequency, quest.scheduleDays)}</span>
            </div>
          </div>
          <p>${escapeHtml(quest.description)}</p>
          <div class="reward-row">
            <span class="reward-badge">XP +${quest.xpReward}</span>
            <span class="reward-badge">Gold +${quest.goldReward}</span>
            <span class="stat-reward-badge stat-${quest.stat}">${getStatLabel(quest.stat)} +1</span>
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
    category: formData.get("category"),
    priority: formData.get("priority"),
    frequency: formData.get("frequency"),
    scheduleDays: formData.getAll("scheduleDays"),
    stat: formData.get("stat"),
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

  if (quest.frequency === "weekday" && quest.scheduleDays.length === 0) {
    if (message) {
      message.textContent = "曜日を1つ以上選んでください";
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
    completedQuestIds: progress.completedQuestIds.filter((id) => id !== questId && !id.startsWith(`${questId}:`)),
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
  checkAchievements();
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
  const category = QUEST_CATEGORY_ORDER.includes(activeQuestCategory) ? activeQuestCategory : "daily_required";
  const visibleQuests = getVisibleQuestsByCategory(category);
  const categoryFlavor = getQuestCategoryFlavor(category);

  document.querySelectorAll("[data-quest-category-tab]").forEach((tab) => {
    const isActive = tab.dataset.questCategoryTab === category;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  QUEST_CATEGORY_ORDER.forEach((questCategory) => {
    const categoryQuests = getVisibleQuestsByCategory(questCategory);
    const completedCount = categoryQuests.filter(isQuestCompleted).length;
    const totalCount = categoryQuests.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const summary = document.querySelector(`[data-quest-category-summary="${questCategory}"]`);
    const count = document.querySelector(`[data-quest-category-count="${questCategory}"]`);
    const bar = document.querySelector(`[data-quest-category-bar="${questCategory}"]`);
    const message = document.querySelector(`[data-quest-category-message="${questCategory}"]`);
    const isComplete = totalCount > 0 && completedCount === totalCount;

    if (summary) {
      summary.classList.toggle("is-active", questCategory === category);
      summary.classList.toggle("is-complete", isComplete);
      if (
        questCategory === "daily_required" &&
        isComplete &&
        !previousDailyRequiredComplete &&
        hasRenderedQuestCategoryProgress
      ) {
        summary.classList.remove("is-daily-clear");
        void summary.offsetWidth;
        summary.classList.add("is-daily-clear");
      }
    }
    if (count) {
      count.textContent = `${completedCount} / ${totalCount}`;
    }
    if (bar) {
      bar.style.width = `${progressPercent}%`;
    }
    if (message) {
      if (questCategory === "daily_required") {
        if (totalCount === 0) {
          message.textContent = "ギルドマスターに任務を作ってもらいましょう。";
        } else if (isComplete) {
          message.textContent = "今日の分、達成！ よくがんばりました。";
        } else {
          message.textContent = `あと${totalCount - completedCount}件で今日の分が完了です。`;
        }
      } else if (totalCount === 0) {
        message.textContent = "余力がある日に挑戦できます。";
      } else if (isComplete) {
        message.textContent = "追加依頼も達成しました。";
      } else {
        message.textContent = "できたら挑戦の追加依頼です。";
      }
    }

    if (questCategory === "daily_required") {
      previousDailyRequiredComplete = isComplete;
    }
  });
  hasRenderedQuestCategoryProgress = true;

  if (visibleQuests.length === 0) {
    const empty = document.createElement("article");
    empty.className = `quest-empty-card quest-empty-${category}`;
    empty.innerHTML = `
      <span>${categoryFlavor.kicker}</span>
      <h3>${categoryFlavor.emptyTitle}</h3>
      <p>${categoryFlavor.emptyText}</p>
      <button type="button" data-open-guild>ギルドへ行く</button>
    `;
    list.append(empty);
    return;
  }

  visibleQuests.forEach((quest) => {
    const completed = isQuestCompleted(quest);
    const typeLabel = getQuestTypeLabel(quest.type);
    const frequencyLabel = getQuestFrequencyLabel(quest.frequency, quest.scheduleDays);
    const priorityLabel = getQuestPriorityLabel(quest.priority);
    const card = document.createElement("article");
    card.className = `quest-card quest-card-${quest.type} quest-card-category-${quest.category} quest-card-priority-${quest.priority}${completed ? " is-completed" : ""}`;
    card.dataset.questCard = quest.id;

    card.innerHTML = `
      <div class="quest-title-row">
        <h3>${escapeHtml(quest.title)}</h3>
        <div class="quest-title-badges">
          ${typeLabel ? `<span class="quest-type-badge quest-type-${quest.type}">${typeLabel}</span>` : ""}
          <span class="quest-category-badge quest-category-${quest.category}">${categoryFlavor.kicker}</span>
          ${quest.category === "challenge" ? '<span class="quest-bonus-badge">ボーナス</span>' : ""}
          <span class="quest-priority-badge priority-${quest.priority}">${priorityLabel}</span>
          <span class="quest-frequency-badge">${frequencyLabel}</span>
          ${completed ? '<span class="status-badge">完了済み</span>' : ""}
        </div>
      </div>
      <p>${escapeHtml(quest.description)}</p>
      <div class="reward-row">
        <span class="reward-badge">XP +${quest.xpReward}</span>
        <span class="reward-badge">Gold +${quest.goldReward}</span>
        <span class="stat-reward-badge stat-${quest.stat}">${getStatLabel(quest.stat)} +1</span>
      </div>
      <button class="complete-button" type="button" data-complete="${quest.id}" ${completed ? "disabled" : ""}>
        ${completed ? "達成済み" : "完了"}
      </button>
      ${
        completed && isParentMode
          ? `<button class="undo-complete-button" type="button" data-undo-complete="${escapeHtml(quest.id)}">未完了に戻す</button>`
          : ""
      }
    `;

    list.append(card);
  });
}

function switchQuestCategory(category) {
  if (!QUEST_CATEGORY_ORDER.includes(category) || activeQuestCategory === category) {
    return;
  }

  activeQuestCategory = category;
  renderQuests();
}

function switchQuestCategoryByDirection(direction) {
  const currentIndex = QUEST_CATEGORY_ORDER.indexOf(activeQuestCategory);
  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), QUEST_CATEGORY_ORDER.length - 1);
  switchQuestCategory(QUEST_CATEGORY_ORDER[nextIndex]);
}

function renderHomeDailyMission() {
  const card = document.querySelector("[data-home-daily-mission]");
  if (!card) {
    return;
  }

  const { completedCount, totalCount, remainingCount, progressPercent, isComplete } = getDailyRequiredQuestSummary();
  const count = document.querySelector("[data-home-daily-count]");
  const bar = document.querySelector("[data-home-daily-bar]");
  const message = document.querySelector("[data-home-daily-message]");
  const action = document.querySelector("[data-home-daily-mission] [data-open-guild]");

  if (count) {
    count.textContent = `${completedCount} / ${totalCount}`;
  }
  if (bar) {
    bar.style.width = `${progressPercent}%`;
  }
  if (message) {
    if (totalCount === 0) {
      message.textContent = "任務はまだありません。ギルドマスターに今日の任務を作ってもらいましょう。";
    } else if (isComplete) {
      message.textContent = "今日の分、達成！ よくがんばりました。";
    } else {
      message.textContent = `あと${remainingCount}件で今日の任務が完了です。`;
    }
  }
  if (action) {
    action.hidden = totalCount !== 0;
  }

  card.classList.toggle("is-complete", isComplete);
  card.classList.toggle("is-empty", totalCount === 0);
}

function renderAppReminder() {
  const summary = getDailyRequiredQuestSummary();
  const reminder = document.querySelector("[data-home-reminder]");
  const reminderText = document.querySelector("[data-home-reminder-text]");
  const badge = document.querySelector("[data-quest-nav-badge]");

  if (reminderText) {
    if (summary.totalCount === 0) {
      reminderText.textContent = "今日の任務はありません。";
    } else if (summary.isComplete) {
      reminderText.textContent = "今日の分、達成！";
    } else {
      reminderText.textContent = "今日の任務がまだ残っています";
    }
  }
  if (reminder) {
    reminder.classList.toggle("is-complete", summary.isComplete);
    reminder.classList.toggle("is-empty", summary.totalCount === 0);
  }
  if (badge) {
    badge.hidden = summary.remainingCount === 0;
    badge.textContent = String(summary.remainingCount);
    badge.setAttribute("aria-label", `毎日クエスト未完了 ${summary.remainingCount}件`);
  }
}

function renderParentNote() {
  const todayKey = getDateKey();
  const note = getParentNote(todayKey);
  const text = document.querySelector("[data-parent-note-text]");
  const input = document.querySelector("[data-parent-note-input]");
  const date = document.querySelector("[data-parent-note-date]");
  const message = document.querySelector("[data-parent-note-message]");

  if (text) {
    text.textContent = note || "今日のひとことはまだありません";
    text.classList.toggle("is-empty", !note);
  }
  if (input && input.value !== note) {
    input.value = note;
  }
  if (date) {
    date.textContent = todayKey;
  }
  if (message) {
    message.textContent = "";
    message.classList.remove("is-error");
  }
}

function playQuestCompleteAnimation(questId) {
  const card = [...document.querySelectorAll("[data-quest-card]")].find((item) => item.dataset.questCard === questId);
  if (!card) {
    return;
  }

  card.classList.remove("is-quest-complete-flash");
  void card.offsetWidth;
  card.classList.add("is-quest-complete-flash");

  window.clearTimeout(questCompleteTimer);
  questCompleteTimer = window.setTimeout(() => {
    card.classList.remove("is-quest-complete-flash");
  }, 1400);
}

function renderTodayQuests() {
  const list = document.querySelector("[data-today-quest-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";
  const todayQuests = getVisibleQuests();
  const completedCount = todayQuests.filter(isQuestCompleted).length;
  const totalCount = todayQuests.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const progressCard = document.querySelector("[data-today-progress]");
  const progressCount = document.querySelector("[data-today-progress-count]");
  const progressBar = document.querySelector("[data-today-progress-bar]");
  const progressMessage = document.querySelector("[data-today-progress-message]");

  if (progressCount) {
    progressCount.textContent = `${completedCount} / ${totalCount}`;
  }
  if (progressBar) {
    progressBar.style.width = `${progressPercent}%`;
  }
  if (progressMessage) {
    if (totalCount === 0) {
      progressMessage.textContent = "今日はクエストがありません。ゆっくり整えましょう。";
    } else if (completedCount === totalCount) {
      progressMessage.textContent = "今日のクエストをすべて達成しました！";
    } else {
      progressMessage.textContent = `あと${totalCount - completedCount}件で今日の依頼は完了です。`;
    }
  }
  if (progressCard) {
    progressCard.classList.toggle("is-complete", totalCount > 0 && completedCount === totalCount);
    progressCard.classList.toggle("is-empty", totalCount === 0);
  }

  if (totalCount === 0) {
    const empty = document.createElement("p");
    empty.className = "today-quest-empty";
    empty.textContent = "今日はクエストがありません";
    list.append(empty);
    return;
  }

  todayQuests.slice(0, 3).forEach((quest) => {
    const completed = isQuestCompleted(quest);
    const typeLabel = getQuestTypeLabel(quest.type);
    const frequencyLabel = getQuestFrequencyLabel(quest.frequency, quest.scheduleDays);
    const priorityLabel = getQuestPriorityLabel(quest.priority);
    const item = document.createElement("article");
    item.className = `today-quest-item today-quest-${quest.type} today-priority-${quest.priority}${completed ? " is-completed" : ""}`;

    item.innerHTML = `
      <div>
        <div class="today-quest-title-row">
          <h4>${escapeHtml(quest.title)}</h4>
          <div class="quest-title-badges">
            ${typeLabel ? `<span class="quest-type-badge quest-type-${quest.type}">${typeLabel}</span>` : ""}
            <span class="quest-priority-badge priority-${quest.priority}">${priorityLabel}</span>
            <span class="quest-frequency-badge">${frequencyLabel}</span>
          </div>
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

  toast.textContent =
    quest.category === "challenge"
      ? `追加依頼達成！ ボーナス獲得！ XP +${quest.xpReward} / Gold +${quest.goldReward}`
      : `クエスト達成！ XP +${quest.xpReward} / Gold +${quest.goldReward}`;
  toast.classList.toggle("is-challenge", quest.category === "challenge");
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  window.clearTimeout(rewardToastTimer);
  rewardToastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible", "is-challenge");
  }, 1300);
}

function playLoginBonusToast(message, duration = 1800) {
  const toast = document.querySelector("[data-login-bonus-toast]");
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  window.clearTimeout(loginBonusTimer);
  loginBonusTimer = window.setTimeout(() => toast.classList.remove("is-visible"), duration);
}

function showAppReminderToast() {
  const toast = document.querySelector("[data-app-reminder-toast]");
  if (!toast || isParentMode) {
    return;
  }

  const summary = getDailyRequiredQuestSummary();
  if (summary.remainingCount <= 0) {
    return;
  }

  toast.textContent = `今日の任務が${summary.remainingCount}つ残っています`;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  window.clearTimeout(appReminderTimer);
  appReminderTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function showLoginBonusToast(loginBonusResult) {
  playLoginBonusToast(`ログインボーナス！ Gold +${LOGIN_BONUS_GOLD}`);

  if (loginBonusResult?.streakBonus) {
    window.setTimeout(() => {
      playLoginBonusToast(`7日連続ログイン達成！ Gold +${LOGIN_STREAK_BONUS_GOLD}`, 2000);
    }, 1050);
  }
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
  const weeklyReport = getWeeklyReport();
  updateWeeklyReportHistory(weeklyReport);
  const xpToNext = getXpToNextLevel(progress.xp);
  const estimatedCount = getEstimatedQuestCountToLevel(progress.xp);
  const subTitle = getSubTitle(progress.stats);

  setText("[data-today-completed]", todayGrowth.completed);
  setText("[data-today-xp]", todayGrowth.xp);
  setText("[data-today-gold]", todayGrowth.gold);
  setText("[data-weekly-completed]", weeklyReport.completed);
  setText("[data-weekly-xp]", weeklyReport.xp);
  setText("[data-weekly-gold]", weeklyReport.gold);
  setText("[data-weekly-stat-growth]", formatWeeklyStatGrowth(weeklyReport.stats));
  setText("[data-weekly-login-streak]", `${progress.loginStreak || 0}日`);
  const weeklyEmpty = document.querySelector("[data-weekly-empty]");
  if (weeklyEmpty) {
    weeklyEmpty.hidden = weeklyReport.completed > 0;
  }
  setText("[data-record-streak-current]", progress.streak.current);
  setText("[data-record-streak-best]", progress.streak.best);
  setText("[data-goal-xp]", `あと${xpToNext}XP`);
  setText("[data-goal-count]", `あと${estimatedCount}回くらいでレベルアップ`);
  setText("[data-current-title-record]", title.name);
  setText("[data-previous-title-record]", getPreviousTitleForRecord(level));
  setText("[data-record-sub-title]", subTitle.name);
  renderGrowthChart();
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

function getGrowthChartValue(item, mode) {
  if (mode === "gold") {
    return item.gold;
  }
  if (mode === "stat") {
    return item.statTotal;
  }
  return item.xp;
}

function getGrowthChartLabel(mode) {
  if (mode === "gold") {
    return "Goldの推移";
  }
  if (mode === "stat") {
    return "ステータス合計の推移";
  }
  return "XPの推移";
}

function renderGrowthChart() {
  const svg = document.querySelector("[data-growth-chart-svg]");
  const frame = document.querySelector("[data-growth-chart-frame]");
  const empty = document.querySelector("[data-growth-chart-empty]");
  const label = document.querySelector("[data-growth-chart-label]");
  const latest = document.querySelector("[data-growth-chart-latest]");
  if (!svg || !frame || !empty) {
    return;
  }

  const points = weeklyReportHistory
    .map(normalizeWeeklyReportHistoryItem)
    .filter(Boolean)
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart))
    .slice(-8);

  document.querySelectorAll("[data-growth-chart-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.growthChartMode === growthChartMode);
  });

  if (points.length < 2) {
    frame.hidden = true;
    empty.hidden = false;
    return;
  }

  const values = points.map((item) => getGrowthChartValue(item, growthChartMode));
  const maxValue = Math.max(...values, 1);
  const width = 320;
  const height = 160;
  const paddingX = 22;
  const paddingY = 18;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;
  const coordinates = values.map((value, index) => {
    const x = paddingX + (chartWidth * index) / Math.max(points.length - 1, 1);
    const y = height - paddingY - (chartHeight * value) / maxValue;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const circles = coordinates
    .map((coordinate) => {
      const [x, y] = coordinate.split(",");
      return `<circle cx="${x}" cy="${y}" r="3.8"></circle>`;
    })
    .join("");

  svg.innerHTML = `
    <line class="chart-axis" x1="${paddingX}" y1="${height - paddingY}" x2="${width - paddingX}" y2="${height - paddingY}"></line>
    <line class="chart-axis" x1="${paddingX}" y1="${paddingY}" x2="${paddingX}" y2="${height - paddingY}"></line>
    <polyline class="chart-line-shadow" points="${coordinates.join(" ")}"></polyline>
    <polyline class="chart-line" points="${coordinates.join(" ")}"></polyline>
    <g class="chart-points">${circles}</g>
  `;
  frame.hidden = false;
  empty.hidden = true;
  if (label) {
    label.textContent = getGrowthChartLabel(growthChartMode);
  }
  if (latest) {
    latest.textContent = values[values.length - 1];
  }
}

function renderAchievements() {
  const list = document.querySelector("[data-achievement-list]");
  const count = document.querySelector("[data-achievement-count]");
  if (!list) {
    return;
  }

  const unlockedSet = new Set(unlockedAchievements);
  const unlockedCount = ACHIEVEMENTS.filter((achievement) => unlockedSet.has(achievement.id)).length;
  if (count) {
    count.textContent = `${unlockedCount} / ${ACHIEVEMENTS.length}`;
  }

  list.innerHTML = "";
  ACHIEVEMENTS.forEach((achievement) => {
    const unlocked = unlockedSet.has(achievement.id);
    const item = document.createElement("article");
    item.className = `achievement-card${unlocked ? " is-unlocked" : ""}`;
    item.innerHTML = `
      <span class="achievement-icon" aria-hidden="true">${achievement.icon}</span>
      <div>
        <h4>${escapeHtml(achievement.name)}</h4>
        <p>${escapeHtml(achievement.description)}</p>
        <small>${escapeHtml(achievement.conditionText)}</small>
      </div>
    `;
    list.append(item);
  });
}

function renderRecentAchievements() {
  const list = document.querySelector("[data-recent-achievement-list]");
  if (!list) {
    return;
  }

  list.innerHTML = "";
  const achievementById = new Map(ACHIEVEMENTS.map((achievement) => [achievement.id, achievement]));
  const recentAchievements = [...unlockedAchievements]
    .reverse()
    .map((id) => achievementById.get(id))
    .filter(Boolean)
    .slice(0, 3);

  if (recentAchievements.length === 0) {
    const empty = document.createElement("p");
    empty.className = "recent-achievement-empty";
    empty.textContent = "まだ実績はありません";
    list.append(empty);
    return;
  }

  recentAchievements.forEach((achievement) => {
    const item = document.createElement("article");
    item.className = "recent-achievement-card";
    item.innerHTML = `
      <span class="recent-achievement-icon" aria-hidden="true">${achievement.icon}</span>
      <div>
        <h4>${escapeHtml(achievement.name)}</h4>
        <p>${escapeHtml(achievement.description)}</p>
      </div>
      <strong>解除済み</strong>
    `;
    list.append(item);
  });
}

function render() {
  applyDailyStreakReset();
  const level = getLevel(progress.xp);
  const title = getTitle(level);
  progress.stats = normalizeStats(progress.stats);
  const subTitle = getSubTitle(progress.stats);
  const titleNameElement = document.querySelector("[data-title-name]");
  const titleDescElement = document.querySelector("[data-title-desc]");
  const titleChanged = currentTitleName !== "" && currentTitleName !== title.name;

  if (titleNameElement) {
    titleNameElement.textContent = title.name;
  }
  if (titleDescElement) {
    titleDescElement.textContent = title.desc;
  }
  setText("[data-sub-title-name]", subTitle.name);
  setText("[data-character-type]", getCharacterTypeLabel(progress.stats));
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
  setText("[data-login-streak]", `${progress.loginStreak}日`);
  setText("[data-record-level]", level);
  setText("[data-record-xp]", progress.xp);
  setText("[data-record-gold]", progress.gold);
  setText("[data-record-completed]", progress.completedQuestIds.length);
  setText("[data-stat-str]", progress.stats.STR);
  setText("[data-stat-int]", progress.stats.INT);
  setText("[data-stat-end]", progress.stats.END);
  setText("[data-stat-dex]", progress.stats.DEX);
  document.querySelectorAll("[data-stat-card]").forEach((card) => {
    card.classList.toggle("is-strongest", card.dataset.statCard === subTitle.strongestStat);
  });

  renderGrowthRecord(level, title);
  renderAchievements();
  renderRecentAchievements();
  renderXpBar();
  renderCharacter(level);
  renderQuests();
  renderHomeDailyMission();
  renderAppReminder();
  renderParentNote();
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
    openCompleteConfirm(completeButton.dataset.complete, completeButton);
    return;
  }

  const undoCompleteButton = event.target.closest("[data-undo-complete]");
  if (undoCompleteButton) {
    undoQuestCompletion(undoCompleteButton.dataset.undoComplete);
    return;
  }

  const completeConfirmButton = event.target.closest("[data-complete-confirm-yes]");
  if (completeConfirmButton) {
    confirmCompleteQuest();
    return;
  }

  const completeCancelButton = event.target.closest("[data-complete-confirm-cancel]");
  if (completeCancelButton) {
    closeCompleteConfirm();
    return;
  }

  const completeConfirmBackdrop = event.target.closest("[data-complete-confirm]");
  if (completeConfirmBackdrop && event.target === completeConfirmBackdrop) {
    closeCompleteConfirm();
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

  const parentNoteClearButton = event.target.closest("[data-parent-note-clear]");
  if (parentNoteClearButton) {
    clearParentNote();
    return;
  }

  const openGuildButton = event.target.closest("[data-open-guild]");
  if (openGuildButton) {
    if (!isParentUnlocked) {
      showParentAuth();
      return;
    }
    switchScreen("admin");
    return;
  }

  const backupDownloadButton = event.target.closest("[data-backup-download]");
  if (backupDownloadButton) {
    downloadBackup();
    return;
  }

  const backupImportButton = event.target.closest("[data-backup-import]");
  if (backupImportButton) {
    if (!isParentUnlocked) {
      showParentAuth();
      return;
    }
    document.querySelector("[data-backup-file]")?.click();
    return;
  }

  const resetExecuteButton = event.target.closest("[data-admin-reset-execute]");
  if (resetExecuteButton) {
    resetSelectedData();
    return;
  }

  const weeklyReportSendButton = event.target.closest("[data-weekly-report-send]");
  if (weeklyReportSendButton) {
    if (!isParentMode) {
      setWeeklyReportSendMessage("親モード中のみ送信できます", true);
      return;
    }
    weeklyReportSendButton.disabled = true;
    setWeeklyReportSendMessage("送信しています...");
    sendWeeklyReport({ manual: true }).finally(() => {
      weeklyReportSendButton.disabled = false;
    });
    return;
  }

  const growthChartModeButton = event.target.closest("[data-growth-chart-mode]");
  if (growthChartModeButton) {
    growthChartMode = growthChartModeButton.dataset.growthChartMode || "xp";
    renderGrowthChart();
    return;
  }

  const questCategoryButton = event.target.closest("[data-quest-category-tab]");
  if (questCategoryButton) {
    switchQuestCategory(questCategoryButton.dataset.questCategoryTab);
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

document.addEventListener("change", (event) => {
  if (event.target.matches('[name="frequency"]')) {
    updateWeekdayPicker(event.target.closest("form"));
    return;
  }

  if (event.target.matches("[data-backup-file]")) {
    handleBackupFileChange(event);
  }
});

document.querySelector("[data-screen='quests']")?.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }
    questSwipeStartX = touch.clientX;
    questSwipeStartY = touch.clientY;
  },
  { passive: true },
);

document.querySelector("[data-screen='quests']")?.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];
    if (!touch || !questSwipeStartX) {
      return;
    }

    const deltaX = touch.clientX - questSwipeStartX;
    const deltaY = touch.clientY - questSwipeStartY;
    questSwipeStartX = 0;
    questSwipeStartY = 0;

    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    switchQuestCategoryByDirection(deltaX < 0 ? 1 : -1);
  },
  { passive: true },
);

document.querySelector("[data-parent-auth-form]")?.addEventListener("submit", handleParentAuthSubmit);
document.querySelector("[data-quest-create-form]")?.addEventListener("submit", handleQuestCreateSubmit);
document.querySelector("[data-reward-create-form]")?.addEventListener("submit", handleRewardCreateSubmit);
document.querySelector("[data-parent-note-form]")?.addEventListener("submit", handleParentNoteSubmit);
document.addEventListener("submit", handleQuestEditSubmit);
document.addEventListener("submit", handleRewardEditSubmit);

if (!progress.visitedScreens.includes("home")) {
  progress = {
    ...progress,
    visitedScreens: [...progress.visitedScreens, "home"],
  };
  saveProgress();
}
const loginBonusResult = applyLoginBonus();
render();
window.setTimeout(showAppReminderToast, loginBonusResult.granted ? 2100 : 450);
if (loginBonusResult.granted) {
  showLoginBonusToast(loginBonusResult);
}
sendWeeklyReport();
const startupAchievements = checkAchievements({ showToast: false });
if (startupAchievements.length > 0) {
  window.setTimeout(() => showAchievementToast(startupAchievements), loginBonusResult.granted ? 2200 : 350);
}
