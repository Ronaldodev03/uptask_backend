import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// const config = () => {
//   return {
//     host: process.env.SMTP_HOST,
//     port: +process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   };
// };

const config = () => {
  return {
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
};

export const transporter = nodemailer.createTransport(config());
