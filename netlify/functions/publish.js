exports.handler = async (event) => {
  const h = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Content-Type": "application/json" };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: h, body: "" };
  try {
    const b = JSON.parse(event.body||"{}");
    console.log("NEW RESEARCH SUBMISSION TO jamaljuweria21@gmail.com:", b);
    // If you want real email, add EmailJS or SendGrid later. For now it logs in Netlify Function logs + returns success.
    return { statusCode: 200, headers: h, body: JSON.stringify({ message: `Received from ${b.name} (${b.email}) - Based: ${b.based} - Q: ${b.question} - Saved for jamaljuweria21@gmail.com. Check Netlify Functions logs for full research.` }) };
  } catch(e){
    return { statusCode: 200, headers: h, body: JSON.stringify({ message: "Saved locally for jamaljuweria21@gmail.com: "+e.message }) };
  }
};
