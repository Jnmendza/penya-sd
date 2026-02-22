import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Trophy, Shield, Star, Globe, Award, Medal } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LegendPage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LegendPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LegendPage" });

  return (
    <main className='min-h-screen bg-slate-50'>
      {/* 1. HERO SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-24 md:py-32'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900 via-slate-900 to-barca-blue opacity-90' />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <span className='mb-6 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            {t("Hero.badge")}
          </span>
          <h1 className='mb-6 text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl md:text-8xl drop-shadow-lg'>
            {t.rich("Hero.title", {
              br: (<br key='br' />) as unknown as string,
              highlight: (chunks) => (
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500'>
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className='mx-auto max-w-2xl text-lg font-medium text-slate-300 md:text-xl leading-relaxed'>
            {t("Hero.description")}
          </p>
        </div>
      </section>

      {/* 2. THE ANNOUNCEMENT (Using your existing VIP photo) */}
      <section className='py-16 md:py-24 bg-white'>
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='grid gap-12 md:grid-cols-2 items-center'>
            <div className='relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl'>
              <Image
                src='https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/gallery/rafa_meet.JPG'
                alt='President meeting Rafa Márquez'
                fill
                className='object-cover'
              />
            </div>
            <div>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-barca-blue'>
                <Shield className='h-6 w-6' />
              </div>
              <h2 className='text-3xl font-black uppercase text-slate-900 mb-6'>
                {t("Announcement.title")}
              </h2>
              <p className='text-lg text-slate-600 leading-relaxed'>
                {t("Announcement.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BARÇA CAREER & TROPHIES */}
      <section className='py-16 md:py-24 bg-slate-100 border-t border-slate-200'>
        <div className='container mx-auto px-4 max-w-5xl text-center'>
          <h2 className='text-3xl font-black uppercase text-slate-900 mb-6 md:text-5xl'>
            {t.rich("Career.title", {
              highlight: (chunks) => (
                <span className='text-barca-red'>{chunks}</span>
              ),
            })}
          </h2>
          <p className='text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-16'>
            {t("Career.description")}
          </p>

          {/* TROPHY GRID (Now 6 items, so we use md:grid-cols-3) */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
            {/* La Liga */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-200'>
              <Star className='h-10 w-10 text-yellow-500 mx-auto mb-4' />
              <h3 className='text-3xl font-black text-slate-900'>
                {t("Trophies.laliga_count")}
              </h3>
              <p className='text-sm font-bold text-slate-500 uppercase tracking-wider mt-1'>
                {t("Trophies.laliga")}
              </p>
            </div>

            {/* Champions League */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-200'>
              <Trophy className='h-10 w-10 text-yellow-500 mx-auto mb-4' />
              <h3 className='text-3xl font-black text-slate-900'>
                {t("Trophies.champions_count")}
              </h3>
              <p className='text-sm font-bold text-slate-500 uppercase tracking-wider mt-1'>
                {t("Trophies.champions")}
              </p>
            </div>

            {/* Supercopa de España */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-200'>
              <Award className='h-10 w-10 text-yellow-500 mx-auto mb-4' />
              <h3 className='text-3xl font-black text-slate-900'>
                {t("Trophies.supercopa_count")}
              </h3>
              <p className='text-sm font-bold text-slate-500 uppercase tracking-wider mt-1'>
                {t("Trophies.supercopa")}
              </p>
            </div>

            {/* Copa del Rey */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-200'>
              <Shield className='h-10 w-10 text-yellow-500 mx-auto mb-4' />
              <h3 className='text-3xl font-black text-slate-900'>
                {t("Trophies.copa_count")}
              </h3>
              <p className='text-sm font-bold text-slate-500 uppercase tracking-wider mt-1'>
                {t("Trophies.copa")}
              </p>
            </div>

            {/* UEFA Super Cup */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-200'>
              <Medal className='h-10 w-10 text-yellow-500 mx-auto mb-4' />
              <h3 className='text-3xl font-black text-slate-900'>
                {t("Trophies.uefasupercup_count")}
              </h3>
              <p className='text-sm font-bold text-slate-500 uppercase tracking-wider mt-1'>
                {t("Trophies.uefasupercup")}
              </p>
            </div>

            {/* Club World Cup */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-200'>
              <Globe className='h-10 w-10 text-yellow-500 mx-auto mb-4' />
              <h3 className='text-3xl font-black text-slate-900'>
                {t("Trophies.clubworldcup_count")}
              </h3>
              <p className='text-sm font-bold text-slate-500 uppercase tracking-wider mt-1'>
                {t("Trophies.clubworldcup")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
