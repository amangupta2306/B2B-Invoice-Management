"use server";

import { signIn } from "./auth";

export const signInWGoogle = async () => {
  await signIn("google");
};
