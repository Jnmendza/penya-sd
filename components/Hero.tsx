"use client";

import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image"; // <--- Import this

export default function Hero() {
  const t = useTranslations("HomePage.Hero");

  return (
    <section className='relative h-screen w-full overflow-hidden bg-slate-900'>
      {/* 1. Background Image/Video Layer */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/hero-shot.jpeg?q=80&w=2831&auto=format&fit=crop'
          alt='Penya Blaugrana San Diego Crowd'
          fill
          className='object-cover opacity-50'
          priority
        />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-barca-blue/90 via-slate-900/60 to-transparent' />
      </div>

      {/* 2. Content Layer */}
      <div className='relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white pt-32 pb-32 md:pb-48'>
        {/* Badge */}
        <div className='mb-6 inline-block rounded-full border border-barca-gold/50 bg-barca-blue/30 px-4 py-1 backdrop-blur-md'>
          <span className='text-sm font-semibold tracking-wide text-barca-gold uppercase'>
            {t("badge")}
          </span>
        </div>

        {/* Headline */}
        <h1 className='mb-6 text-5xl font-black uppercase tracking-wide text-white sm:text-7xl md:text-8xl drop-shadow-lg'>
          {t.rich("title", {
            br: (<br key='br' />) as unknown as string,
            highlight: (chunks) => (
              <span className='block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-red-600'>
                {chunks}
              </span>
            ),
          })}
        </h1>

        <p className='mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl'>
          {t("description")}
        </p>

        {/* Buttons */}
        <div className='flex flex-col gap-4 sm:flex-row'>
          <Link
            href='/membership'
            className='rounded-full bg-barca-gold px-8 py-4 text-lg font-bold text-barca-blue transition hover:bg-yellow-400 hover:scale-105'
          >
            {t("ctaButton")}
          </Link>
          <Link
            href='/location'
            className='rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20'
          >
            {t("visitButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
