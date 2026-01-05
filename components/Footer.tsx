"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/utils/navigation"; // Use i18n Link
import Image from "next/image";

// Define links locally to map them to translation keys
const FOOTER_LINKS: { href: string; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/location", key: "location" },
  { href: "/community", key: "community" },
  { href: "/global", key: "global" },
  { href: "/contact", key: "contact" },
  { href: "/membership", key: "membership" }, // Added membership as it's common in footers
];

export default function Footer() {
  // We need two namespaces: one for specific footer text, one to reuse navbar link names
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-slate-900 border-t border-slate-800 text-slate-400 py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Identity */}
          <div className='flex items-center gap-4'>
            <div className='relative h-14 w-14 shrink-0'>
              <Image
                src='https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/logo.png'
                alt='PBSD Logo'
                fill
                className='object-contain'
              />
            </div>
            <div className='flex flex-col'>
              <h3 className='text-white font-bold text-lg leading-tight'>
                Penya Blaugrana{" "}
                <span className='text-barca-gold'>San Diego</span>
              </h3>
              <p className='text-sm mt-1'>{t("subtitle")}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium max-w-lg md:max-w-none'>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='hover:text-barca-gold transition capitalize tracking-wider'
              >
                {/* Reuse the translations from the Navbar section */}
                {tNav(link.key)}
              </Link>
            ))}
          </div>

          {/* Socials / Copyright */}
          <div className='text-center md:text-right text-sm'>
            <p>{t("copyright", { year: currentYear })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
