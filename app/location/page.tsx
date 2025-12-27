import { createClient } from "@/utils/supabase/server"; // <--- Import this
import Image from "next/image";
import {
  MapPin,
  Beer,
  Users,
  Car,
  ArrowRight,
  Utensils,
  Calendar,
} from "lucide-react";

// 1. Make function ASYNC
export default async function LocationPage() {
  const supabase = await createClient();

  // 2. Fetch the NEXT watch party (Same logic as Homepage)
  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .eq("is_watch_party", true)
    .gt("utc_date", new Date().toISOString())
    .order("utc_date", { ascending: true })
    .limit(1);

  const nextMatch = matches?.[0];

  // 3. Format Date/Time (if match exists)
  const matchDate = nextMatch ? new Date(nextMatch.utc_date) : null;
  const dateStr = matchDate?.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const timeStr = matchDate?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className='min-h-screen bg-slate-50'>
      {/* HERO SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-20 md:py-28'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-blue-900 opacity-90' />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <span className='mb-6 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            Official Matchday HQ
          </span>

          <h1 className='mb-6 text-5xl font-black uppercase tracking-wide text-white sm:text-7xl drop-shadow-lg'>
            Our Home in <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-red-600'>
              Otay Ranch
            </span>
          </h1>

          <p className='mx-auto max-w-2xl text-lg font-medium text-slate-300 md:text-xl'>
            We gather for every La Liga and Champions League match at
            <span className='text-white font-bold'> Novo Brazil Brewery</span>.
            Cold beer, massive screens, and the loudest Cules in California.
          </p>

          {/* DYNAMIC NEXT MATCH BANNER */}
          <div className='mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition hover:bg-white/10'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:px-8 md:py-4'>
              <div className='flex items-center gap-3 text-white'>
                <Calendar className='h-6 w-6 text-yellow-400 shrink-0' />
                <div className='text-left'>
                  <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                    {nextMatch ? "Next Watch Party" : "Upcoming Schedule"}
                  </p>

                  {/* Dynamic Match Title */}
                  <p className='text-lg font-bold'>
                    {nextMatch
                      ? `${nextMatch.home_team} vs ${nextMatch.away_team}`
                      : "No Watch Parties Scheduled"}
                  </p>
                </div>
              </div>

              <div className='text-right'>
                {nextMatch ? (
                  <>
                    <span className='block text-xl font-black text-white'>
                      {dateStr}
                    </span>
                    <span className='block text-sm font-medium text-barca-red'>
                      {timeStr} Kickoff
                    </span>
                  </>
                ) : (
                  <span className='block text-sm font-medium text-slate-400'>
                    Check back soon!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE VENUE EXPERIENCE */}
      <section className='pt-16 md:pt-24 pb-8'>
        <div className='container mx-auto px-4'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-black uppercase text-slate-900 md:text-4xl'>
              Know Before{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600'>
                You Go
              </span>
            </h2>
            <p className='mt-4 text-slate-600 max-w-xl mx-auto'>
              Whether it's your first match or your hundredth, here is what you
              can expect at our headquarters.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {/* ... Keep your amenity cards here ... */}

            {/* Card 1 */}
            <div className='rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600'>
                <Utensils className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-bold text-slate-900'>
                Brazilian Eats
              </h3>
              <p className='mb-4 text-sm text-slate-600 leading-relaxed'>
                Hungry? Novo offers a full kitchen featuring Picanha steaks,
                gourmet burgers, empanadas, and massive nacho platters.
              </p>
              <a
                href='https://www.novobrew.com/menu'
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center text-sm font-bold text-barca-blue hover:underline'
              >
                View Menu <ArrowRight className='ml-1 h-4 w-4' />
              </a>
            </div>

            {/* Card 2 */}
            <div className='rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
                <Beer className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-bold text-slate-900'>
                60+ Taps
              </h3>
              <p className='text-sm text-slate-600 leading-relaxed'>
                From award-winning IPAs and Lagers to their famous hard
                Kombuchas and seltzers. There is something for everyone.
              </p>
            </div>

            {/* Card 3 */}
            <div className='rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600'>
                <Users className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-bold text-slate-900'>
                Family Friendly
              </h3>
              <p className='text-sm text-slate-600 leading-relaxed'>
                Bring the kids! The venue is open to all ages and features a
                spacious layout perfect for families.
              </p>
            </div>

            {/* Card 4 */}
            <div className='rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600'>
                <Car className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-xl font-bold text-slate-900'>
                Free Parking
              </h3>
              <p className='text-sm text-slate-600 leading-relaxed'>
                Located in the Otay Ranch Town Center, there is ample free
                parking available right outside the brewery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ATMOSPHERE GALLERY */}
      {/* 2.5 ATMOSPHERE GALLERY (Bento Grid with next/image) */}
      <section className='py-16 pb-24 bg-slate-50'>
        <div className='container mx-auto px-4'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-black uppercase text-slate-900 md:text-4xl'>
              Experience the
              <span className='text-transparent ml-2 bg-clip-text bg-gradient-to-r from-blue-700 to-red-600'>
                Passion
              </span>
            </h2>
          </div>

          {/* THE BENTO GRID */}
          <div className='grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4'>
            {/* 1. LARGE MAIN SHOT (Crowd cheering) - Spans 2x2 */}
            <div className='relative group overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 bg-slate-200 shadow-md'>
              <Image
                src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/group-shot.jpeg?q=80&w=800&auto=format&fit=crop'
                alt='Crowd cheering'
                fill // <--- Fills the container
                className='object-cover transition duration-700 group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, 50vw' // Optimization hint
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition duration-500 group-hover:opacity-100 flex items-end p-6'>
                <p className='font-bold text-white'>
                  Full House for El Clásico
                </p>
              </div>
            </div>

            {/* 2. TALL SHOT (The Big Screen) - Spans 1x2 */}
            <div className='relative group overflow-hidden rounded-2xl md:col-span-1 md:row-span-2 bg-slate-200 shadow-md'>
              <Image
                src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/tech-shot.jpeg?q=80&w=800&auto=format&fit=crop'
                alt='The Big Screen'
                fill
                className='object-cover transition duration-700 group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, 25vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition duration-500 group-hover:opacity-100 flex items-end p-6'>
                <p className='font-bold text-white'>Massive LED Wall</p>
              </div>
            </div>

            {/* 3. DETAIL SHOT (Beer/Food) */}
            <div className='relative group overflow-hidden rounded-2xl bg-slate-200 shadow-md'>
              <Image
                src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/vibes-1.jpeg?q=80&w=800&auto=format&fit=crop'
                alt='Novo Beer'
                fill
                className='object-cover transition duration-700 group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, 25vw'
              />
            </div>

            {/* 4. COMMUNITY SHOT (Kids/Family) */}
            <div className='relative group overflow-hidden rounded-2xl bg-slate-200 shadow-md'>
              <Image
                src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/family-shot2.jpg?q=80&w=800&auto=format&fit=crop'
                alt='Family Friendly'
                fill
                className='object-cover transition duration-700 group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, 25vw'
              />
            </div>

            {/* 5. WIDE SHOT (Group Photo) - Spans 2 wide */}
            <div className='relative group overflow-hidden rounded-2xl md:col-span-2 bg-slate-200 shadow-md'>
              <Image
                src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/bryant.jpg?q=80&w=800&auto=format&fit=crop'
                alt='Group Photo'
                fill
                className='object-cover transition duration-700 group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition duration-500 group-hover:opacity-100 flex items-end p-6'>
                <p className='font-bold text-white'>Penya Family</p>
              </div>
            </div>

            {/* 6. FILLER SHOT (Celebration) - Spans 2 wide */}
            <div className='relative group overflow-hidden rounded-2xl md:col-span-2 bg-slate-200 shadow-md'>
              <Image
                src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/vibes-2.jpeg?q=80&w=800&auto=format&fit=crop'
                alt='Group Photo'
                fill
                className='object-cover transition duration-700 group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition duration-500 group-hover:opacity-100 flex items-end p-6'>
                <p className='font-bold text-white'>Fun for the whole family</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className='bg-slate-900 text-white'>
        <div className='grid md:grid-cols-2'>
          {/* TEXT SIDE */}
          <div className='flex flex-col justify-center p-12 md:p-20 order-2 md:order-1'>
            <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm'>
              <MapPin className='h-8 w-8 text-yellow-400' />
            </div>
            <h2 className='mb-6 text-3xl font-black uppercase md:text-5xl'>
              Easy to find. <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'>
                Hard to leave.
              </span>
            </h2>
            <address className='not-italic text-lg text-slate-300 space-y-2 mb-8'>
              <p className='font-bold text-white text-xl'>
                Novo Brazil Brewing - Otay Ranch
              </p>
              <p>2015 Birch Rd, Suite 1017</p>
              <p>Chula Vista, CA 91915</p>
            </address>

            <a
              href='https://www.google.com/maps/search/?api=1&query=Novo+Brazil+Brewing+Otay+Ranch'
              target='_blank'
              rel='noreferrer'
              className='w-full sm:w-auto rounded-xl bg-barca-red px-8 py-4 text-center font-bold text-white transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/20'
            >
              Get Directions
            </a>
          </div>

          {/* MAP EMBED SIDE */}
          <div className='relative min-h-[400px] w-full bg-slate-800 order-1 md:order-2'>
            <iframe
              title='Map to Novo Brazil'
              src='https://maps.google.com/maps?q=Novo%20Brazil%20Brewing%20Otay%20Ranch%202015%20Birch%20Rd&t=&z=15&ie=UTF8&iwloc=&output=embed'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={true}
              loading='lazy'
              className='absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500'
            ></iframe>
            <div className='absolute inset-0 pointer-events-none border-b-4 border-l-4 border-slate-900/20 shadow-inner'></div>
          </div>
        </div>
      </section>
    </main>
  );
}
