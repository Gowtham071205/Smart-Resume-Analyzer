import nodemailer from "nodemailer";

export const sendReport = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Issue Report: ${subject}`,
      text: `
From: ${email || "Anonymous"}

${message}
      `,
    });

    res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
};