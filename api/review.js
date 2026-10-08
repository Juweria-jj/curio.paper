// api/review.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { reviewer_name, rating, review, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "Thecuriopaper@gmail.com", // <-- CHANGED HERE
      subject: `New REVIEW ⭐ ${rating} - curio.paper`,
      html: `
        <h3>New Review on curio.paper</h3>
        <p><b>Name:</b> ${reviewer_name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Rating:</b> ${rating} ⭐</p>
        <p><b>Review:</b><br>${review}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
