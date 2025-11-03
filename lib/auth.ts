import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        if (user) {
          // Database session (OAuth)
          session.user.id = user.id;
          // @ts-ignore
          session.user.role = user.role;
          // @ts-ignore
          session.user.handle = user.handle;
        } else if (token) {
          // JWT session (Credentials)
          session.user.id = token.sub!;
          // Fetch user data from DB for credentials login
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub! },
            select: { role: true, handle: true },
          });
          if (dbUser) {
            // @ts-ignore
            session.user.role = dbUser.role;
            // @ts-ignore
            session.user.handle = dbUser.handle;
          }
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT for credentials auth
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
