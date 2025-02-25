"use server"

import { auth  } from "./auth";

export default async function requireUser() {
  const session = await auth();

  return session;
}