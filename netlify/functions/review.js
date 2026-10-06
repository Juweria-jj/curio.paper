let reviews = global._reviews || [];
global._reviews = reviews;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, body: '' };

  if (event.httpMethod === 'GET') {
    return { statusCode: 200, body: JSON.stringify({ reviews: reviews.slice(-20).reverse() }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name = "Anonymous", text = "" } = body;
    const entry = { name, text, time: new Date().toISOString() };
    reviews.push(entry);
    global._reviews = reviews;

    const TO_EMAIL = process.env.PUBLISH_EMAIL || "jamaljuweria21@gmail.com";
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'curio.paper <onboarding@resend.dev>',
          to: TO_EMAIL,
          subject: `New Review from ${name}`,
          text: `Name: ${name}\nReview: ${text}`
        })
      });
    }
    return { statusCode: 200, body: JSON.stringify({ message: "✅ Review submitted!" }) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ message: "Error: " + e.message }) };
  }
};
