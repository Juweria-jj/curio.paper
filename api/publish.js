module.exports = async function(req, res){
  if(req.method!== 'POST') return res.status(200).json({message:'Use POST'});
  try{
    const {based, question, research, authorEmail} = req.body || {};
    if(!research) return res.status(200).json({message:'Paste your research first'});
    const TO_EMAIL = process.env.PUBLISH_EMAIL || "jamaljuweria21@gmail.com";
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const content = `NEW RESEARCH - curio.paper\n\nBased: ${based}\nQuestion: ${question}\nAuthor Email: ${authorEmail}\n\nResearch:\n${research}\n\nTime: ${new Date().toISOString()}`;
    if(RESEND_KEY){
      await fetch('https://api.resend.com/emails',{
        method:'POST',
        headers:{'Authorization':`Bearer ${RESEND_KEY}`,'Content-Type':'application/json'},
        body: JSON.stringify({
          from: 'curio.paper <onboarding@resend.dev>',
          to: TO_EMAIL,
          subject: `📄 New Research: ${question || based}`,
          text: content
        })
      });
      return res.status(200).json({message:`✅ Published! Thank you. Submitted for review. Now make it PUBLIC by publishing on JSR & Springer below ⬇️`});
    } else {
      console.log(content);
      return res.status(200).json({message:`✅ Received! (Add RESEND_API_KEY in Vercel to get email)\n\nNext: Make it PUBLIC on JSR and Springer below.`});
    }
  }catch(e){ return res.status(200).json({message:'Error: '+e.message}); }
}
