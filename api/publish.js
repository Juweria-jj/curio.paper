// api/publish.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, title, abstract, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your gmail
      pass: process.env.EMAIL_PASS, // your app password
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "Thecuriopaper@gmail.com", // <-- CHANGED HERE
      subject: `New Publish Request: ${title || "curio.paper"}`,
      html: `
        <h3>New Publish Response on curio.paper</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Title:</b> ${title}</p>
        <p><b>Abstract/Message:</b><br>${abstract || message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: "Sent to Thecuriopaper@gmail.com" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
