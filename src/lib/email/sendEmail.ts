import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Add in .env.local
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Linkify Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Linkify Email Verification Code',
    html: `<h2>Your OTP code is:</h2><p><strong>${otp}</strong></p>`,
  });
};
