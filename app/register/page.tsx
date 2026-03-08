"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added import

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // --- THE FIX ---
        // We set redirect: false to handle the navigation manually and avoid the 404
        const result = await signIn("credentials", {
          email: data.email as string,
          password: data.password as string,
          redirect: false, 
        });

        if (result?.error) {
          alert("Registration successful, but login failed. Please go to the login page.");
          router.push("/login");
        } else {
          // Manually redirect to homepage
          router.push("/");
          router.refresh();
        }
      } else {
        const err = await res.json();
        alert(err.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("A server error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-12">
      <div className="w-full max-w-md p-10 space-y-8 bg-white border border-gray-100 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-playfair tracking-[0.2em] uppercase font-bold">Join the Circle</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Begin your legacy today</p>
        </div>

        {/* Google Registration */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition font-bold"
        >
          <img src="https://authjs.dev/img/providers/google.svg" width="16" alt="Google" />
          Sign up with Google
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex grow border-t border-gray-200"></div>
          <span className="flex shrink mx-4 text-gray-400 text-[10px] uppercase tracking-widest font-bold">or</span>
          <div className="flex grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            name="name" type="text" placeholder="FULL NAME" required 
            className="w-full px-4 py-4 border border-gray-100 text-[11px] tracking-widest focus:border-black outline-none transition" 
          />
          <input 
            name="email" type="email" placeholder="EMAIL ADDRESS" required 
            className="w-full px-4 py-4 border border-gray-100 text-[11px] tracking-widest focus:border-black outline-none transition" 
          />
          <input 
            name="password" type="password" placeholder="PASSWORD" required 
            className="w-full px-4 py-4 border border-gray-100 text-[11px] tracking-widest focus:border-black outline-none transition" 
          />
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-5 bg-black text-white text-[10px] tracking-[0.4em] uppercase hover:opacity-90 transition disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-50">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">
            Already a member?{" "}
            <Link href="/login" className="text-black font-bold underline underline-offset-8 hover:opacity-50 transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}