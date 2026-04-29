const NOTIFY_EMAIL = "sasahokofamily@gmail.com";
const WEEKLY_REPORT_SPREADSHEET_ID = "";
const WEEKLY_REPORT_PROPERTY_KEY = "WEEKLY_REPORT_DATA";
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

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    if (data.type === "weeklyReport") {
      saveWeeklyReport(data);
      return ContentService.createTextOutput("weekly-report-saved");
    }

    const name = data.name || "そら";
    const reward = data.reward || "ご褒美";
    const gold = Number(data.gold || 0);
    const remainingGold = Number(data.remainingGold || 0);
    const date = data.date || Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm");

    const subject = "【ギルド報告】ご褒美交換のお知らせ";
    const plainText = [
      "【ギルド報告書】",
      "",
      `${name}は`,
      `「${reward}」を交換しました`,
      "",
      `消費：${gold} G`,
      `残り：${remainingGold} G`,
      "",
      "よくがんばりました✨",
      "",
      `日時：${date}`,
    ].join("\n");

    const htmlBody = `
      <div style="margin:0;padding:24px;background:#f3ead7;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic',Meiryo,sans-serif;color:#3f2a1f;">
        <div style="max-width:560px;margin:0 auto;padding:24px;border:1px solid #d3ad5c;border-radius:16px;background:#fff8e8;box-shadow:0 12px 28px rgba(63,42,31,0.18);">
          <p style="margin:0 0 8px;color:#b58a31;font-size:13px;font-weight:700;letter-spacing:0.04em;">FANTASY GUILD REPORT</p>
          <h1 style="margin:0 0 20px;color:#3f2a1f;font-size:28px;line-height:1.25;">【ギルド報告書】</h1>
          <p style="margin:0 0 18px;font-size:18px;line-height:1.8;">
            <strong>${escapeHtml(name)}</strong> は<br>
            「<strong>${escapeHtml(reward)}</strong>」を交換しました
          </p>
          <div style="margin:18px 0;padding:16px;border-radius:12px;background:#f8edd1;border:1px solid rgba(181,138,49,0.35);">
            <p style="margin:0 0 8px;font-size:17px;">消費：<strong style="font-size:22px;color:#8f2f2a;">${gold} G</strong></p>
            <p style="margin:0;font-size:17px;">残り：<strong style="font-size:22px;color:#163251;">${remainingGold} G</strong></p>
          </div>
          <p style="margin:20px 0;padding:14px 16px;border-radius:999px;background:#ead17f;color:#3f2a1f;font-size:18px;font-weight:800;text-align:center;">
            よくがんばりました✨
          </p>
          <p style="margin:18px 0 0;color:#6f4d3b;font-size:14px;">日時：${escapeHtml(date)}</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject,
      body: plainText,
      htmlBody,
    });

    return ContentService.createTextOutput("ok");
  } catch (error) {
    console.warn(error);
    return ContentService.createTextOutput("error");
  }
}

function saveWeeklyReport(data) {
  const report = {
    name: data.name || "そら",
    completed: Number(data.completed || 0),
    xp: Number(data.xp || 0),
    gold: Number(data.gold || 0),
    stats: normalizeStats(data.stats),
    statGrowth: data.statGrowth || formatStatGrowth(normalizeStats(data.stats)),
    loginStreak: Number(data.loginStreak || 0),
    weekStart: data.weekStart || Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd"),
    weekEnd: getWeekEndKey(data.weekStart || Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd")),
    savedAt: Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm"),
  };

  PropertiesService.getScriptProperties().setProperty(WEEKLY_REPORT_PROPERTY_KEY, JSON.stringify(report));
  saveWeeklyReportToSheet(report);
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
  const subject = "【ギルド報告】今週の冒険記録";
  const plainText = hasRecord
    ? [
        "【ギルド週間報告書】",
        "",
        `${safeReport.name}の今週の冒険記録です。`,
        "",
        `クエスト達成：${safeReport.completed}件`,
        `獲得XP：${safeReport.xp} XP`,
        `獲得Gold：${safeReport.gold} G`,
        `伸びたステータス：${safeReport.statGrowth}`,
        `連続ログイン：${safeReport.loginStreak}日`,
        "",
        "今週もよくがんばりました。来週の冒険も楽しみです。",
        "",
        `集計週：${safeReport.weekStart}から`,
        `最終更新：${safeReport.savedAt}`,
      ].join("\n")
    : [
        "【ギルド週間報告書】",
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
    .filter((trigger) => trigger.getHandlerFunction() === "sendWeeklyReportEmail")
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger("sendWeeklyReportEmail")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(9)
    .create();
}

function buildWeeklyReportHtml(report, hasRecord) {
  const statGrowth = hasRecord ? report.statGrowth : "今週の記録はありません";
  const message = hasRecord
    ? "今週もよくがんばりました。ギルドのみんなも拍手しています。"
    : "今週の記録はありません。次の冒険の準備をしましょう。";

  return `
    <div style="margin:0;padding:24px;background:#f3ead7;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic',Meiryo,sans-serif;color:#3f2a1f;">
      <div style="max-width:600px;margin:0 auto;padding:24px;border:1px solid #d3ad5c;border-radius:16px;background:#fff8e8;box-shadow:0 12px 28px rgba(63,42,31,0.18);">
        <p style="margin:0 0 8px;color:#b58a31;font-size:13px;font-weight:700;letter-spacing:0.04em;">FANTASY GUILD WEEKLY REPORT</p>
        <h1 style="margin:0 0 18px;color:#3f2a1f;font-size:28px;line-height:1.25;">【ギルド週間報告書】</h1>
        <p style="margin:0 0 18px;font-size:17px;line-height:1.8;">
          <strong>${escapeHtml(report.name)}</strong> の今週の冒険記録です。
        </p>
        <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0;">
          ${buildWeeklyMetric("達成", report.completed, "件", "#8f2f2a")}
          ${buildWeeklyMetric("獲得XP", report.xp, "XP", "#163251")}
          ${buildWeeklyMetric("獲得Gold", report.gold, "G", "#8a6524")}
        </div>
        <div style="margin:18px 0;padding:16px;border-radius:12px;background:#f8edd1;border:1px solid rgba(181,138,49,0.35);">
          <p style="margin:0 0 8px;font-size:16px;">伸びたステータス：<strong>${escapeHtml(statGrowth)}</strong></p>
          <p style="margin:0;font-size:16px;">連続ログイン：<strong>${Number(report.loginStreak || 0)}日</strong></p>
        </div>
        <p style="margin:20px 0;padding:14px 16px;border-radius:999px;background:#ead17f;color:#3f2a1f;font-size:17px;font-weight:800;text-align:center;">
          ${escapeHtml(message)}
        </p>
        <p style="margin:18px 0 0;color:#6f4d3b;font-size:13px;">集計週：${escapeHtml(report.weekStart)} から / 最終更新：${escapeHtml(report.savedAt || "")}</p>
      </div>
    </div>
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
