"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { faqs } from "@/utils/faqs";

export default function ContactPage() {
  return (
    <main className='min-h-screen bg-slate-50'>
      {/* 1. HERO SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-20 md:py-28'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-blue-900 opacity-90' />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <span className='mb-6 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            Club Offices
          </span>
          <h1 className='mb-6 text-5xl font-black uppercase tracking-wide text-white sm:text-7xl drop-shadow-lg'>
            Get in <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-red-600'>
              Touch
            </span>
          </h1>
          <p className='mx-auto max-w-2xl text-lg font-medium text-slate-300 md:text-xl'>
            Have questions about membership, events, or partnerships? We are
            here to help.
          </p>
        </div>
      </section>

      {/* 2. MEET THE BOARD */}
      <section className='py-16 md:py-24 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-black uppercase text-slate-900 md:text-4xl'>
              Meet The Board
            </h2>
            <p className='mt-4 text-slate-600 max-w-2xl mx-auto'>
              Penya Blaugrana San Diego is a non-profit run entirely by
              volunteers dedicated to growing the Barça family in Southern
              California.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-3 max-w-5xl mx-auto'>
            {/* BOARD MEMBER 1 */}
            <div className='group text-center'>
              <div className='relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg transition duration-500 group-hover:border-barca-blue group-hover:scale-105'>
                <Image
                  src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/president.jpeg?q=80&w=400&auto=format&fit=crop'
                  alt='President'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-xl font-bold text-slate-900'>
                Ruben Aguilera
              </h3>
              <p className='text-sm font-bold uppercase tracking-wider text-barca-red'>
                President
              </p>
              <p className='mt-2 text-sm text-slate-500'>
                Leading the vision and official Penya relations.
              </p>
            </div>
            {/* BOARD MEMBER 2 */}
            <div className='group text-center'>
              <div className='relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg transition duration-500 group-hover:border-barca-blue group-hover:scale-105'>
                <Image
                  src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/vp.jpeg?q=80&w=400&auto=format&fit=crop'
                  alt='Vice President'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-xl font-bold text-slate-900'>Carlos Acuña</h3>
              <p className='text-sm font-bold uppercase tracking-wider text-barca-blue'>
                Vice President
              </p>
              <p className='mt-2 text-sm text-slate-500'>
                Overseeing matchday operations and events.
              </p>
            </div>
            {/* BOARD MEMBER 3 */}
            <div className='group text-center'>
              <div className='relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg transition duration-500 group-hover:border-barca-blue group-hover:scale-105'>
                <Image
                  src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/sec.jpeg?q=80&w=400&auto=format&fit=crop'
                  alt='Treasurer'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-xl font-bold text-slate-900'>Daniel Lopez</h3>
              <p className='text-sm font-bold uppercase tracking-wider text-yellow-500'>
                Treasurer
              </p>
              <p className='mt-2 text-sm text-slate-500'>
                Managing memberships and non-profit compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM COMPONENT */}
      <ContactForm />

      {/* 4. FAQ SECTION */}
      <section className='py-16 md:py-24 container mx-auto px-4 max-w-4xl'>
        <h2 className='text-center text-3xl font-black uppercase text-slate-900 mb-12'>
          Frequently Asked
        </h2>
        <div className='space-y-4'>
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className='group rounded-xl bg-white shadow-sm border border-slate-100 open:ring-1 open:ring-slate-200'
            >
              <summary className='flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900 list-none'>
                {faq.question}
                <span className='transition group-open:rotate-180'>
                  <ChevronDown className='h-5 w-5 text-slate-400' />
                </span>
              </summary>
              <div className='px-6 pb-6 text-slate-600 leading-relaxed'>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
