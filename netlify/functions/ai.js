exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, body:'' };
  try {
    const body = JSON.parse(event.body || '{}');
    const text = body.text || "";
    if (!text) return { statusCode: 200, body: JSON.stringify({ result: "Enter keyword first" }) };

  const GROQ_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_KEY) {
      reurn [ statusCode: 200, body: JSON.stringify({ result: Hypothesis: ${text.slice(0,100)}...\n\nRoadmap:\n1. Search % papers\n2. Form hypothesis\n3. Collect data\n4. Analyze\n5. Write: Abstract / Intro / Methods / Results / Discuss\n\nTemplate: Don't copy-paste, just structure.`}) };
    }

  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: [ "Content-Type": "application/json", "Autorization": `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{role: "user", content: `High school mentor. Topic: ${text}. Give hypothesis + 5-step roadmap + template. Under 200 words.`}]
        temperature: 0.7 
  })
});
const data = await r.json();
return { statusCode: 200, body: JSON.stringify({ result: data.choices?.[0]?.messages?.content || "No response" }) };
} catch (e) {
  return { statusCode: 200, body: JSON.stringify({ result: "Error: " + e.message}) };
  ]
};
