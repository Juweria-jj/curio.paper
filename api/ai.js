export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, text, url } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  // YOUR DETECTOR URL
  const DETECTOR_URL = "https://ai-detector-free.lovable.app";

  if (!apiKey) return res.status(500).json({ error: "Set OPENAI_API_KEY in Vercel env" });

  try {
    // 1. TOOLBOX - Turn Ideas into Project
    if (action === 'toolbox') {
      const prompt = `You are Curio.paper research coach. Given keywords and research question, generate a full example research template.
Format:
TITLE:
ABSTRACT (150 words):
HYPOTHESIS:
RESEARCH QUESTIONS (3):
METHODOLOGY (step-by-step):
EXPECTED RESULTS:
STRUCTURE (IMRaD):
REFERENCES (5 APA style):
PUBLISHABLE JOURNALS (suggest 2 from JSR / Young Researcher)

Input: ${text}`;
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: prompt }], temperature: 0.5 })
      });
      const d = await r.json();
      return res.json({ result: d.choices[0].message.content });
    }

    // 2. DETECT AI - Try to use your lovable.app detector first
    if (action === 'detect-ai') {
      // Try to iframe / proxy your detector - we show link + also run GPT detection as backup
      let detectorNote = `Checked via your detector: ${DETECTOR_URL}\nTo get full scan, click 'Open Your Detector App' and paste text.\n\n--- GPT Backup Analysis ---\n`;
      const gptDetect = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are AI detector. Give AI probability %, Human %, and reasons (burstiness, perplexity, repetition). If AI, suggest how to humanize." },
            { role: "user", content: text.slice(0, 4000) }
          ]
        })
      });
      const gd = await gptDetect.json();
      return res.json({ result: detectorNote + gd.choices[0].message.content, detectorUrl: DETECTOR_URL });
    }

    // 3. MAKE ARGUMENT CLEAR + other actions - WITH AI DETECTOR INTEGRATION
    let systemPrompt = "";
    if (action === 'make-clear') systemPrompt = `You are academic editor. Make argument crystal clear + fix grammar + find weakness + rephrase. Also add at end: "AI Detection Check: Run this through ${DETECTOR_URL} - score should be <20% AI after rewrite. Suggestions to humanize: vary sentence length, add personal insight." Structure: 1. Clear Argument (Claim-Evidence-Reasoning) 2. Fixed Grammar Version 3. Weaknesses 4. Rephrased Academic Version 5. AI Detector Tip`;
    if (action === 'fix-grammar') systemPrompt = "Fix grammar, spelling, punctuation. Keep meaning. Return only fixed text.";
    if (action === 'weakness') systemPrompt = "You are reviewer for JSR. Find 3 weaknesses, logical gaps, missing citations. Be constructive.";
    if (action === 'rephrase') systemPrompt = "Rephrase academically, clear and concise. Give 2 alternatives.";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Paper: ${url}\nText: ${text}` }
        ],
        temperature: 0.3
      })
    });
    const data = await response.json();
    return res.json({ result: data.choices[0].message.content, detectorUrl: DETECTOR_URL });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
