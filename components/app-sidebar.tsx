"use client";

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Plus,
  ReceiptTextIcon,
  UsersRoundIcon,
} from "lucide-react";
import { FaBottleWater, FaFileInvoice } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";

const navMain = [
  {
    title: "GST",
    url: "#",
    icon: FaFileInvoice,
    isActive: true,
    items: [
      {
        title: "Create Invoice",
        url: "/gst/create-invoice",
        icon: Plus,
      },
      {
        title: "Invoices",
        url: "/gst/invoices",
        icon: ReceiptTextIcon,
      },
      {
        title: "Customers",
        url: "/gst/customers",
        icon: UsersRoundIcon,
      },
      {
        title: "Products",
        url: "/gst/products",
        icon: FaBottleWater,
      },
    ],
  },
  {
    title: "Local",
    url: "#",
    icon: TbFileInvoice,
    isActive: true,
    items: [
      {
        title: "Create Invoice",
        url: "/local/create-invoice",
        icon: Plus,
      },
      {
        title: "Invoices",
        url: "/local/invoices",
        icon: ReceiptTextIcon,
      },
      {
        title: "Customers",
        url: "/local/customers",
        icon: UsersRoundIcon,
      },
      {
        title: "Products",
        url: "/local/products",
        icon: FaBottleWater,
      },
    ],
  },
];

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="bg-slate-800 text-white" 
    >
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
