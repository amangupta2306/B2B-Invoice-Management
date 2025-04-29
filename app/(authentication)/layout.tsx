import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in | B2BIMS",
  description: "Generated to create GST Invoices",
  icons: { icon: "/Logo.png" },
};

export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex items-center w-full max-w-sm flex-col gap-6">
        <Link
          href={"/"}
          className="w-fit text-2xl font-semibold text-blue-500 flex items-center justify-center gap-1 hover:bg-gray-950 rounded-lg px-3 py-2"
        >
          <Image src={"/Logo.png"} alt="Logo" width={25} height={25} />
          <div>
            B2B
            <span className="dark:text-white text-black">IMS</span>
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
}
