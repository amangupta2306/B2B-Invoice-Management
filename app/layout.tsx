import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionWrapper } from "@/components/session-wraper";
import { ModalProvider } from "@/components/providers/modal-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GST - Invoice",
  description: "Generated to create GST Invoices",
  icons: { icon: "/Logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <SessionWrapper>
          {/* <ThemeProvider
            forcedTheme="light"
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <ModalProvider />

          {children}
          <Toaster />
          {/* </ThemeProvider> */}
        </SessionWrapper>
      </body>
    </html>
  );
}
