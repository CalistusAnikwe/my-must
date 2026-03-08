import * as bcrypt from "bcrypt";
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Requires 'Editor' permissions
  apiVersion: "2024-01-01",
});

async function createAdmin() {
  const email = "admin@example.com"; // Change to your client's email
  const password = "securepassword123"; // Change this!
  
  console.log("Hashing password...");
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    _type: "user",
    name: "Admin User",
    email: email,
    password: hashedPassword,
    role: "admin",
  };

  try {
    console.log(`Checking if user ${email} already exists...`);
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      console.log("User already exists! No need to seed.");
      return;
    }

    await client.create(user);
    console.log("✅ Admin user created successfully in Sanity!");
  } catch (err) {
    console.error("❌ Error creating user:", err);
  }
}

createAdmin();