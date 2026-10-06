module.exports = async function(req, res) {
  if (req.method!== 'POST') return res.status(200).json({ result: "Use POST" });
  try {
    const { action, text } = req.body || {};
    if (!text) return res.status(200).json({ result: "Enter keywords + question first" });
    const GROQ_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_KEY) {
      return res.status(200).json({ result: `Fallback (Add GROQ_API_KEY in Vercel for AI):\n\nHypothesis: ${text.slice(0,120)} has significant effect.\n\nRoadmap:\n1. Search 5 papers\n2. Form hypothesis\n3. Collect data\n4. Analyze\n5. Write\n\nTemplate:\nAbstract: Summarize ${text}\nIntro: Why it matters\nMethods: How you tested\nResults: What you found\nDiscussion: Meaning\n\n⚠️ Just template - not to copy-paste.` });
    }
    let prompt = action==='roadmap' ? `High school research mentor. Topic: ${text}. Give 1-line hypothesis, 5-step roadmap, template Abstract/Intro/Methods/Results/Discussion with 1-line guidance each. Under 300 words. End with NOTE: Just template.` : `Suggest 2 journals for: ${text}. Include JSR Path, Young Researcher.`;
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: [{role:"user", content:prompt}], temperature:0.7 })
    });
    const data = await r.json();
    if (data.error) return res.status(200).json({ result: "GROQ Error: " + data.error.message });
    return res.status(200).json({ result: data.choices?.[0]?.message?.content || "No response" });
  } catch (e) { return res.status(200).json({ result: "Server error: " + e.message }); }
}
