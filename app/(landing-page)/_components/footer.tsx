import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex items-center justify-between px-52 py-5 pt-32 pb-10">
      <Link
        href={"/"}
        className="flex items-center text-4xl font-semibold text-blue-500"
      >
        <Image src={"/Logo.png"} alt="Logo" width={50} height={50} />
        B2B <span className="dark:text-white text-black">IMS</span>
      </Link>
      <div>
        <Button variant={"link"} size={"sm"} className="text-black dark:text-white">
          Privacy Policy
        </Button>
        <Button variant={"link"} size={"sm"} className="text-black dark:text-white">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
