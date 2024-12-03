import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/components/auth";
import { prisma } from "./prisma/prisma-client";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email: email },
          });

          if (!user) {
            throw new Error("User not found.");
          }

          const isPasswordValid = bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password.");
          }

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
