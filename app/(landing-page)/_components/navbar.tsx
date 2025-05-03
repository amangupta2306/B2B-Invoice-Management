import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="hidden sticky top-5 z-50 lg:flex items-center justify-between px-20 py-5 rounded-full bg-[#1e1e2f] w-3/4">
      <Link
        href={"/"}
        className="flex items-center text-4xl font-semibold text-[#5c7cfa]"
      >
        <Image src={"/Logo.png"} alt="Logo" width={50} height={50} />
        B2B <span className="text-white">IMS</span>
      </Link>
    </nav>
  );
};
