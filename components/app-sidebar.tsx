"use client";

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Plus,
  ReceiptTextIcon,
  Stamp,
  UsersRoundIcon,
} from "lucide-react";
import { FaBottleWater, FaFileInvoice, FaFileSignature } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

const navMain = [
  {
    title: "GST",
    url: "#",
    icon: FaFileInvoice,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/gst/dashboard",
        icon: LayoutDashboard,
      },
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
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Create Invoice",
        url: "/create-invoice",
        icon: Plus,
      },
      {
        title: "Invoices",
        url: "/invoices",
        icon: ReceiptTextIcon,
      },
      {
        title: "Customers",
        url: "/customers",
        icon: UsersRoundIcon,
      },
      {
        title: "Products",
        url: "/products",
        icon: FaBottleWater,
      },
    ],
  },
];

// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Create Invoice",
//     url: "/create-invoice",
//     icon: Plus,
//   },
//   {
//     title: "Invoices",
//     url: "/invoices",
//     icon: ReceiptTextIcon,
//   },
//   {
//     title: "Customers",
//     url: "/customers",
//     icon: UsersRoundIcon,
//   },
//   {
//     title: "Products",
//     url: "/products",
//     icon: FaBottleWater,
//   },
// ];

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

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

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
        {/* <SidebarGroup>
          <SidebarGroupLabel>B2BMIS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-slate-700">
                    <Link href={item.url}>
                      <div className="flex items-center justify-center">
                        <item.icon className="size-4" />
                      </div>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} key={user.email} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
