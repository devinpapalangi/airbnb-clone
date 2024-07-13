import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth/next";
import { authOptions } from "@/app/utils/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
