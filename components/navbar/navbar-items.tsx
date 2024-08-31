"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { LINKS } from "@/lib/data-helper"

import { buttonVariants } from "@/components/ui/button"
import ActionTooltip from "@/components/action-tooltip"
import { usePathname } from "next/navigation"

interface NavProps {
    isCollapsed?: boolean
    links?: {
        title: string
        label?: string
        href: string
        icon: LucideIcon
        variant: "default" | "ghost"
    }[]
}

export function NavbarItems({ links = LINKS, isCollapsed = false }: NavProps) {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-start group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <ActionTooltip
                            label={link.label || ""}
                            side="right"
                        >
                            <Link
                                href={link.href || ""}
                                className={cn(
                                    buttonVariants({ variant: link.variant, size: "icon" }),
                                    "h-9 w-9",
                                    link.variant === "default" &&
                                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-primary dark:hover:text-white",
                                    pathname === link.href ? "bg-primary text-white" : ""
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                <span className="sr-only">{link.title}</span>
                            </Link>
                        </ActionTooltip>
                    ) : (
                        <Link
                            key={index}
                            href={link.href || ""}
                            className={cn(
                                buttonVariants({ variant: link.variant, size: "sm" }),
                                link.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-primary dark:hover:text-white",
                                "justify-start",
                                pathname === link.href ? "dark:bg-primary text-white" : ""
                            )}
                        >
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.title}
                            {link.label && (
                                <span
                                    className={cn(
                                        "ml-auto",
                                        link.variant === "default" &&
                                        "text-background dark:text-white"
                                    )}
                                >
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}
