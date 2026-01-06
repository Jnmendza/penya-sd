import { galleryData } from "@/data/gallery";
import AccordionSlider from "@/components/gallery/AccordionSlider";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import CardStack from "@/components/gallery/CardStack";
import { Link } from "@/utils/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GlobalPage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GlobalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 1. Fetch Page Translations
  const t = await getTranslations({ locale, namespace: "GlobalPage" });

  // 2. Fetch Gallery Translations
  const tGallery = await getTranslations({ locale, namespace: "GalleryData" });

  // 3. TRANSLATE DATA: Map static data to localized strings
  const localizedGallery = galleryData.map((item) => ({
    ...item,
    // Use the ID to find the correct translation
    alt: tGallery(`${item.id}.alt`),
    caption: tGallery(`${item.id}.caption`),
  }));

  // 4. Filter the LOCALIZED data
  const vipImages = localizedGallery.filter((i) => i.category === "vip");
  const pilgrimageImages = localizedGallery.filter(
    (i) => i.category === "pilgrimage"
  );
  const communityImages = localizedGallery.filter(
    (i) => i.category === "community"
  );

  return (
    <main className='min-h-screen bg-slate-50 pb-24'>
      {/* HERO SECTION */}
      <section className='bg-slate-900 relative w-full overflow-hidden px-4 py-24 text-center text-white md:py-32 min-h-[70vh] flex flex-col justify-center'>
        <div className='mb-6 inline-block rounded-full border border-barca-gold/50 bg-barca-blue/30 px-4 py-1 backdrop-blur-md mx-auto'>
          <span className='text-sm font-semibold tracking-wide text-barca-gold uppercase'>
            {t("Hero.badge")}
          </span>
        </div>
        <h1 className='mb-4 text-4xl font-black uppercase tracking-tight md:text-6xl'>
          {t.rich("Hero.title", {
            highlight: (chunks) => (
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'>
                {chunks}
              </span>
            ),
          })}
        </h1>
        <p className='mx-auto max-w-2xl text-lg text-blue-100 md:text-xl'>
          {t("Hero.description")}
        </p>
      </section>

      <div className='container mx-auto space-y-32 px-4 -mt-24 relative z-10'>
        {/* SECTION 1: Inner Circle */}
        <section className='rounded-3xl bg-white p-6 shadow-2xl md:p-12'>
          <div className='mb-8 flex items-center gap-4'>
            <div className='h-1 w-12 bg-yellow-400'></div>
            <h2 className='text-2xl font-black uppercase text-barca-red'>
              {t("InnerCircle.title")}
            </h2>
          </div>
          <div className='-mx-4 md:mx-0'>
            <AccordionSlider items={vipImages} />
          </div>
        </section>

        {/* SECTION 2: The Pilgrimage */}
        <section>
          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-black uppercase text-slate-900'>
              {t("Pilgrimage.title")}
            </h2>
            <p className='text-slate-600'>{t("Pilgrimage.subtitle")}</p>
          </div>
          <MasonryGrid items={pilgrimageImages} />
        </section>

        {/* SECTION 3: Global Network */}
        <section className='grid grid-cols-1 items-center gap-12 md:grid-cols-2'>
          <div>
            <h2 className='mb-6 text-3xl font-black uppercase text-slate-900'>
              {t("Network.title")}
            </h2>
            <div className='prose text-slate-600'>
              <p className='text-lg'>{t("Network.description")}</p>
              <ul className='mt-4 space-y-2 font-medium mb-8'>
                <li className='flex items-center gap-2'>
                  ✅ {t("Network.list.meetups")}
                </li>
                <li className='flex items-center gap-2'>
                  ✅ {t("Network.list.exchanges")}
                </li>
                <li className='flex items-center gap-2'>
                  ✅ {t("Network.list.friendships")}
                </li>
              </ul>
              <Link
                href='/membership'
                className='cursor-pointer rounded-full bg-blue-700 px-8 py-3 font-bold text-white transition hover:bg-blue-900'
              >
                {t("Network.cta")}
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
