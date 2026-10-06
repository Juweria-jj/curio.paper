let reviews = global._reviews || [];
global._reviews = reviews;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  if (req.method === 'GET') {
    return res.status(200).json({ reviews: reviews.slice(-20) });
  }

  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e){} }
      const { name = "Anonymous", text = "", progress = {} } = body || {};
      if (!text) return res.status(200).json({ message: 'Write review first' });

      const entry = { name, text, progress, time: new Date().toISOString() };
      reviews.push(entry);
      global._reviews = reviews;

      const TO_EMAIL = process.env.PUBLISH_EMAIL || "jamaljuweria21@gmail.com";
      const RESEND_KEY = process.env.RESEND_API_KEY;
      if (RESEND_KEY) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from: 'curio.paper <onboarding@resend.dev>',
              to: TO_EMAIL,
              subject: `New Review from ${name}`,
              text: `Name: ${name}\nText: ${text}\nTime: ${new Date().toISOString()}`
            })
          });
        } catch(e) {}
      }
      return res.status(200).json({ message: '✅ Review submitted! Thank you' });
    } catch (e) {
      return res.status(200).json({ message: 'Error: ' + e.message });
    }
  }
  return res.status(200).json({ message: 'Use GET or POST' });
};
