import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config();

const mailKey = process.env.mailKey

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'delhoyo.lorenzo@gmail.com',
      pass: mailKey
    }
  });