// api/publish.js - dedicated endpoint for D section
export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const { based, question } = req.body;
  if (!based ||!question) return res.status(400).json({ error: 'fill both fields' });

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY missing' });
  }

  const prompt = `
You are curio.paper journal matcher.

Student research is based on: "${based}"
Research question: "${question}"

Task: Suggest where it should live. Give 3 options in this exact format:

1. **JSR - Journal of Student Research**
   - why: 1 line fit
   - link: https://www.jsr.org/hs/index.php/path
   - difficulty: easy / medium

2. **Springer Nature**
   - why: 1 line fit
   - link: https://www.springernature.com/gp/authors/campaigns/writing-a-manuscript
   - difficulty: medium / hard
   - tip: how to improve for springer

3. **The Young Researcher**
   - why: 1 line fit
   - link: https://www.theyoungresearcher.com/
   - difficulty: easy

Keep all lowercase, minimal, pastel tone, friendly. No uppercase headings.
`;

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 800
      })
    });

    const data = await r.json();
    const result = data.choices?.[0]?.message?.content || 'no result';

    // return as HTML for frontend
    return res.status(200).json({
      result: result.replace(/\n/g, '<br/>'),
      links: {
        jsr: 'https://www.jsr.org/hs/index.php/path',
        springer: 'https://www.springernature.com/gp/authors/campaigns/writing-a-manuscript',
        young: 'https://www.theyoungresearcher.com/'
      }
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
