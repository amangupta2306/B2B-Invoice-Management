import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center landing-page">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
