"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 shadow-lg backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className='container mx-auto flex items-center justify-between px-4'>
        {/* LOGO */}
        <Link href='/' className='flex items-center gap-2 group'>
          {/* Placeholder Crest - You can replace src with your actual logo file later */}
          <div className='h-10 w-10 overflow-hidden rounded-full bg-white/10 p-1 transition group-hover:bg-white/20'>
            <img
              src='https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg'
              alt='PBSD Logo'
              className='h-full w-full object-contain'
            />
          </div>
          <span className='text-xl font-bold tracking-tight text-white'>
            Penya<span className='text-barca-gold'>SD</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className='hidden items-center gap-8 md:flex'>
          <Link
            href='/'
            className='text-sm font-medium text-white hover:text-barca-gold transition'
          >
            Home
          </Link>
          <Link
            href='/location'
            className='text-sm font-medium text-white hover:text-barca-gold transition'
          >
            Location
          </Link>
          <Link
            href='/community'
            className='text-sm font-medium text-white hover:text-barca-gold transition'
          >
            Community
          </Link>
          <Link
            href='/contact'
            className='text-sm font-medium text-white hover:text-barca-gold transition'
          >
            Contact
          </Link>
        </div>

        {/* CTA BUTTON */}
        <div className='hidden md:block'>
          <Link
            href='/membership'
            className='rounded-full bg-barca-gold px-5 py-2 text-sm font-bold text-barca-blue transition hover:bg-yellow-400 hover:scale-105'
          >
            Join / Login
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
          <div className='flex flex-col space-y-4'>
            <Link
              href='/'
              className='block text-white hover:text-barca-gold'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href='/location'
              className='block text-white hover:text-barca-gold'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Location
            </Link>
            <Link
              href='/community'
              className='block text-white hover:text-barca-gold'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href='/membership'
              className='block w-full rounded-lg bg-barca-gold py-3 text-center font-bold text-barca-blue'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join the Penya
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
