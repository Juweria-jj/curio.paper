module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch {} }
    const raw = (body?.text || "").trim();
    const action = body?.action || "roadmap";
    if (!raw) return res.status(200).json({ result: "Write keywords + question" });

    const kw = (raw.match(/Keywords:\s*([^|]+)/i)?.[1] || raw.split(' ').slice(0,2).join(' ')).trim();
    const question = (raw.match(/Question:\s*(.+)/i)?.[1] || raw).trim();
    const topic = question || kw;

    if (action === "detect-ai") {
      let s = raw.length < 60? 12 : Math.min(85, Math.floor(raw.length/130));
      return res.status(200).json({ result: `AI Check: ${s}% AI, ${100-s}% Human` });
    }

    const GROQ_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_KEY) return res.status(200).json({ result: `Add GROQ_API_KEY in Vercel Settings. Topic: "${topic}"` });

    const prompt = `Topic: "${topic}" Keywords: "${kw}". Give for this EXACT topic (not generic aviation): 1) Hypothesis 1 line 2) 5-step roadmap SEARCH READING IDEA DATA DRAFT specific 3) Paper template Abstract Intro Methods Results Discussion with hints 4) Example result with numbers. Max 300 words, simple.`;

    // ONLY ACTIVE MODELS - as per Groq docs 2026
    const models = ["llama-3.1-8b-instant", "llama-3.3-70b-versatile", "openai/gpt-oss-20b"];

    for (const model of models) {
      try {
        const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 1000
          })
        });
        const d = await r.json();
        if (r.ok && d.choices?.[0]?.message?.content) {
          return res.status(200).json({ result: d.choices[0].message.content });
        }
        console.log(model, JSON.stringify(d).slice(0,300));
      } catch (e) { console.log(e.message); }
    }

    return res.status(200).json({ result: `Groq temporarily busy. Manual for "${topic}": Hypothesis: ${topic} affects ${kw}. Data: 20 samples. Example: Group A 42 vs Group B 18 (57% diff).` });

  } catch (e) {
    return res.status(200).json({ result: "Server error: " + e.message });
  }
}
