import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

export const sendOtpEmail = async (
  email: string,
  otp: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "RepoPilot OTP Verification",
    html: `
      <h2>Email Verification</h2>

      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};