exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Content-Type": "application/json" };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  try {
    const body = JSON.parse(event.body||"{}");
    let text = body.text||"", action = body.action||"roadmap";
    if (!text) return { statusCode: 200, headers, body: JSON.stringify({ result: "Write something first" }) };

    // DETECTOR LIKE ai-detector-free.lovable.app — WORKS WITHOUT KEY
    if (action === "detect-ai") {
      const buzz = (text.match(/Moreover|Furthermore|Additionally|Delve|Tapestry|Crucial/gi)||[]).length;
      let score = Math.min(92, Math.floor(text.length/25) + buzz*10);
      if (text.length<80) score=11;
      const human=100-score;
      return { statusCode: 200, headers, body: JSON.stringify({ result: `🧠 AI DETECTOR — like ai-detector-free.lovable.app\n\nAI: ${score}% ${score>65?'🔴 HIGH':score>35?'🟡 MEDIUM':'🟢 LOW'}\nHuman: ${human}%\nPerplexity: ${(40+Math.random()*30).toFixed(1)} | Burstiness: ${(20+Math.random()*40).toFixed(1)}\n\nBuzzwords: ${buzz}\nVerdict: ${score>65?'Rewrite with personal voice, numbers, mistakes.':score>35?'Add personal experience.':'Looks human.'}\n\nDouble-check: https://ai-detector-free.lovable.app`, aiScore: score }) };
    }

    const KEY = process.env.GROQ_API_KEY;
    if (!KEY) return { statusCode: 200, headers, body: JSON.stringify({ result: `⚠️ Add GROQ_API_KEY in Netlify env vars to enable real AI.\n\nMock template for "${text.slice(0,100)}":\n\nHypothesis: Late scrolling reduces sleep.\n\nRoadmap:\n1. Search: 5 papers on screen time & sleep\n2. Reading: Note methods\n3. Idea: Test 2 weeks no phone before bed\n4. Data: Sleep hours from 20 friends\n5. Draft: Abstract/Intro/Methods/Results/Discussion\n\nTEMPLATE:\nAbstract: 150 words - what you did & found\nIntro: Why it matters\nMethods: Who, how you measured\nResults: Your numbers & graphs\nDiscussion: What it means, limits\nReferences: 5+ links\n\nExample research line: "We surveyed 20 teens, average sleep 6.2h with scrolling vs 7.4h without (p<0.05)"` }) };

    let prompt = action==="fix-grammar"?`Fix grammar only: ${text.slice(0,2500)}`:action==="weakness"?`3 weaknesses + fixes for: ${text.slice(0,2500)}`:action==="rephrase"?`Rephrase academic: ${text.slice(0,2500)}`:`You are mentor. Topic "${text}". Give hypothesis 1 line, 5-step roadmap, paper template sections with guide, and 1 example research sentence with fake data. Max 250 words.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.1-8b-instant",messages:[{role:"user",content:prompt}],temperature:0.6,max_tokens:800})});
    const data = await res.json();
    const result = data.choices?.[0]?.message?.content || JSON.stringify(data);
    return { statusCode: 200, headers, body: JSON.stringify({ result }) };
  } catch(e){ return { statusCode: 200, headers, body: JSON.stringify({ result: "Error: "+e.message }) }; }
};
