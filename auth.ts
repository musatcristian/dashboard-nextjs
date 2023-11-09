import { sql } from "@vercel/postgres";
import { compare as passwordCompare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import type { User } from "@/app/lib/definitions";
import { authConfig } from "./auth.config";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const credentialsAuth = async (
  credentials: Partial<Record<string, unknown>>,
  request: Request
) => {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(credentials);

  if (parsedCredentials.success) {
    try {
      const { email, password } = parsedCredentials.data;
      const user = await getUser(email);
      if (!user) throw new Error("NO User");

      const passwordsMatch = await passwordCompare(password, user.password);

      if (passwordsMatch) return user;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  return null;
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: credentialsAuth,
    }),
  ],
});
