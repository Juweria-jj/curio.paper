exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, body: '' };
  try {
    const body = JSON.parse(event.body || '{}');
    let text = body.text || "";
    let action = body.action || "";
    // Support old format where text contains "fix-grammar:..."
    if (!action && text.includes(':')) {
      const parts = text.split(':');
      if (['fix-grammar','weakness','rephrase','detect-ai','roadmap','publish-track'].includes(parts[0].trim())) {
        action = parts[0].trim();
        text = parts.slice(1).join(':').trim();
      }
    }
    if (!text) text = "general research help";

    const GROQ_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_KEY) {
      return { statusCode: 200, body: JSON.stringify({ result: `⚠️ GROQ_API_KEY not set in Netlify env. Add it.\n\nMock output for [${action||'roadmap'}]:\n${text.slice(0,200)}\n\nIf this were live:\n- For fix-grammar: would fix grammar\n- For weakness: would list 3 weaknesses\n- For detect-ai: would give AI %\n- For roadmap: hypothesis + steps` }) };
    }

    let prompt = "";
    if (action === 'fix-grammar') prompt = `Fix grammar only, keep meaning same, do NOT add new content. Text: ${text}`;
    else if (action === 'weakness') prompt = `List 3 weaknesses and how to improve. Be strict but helpful. Text: ${text}`;
    else if (action === 'rephrase') prompt = `Rephrase to make clearer, academic tone, keep original meaning. Text: ${text}`;
    else if (action === 'detect-ai') {
      const len = text.length;
      const aiWords = (text.match(/Moreover|Furthermore|In conclusion|As an AI|Delve|Tapestry/gi)||[]).length;
      const score = Math.min(95, Math.floor(len/25) + aiWords*8);
      prompt = `You are AI detector. Analyze text and give: 1) AI % estimate (${score}% base), 2) reasons, 3) how to make more human. Text: ${text.slice(0,1500)}`;
    }
    else if (action === 'publish-track') prompt = `Suggest where to publish this research: JSR or Springer? Give 2 journal names + why. Data: ${text}`;
    else prompt = `You are research mentor for high school. Keywords/Q: ${text}. Give: 1) 2-line hypothesis 2) 5-step roadmap (Search papers, Read, Idea, Data, Write) 3) Paper template: Abstract/Intro/Methods/Results/Discussion/References structure but NO content to copy. Under 220 words.`;

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{role:"user", content: prompt}],
        temperature: 0.6,
        max_tokens: 800
      })
    });
    const data = await r.json();
    const result = data.choices?.[0]?.message?.content || data.error?.message || "No response from Groq";
    return { statusCode: 200, body: JSON.stringify({ result }) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ result: "Error: " + e.message }) };
  }
};
