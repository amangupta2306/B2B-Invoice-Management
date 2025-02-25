"use server";

import { signIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { saltAndHashPassword } from "@/lib/utils";

export async function signInCred(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  if (!email || !password) {
    return { error: "Please provide email and password" };
  }
  if (username) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return { error: "User already exist" };
    }
    const hashPassword = await saltAndHashPassword(password as string);
    if (!hashPassword) {
      return { error: "Error hashing password" };
    }
    if (hashPassword) {
      await prisma.users.create({
        data: {
          email,
          password: hashPassword,
          username,
        },
      });
    }
    return true;
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return true;
  } catch (error) {
    console.error(error, "[signIn]");
    return { error: "Invalid credentials" };
  }
}
