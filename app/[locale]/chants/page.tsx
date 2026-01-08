"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { chants } from "@/data/chants";
import ChantCard from "@/components/ChantCard";

export default function ChantsPage() {
  const t = useTranslations("ChantsPage");
  const [query, setQuery] = useState("");

  // Filter chants based on search
  const filteredChants = chants.filter(
    (chant) =>
      chant.title.toLowerCase().includes(query.toLowerCase()) ||
      chant.lyrics.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className='min-h-screen bg-slate-50 pb-24'>
      {/* HERO */}
      <section className='bg-slate-900 pt-24 pb-16 px-4 text-center'>
        <div className='container mx-auto max-w-2xl'>
          <span className='mb-4 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            {t("Hero.badge")}
          </span>
          <h1 className='text-4xl font-black uppercase tracking-tight text-white md:text-5xl mb-4'>
            {t.rich("Hero.title", {
              highlight: (chunks) => (
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-red-600'>
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className='text-slate-400 text-lg'>{t("Hero.description")}</p>
        </div>
      </section>

      {/* SEARCH BAR - STICKY */}
      <div className='sticky top-20 z-30 bg-slate-50/95 backdrop-blur-sm py-4 border-b border-slate-200 shadow-sm'>
        <div className='container mx-auto px-4 max-w-2xl'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
            <input
              type='text'
              placeholder={t("Search.placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-4 font-medium text-slate-900 outline-none focus:border-barca-blue focus:ring-2 focus:ring-barca-blue/20 transition shadow-sm'
            />
          </div>
          <div className='mt-2 text-right text-xs font-bold text-slate-400 uppercase tracking-wider'>
            {t("Search.count", { count: filteredChants.length })}
          </div>
        </div>
      </div>

      {/* CHANTS LIST */}
      <div className='container mx-auto px-4 py-8 max-w-2xl'>
        {filteredChants.length > 0 ? (
          <div className='space-y-4'>
            {filteredChants.map((chant) => (
              <ChantCard key={chant.id} chant={chant} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-3xl mb-4'>
              🤔
            </div>
            <p className='text-slate-500 font-medium'>
              {t("Search.empty_state")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
