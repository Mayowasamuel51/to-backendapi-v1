import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use smtp
    auth: {
      user: "fpasamuelmayowa51@gmail.com",
      pass: "rwui ggdt mhyc rzpz",
    },
  });

  await transporter.sendMail({
    from: `"TO Analytics" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;
