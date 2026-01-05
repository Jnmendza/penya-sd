import { Link } from "@/utils/navigation";
import CommunityHighlights from "@/components/CommunityHighlights";
import ValuesSection from "@/components/ValuesSection";
import { getTranslations } from "next-intl/server";

// 1. DYNAMIC METADATA
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "CommunityPage.Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 2. FETCH TRANSLATIONS
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "CommunityPage.Header",
  });

  return (
    <main className='min-h-screen bg-slate-50 pb-12'>
      {/* HEADER SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-24 md:py-32'>
        {/* BACKGROUND GRADIENT */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-blue-900 opacity-90' />

        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <span className='mb-6 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            {t("badge")}
          </span>

          {/* THE MOTTO */}
          <h1 className='text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl md:text-8xl'>
            {t.rich("motto", {
              highlight: (chunks) => (
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'>
                  {chunks}
                </span>
              ),
            })}
          </h1>

          {/* SENYERA DIVIDER */}
          <div className='mx-auto my-6 flex h-1 w-24 overflow-hidden rounded-full'>
            <div className='h-full w-1/4 bg-yellow-400'></div>
            <div className='h-full w-1/4 bg-red-600'></div>
            <div className='h-full w-1/4 bg-yellow-400'></div>
            <div className='h-full w-1/4 bg-red-600'></div>
            <div className='h-full w-1/4 bg-yellow-400'></div>
            <div className='h-full w-1/4 bg-red-600'></div>
            <div className='h-full w-1/4 bg-yellow-400'></div>
            <div className='h-full w-1/4 bg-red-600'></div>
            <div className='h-full w-1/4 bg-yellow-400'></div>
          </div>

          {/* SUBHEAD */}
          <h2 className='mx-auto max-w-2xl text-xl font-medium text-slate-300 md:text-2xl'>
            {t("subhead")}
          </h2>

          {/* DESCRIPTION */}
          <p className='mx-auto mt-4 max-w-4xl text-lg text-slate-400 leading-relaxed'>
            {t("description")}
          </p>

          {/* CTA */}
          <div className='mt-8'>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 transition hover:translate-x-1'
            >
              {t("cta")} <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* REUSED COMPONENT (Already Translated) */}
      <CommunityHighlights />

      {/* VALUES SECTION (New Translations) */}
      <ValuesSection />
    </main>
  );
}
