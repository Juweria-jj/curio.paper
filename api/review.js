let reviews = [];
module.exports = async function(req, res){
  if(req.method === 'GET') return res.status(200).json({reviews});
  if(req.method === 'POST'){
    try{
      const {name, text, progress} = req.body || {};
      const entry = {name: name||'Anonymous', text, progress, time: new Date().toISOString()};
      reviews.push(entry);
      const TO_EMAIL = process.env.PUBLISH_EMAIL || "jamaljuweria21@gmail.com";
      const RESEND_KEY = process.env.RESEND_API_KEY;
      if(RESEND_KEY){
        await fetch('https://api.resend.com/emails',{
          method:'POST',
          headers:{'Authorization':`Bearer ${RESEND_KEY}`,'Content-Type':'application/json'},
          body: JSON.stringify({
            from: 'curio.paper <onboarding@resend.dev>',
            to: TO_EMAIL,
            subject: `⭐ New Review from ${name}`,
            text: `Review:\nName: ${name}\nText: ${text}\nProgress: ${JSON.stringify(progress)}\nTime: ${new Date().toISOString()}`
          })
        });
      }
      return res.status(200).json({message:'✅ Review submitted! Thank you ❤️'});
    }catch(e){ return res.status(200).json({message:'Error: '+e.message}); }
  }
  return res.status(200).json({message:'Use GET or POST'});
}
