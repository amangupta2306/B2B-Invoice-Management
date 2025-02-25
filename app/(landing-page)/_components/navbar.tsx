import { DarkModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="sticky top-5 z-50 flex items-center justify-between px-20 py-5 rounded-full bg-red-50 w-3/4">
      <Link
        href={"/"}
        className="flex items-center text-4xl font-semibold text-blue-500"
      >
        <Image src={"/Logo.png"} alt="Logo" width={50} height={50} />
        B2B <span className="dark:text-white text-black">IMS</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link href={"/auth/signin"}>
          <Button className="text-md">
            Sign in
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>{" "}
        </Link>
        {/* <DarkModeToggle /> */}
      </div>
    </nav>
  );
};
