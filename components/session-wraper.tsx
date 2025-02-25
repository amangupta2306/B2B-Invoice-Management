import requireUser from "@/lib/hooks";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const SessionWrapper = async ({ children }: { children: ReactNode }) => {
  const session = await requireUser();
  console.log(session, "session");
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
