import Image from "next/image";
import Link from "next/link";
import CommunityHighlights from "@/components/CommunityHighlights";
import ValuesSection from "@/components/ValuesSection";

export const metadata = {
  title: "Community | Penya Blaugrana San Diego",
  description:
    "A global family. A local impact. Join us in making San Diego a better place.",
};

export default function CommunityPage() {
  return (
    <main className='min-h-screen bg-slate-50 pb-12'>
      {/* 1. HEADER SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-24 md:py-32'>
        {/* 1. BACKGROUND GRADIENT (Barça Colors) */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-blue-900 opacity-90' />

        {/* Optional: Subtle Pattern Overlay to add texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <span className='mb-6 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            Our Community
          </span>
          {/* 2. THE MOTTO - Massive & Bold */}
          <h1 className='text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl md:text-8xl'>
            Més Que{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'>
              Un Club
            </span>
          </h1>

          {/* 3. SENYERA DIVIDER (Catalan Flag Accent) */}
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

          {/* 4. SUBHEAD - "More than just 90 minutes" */}
          <h2 className='mx-auto max-w-2xl text-xl font-medium text-slate-300 md:text-2xl'>
            A Global Family. A Local Impact.
          </h2>

          {/* 5. DESCRIPTION */}
          <p className='mx-auto mt-4 max-w-4xl text-lg text-slate-400 leading-relaxed'>
            Penya Blaugrana San Diego (PBSD) is a family-oriented club united by
            our passion for fútbol and inspired by the values of FC
            Barcelona—Més que un club. We stand for unity, loyalty, respect, and
            dedication, fostering a culture where members are connected as
            family and bound by a shared love for the game. Beyond supporting
            our club, PBSD is committed to serving our community through
            charitable initiatives, meaningful engagement, and positive
            representation. We strive to honor the legacy of FC Barcelona by
            living its values on and off the pitch, strengthening our community,
            and leaving a lasting impact rooted in passion, integrity, and
            respect.
          </p>

          {/* OPTIONAL: Call to Action Button */}
          <div className='mt-8'>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 transition hover:translate-x-1'
            >
              Partner with us for a cause <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. REUSE THE COMPONENT */}
      {/* We reuse the component we already built because it looks great */}
      <CommunityHighlights />

      {/* 3. VALUES SECTION (New content specific to this page) */}
      <ValuesSection />
    </main>
  );
}
