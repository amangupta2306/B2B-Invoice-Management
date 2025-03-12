import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const SessionWrapper = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  console.log(session, "session");
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
