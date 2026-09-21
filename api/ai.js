export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({error:'POST only'});
  const { text, task } = req.body;
  let prompt = "";
  if(task==="grammar") prompt = `Correct grammar only: """${text}"""`;
  if(task==="weakness") prompt = `List weakness, missing angles, gaps (bullets): """${text}"""`;
  if(task==="humanize") prompt = `Humanize so it doesn't look like AI, natural academic voice: """${text}"""`;
  if(task==="phrases") prompt = `Give better academic phrases Before->After for: """${text}"""`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "AI error - check key";
    res.json({ result });
  } catch (e) { res.json({ result: "Error: " + e.message }); }
}
