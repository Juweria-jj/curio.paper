// api/ai.js — Vercel version — works for free

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(200).json({ result: "Use POST" });

  try {
    const { text = "", action = "roadmap" } = req.body || {};

    if (!text || text.trim().length < 3) {
      return res.status(200).json({ result: "⚠️ Write something first" });
    }

    // 1. DETECTOR LIKE ai-detector-free.lovable.app — NO KEY NEEDED
    if (action === "detect-ai") {
      const buzz = (text.match(/Moreover|Furthermore|Additionally|In conclusion|Delve|Tapestry|Crucial|It is important to note|As an AI/gi) || []).length;
      let score = Math.min(94, buzz * 12 + Math.floor(text.length / 120));
      if (text.length < 60) score = 9;
      const human = 100 - score;
      const result = `🧠 AI DETECTOR — like ai-detector-free.lovable.app\n\nAI: ${score}% ${score>70?'🔴 HIGH':score>40?'🟡 MEDIUM':'🟢 LOW'}\nHuman: ${human}%\nBuzzwords: ${buzz}\nVerdict: ${score>70?'Rewrite in your voice':score>40?'Add personal story':'Looks human'}\nDouble-check: https://ai-detector-free.lovable.app`;
      return res.status(200).json({ result, aiScore: score });
    }

    // 2. OTHER AI — NEEDS GROQ_API_KEY
    const KEY = process.env.GROQ_API_KEY;
    if (!KEY) {
      return res.status(200).json({ result: `⚠️ Add GROQ_API_KEY in Vercel env vars to enable real AI.\n\nMOCK TEMPLATE for "${text.slice(0,80)}":\nHypothesis: Late scrolling reduces sleep\nRoadmap: 1.Search 5 papers 2.Reading notes 3.Idea: test 2 weeks 4.Data from 20 friends 5.Draft\nTemplate: Abstract/Intro/Methods/Results/Discussion/References\nExample: We surveyed 20 teens, avg sleep 6.2h with scrolling vs 7.4h without (p<0.05)` });
    }

    let prompt = action === "fix-grammar" ? `Fix grammar: ${text.slice(0,2500)}` : action === "weakness" ? `3 weaknesses + fixes: ${text.slice(0,2500)}` : action === "rephrase" ? `Rephrase academic: ${text.slice(0,2500)}` : `Mentor for "${text}". Give hypothesis, 5-step roadmap, paper template, example sentence. Max 250 words.`;

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.6, max_tokens: 800 })
    });
    const data = await r.json();
    const result = data.choices?.[0]?.message?.content || JSON.stringify(data).slice(0,800);
    return res.status(200).json({ result });

  } catch (e) {
    return res.status(200).json({ result: "Error: " + e.message });
  }
}
