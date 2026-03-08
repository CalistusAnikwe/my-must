import { NextResponse } from "next/server";
import { client } from "@/lib/sanity.client";
import * as bcrypt from "bcrypt";

// 1. CRITICAL: Force Node.js runtime so bcrypt doesn't crash the API
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // 2. Check if user already exists
    // We use the standard client for fetching
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email: email.toLowerCase() }
    );

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user in Sanity
    const newUser = {
      _type: "user",
      name: name || "New Customer",
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "customer", // Default role
    };

    /* 5. CRITICAL: Use the Write Token. 
       We configure a temporary client with your Write Token 
       to ensure we have permission to create the document.
    */
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN_SEED || process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    await writeClient.create(newUser);

    return NextResponse.json(
      { message: "User registered successfully" }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);
    
    // Return actual error message for easier debugging
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}