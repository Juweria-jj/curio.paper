exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, body: '' };
  try {
    const body = JSON.parse(event.body || '{}');
    const { based = "", question = "", research = "", authorEmail = "" } = body;

    const TO_EMAIL = process.env.PUBLISH_EMAIL || "jamaljuweria21@gmail.com";
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const text = `NEW RESEARCH\nBased: ${based}\nQuestion: ${question}\nAuthor: ${authorEmail}\n\n${research}\n\nTime: ${new Date().toISOString()}`;

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'curio.paper <onboarding@resend.dev>',
          to: TO_EMAIL,
          subject: `New Research: ${question || based}`,
          text: text
        })
      });
    }
    console.log(text);
    return { statusCode: 200, body: JSON.stringify({ message: "✅ Published! Submitted for review. Now make it PUBLIC via JSR & Springer below." }) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ message: "Error: " + e.message }) };
  }
};
