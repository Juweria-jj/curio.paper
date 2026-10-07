// api/ai.js — Vercel — GENERIC FOR ANY TOPIC — FIXED MODEL
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method!== "POST") return res.status(200).json({ result: "Use POST" });

  try {
    const { text = "", action = "roadmap" } = req.body || {};
    if (!text || text.trim().length < 3) {
      return res.status(200).json({ result: "⚠️ Write something first" });
    }

    // DETECTOR — NO KEY NEEDED
    if (action === "detect-ai") {
      const buzz = (text.match(/Moreover|Furthermore|Additionally|In conclusion|Delve|Tapestry|Crucial|As an AI/gi) || []).length;
      let score = Math.min(94, buzz * 12 + Math.floor(text.length / 120));
      if (text.length < 60) score = 9;
      return res.status(200).json({
        result: `🧠 AI DETECTOR — like ai-detector-free.lovable.app\n\nAI: ${score}% ${score>70?'🔴 HIGH':score>40?'🟡 MEDIUM':'🟢 LOW'}\nHuman: ${100-score}%\nBuzzwords: ${buzz}\n\nVerdict: ${score>70?'Rewrite with your own story + data':score>40?'Add personal experience':'Looks human'}`
      });
    }

    const KEY = process.env.GROQ_API_KEY;

    // GENERIC MOCK — WORKS FOR ANY TOPIC — uses their actual input
    if (!KEY) {
      const topic = text.slice(0, 120);
      return res.status(200).json({
        result: `✨ TEMPLATE FOR: "${topic}" — (Add GROQ_API_KEY in Vercel for real AI, this is generic mock)

HYPOTHESIS:
Based on your keywords, we hypothesize that "${topic}" has a measurable effect that can be tested with simple data.

ROADMAP (5 steps):
1. SEARCH: Find 5 real papers about "${topic}" from Fields above (use Biological/AI/Physics etc)
2. READING: For each paper, note 1 method they used and 1 result
3. IDEA: Turn your question into testable form: "Does [your keyword] change [your question]?"
4. DATA: Collect small data — 15-20 responses, measurements, or observations about "${topic}"
5. DRAFT: Write using template below

PAPER TEMPLATE (copy this):
Abstract (150 words): What you asked, how you tested "${topic}", what you found in numbers
Intro: Why "${topic}" matters today + your exact question
Methods: Who/what you studied, how you measured, how many samples
Results: Table/graph of your numbers + 1 key finding with %
Discussion: What your finding means, why it might happen, 2 limits, 1 next step
References: 5 links from Fields section you opened

EXAMPLE SENTENCE (replace with yours):
"We tested "${topic}" with 20 samples and found a 18% difference between groups (Group A: 6.2, Group B: 7.4, p<0.05), suggesting "${topic}" does influence the outcome."

NEXT: Add GROQ_API_KEY in Vercel → Settings → Environment Variables → Redeploy to get real AI for any topic.`
      });
    }

    // REAL AI — WORKS FOR ANY TOPIC
    const prompt =
      action === "fix-grammar"? `Fix grammar only, keep simple student tone. Text: ${text.slice(0,2500)}` :
      action === "weakness"? `Give 3 weaknesses + 3 specific fixes, short bullets for high-school research. Text: ${text.slice(0,2500)}` :
      action === "rephrase"? `Rephrase to clearer academic English, no buzzwords. Text: ${text.slice(0,2500)}` :
      `You are a high-school research mentor. Topic from student: "${text}". This could be ANY topic — biology, AI, physics, business, etc.

Task:
- 1-line hypothesis specific to "${text}"
- 5-step roadmap: Search, Reading, Idea, Data, Draft — tailored to this topic
- Paper template with 1-line guide for Abstract/Intro/Methods/Results/Discussion/References specific to this topic
- 1 example research sentence with fake but realistic numbers for this topic

Max 230 words. Simple language. Don't say aviation unless topic is aviation. Be specific to "${text}".`;

    let result = "";
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.65,
          max_tokens: 850
        })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(JSON.stringify(data));
      result = data.choices?.[0]?.message?.content;
    } catch (e) {
      // Fallback model
      const r2 = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.65,
          max_tokens: 850
        })
      });
      const data2 = await r2.json();
      result = data2.choices?.[0]?.message?.content || `Error: ${JSON.stringify(data2).slice(0,400)}`;
    }

    return res.status(200).json({ result: result || "No result — check GROQ_API_KEY" });

  } catch (e) {
    return res.status(200).json({ result: "Server error: " + e.message });
  }
}
