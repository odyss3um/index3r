import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "TokenSight. Wallet Balance",
  description: "Retrieve wallet balance and total price in USD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
