import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'method not allowed'});
  const {name,text,progress} = req.body;
  try{
    await resend.emails.send({
      from:'curio.paper <onboarding@resend.dev>',
      to:'Preannbabu7@gmail.com', // backend only, not shown on site
      subject:`new note from ${name}`,
      html:`<div style="font-family:Sora,sans-serif;background:#FFF1F4;padding:24px;border-radius:16px"><h2 style="font-weight:800;text-transform:lowercase">curio.paper — new review</h2><p><b>name:</b> ${name}</p><p><b>review:</b><br/>${text}</p><p><b>progress:</b> ${JSON.stringify(progress)}</p></div>`
    });
    return res.status(200).json({ok:true});
  }catch(e){return res.status(500).json({error:e.message})}
}
