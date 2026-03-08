// app/api/checkout/route.ts
import { client } from '@/lib/sanity.client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerDetails, cartItems, totalAmount, reference } = body;

    // 1. Validation check
    if (!reference || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Missing required order data" }, { status: 400 });
    }

    // 2. Token check (Safety for 4GB RAM development)
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error("CRITICAL: SANITY_API_WRITE_TOKEN is missing in .env.local");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    // 3. Create the order in Sanity
    const result = await client.create({
      _type: 'order',
      customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
      email: customerDetails.email,
      // Combining details for a clean address field in your Studio
      address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.postal}`,
      amount: totalAmount,
      reference: reference, 
      status: 'paid',
      createdAt: new Date().toISOString(),
      items: cartItems.map((item: any) => ({
        _key: item._id || Math.random().toString(36).substring(7), 
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });

    return NextResponse.json({ 
      message: "Order successfully recorded in Sanity", 
      orderId: result._id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Sanity Write Error:", error);
    return NextResponse.json({ 
      error: "Failed to save order", 
      details: error.message 
    }, { status: 500 });
  }
}