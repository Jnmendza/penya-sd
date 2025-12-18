import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Import it

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Penya Blaugrana San Diego",
  description: "Official FC Barcelona Supporters Group of San Diego #2309",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar /> {/* 2. Place it here, ABOVE the children */}
        {children}
      </body>
    </html>
  );
}
