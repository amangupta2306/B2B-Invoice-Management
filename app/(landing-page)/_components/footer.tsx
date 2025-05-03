import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 lg:py-5 lg:pt-32 lg:pb-10">
      <div>
        <Link
          href={"/"}
          className="flex items-center text-xl lg:text-4xl font-semibold text-[#5c7cfa]"
        >
          <Image
            src={"/Logo.png"}
            alt="Logo"
            width={50}
            height={50}
            className="w-7 h-7 lg:w-auto lg:h-auto"
          />
          B2B <span className="text-[#f8f9fa]">IMS</span>
        </Link>
      </div>
      <div>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-white text-xs lg:text-base px-[6px] "
        >
          Privacy Policy
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-white text-xs lg:text-base px-[6px] "
        >
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
