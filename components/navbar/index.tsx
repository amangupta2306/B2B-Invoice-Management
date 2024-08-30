"use client";
import { useState } from "react";

import { CheckCircle2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

import { AccountSwitcher } from "./account-switcher";
import { DarkModeToggle } from "../theme-toggle";
import { NavbarItems } from "./navbar-items";
import { SearchBar } from "./search-bar";

export const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="relative">
            <div className="fixed w-screen flex p-2 border-b lg:space-x-4">
                <div className={cn(
                    isCollapsed ? "pl-px" : "w-80"
                )}>
                    <AccountSwitcher isCollapsed={isCollapsed} />
                </div>
                <div className="flex justify-between w-full pr-3">
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
            <aside className={cn("fixed left-0 top-14 p-2 border border-l-0 h-screen "
                + "transition-all duration-200 ease-in-out bg-background border-r",
                isCollapsed ? "w-[4.3rem]" : "w-72"
            )}>

                <NavbarItems isCollapsed={isCollapsed} />

            </aside>
        </div>
    )
}