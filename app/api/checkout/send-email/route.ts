import { Resend } from 'resend';
import OrderReceiptEmail from '@/emails/OrderReceipt'; // Changed to default import
import { NextResponse } from 'next/server';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, total, items, type } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Determine Subject
    const subject = type === "marketing" 
      ? "Explore Our New Diamond Collection" 
      : "Your Luxe Diamond Order Confirmation";

    // Send Email
    const { data, error } = await resend.emails.send({
      from: 'Luxe Diamond <onboarding@resend.dev>', // Replace with your verified domain email later
      to: [email],
      subject: subject,
      // We pass the component as a React element
      react: React.createElement(OrderReceiptEmail, {
        firstName: firstName || "Valued Customer",
        total: total || 0,
        items: items || [],
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Resend Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}