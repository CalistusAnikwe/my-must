"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // We set redirect: false to handle navigation manually via the router
      // This prevents NextAuth from defaulting to a 404 page if it loses context
      const result = await signIn("credentials", {
        email: data.email as string,
        password: data.password as string,
        redirect: false,
      });

      // result?.error is checked here. If it exists, the login failed.
      if (result?.error) {
        alert("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        // Successful login: Force navigate to the homepage
        router.push("/");
        // Refresh ensures the Navbar and session state update immediately
        router.refresh();
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 py-12">
      <div className="w-full max-w-md p-10 space-y-8 bg-white border border-gray-100 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-playfair tracking-[0.2em] uppercase font-bold">Welcome Back</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Access your curated collection</p>
        </div>

        {/* Google Login Method */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition font-bold"
        >
          <img src="https://authjs.dev/img/providers/google.svg" width="16" alt="Google" />
          Continue with Google
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex grow border-t border-gray-200"></div>
          <span className="flex shrink mx-4 text-gray-300 text-[10px] uppercase tracking-widest font-bold">or</span>
          <div className="flex grow border-t border-gray-200"></div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="email@example.com" 
              required 
              className="w-full px-4 py-4 border border-gray-100 text-[11px] tracking-widest focus:border-black outline-none transition" 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-widest text-gray-400 ml-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className="w-full px-4 py-4 border border-gray-100 text-[11px] tracking-widest focus:border-black outline-none transition" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-5 bg-black text-white text-[10px] tracking-[0.4em] uppercase hover:opacity-90 transition disabled:bg-gray-400"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-50">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">
            New to Luxe Diamond?{" "}
            <Link href="/register" className="text-black font-bold underline underline-offset-8 hover:opacity-50 transition">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}