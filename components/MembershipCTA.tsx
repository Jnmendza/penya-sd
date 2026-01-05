"use client";

import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  seasonId: string;
}

export default function MembershipCTA({ isOpen, seasonId }: Props) {
  // Target the specific section in your JSON
  const t = useTranslations("HomePage.MembershipCTA");

  return (
    <section className='relative overflow-hidden bg-barca-blue py-24 text-white'>
      {/* Background decoration */}
      <div className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10'>
        <div className='h-96 w-96 rounded-full bg-barca-red blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* LEFT: The Pitch */}
          <div className='space-y-8'>
            {/* 1. BADGE */}
            <div
              className={`inline-block rounded-full px-4 py-1 text-sm font-bold backdrop-blur-sm ${
                isOpen
                  ? "bg-barca-gold/20 text-barca-gold"
                  : "bg-slate-500/50 text-slate-200"
              }`}
            >
              {isOpen ? t("badge_open", { seasonId }) : t("badge_closed")}
            </div>

            {/* 2. RICH TEXT TITLE */}
            {/* We remove the manual <span> because it is now inside the JSON <highlight> tag */}
            <h2 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
              {t.rich("title", {
                // 1. Pass <br/> as a direct React Node (Variable)
                br: (<br key='br' />) as any,

                // 2. Keep highlight as a chunk function (Tag)
                highlight: (chunks) => (
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'>
                    {chunks}
                  </span>
                ),
              })}
            </h2>

            {/* 3. DESCRIPTION */}
            <p className='text-lg text-blue-100 max-w-md leading-relaxed'>
              {t("description")}
            </p>

            {/* 4. BENEFITS LIST */}
            <ul className='space-y-4'>
              {[
                t("benefits.card"),
                t("benefits.scarf", { year: "2025" }), // Variable passed to "Exclusive {year}..."
                t("benefits.pin"),
                t("benefits.priority"),
              ].map((item, index) => (
                <li key={index} className='flex items-center gap-3'>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      isOpen ? "bg-barca-red" : "bg-slate-600"
                    }`}
                  >
                    <svg
                      className='h-3.5 w-3.5 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <span className='font-medium text-white'>{item}</span>
                </li>
              ))}
            </ul>

            <div className='pt-4'>
              <div className='flex items-center gap-6'>
                {/* 5. PRICING & WINDOW */}
                {isOpen ? (
                  <div>
                    <span className='block text-3xl font-bold text-white'>
                      $30.00
                    </span>
                    <span className='text-sm text-blue-200'>
                      {t("pricing.per_year")}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className='block text-xl font-bold text-slate-300'>
                      {t("pricing.window_label")}
                    </span>
                    <span className='text-sm text-slate-400'>
                      {t("pricing.window_dates")}
                    </span>
                  </div>
                )}

                {/* 6. CTA BUTTONS */}
                <Link
                  href='/membership'
                  className={`rounded-full px-8 py-4 text-lg font-bold transition shadow-xl whitespace-nowrap ${
                    isOpen
                      ? "bg-barca-gold text-barca-blue hover:bg-yellow-400 hover:scale-105"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  }`}
                >
                  {isOpen ? t("cta.join") : t("cta.view")}
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: The Product Shot */}
          <div className='relative'>
            <div className='relative aspect-square w-full max-w-lg mx-auto rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-8 border border-white/10 backdrop-blur-sm shadow-2xl'>
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center p-6'>
                <Image
                  src='https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/merch.png'
                  alt='2025 Scarf & Pin Combo'
                  width={500}
                  height={500}
                  className='object-contain transition-transform duration-500 hover:scale-110 rounded-2xl'
                />
              </div>
            </div>

            {/* Decorative element */}
            <div className='absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-barca-red opacity-20 blur-3xl'></div>
          </div>
        </div>
      </div>
    </section>
  );
}
