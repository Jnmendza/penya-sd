"use client";

import { Link } from "@/utils/navigation"; // Use the i18n Link
import { useTranslations } from "next-intl";

export default function CommunityHighlights() {
  const t = useTranslations("HomePage.CommunityHighlights");

  // We keep the "Design Data" here, but the "Text Data" is now fetched via ID
  const highlights = [
    {
      id: "autism", // Matches JSON key prefix
      icon: "🧩",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "cancer",
      icon: "🎗️",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "giving",
      icon: "🎁",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <section className='bg-slate-50 py-24'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-extrabold text-slate-900 sm:text-4xl'>
            {t.rich("title", {
              highlight: (chunks) => (
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600'>
                  {chunks}
                </span>
              ),
            })}
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-slate-600'>
            {t("subtitle")}
          </p>
        </div>

        {/* The Grid */}
        <div className='grid gap-8 md:grid-cols-3'>
          {highlights.map((item) => (
            <div
              key={item.id}
              className='group block relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl border border-slate-100'
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${item.color} text-3xl`}
              >
                {item.icon}
              </div>

              <h3 className='mb-3 text-xl font-bold text-slate-900'>
                {/* Dynamically fetch title based on ID */}
                {t(`cards.${item.id}_title`)}
              </h3>

              <p className='text-slate-600 leading-relaxed'>
                {/* Dynamically fetch description based on ID */}
                {t(`cards.${item.id}_desc`)}
              </p>

              {/* Decorative hover effect */}
              <div className='absolute bottom-0 left-0 h-1 w-0 bg-barca-blue transition-all duration-300 group-hover:w-full'></div>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <div className='mt-16 text-center'>
          <Link
            href='/contact'
            className='inline-flex items-center font-semibold text-barca-blue hover:text-barca-red transition'
          >
            {t("cta")}
            <svg
              className='ml-2 h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
