"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface SearchPropsBar {
  data: {
    label: string;
    type: "TEST",
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
      subBadgeText: string;
      badgeInfo?: {
        variant: "default" | "secondary" | "destructive" | "outline" | null | undefined;
        text: string;
      }
    }[] | undefined
  }[]
}

export function SearchBar({
  data
}: SearchPropsBar) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down)
  }, []);

  const onClick = ({ id, type }: { id: string, type: "TEST" }) => {
    setOpen(false);

    // if (type === "order") {
    //   return router.push(`/track/${id}`)
    // }

    // if (type === "hub") {
    //   return router.push(`/settings/pickup-address/manage-pickup-addresses`)
    // }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group border-none lg:p-2 p-1 rounded-full lg:bg-zinc-100 flex items-center gap-x-2 lg:w-full lg:hover:bg-zinc-100/95 dark:lg:bg-zinc-800  dark:lg:hover:bg-zinc-700 transition"
      >
        <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <p
          className="font-semibold text-sm text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 dark:text-zinc-300 transition hidden lg:block"
        >
          Search
        </p>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Enter ..." />
        <CommandList>
          <CommandEmpty>
            No Results found
          </CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name, subBadgeText, badgeInfo }) => {
                  return (
                    <CommandItem className="space-x-3" key={id} onSelect={() => onClick({ id, type })}>
                      {icon}
                      <span>{name}</span>
                      <Badge variant={(badgeInfo?.variant || "secondary")}>{badgeInfo?.text}</Badge>
                      {subBadgeText && <Badge variant={'secondary'}>{subBadgeText}</Badge>}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}