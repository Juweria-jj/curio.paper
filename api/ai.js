// api/ai.js — Vercel serverless — API KEY secured
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  
  const { q } = req.body;
  const key = process.env.OPENAI_API_KEY;
  
  if (!key) {
    return res.status(500).json({ error: 'API key missing. Add OPENAI_API_KEY in Vercel > Settings > Environment Variables > Redeploy' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are curio.paper — minimal research mentor. Help students turn curiosity into research. Find missing angles, suggest journals, give roadmap." },
          { role: "user", content: q }
        ]
      })
    });
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Error from AI";
    return res.status(200).json({ answer });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
