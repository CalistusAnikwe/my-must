import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Providers are defined in auth.ts
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register", // Explicitly map the new user page
  },
  callbacks: {
    // 1. The Redirect Callback: This ensures the user is sent home after login/signup
    async redirect({ url, baseUrl }) {
      // If the url starts with the baseUrl, it's a relative redirect (like "/")
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If it's already a full URL on our site, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Default to homepage
      return baseUrl;
    },

    // 2. The Authorized Callback: Handles route protection
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isStudio = nextUrl.pathname.startsWith("/studio");
      
      if (isStudio) {
        if (isLoggedIn) return true;
        return false; // Redirects to /login defined in pages above
      }
      
      // If they are on the login or register page while logged in, send them home
      const isAuthPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;