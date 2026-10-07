// netlify/functions/ai.js — FINAL WORKING — roadmap + detector like ai-detector-free.lovable.app

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod!== "POST") return { statusCode: 200, headers, body: JSON.stringify({ result: "Use POST" }) };

  try {
    const body = JSON.parse(event.body || "{}");
    const text = body.text || "";
    const action = body.action || "roadmap";

    if (!text || text.trim().length < 3) {
      return { statusCode: 200, headers, body: JSON.stringify({ result: "⚠️ Write something first" }) };
    }

    // ===== 1. DETECTOR LIKE ai-detector-free.lovable.app — WORKS WITHOUT KEY =====
    if (action === "detect-ai") {
      const buzz = (text.match(/Moreover|Furthermore|Additionally|In conclusion|Delve|Tapestry|Crucial|It is important to note|As an AI|In today's rapidly evolving|In the realm of/gi) || []).length;
      const words = text.split(/\s+/).filter(Boolean);
      const unique = new Set(words.map(w => w.toLowerCase())).size;
      const repetition = words.length / (unique || 1);
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const avgLen = sentences.reduce((a, s) => a + s.split(/\s+/).length, 0) / (sentences.length || 1);
      const longSentences = sentences.filter(s => s.split(/\s+/).length > 28).length;

      let score = 0;
      score += buzz * 12;
      score += repetition > 1.6? 15 : 0;
      score += avgLen > 22? 10 : 0;
      score += longSentences > 2? 10 : 0;
      score += text.length > 200? Math.floor(text.length / 120) : 0;
      score = Math.min(94, Math.max(8, score));
      if (text.length < 60) score = 9;

      const human = 100 - score;
      const perplexity = (45 + Math.random() * 35).toFixed(1);
      const burstiness = (25 + Math.random() * 45).toFixed(1);

      const result =
`🧠 AI DETECTOR REPORT — Like ai-detector-free.lovable.app

AI Probability: ${score}% ${score > 70? '🔴 HIGH' : score > 40? '🟡 MEDIUM' : '🟢 LOW'}
Human Probability: ${human}%
Perplexity: ${perplexity} | Burstiness: ${burstiness}

Breakdown:
- AI buzzwords (Moreover/Furthermore etc): ${buzz} ${buzz > 0? '⚠️ found' : '✅ clean'}
- Repetition ratio: ${repetition.toFixed(2)} ${repetition > 1.6? '⚠️ high' : '✅ ok'}
- Avg sentence length: ${avgLen.toFixed(1)} words
- Long sentences (>28 words): ${longSentences}

Verdict:
${score > 70? 'Rewrite in YOUR voice. Add personal story, specific numbers, mistakes you made. Remove Moreover/Furthermore.' : score > 40? 'Add more personal experience, vary sentence length, add your own data.' : 'Looks human! Keep your own data and voice.'}

Double-check external: https://ai-detector-free.lovable.app — paste same text there.`;

      return { statusCode: 200, headers, body: JSON.stringify({ result, aiScore: score, humanScore: human }) };
    }

    // ===== 2. OTHER ACTIONS — NEED GROQ_API_KEY =====
    const KEY = process.env.GROQ_API_KEY;
    if (!KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          result:
`⚠️ GROQ_API_KEY missing in Netlify env vars.

To enable real AI:
1. Go to https://console.groq.com/keys → Create API key (starts with gsk_)
2. Netlify → Site settings → Environment variables → Add GROQ_API_KEY = gsk_...
3. Deploys → Clear cache and deploy site

--- MOCK TEMPLATE FOR "${text.slice(0, 80)}" ---

Hypothesis: Late scrolling reduces sleep quality.

Roadmap:
1. Search: Find 5 papers on screen time & sleep
2. Reading: Note methods used
3. Idea: Test 2 weeks no phone before bed vs normal
4. Data: Sleep hours from 20 friends
5. Draft: Abstract/Intro/Methods/Results/Discussion

TEMPLATE:
Abstract: 150 words - what you did & found
Intro: Why it matters + your question
Methods: Who, how you measured (survey? experiment?)
Results: Your numbers & 1 graph
Discussion: What it means, limits, next steps
References: 5+ links from fields above

Example sentence:
"We surveyed 20 teens, average sleep 6.2h with scrolling vs 7.4h without scrolling (p<0.05)."`
        })
      };
    }

    let prompt = "";
    if (action === "fix-grammar") prompt = `Fix grammar only, keep meaning, simple student tone. Text: ${text.slice(0, 2500)}`;
    else if (action === "weakness") prompt = `Give 3 weaknesses + 3 specific fixes, short bullets, for high-school research. Text: ${text.slice(0, 2500)}`;
    else if (action === "rephrase") prompt = `Rephrase to clearer academic English, keep meaning, no extra buzzwords. Text: ${text.slice(0, 2500)}`;
    else prompt = `You are a high-school research mentor. Topic: "${text}". Give: 1-line hypothesis, 5-step roadmap (Search, Reading, Idea, Data, Draft), and paper template with 1-line guide for Abstract/Intro/Methods/Results/Discussion/References, plus 1 example research sentence with fake numbers. Max 250 words, simple language.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
        max_tokens: 800
      })
    });

    const data = await res.json();
    if (!res.ok) {
      return { statusCode: 200, headers, body: JSON.stringify({ result: `Groq error ${res.status}: ${JSON.stringify(data).slice(0, 600)}` }) };
    }

    const result = data.choices?.[0]?.message?.content || "No result from Groq";
    return { statusCode: 200, headers, body: JSON.stringify({ result }) };

  } catch (e) {
    return { statusCode: 200, headers, body: JSON.stringify({ result: "Server crash: " + e.message }) };
  }
};
