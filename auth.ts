import NextAuth from "next-auth";
import { SanityAdapter } from "next-auth-sanity";
import { client } from "./sanity/lib/client";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"; 
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: SanityAdapter(client),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Google needs a slightly different setup for account linking
      allowDangerousEmailAccountLinking: true, 
    }),
    Credentials({
      async authorize(credentials) {
        const user = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: credentials?.email }
        );

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (passwordsMatch) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    // This ensures that the user object is available in the session
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
});