module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(200).json({ message: 'Use POST' });
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e){} }
    const { based = "", question = "", research = "", authorEmail = "" } = body || {};
    if (!research) return res.status(200).json({ message: 'Paste your research first' });

    const TO_EMAIL = process.env.PUBLISH_EMAIL || "jamaljuweria21@gmail.com";
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const content = `NEW RESEARCH - curio.paper\n\nBased: ${based}\nQuestion: ${question}\nAuthor Email: ${authorEmail}\n\nResearch:\n${research}\n\nTime: ${new Date().toISOString()}`;

    if (RESEND_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'curio.paper <onboarding@resend.dev>',
            to: TO_EMAIL,
            subject: `New Research: ${question || based || 'Untitled'}`,
            text: content
          })
        });
      } catch(e) { console.log("Resend error", e.message); }
    }
    console.log(content);
    return res.status(200).json({ message: `✅ Published! Submitted for review. Now make it PUBLIC by publishing on JSR & Springer below.` });
  } catch (e) {
    return res.status(200).json({ message: 'Error: ' + e.message });
  }
};
