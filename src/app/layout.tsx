import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HotToast from "@/components/toast";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qr Menus",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Suspense>
          <HotToast />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
