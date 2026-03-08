import { Resend } from 'resend';

// This pulls the key from your .env.local automatically
export const resend = new Resend(process.env.RESEND_API_KEY);