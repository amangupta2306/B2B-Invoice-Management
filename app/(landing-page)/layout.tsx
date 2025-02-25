import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col items-center bg-violet-100">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
