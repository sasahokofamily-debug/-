const NOTIFY_EMAIL = "sasahokofamily@gmail.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
