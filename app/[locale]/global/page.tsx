import { galleryData } from "@/data/gallery";
import AccordionSlider from "@/components/gallery/AccordionSlider";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import CardStack from "@/components/gallery/CardStack";
import Link from "next/link";

export const metadata = {
  title: "Global Ambassadors | Penya Blaugrana San Diego",
  description:
    "From San Diego to Camp Nou. See our adventures around the world.",
};

export default function GlobalPage() {
  // Filter data into categories
  const vipImages = galleryData.filter((i) => i.category === "vip");
  const pilgrimageImages = galleryData.filter(
    (i) => i.category === "pilgrimage"
  );
  const communityImages = galleryData.filter((i) => i.category === "community");

  return (
    <main className='min-h-screen bg-slate-50 pb-24'>
      {/* HERO SECTION */}
      <section className='bg-slate-900 relative w-full overflow-hidden px-4 py-24 text-center text-white md:py-32 min-h-[70vh] flex flex-col justify-center'>
        <div className='mb-6 inline-block rounded-full border border-barca-gold/50 bg-barca-blue/30 px-4 py-1 backdrop-blur-md mx-auto'>
          <span className='text-sm font-semibold tracking-wide text-barca-gold uppercase'>
            Global Ambassadors
          </span>
        </div>
        <h1 className='mb-4 text-4xl font-black uppercase tracking-tight md:text-6xl'>
          More Than A{" "}
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'>
            Watch Party
          </span>
        </h1>
        <p className='mx-auto max-w-2xl text-lg text-blue-100 md:text-xl'>
          We are part of a global family. From sharing pints in London to
          walking the halls of Camp Nou, being a member opens doors around the
          world.
        </p>
      </section>

      <div className='container mx-auto space-y-32 px-4 -mt-24 relative z-10'>
        {/* SECTION 1: Inner Circle (FIXED: Added White Card Wrapper) */}
        <section className='rounded-3xl bg-white p-6 shadow-2xl md:p-12'>
          <div className='mb-8 flex items-center gap-4'>
            <div className='h-1 w-12 bg-yellow-400'></div>
            <h2 className='text-2xl font-black uppercase text-barca-red'>
              The Inner Circle
            </h2>
          </div>
          {/* We pass the class to remove the height restriction if needed, 
              but usually the slider handles itself */}
          <div className='-mx-4 md:mx-0'>
            {/* Negative margin on mobile to let images go edge-to-edge inside the card */}
            <AccordionSlider items={vipImages} />
          </div>
        </section>

        {/* SECTION 2: The Pilgrimage (Masonry) */}
        <section>
          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-black uppercase text-slate-900'>
              The Pilgrimage 🏟️
            </h2>
            <p className='text-slate-600'>
              Every fan dreams of it. We make it happen.
            </p>
          </div>
          <MasonryGrid items={pilgrimageImages} />
        </section>

        {/* SECTION 3: Global Network (Card Stack) */}
        <section className='grid grid-cols-1 items-center gap-12 md:grid-cols-2'>
          <div>
            <h2 className='mb-6 text-3xl font-black uppercase text-slate-900'>
              Global Network 🌍
            </h2>
            <div className='prose text-slate-600'>
              <p className='text-lg'>
                There are over 1,000 Penyas worldwide. When you wear our shirt,
                you have friends in every major city.
              </p>
              <ul className='mt-4 space-y-2 font-medium mb-8'>
                <li className='flex items-center gap-2'>
                  ✅ Meetups with other Penyas
                </li>
                <li className='flex items-center gap-2'>✅ Scarf exchanges</li>
                <li className='flex items-center gap-2'>
                  ✅ International friendships
                </li>
              </ul>
              <Link
                href='/membership'
                className='cursor-pointer rounded-full bg-blue-700 px-8 py-3 font-bold text-white transition hover:bg-blue-900'
              >
                Join the Family
              </Link>
            </div>
          </div>

          {/* Card Stack Component */}
          <div className='flex justify-center'>
            <CardStack items={communityImages} />
          </div>
        </section>
      </div>
    </main>
  );
}
