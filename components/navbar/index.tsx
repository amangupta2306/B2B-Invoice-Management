"use client";

import { useEffect, useState } from "react";

import { CheckCircle2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

import { AccountSwitcher } from "./account-switcher";
import { DarkModeToggle } from "../theme-toggle";
import { NavbarItems } from "./navbar-items";
import { SearchBar } from "./search-bar";
import { Profile } from "./profile";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroller = () => {
      if (window.scrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroller);

    return () => window.removeEventListener("scroll", handleScroller);
  }, [lastScrollY]);

  return (
    <div className="relative z-10 ">
      <div
        className={cn(
          "fixed top-10 left-80 rounded-full w-full bg-red-900 flex items-center p-3 border-b gap-3  transition-all duration-200 ease-in-out",
          isNavbarVisible ? "" : "hidden"
        )}
      >
        <div className={cn("bg-red-900", isCollapsed ? "w-full" : "w-96")}>
          <AccountSwitcher isCollapsed={isCollapsed} />
        </div>

        <div className="flex lg:w-full space-x-2">
          {isCollapsed && <DarkModeToggle />}

          <Profile />

          <SearchBar
            data={[
              {
                label: "TEST",
                type: "TEST",
                data: [
                  {
                    name: "TEST",
                    id: "1",
                    icon: <CheckCircle2Icon size={18} />,
                    subBadgeText: "TEST",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      <aside
        className={cn(
          "fixed bottom-0 lg:left-0 lg:p-2 border border-l-0 w-screen lg:h-screen flex" +
            "transition-all duration-200 ease-in-out bg-background border-r",
          isCollapsed ? "w-full" : "w-72",
          isNavbarVisible ? "" : "hidden"
        )}
      >
        {" "}
        <Link
          href={"/"}
          className="flex items-center text-4xl font-semibold text-blue-500 p-3 pb-10"
        >
          <Image src={"/Logo.png"} alt="Logo" width={50} height={50} />
          B2B <span className="dark:text-white text-black">IMS</span>
        </Link>
        <NavbarItems isCollapsed={isCollapsed} />
      </aside>
    </div>
  );
};
