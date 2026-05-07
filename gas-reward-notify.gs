const NOTIFY_EMAIL = "sasahokofamily@gmail.com";
const WEEKLY_REPORT_SPREADSHEET_ID = "";
const WEEKLY_REPORT_PROPERTY_KEY = "WEEKLY_REPORT_DATA";
const WEEKLY_REPORT_LAST_SENT_WEEK_KEY = "WEEKLY_REPORT_LAST_SENT_WEEK";
const WEEKLY_REPORT_HEADERS = [
  "保存日時",
  "週の開始日",
  "週の終了日",
  "クエスト達成数",
  "獲得XP",
  "獲得Gold",
  "STR増加",
  "INT増加",
  "END増加",
  "DEX増加",
  "連続ログイン日数",
];

// 必要なGAS権限:
// - MailApp.sendEmail: メール送信
// - PropertiesService: 週間レポートの一時保存
// - SpreadsheetApp: weekly_reports シートへの保存
// - ScriptApp: 週次トリガー作成時のみ
// UrlFetchApp.fetch は現在このGAS内では使用していません。
function doPost(e) {
  try {
    if (!e || !e.postData || typeof e.postData.contents !== "string") {
      return createJsonResponse({
        success: false,
        error: "postDataが空です。WebアプリのPOST設定を確認してください。",
      });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents || "{}");
    } catch (parseError) {
      return createJsonResponse({
        success: false,
        error: `JSON.parseに失敗しました: ${parseError.message}`,
      });
    }

    if (data.type === "weeklyReport") {
      const report = saveWeeklyReport(data);
      return createJsonResponse({
        success: true,
        type: "weeklyReport",
        report,
      });
    }

    const name = data.name || "そら";
    const reward = data.reward || "ご褒美";
    const gold = Number(data.gold || 0);
    const remainingGold = Number(data.remainingGold || 0);
    const date = data.date || Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm");
    const adventurerName = formatAdventurerName(name);

    const subject = "【ギルド報告】ご褒美交換のお知らせ";
    const plainText = [
      "【ギルド報告書】",
      "",
      `冒険者${adventurerName}は、見事に任務を達成し、`,
      `報酬として「${reward}」を交換しました。`,
      "",
      `消費：${gold} G`,
      `残り：${remainingGold} G`,
      "",
      "よくがんばりました✨",
      "",
      `日時：${date}`,
    ].join("\n");

    const htmlBody = buildRewardExchangeHtml({
      adventurerName,
      reward,
      gold,
      remainingGold,
      date,
    });

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject,
      body: plainText,
      htmlBody,
    });

    return createJsonResponse({
      success: true,
      type: "rewardExchange",
    });
  } catch (error) {
    console.warn("doPost error", error);
    return createJsonResponse({
      success: false,
      error: error && error.message ? error.message : String(error),
    });
  }
}

function createJsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveWeeklyReport(data) {
  const stats = normalizeStats(data.stats || {
    STR: data.strGain,
    INT: data.intGain,
    END: data.endGain,
    DEX: data.dexGain,
  });

  const report = {
    name: data.name || "そら",
    completed: Number(data.questsCompleted ?? data.completed ?? 0),
    xp: Number(data.xpEarned ?? data.xp ?? 0),
    gold: Number(data.goldEarned ?? data.gold ?? 0),
    currentLevel: Number(data.currentLevel ?? data.level ?? 1),
    stats,
    statGrowth: data.statGrowth || formatStatGrowth(stats),
    loginStreak: Number(data.loginStreak || 0),
    weekStart: data.weekStart || Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd"),
    weekEnd: data.weekEnd || getWeekEndKey(data.weekStart || Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd")),
    savedAt: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm"),
  };

  PropertiesService.getScriptProperties().setProperty(WEEKLY_REPORT_PROPERTY_KEY, JSON.stringify(report));
  saveWeeklyReportToSheet(report);
  return report;
}

function sendWeeklyReport() {
  const properties = PropertiesService.getScriptProperties();
  const currentWeekId = getCurrentWeekId();
  const lastSentWeek = properties.getProperty(WEEKLY_REPORT_LAST_SENT_WEEK_KEY);

  if (lastSentWeek === currentWeekId) {
    console.log(`週間レポートは送信済みです: ${currentWeekId}`);
    return;
  }

  sendWeeklyReportEmail();
  properties.setProperty(WEEKLY_REPORT_LAST_SENT_WEEK_KEY, currentWeekId);
}

function sendWeeklyReportEmail() {
  const stored = PropertiesService.getScriptProperties().getProperty(WEEKLY_REPORT_PROPERTY_KEY);
  const report = stored ? JSON.parse(stored) : null;
  const currentWeekStart = getCurrentWeekStartKey();
  const safeReport = report || {
    name: "そら",
    completed: 0,
    xp: 0,
    gold: 0,
    currentLevel: 1,
    stats: { STR: 0, INT: 0, END: 0, DEX: 0 },
    statGrowth: "まだありません",
    loginStreak: 0,
    weekStart: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd"),
    weekEnd: getWeekEndKey(Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd")),
    savedAt: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm"),
  };
  const isCurrentWeek = safeReport.weekStart === currentWeekStart;
  if (!isCurrentWeek) {
    safeReport.weekStart = currentWeekStart;
    safeReport.weekEnd = getWeekEndKey(currentWeekStart);
  }
  const hasRecord = isCurrentWeek && (safeReport.completed > 0 || safeReport.xp > 0 || safeReport.gold > 0);
  const stats = normalizeStats(safeReport.stats);
  const subject = "【ギルド週報】今週の冒険レポート";
  const plainText = hasRecord
    ? [
        "【ギルド週報】今週の冒険レポート",
        "",
        `${safeReport.name}の今週の冒険記録です。`,
        "",
        `期間：${safeReport.weekStart}〜${safeReport.weekEnd}`,
        `クエスト達成：${safeReport.completed}件`,
        `獲得XP：${safeReport.xp} XP`,
        `獲得Gold：${safeReport.gold} G`,
        `現在レベル：Lv${Number(safeReport.currentLevel || 1)}`,
        `STR：${stats.STR} / INT：${stats.INT} / END：${stats.END} / DEX：${stats.DEX}`,
        `連続ログイン：${safeReport.loginStreak}日`,
        "",
        "今週もよくがんばりました。来週の冒険も楽しみです。",
        "",
        `最終更新：${safeReport.savedAt}`,
      ].join("\n")
    : [
        "【ギルド週報】今週の冒険レポート",
        "",
        "今週の記録はありません。",
        "",
        "次の冒険の準備をして、また少しずつ進めましょう。",
      ].join("\n");

  const htmlBody = buildWeeklyReportHtml(safeReport, hasRecord);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject,
    body: plainText,
    htmlBody,
  });
}

function saveWeeklyReportToSheet(report) {
  try {
    const spreadsheet = getWeeklyReportSpreadsheet();
    if (!spreadsheet) {
      console.warn("週間レポート用スプレッドシートIDが未設定です");
      return;
    }

    const sheet = getOrCreateWeeklyReportSheet(spreadsheet);
    const stats = normalizeStats(report.stats);
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, WEEKLY_REPORT_HEADERS.length).setValues([[
      report.savedAt,
      report.weekStart,
      report.weekEnd || getWeekEndKey(report.weekStart),
      Number(report.completed || 0),
      Number(report.xp || 0),
      Number(report.gold || 0),
      Number(stats.STR || 0),
      Number(stats.INT || 0),
      Number(stats.END || 0),
      Number(stats.DEX || 0),
      Number(report.loginStreak || 0),
    ]]);
    formatWeeklyReportSheet(sheet);
  } catch (error) {
    console.warn("週間レポートのスプレッドシート保存に失敗しました", error);
  }
}

function getWeeklyReportSpreadsheet() {
  if (WEEKLY_REPORT_SPREADSHEET_ID) {
    return SpreadsheetApp.openById(WEEKLY_REPORT_SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateWeeklyReportSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("weekly_reports") || spreadsheet.insertSheet("weekly_reports");
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, WEEKLY_REPORT_HEADERS.length).setValues([WEEKLY_REPORT_HEADERS]);
  }
  formatWeeklyReportSheet(sheet);
  return sheet;
}

function formatWeeklyReportSheet(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastColumn = WEEKLY_REPORT_HEADERS.length;
  const headerRange = sheet.getRange(1, 1, 1, lastColumn);
  const tableRange = sheet.getRange(1, 1, lastRow, lastColumn);

  headerRange
    .setBackground("#5b3a1f")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  sheet.setFrozenRows(1);
  tableRange.setBorder(true, true, true, true, true, true, "#d3ad5c", SpreadsheetApp.BorderStyle.SOLID);

  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
    dataRange.setVerticalAlignment("middle");
    sheet.getRange(2, 1, lastRow - 1, 3).setNumberFormat("yyyy/mm/dd").setHorizontalAlignment("center");
    sheet.getRange(2, 4, lastRow - 1, 8).setHorizontalAlignment("center");
  }

  sheet.autoResizeColumns(1, lastColumn);
}

function getCurrentWeekStartKey() {
  const now = new Date();
  const year = Number(Utilities.formatDate(now, "Asia/Tokyo", "yyyy"));
  const month = Number(Utilities.formatDate(now, "Asia/Tokyo", "MM"));
  const day = Number(Utilities.formatDate(now, "Asia/Tokyo", "dd"));
  const japanDate = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = japanDate.getUTCDay() || 7;
  japanDate.setUTCDate(japanDate.getUTCDate() - dayOfWeek + 1);
  return Utilities.formatDate(japanDate, "UTC", "yyyy-MM-dd");
}

function getCurrentWeekId() {
  const weekStartKey = getCurrentWeekStartKey();
  const parts = weekStartKey.split("-").map(Number);
  const weekStart = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  const thursday = new Date(weekStart);
  thursday.setUTCDate(weekStart.getUTCDate() + 3);
  const firstThursday = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4));
  const firstWeekStart = new Date(firstThursday);
  firstWeekStart.setUTCDate(firstThursday.getUTCDate() - ((firstThursday.getUTCDay() || 7) - 1));
  const weekNumber = Math.floor((weekStart - firstWeekStart) / 604800000) + 1;
  return `${thursday.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

function getWeekEndKey(weekStartKey) {
  const parts = String(weekStartKey).split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return "";
  }
  const weekEnd = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);
  return Utilities.formatDate(weekEnd, "UTC", "yyyy-MM-dd");
}

function setupWeeklyReportTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => ["sendWeeklyReport", "sendWeeklyReportEmail"].includes(trigger.getHandlerFunction()))
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger("sendWeeklyReport")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(9)
    .create();
}

function buildWeeklyReportHtml(report, hasRecord) {
  const stats = normalizeStats(report.stats);
  const period = `${report.weekStart || ""} 〜 ${report.weekEnd || getWeekEndKey(report.weekStart) || ""}`;
  const currentLevel = Number(report.currentLevel || report.level || 1);
  const message = hasRecord
    ? "今週もよくがんばりました。来週の冒険も楽しみです。"
    : "今週の記録はありません。次の冒険の準備をして、また少しずつ進めましょう。";

  return `
    <div style="margin:0;padding:28px 14px;background:#eadcc1;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic',Meiryo,sans-serif;color:#3d291d;">
      <div style="max-width:600px;margin:0 auto;padding:10px;border:1px solid #8b6530;border-radius:18px;background:#6b4526;box-shadow:0 18px 34px rgba(45,27,15,0.28);">
        <div style="padding:24px 22px;border:2px solid #d2ad5b;border-radius:14px;background:#fff3d7;background-image:linear-gradient(135deg,rgba(111,77,59,0.035) 0 1px,transparent 1px 8px),linear-gradient(180deg,#fff8e6 0%,#f3dfb5 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.65),inset 0 -3px 8px rgba(92,54,22,0.13);">
          <p style="margin:0 0 8px;color:#9a6f24;font-size:12px;font-weight:800;letter-spacing:0.08em;text-align:center;">FANTASY GUILD WEEKLY REPORT</p>
          <h1 style="margin:0 0 18px;color:#3d291d;font-size:30px;line-height:1.2;text-align:center;">ギルド週報</h1>
          <div style="height:2px;margin:0 0 22px;background:linear-gradient(90deg,transparent,#d2ad5b,transparent);"></div>

          <p style="margin:0 0 18px;font-size:17px;line-height:1.9;">
            冒険者 <strong style="font-size:20px;color:#2f2118;">${escapeHtml(formatAdventurerName(report.name))}</strong> の<br>
            <strong style="color:#7a241f;">今週の冒険レポート</strong> が届きました。
          </p>

          <div style="margin:20px 0;padding:16px;border:1px solid rgba(139,101,48,0.42);border-radius:12px;background:#f8e8c6;box-shadow:inset 0 1px 0 rgba(255,255,255,0.55);">
            <h2 style="margin:0 0 12px;color:#6b4526;font-size:18px;line-height:1.35;">今週の冒険記録</h2>
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              ${buildWeeklyReportRow("期間", period, "#3d291d")}
              ${buildWeeklyReportRow("クエスト達成数", `${Number(report.completed || 0)} 件`, "#8f2f2a")}
              ${buildWeeklyReportRow("獲得XP", `${Number(report.xp || 0)} XP`, "#163251")}
              ${buildWeeklyReportRow("獲得Gold", `${Number(report.gold || 0)} G`, "#8a6524")}
              ${buildWeeklyReportRow("現在レベル", `Lv ${currentLevel}`, "#2f2118")}
              ${buildWeeklyReportRow("連続ログイン", `${Number(report.loginStreak || 0)} 日`, "#7b5a20")}
            </table>
          </div>

          <div style="margin:20px 0;padding:16px;border:1px solid rgba(139,101,48,0.38);border-radius:12px;background:#fff0cf;box-shadow:inset 0 1px 0 rgba(255,255,255,0.55);">
            <h2 style="margin:0 0 12px;color:#6b4526;font-size:18px;line-height:1.35;">成長ステータス</h2>
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              ${buildWeeklyReportRow("STR / 力", stats.STR, "#9a342f")}
              ${buildWeeklyReportRow("INT / 賢さ", stats.INT, "#24456d")}
              ${buildWeeklyReportRow("END / 忍耐力", stats.END, "#37613b")}
              ${buildWeeklyReportRow("DEX / 器用さ", stats.DEX, "#8a6524")}
            </table>
          </div>

          <div style="margin:20px 0 0;padding:16px;border:1px solid rgba(139,101,48,0.32);border-radius:14px;background:linear-gradient(180deg,#f4df99,#d2ad5b);color:#3d291d;text-align:center;">
            <h2 style="margin:0 0 8px;font-size:18px;line-height:1.35;">ギルドからのひとこと</h2>
            <p style="margin:0;font-size:17px;font-weight:900;line-height:1.75;">
              ${escapeHtml(message)}
            </p>
          </div>

          <p style="margin:18px 0 0;color:#6b4a2e;font-size:12px;line-height:1.6;text-align:center;">
            最終更新：${escapeHtml(report.savedAt || "")}
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildRewardExchangeHtml(report) {
  return `
    <div style="margin:0;padding:28px 14px;background:#eadcc1;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic',Meiryo,sans-serif;color:#3d291d;">
      <div style="max-width:600px;margin:0 auto;padding:10px;border:1px solid #8b6530;border-radius:18px;background:#6b4526;box-shadow:0 18px 34px rgba(45,27,15,0.28);">
        <div style="padding:24px 22px;border:2px solid #d2ad5b;border-radius:14px;background:#fff3d7;background-image:linear-gradient(135deg,rgba(111,77,59,0.035) 0 1px,transparent 1px 8px),linear-gradient(180deg,#fff8e6 0%,#f3dfb5 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.65),inset 0 -3px 8px rgba(92,54,22,0.13);">
          <p style="margin:0 0 8px;color:#9a6f24;font-size:12px;font-weight:800;letter-spacing:0.08em;text-align:center;">FANTASY GUILD OFFICIAL REPORT</p>
          <h1 style="margin:0 0 18px;color:#3d291d;font-size:30px;line-height:1.2;text-align:center;">ギルド報告書</h1>
          <div style="height:2px;margin:0 0 22px;background:linear-gradient(90deg,transparent,#d2ad5b,transparent);"></div>

          <p style="margin:0 0 18px;font-size:17px;line-height:1.9;">
            冒険者 <strong style="font-size:20px;color:#2f2118;">${escapeHtml(report.adventurerName)}</strong> は、見事に任務を達成し、<br>
            報酬として <strong style="color:#7a241f;">『${escapeHtml(report.reward)}』</strong> を交換しました。
          </p>

          <div style="margin:20px 0;padding:16px;border:1px solid rgba(139,101,48,0.42);border-radius:12px;background:#f8e8c6;box-shadow:inset 0 1px 0 rgba(255,255,255,0.55);">
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 4px;color:#6b4a2e;font-size:14px;font-weight:800;">交換したご褒美</td>
                <td style="padding:8px 4px;color:#2f2118;font-size:17px;font-weight:900;text-align:right;">${escapeHtml(report.reward)}</td>
              </tr>
              <tr>
                <td style="padding:8px 4px;color:#6b4a2e;font-size:14px;font-weight:800;">消費Gold</td>
                <td style="padding:8px 4px;color:#8f2f2a;font-size:22px;font-weight:900;text-align:right;">${Number(report.gold || 0)} G</td>
              </tr>
              <tr>
                <td style="padding:8px 4px;color:#6b4a2e;font-size:14px;font-weight:800;">残りGold</td>
                <td style="padding:8px 4px;color:#7b5a20;font-size:22px;font-weight:900;text-align:right;">${Number(report.remainingGold || 0)} G</td>
              </tr>
              <tr>
                <td style="padding:8px 4px;color:#6b4a2e;font-size:14px;font-weight:800;">日時</td>
                <td style="padding:8px 4px;color:#3d291d;font-size:14px;font-weight:800;text-align:right;">${escapeHtml(report.date)}</td>
              </tr>
            </table>
          </div>

          <p style="margin:20px 0 0;padding:14px 16px;border:1px solid rgba(139,101,48,0.32);border-radius:999px;background:linear-gradient(180deg,#f3d77c,#d2ad5b);color:#3d291d;font-size:18px;font-weight:900;text-align:center;">
            ギルドより称賛を贈ります。よくがんばりました。
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildWeeklyReportRow(label, value, color) {
  return `
    <tr>
      <td style="padding:9px 4px;color:#6b4a2e;font-size:14px;font-weight:800;border-bottom:1px solid rgba(139,101,48,0.16);">${escapeHtml(label)}</td>
      <td style="padding:9px 4px;color:${color};font-size:18px;font-weight:900;text-align:right;border-bottom:1px solid rgba(139,101,48,0.16);">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildWeeklyMetric(label, value, unit, color) {
  return `
    <div style="padding:14px 10px;border-radius:12px;background:#f8edd1;border:1px solid rgba(181,138,49,0.3);text-align:center;">
      <p style="margin:0 0 6px;color:#6f4d3b;font-size:12px;font-weight:700;">${escapeHtml(label)}</p>
      <p style="margin:0;color:${color};font-size:24px;font-weight:900;line-height:1;">${Number(value || 0)}<span style="font-size:13px;margin-left:3px;">${escapeHtml(unit)}</span></p>
    </div>
  `;
}

function formatAdventurerName(name) {
  const safeName = String(name || "そら").trim() || "そら";
  return /(?:くん|さん|ちゃん|君|様)$/.test(safeName) ? safeName : `${safeName}くん`;
}

function normalizeStats(stats) {
  return {
    STR: Number(stats && stats.STR ? stats.STR : 0),
    INT: Number(stats && stats.INT ? stats.INT : 0),
    END: Number(stats && stats.END ? stats.END : 0),
    DEX: Number(stats && stats.DEX ? stats.DEX : 0),
  };
}

function formatStatGrowth(stats) {
  const labels = {
    STR: "力",
    INT: "賢さ",
    END: "忍耐力",
    DEX: "器用さ",
  };
  return ["STR", "INT", "END", "DEX"]
    .filter((key) => Number(stats[key] || 0) > 0)
    .map((key) => `${labels[key]} +${Number(stats[key] || 0)}`)
    .join(" / ") || "まだありません";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
