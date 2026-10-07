export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  try {
    const body = typeof req.body === 'string'? JSON.parse(req.body) : req.body;
    const text = body?.text || "";
    const action = body?.action || "roadmap";
    if (!text || text.trim().length < 2) return res.status(200).json({ result: "⚠️ Write something first" });
    if (action === "detect-ai") {
      const buzz = (text.match(/Moreover|Furthermore|Additionally|In conclusion|Delve/gi) || []).length;
      let score = Math.min(94, buzz * 12 + Math.floor(text.length / 120));
      if (text.length < 60) score = 9;
      return res.status(200).json({ result: `🧠 AI Check\nAI: ${score}% ${score>70?'🔴 HIGH':score>40?'🟡 MEDIUM':'🟢 LOW'}\nHuman: ${100-score}%` });
    }
    const KEY = process.env.GROQ_API_KEY;
    if (!KEY) {
      const topic = text.slice(0,140);
      return res.status(200).json({ result: `✅ TEMPLATE FOR: "${topic}"\n\nHYPOTHESIS: "${topic}" has testable effect.\nROADMAP:\n1. Search 5 papers\n2. Reading notes\n3. Idea: Does [A] change [B]?\n4. Data: 15-20 samples\n5. Draft\n\nTEMPLATE:\nAbstract: What you did\nIntro: Why it matters\nMethods: How measured\nResults: Table + %\nDiscussion: Meaning + limits\n\nExample: 20 samples, 18% diff (6.2 vs 7.4).` });
    }
    const prompt = action === "fix-grammar"? `Fix grammar: ${text.slice(0,2500)}` : action === "weakness"? `3 weaknesses + fixes: ${text.slice(0,2500)}` : action === "rephrase"? `Rephrase clear: ${text.slice(0,2500)}` : `Topic: "${text}". Give 1 hypothesis, 5-step roadmap (Search, Reading, Idea, Data, Draft), paper template (Abstract/Intro/Methods/Results/Discussion/References), 1 example with numbers. Max 220 words.`;
    const models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"];
    for (const model of models) {
      try {
        const r = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }], temperature: 0.65, max_tokens: 800 }) });
        const d = await r.json();
        if (r.ok && d.choices?.[0]?.message?.content) return res.status(200).json({ result: d.choices[0].message.content });
      } catch {}
    }
    return res.status(200).json({ result: `Generic template for "${text.slice(0,100)}"` });
  } catch (e) { return res.status(200).json({ result: "Error: " + e.message }); }
}
