import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Ensure this import path is correct
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/utils/navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Penya Blaugrana San Diego",
  description: "Official FC Barcelona Supporters Group of San Diego",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 1. Await params (Next.js 15 requirement) and validate locale
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 2. Fetch messages
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {/* 3. PROVIDER WRAPS EVERYTHING */}
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
