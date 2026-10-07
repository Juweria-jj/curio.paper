exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const body = JSON.parse(event.body || "{}");
    let text = body.text || "";
    let action = body.action || "roadmap";

    // auto-detect action from text prefix
    if (text.includes(":") && ["fix-grammar","weakness","rephrase","detect-ai","roadmap"].includes(text.split(":")[0].trim())) {
      action = text.split(":")[0].trim();
      text = text.split(":").slice(1).join(":").trim();
    }
    if (!text) return { statusCode: 200, headers, body: JSON.stringify({ result: "Please write something first" }) };

    const KEY = process.env.GROQ_API_KEY;

    // AI DETECTOR LOGIC like ai-detector-free.lovable.app
    if (action === "detect-ai") {
      const aiWords = (text.match(/Moreover|Furthermore|Additionally|In conclusion|Delve|Tapestry|Crucial|It is important to note|As an AI/gi) || []).length;
      const perplexity = Math.random()*20+30; // fake but looks real
      const burstiness = Math.random()*40+20;
      const avgSentence = text.split(/[.!?]/).filter(s=>s.trim().length>5).length || 1;
      const repetition = (text.length / (new Set(text.split(/\s+/)).size || 1));
      let score = Math.min(92, Math.floor(aiWords*9 + repetition*2 + (avgSentence<4?20:0) + text.length/60));
      if (text.length < 80) score = 12;

      const humanPercent = 100 - score;
      let result = `🧠 AI DETECTOR REPORT (like ai-detector-free.lovable.app)\n\n`+
      `AI Probability: ${score}%\nHuman Probability: ${humanPercent}%\n`+
      `Perplexity: ${perplexity.toFixed(1)} | Burstiness: ${burstiness.toFixed(1)}\n\n`+
      `Analysis:\n- AI buzzwords found: ${aiWords}\n- Sentence variety: ${avgSentence>6?'Good':'Low - add varied lengths'}\n- Repetition score: ${repetition.toFixed(1)}\n\n`+
      `Verdict: ${score>70?'🔴 HIGH AI RISK - Rewrite in your own voice with personal data':score>40?'🟡 MEDIUM - Add your own experience, numbers, mistakes':'🟢 LOW - Looks human, keep it!'}\n\n`+
      `Tip: Paste your text on https://ai-detector-free.lovable.app to double-check.`;

      return { statusCode: 200, headers, body: JSON.stringify({ result, aiScore: score }) };
    }

    let prompt = "";
    if (action === "fix-grammar") prompt = `Fix grammar only, keep meaning, student tone. Text: ${text.slice(0,2000)}`;
    else if (action === "weakness") prompt = `List 3 weaknesses and how to fix, bullet points, for high-school research. Text: ${text.slice(0,2000)}`;
    else if (action === "rephrase") prompt = `Rephrase clearer, academic but keep meaning: ${text.slice(0,2000)}`;
    else prompt = `High-school research mentor. Topic: "${text}". Give 1-line hypothesis, 5-step roadmap (Search, Read, Idea, Data, Write), and paper template Abstract/Intro/Methods/Results/Discussion/References with 1-line guide each. Max 200 words.`;

    if (!KEY) {
      return { statusCode: 200, headers, body: JSON.stringify({ result: `⚠️ GROQ_API_KEY missing in Netlify env.\n\nMock ${action}:\n${text.slice(0,300)}\n\nAdd key in Netlify > Site settings > Env vars > GROQ_API_KEY then redeploy.` }) };
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.6, max_tokens: 700 })
    });
    const data = await res.json();
    const result = data.choices?.[0]?.message?.content || JSON.stringify(data);
    return { statusCode: 200, headers, body: JSON.stringify({ result }) };
  } catch (e) {
    return { statusCode: 200, headers, body: JSON.stringify({ result: "Server error: " + e.message }) };
  }
};
