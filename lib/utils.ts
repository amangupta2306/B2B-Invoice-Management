import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import bcryptjs from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyForIndia(amount: number) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(amount);
}

export const saltAndHashPassword = async (planPassword: string) => {
  try {
    const rounds = await bcryptjs.genSalt(10);
    return bcryptjs.hashSync(planPassword, rounds);
  } catch (error) {
    console.log(error, "[saltAndHashPassword]");
  }
};

export const getUserFromDb = async (email: string, plainPassword: string) => {
  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) throw new Error("User not found!");

    const isValid = await bcryptjs.compare(plainPassword, user.password);
    if (isValid) {
      return user;
    }

    return null;
  } catch (error) {
    console.log(error, "[getUserFromDb]");
  }
};
