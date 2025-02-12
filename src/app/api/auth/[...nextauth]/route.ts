import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Example authentication (Replace with real database check)
        if (credentials.email !== "test@example.com" || credentials.password !== "password") {
          throw new Error("Invalid credentials");
        }

        return { id: "1", name: "Test User", email: credentials.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});


export const GET = (req: NextRequest) => handler(req);
export const POST = (req: NextRequest) => handler(req);
