module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    }

    const name = (body?.name || "Anonymous").trim().slice(0, 100);
    const review = (body?.review || "").trim().slice(0, 2000);

    if (!review) return res.status(200).json({ ok: false, error: "empty review" });

    console.log(`NEW REVIEW from ${name}: ${review}`);

    // OPTIONAL EMAIL - if you have RESEND_API_KEY set in Vercel
    // Change TO email below to yours
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.REVIEW_TO_EMAIL || "your_email@gmail.com";

    if (RESEND_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Curio Review <onboarding@resend.dev>",
            to: TO_EMAIL,
            subject: `New Curio Review - ${name}`,
            html: `
              <div style="font-family:sans-serif; padding:20px; border:1px solid #eee; border-radius:12px">
                <h3>New Honest Review</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Review:</b></p>
                <p style="white-space:pre-wrap; background:#FFFEF5; padding:12px; border-radius:8px">${review}</p>
                <p style="font-size:11px; opacity:0.6">From curio.paper feedback form</p>
              </div>
            `
          })
        });
      } catch (e) {
        console.log("Resend error:", e.message);
      }
    }

    return res.status(200).json({ ok: true, message: "Review saved" });

  } catch (e) {
    console.log("Review error:", e.message);
    return res.status(200).json({ ok: true, message: "Saved locally" });
  }
};
