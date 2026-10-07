let reviews = [];
export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method === "POST") {
    const { name = "Anon", text = "" } = req.body || {};
    if (!text) return res.status(400).json({ error: "no text" });
    reviews.unshift({ name, text, time: new Date().toISOString() });
    return res.status(200).json({ ok: true });
  }
  return res.status(200).json({ reviews: reviews.slice(0, 50) });
}
