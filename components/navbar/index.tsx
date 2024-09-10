"use client";
import { useEffect, useState } from "react";

import { CheckCircle2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

import { AccountSwitcher } from "./account-switcher";
import { DarkModeToggle } from "../theme-toggle";
import { NavbarItems } from "./navbar-items";
import { SearchBar } from "./search-bar";

export const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative z-10">
            <div className="fixed w-screen flex py-2 lg:pl-2 border-b lg:space-x-4">
                <div className={cn(
                    isCollapsed ? "" : "w-80"
                )}>
                    <AccountSwitcher isCollapsed={isCollapsed} />
                </div>
                <div className="flex justify-between w-full space-x-2 pr-3">
                    {isCollapsed && <DarkModeToggle />}

                    <SearchBar
                        data={[
                            {
                                label: "TEST",
                                type: "TEST",
                                data: [{
                                    name: "TEST",
                                    id: "1",
                                    icon: <CheckCircle2Icon size={18} />,
                                    subBadgeText: "TEST",
                                }]
                            },
                        ]}
                    />
                </div>
            </div>
            <aside className={cn("fixed bottom-0 lg:left-0 lg:top-14 lg:p-2 border border-l-0 w-screen lg:h-screen"
                + "transition-all duration-200 ease-in-out bg-background border-r",
                isCollapsed ? "w-full" : "w-72"
            )}>

                <NavbarItems isCollapsed={isCollapsed} />

            </aside>
        </div>
    )
}