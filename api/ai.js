const models = ["llama-3.1-8b-instant", "llama-3.3-70b-versatile"];
const errors = [];

for (const model of models) {
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.65,
        max_tokens: 800,
      }),
    });
    const d = await r.json();
    if (r.ok && d.choices?.[0]?.message?.content) {
      return res.status(200).json({ result: d.choices[0].message.content });
    }
    errors.push(`${model}: ${r.status} ${d.error?.message || "unknown"}`);
  } catch (e) {
    errors.push(`${model}: ${e.message}`);
  }
}

console.error(errors);
return res.status(200).json({ result: "⚠️ Groq failed:\n" + errors.join("\n") });
