import nodemailer from 'nodemailer';
import { log, error } from '../debugger';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587, // Typically 587 for StartTLS or 465 for SSL
  secure: false, // Set to true if using SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    log('Message sent: %s', info.messageId);
  } catch (err) {
    error('Error sending email:', err);
  }
};
