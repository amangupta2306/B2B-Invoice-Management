import { BoxIcon, ReceiptTextIcon, UsersRoundIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export const ACCOUNTS = () => {
  const { data: session } = useSession();

  return [
    {
      label: session?.user?.name || "Unknown User",
      email: session?.user?.email || "Unknown Email",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Vercel</title>
          <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: session?.user?.name || "Unknown User",
      email: session?.user?.email || "Unknown Email",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Vercel</title>
          <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
        </svg>
      ),
    },
  ];
};

export const LINKS = [
  {
    title: "Invoices",
    // label: "500+",
    href: "/invoices",
    icon: ReceiptTextIcon,
    variant: "default" as const,
  },
  {
    title: "Customers",
    // label: "100+",
    href: "/customers",
    icon: UsersRoundIcon,
    variant: "default" as const,
  },
  {
    title: "Products",
    // label: "50+",
    href: "/products",
    icon: BoxIcon,
    variant: "default" as const,
  },
];
