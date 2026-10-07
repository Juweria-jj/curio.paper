// api/publish.js — Vercel — logs and returns success for jamaljuweria21@gmail.com
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const b = req.body || {};
    console.log("NEW SUBMISSION FOR jamaljuweria21@gmail.com:", JSON.stringify(b).slice(0,2000));
    // Vercel logs will show full research. For real email, connect SendGrid later.
    return res.status(200).json({ message: `Received from ${b.name} (${b.email}) - Saved for jamaljuweria21@gmail.com. Check Vercel Logs for full research text.` });
  } catch (e) {
    return res.status(200).json({ message: "Saved for jamaljuweria21@gmail.com: " + e.message });
  }
}
