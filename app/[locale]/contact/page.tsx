import { ChevronDown } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import MeetTheBoard from "@/components/MeetTheBoard";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ContactPage.Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  // FIX 1: Define the IDs manually. Do not import 'faqs'.
  const faqIds = [0, 1, 2, 3, 4, 5];

  return (
    <main className='min-h-screen bg-slate-50'>
      {/* HERO SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-20 md:py-28'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-blue-900 opacity-90' />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <span className='mb-6 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            {t("Hero.badge")}
          </span>
          <h1 className='mb-6 text-5xl font-black uppercase tracking-wide text-white sm:text-7xl drop-shadow-lg'>
            {t.rich("Hero.title", {
              br: (<br key='br' />) as any,
              highlight: (chunks) => (
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-red-600'>
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className='mx-auto max-w-2xl text-lg font-medium text-slate-300 md:text-xl'>
            {t("Hero.description")}
          </p>
        </div>
      </section>

      {/* MEET THE BOARD */}
      <MeetTheBoard />

      {/* CONTACT FORM */}
      <ContactForm />

      {/* FAQ SECTION */}
      <section className='py-16 md:py-24 container mx-auto px-4 max-w-4xl'>
        <h2 className='text-center text-3xl font-black uppercase text-slate-900 mb-12'>
          {t("FAQ.title")}
        </h2>
        <div className='space-y-4'>
          {/* FIX 2: Map over the IDs, not the old object */}
          {faqIds.map((id) => (
            <details
              key={id}
              className='group rounded-xl bg-white shadow-sm border border-slate-100 open:ring-1 open:ring-slate-200'
            >
              <summary className='flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900 list-none'>
                {/* FIX 3: Use the 'q' prefix to match JSON (q0, q1...) */}
                {t(`FAQ.q${id}`)}
                <span className='transition group-open:rotate-180'>
                  <ChevronDown className='h-5 w-5 text-slate-400' />
                </span>
              </summary>
              <div className='px-6 pb-6 text-slate-600 leading-relaxed'>
                {/* FIX 4: Use the 'a' prefix and t.rich for HTML tags */}
                {t.rich(`FAQ.a${id}`, {
                  p: (chunks) => <p className='mb-2'>{chunks}</p>,
                  list: (chunks) => (
                    <ul className='list-disc space-y-2 pl-5 mt-2'>{chunks}</ul>
                  ),
                  item: (chunks) => <li>{chunks}</li>,
                  bold: (chunks) => <strong>{chunks}</strong>,
                  link: (chunks) => (
                    <a
                      href='https://penyes.fcbarcelona.com'
                      target='_blank'
                      rel='noreferrer'
                      className='text-barca-blue font-bold hover:underline'
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
