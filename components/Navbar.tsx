"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import MerchLink from "./MerchLink";
import LanguageSwitcher from "./LanguageSwitcher";

const store_status = {
  open: "open",
  maintenance: "maintenance",
} as const;

type store_status = (typeof store_status)[keyof typeof store_status];

export const NAV_LINKS: { href: string; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/location", key: "location" },
  { href: "/community", key: "community" },
  { href: "/global", key: "global" },
  { href: "/chants", key: "chants" },
  { href: "/rafa-marquez", key: "marquez" },
  { href: "/contact", key: "contact" },
];

export default function Navbar() {
  const t = useTranslations("Navbar");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [storeStatus, setStoreStatus] = useState<store_status>(
    store_status.open,
  ); // Default to open

  const pathname = usePathname();
  const supabase = createClient();
  const isHomePage = pathname === "/";

  useEffect(() => {
    // 1. Scroll Logic
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 2. Fetch Store Status
    const fetchConfig = async () => {
      const { data } = await supabase
        .from("app_config")
        .select("value")
        .eq("key", "store_status")
        .single();

      if (data) {
        setStoreStatus(data.value as store_status);
      }
    };

    window.addEventListener("scroll", handleScroll);
    fetchConfig(); // Call fetch

    return () => window.removeEventListener("scroll", handleScroll);
  }, [supabase]); // Run once on mount and when supabase client changes

  const useSolidStyle = !isHomePage || isScrolled;
  // Helper to determine maintenance mode
  const isMaintenance = storeStatus === store_status.maintenance;

  return (
    <nav
      className={`${
        isHomePage ? "fixed" : "sticky"
      } top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useSolidStyle ? "bg-slate-900 shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className='container mx-auto flex items-center justify-between px-4'>
        {/* LOGO */}
        <Link href='/' className='flex flex-col items-center gap-2 group'>
          <div className='relative h-16 w-16'>
            <Image
              src='https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/pbsd-rafa-crest.png'
              alt='PBSD Logo'
              fill
              className='object-contain'
            />
          </div>
          <span className='text-xl font-bold tracking-tight text-white'>
            Penya<span className='text-barca-gold'>SD</span>
          </span>
        </Link>

        {/* DESKTOP MENU - CENTER */}
        <div className='hidden capitalize items-center gap-8 md:flex'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-barca-gold transition ${
                pathname === link.href ? "text-barca-gold" : "text-white"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className='hidden md:flex items-center gap-4'>
          {/* Pass the dynamic status here */}
          <MerchLink
            className='text-sm font-medium text-white hover:text-barca-gold'
            isMaintenance={isMaintenance}
          />

          <span className='text-white/20 h-5 border-l border-white/20'></span>

          <LanguageSwitcher />

          <Link
            href='/membership'
            className='rounded-full bg-barca-gold px-5 py-2 text-sm font-bold text-barca-blue transition hover:bg-yellow-400 hover:scale-105'
          >
            {t("membership")}
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className='text-white md:hidden'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-slate-900 border-t border-white/10 p-4 md:hidden shadow-xl'>
          <div className='flex capitalize flex-col space-y-4'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-white hover:text-barca-gold ${
                  pathname === link.href ? "text-barca-gold font-bold" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.key}
              </Link>
            ))}

            {/* Pass dynamic status to mobile too */}
            <div className='py-1'>
              <MerchLink
                mobile={true}
                className='block text-white hover:text-barca-gold w-full text-left text-base font-medium'
                isMaintenance={isMaintenance}
              />
            </div>

            {/* MOBILE LANGUAGE SWITCHER */}
            <div className='flex items-center justify-between border-t border-white/10 pt-4'>
              <span className='text-white text-sm uppercase font-bold text-slate-400'>
                Language
              </span>
              <LanguageSwitcher />
            </div>

            <Link
              href='/membership'
              className='block w-full rounded-lg bg-barca-gold py-3 text-center font-bold text-barca-blue'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Membership
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
