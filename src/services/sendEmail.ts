import nodemailer from "nodemailer";

const sendEmail = async (
  email: string,
  subject: string,
  text?: string,
  htmlContent: string = ""
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"Agencioo" <no-reply@agencioo.com>',
    to: email,
    subject,
    text,
    html: htmlContent || text,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
};

export default sendEmail;
