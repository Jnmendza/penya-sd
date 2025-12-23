import Image from "next/image";
import Link from "next/link";
import CommunityHighlights from "@/components/CommunityHighlights";

export default function CommunityPage() {
  return (
    <main className='min-h-screen bg-slate-50 pt-12 pb-12'>
      {/* 1. HEADER SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-24 md:py-32'>
        {/* 1. BACKGROUND GRADIENT (Barça Colors) */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-blue-900 opacity-90' />

        {/* Optional: Subtle Pattern Overlay to add texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
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
          <p className='mx-auto mt-4 max-w-3xl text-lg text-slate-400 leading-relaxed'>
            We don't just watch football. We are committed to making San Diego a
            better place through charity, inclusivity, and shared passion.
          </p>

          {/* OPTIONAL: Call to Action Button */}
          <div className='mt-8'>
            <a
              href='#partner'
              className='inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 transition hover:translate-x-1'
            >
              Partner with us for a cause <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. REUSE THE COMPONENT */}
      {/* We reuse the component we already built because it looks great */}
      <CommunityHighlights />

      {/* 3. VALUES SECTION (New content specific to this page) */}
      <div className='container mx-auto px-4 py-12'>
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          <div className='grid md:grid-cols-2'>
            <div className='relative h-64 md:h-auto bg-slate-200'>
              {/* TIP: Replace with a photo of your group doing charity work */}
              <Image
                src='https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2948&auto=format&fit=crop'
                alt='PBSD Charity Work'
                fill
                className='object-cover'
              />
            </div>

            <div className='p-12 flex flex-col justify-center'>
              <h3 className='text-3xl font-bold text-slate-900 mb-6'>
                Our Values
              </h3>
              <div className='space-y-6'>
                <div>
                  <h4 className='font-bold text-barca-blue text-lg'>
                    Inclusivity
                  </h4>
                  <p className='text-slate-600'>
                    Everyone is welcome at our table. Whether you've been a
                    Culer for 20 years or 20 minutes, you are family.
                  </p>
                </div>
                <div>
                  <h4 className='font-bold text-barca-blue text-lg'>
                    Civic Pride
                  </h4>
                  <p className='text-slate-600'>
                    We love San Diego as much as we love Barcelona. We actively
                    look for ways to support our local neighborhoods.
                  </p>
                </div>
                <div>
                  <h4 className='font-bold text-barca-blue text-lg'>Respect</h4>
                  <p className='text-slate-600'>
                    We support our team with passion, but we always treat
                    opponents and guests with dignity.
                  </p>
                </div>
              </div>

              <div className='mt-8'>
                <Link
                  href='/contact'
                  className='inline-block rounded-xl bg-barca-blue px-8 py-3 font-bold text-white transition hover:bg-blue-900'
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
