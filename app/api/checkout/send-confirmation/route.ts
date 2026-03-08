import { resend } from '@/lib/resend';
import { OrderReceiptEmail } from '@/emails/OrderReceipt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, firstName, total, items } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Luxe Diamond <onboarding@resend.dev>', // Use this for testing
      to: [email],
      subject: 'Your Legacy of Light Order',
      react: OrderReceiptEmail({ firstName, total, items }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}