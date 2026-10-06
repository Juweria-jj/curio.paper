module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(200).json({ result: "Use POST" });
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e){} }
    const text = body?.text || "";
    if (!text) return res.status(200).json({ result: "Enter keywords + question first" });
    
    const GROQ_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_KEY) {
      return res.status(200).json({ result: `Hypothesis: ${text.slice(0,120)}\n\nRoadmap:\n1. Search 5 papers on this\n2. Form hypothesis\n3. Collect data (survey/experiment)\n4. Analyze results\n5. Write in format: Abstract / Intro / Methods / Results / Discussion\n\nTemplate: Use simple structure. Just template — not to copy-paste.` });
    }

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{role:"user", content:`High school mentor. Topic: ${text}. Give 1-line hypothesis, 5-step roadmap, template guidance. Under 220 words.`}],
        temperature: 0.7
      })
    });
    const data = await r.json();
    if (data.error) return res.status(200).json({ result: "GROQ Error: " + data.error.message });
    return res.status(200).json({ result: data.choices?.[0]?.message?.content || "No response" });
  } catch (e) {
    return res.status(200).json({ result: "Server error: " + e.message });
  }
};
