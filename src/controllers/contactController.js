import Message from '../models/Message.js';
import { sendEmail } from '../utils/email.js';

export const submitContact = async (request, response) => {
  await Message.create({
    kind: 'contact',
    name: request.body.name,
    email: request.body.email,
    company: request.body.company,
    phone: request.body.phone,
    subject: request.body.subject || 'Contact request',
    body: request.body.message,
  });

  await sendEmail({
    to: process.env.SMTP_FROM || process.env.SMTP_USER || request.body.email,
    subject: request.body.subject || 'New agency inquiry',
    text: `From: ${request.body.name}\nEmail: ${request.body.email}\nCompany: ${request.body.company || 'N/A'}\nPhone: ${request.body.phone || 'N/A'}\n\n${request.body.message}`,
  });

  response.status(201).json({ message: 'Contact request received' });
};