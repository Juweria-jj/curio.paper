export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'POST only'});
  const {q}=req.body;
  const openKey=process.env.OPENAI_API_KEY;
  const gemKey=process.env.GEMINI_API_KEY;
  if(!openKey&&!gemKey) return res.status(500).json({error:'No API key set. Add OPENAI_API_KEY in Vercel > Settings > Environment Variables > Redeploy'});
  try{
    if(openKey){
      const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${openKey}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"system",content:"You are curio.paper — minimal research mentor — paper aesthetic"},{role:"user",content:q}]})});
      const j=await r.json();
      return res.json({answer:j.choices[0].message.content});
    }else{
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${gemKey}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:q}]}]})});
      const j=await r.json();
      return res.json({answer:j.candidates[0].content.parts[0].text});
    }
  }catch(e){return res.status(500).json({error:e.message})}
}
