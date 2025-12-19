"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  // Simple state to handle form submission UI
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate a network request
    setTimeout(() => {
      setStatus("success");
      // TODO: Connect this to Supabase or an Email API later
    }, 1500);
  };

  return (
    <main className='min-h-screen bg-slate-50 pt-24 pb-12'>
      {/* 1. Header */}
      <div className='container mx-auto px-4 mb-12 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4'>
          Get in Touch
        </h1>
        <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
          Have questions about membership, events, or partnerships? Send us a
          message and a board member will get back to you.
        </p>
      </div>

      <div className='container mx-auto px-4'>
        <div className='grid gap-12 lg:grid-cols-3 max-w-6xl mx-auto'>
          {/* 2. CONTACT FORM (Takes up 2 columns) */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-8'>
              {status === "success" ? (
                <div className='text-center py-12'>
                  <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6'>
                    <svg
                      className='h-8 w-8 text-green-600'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-bold text-slate-900 mb-2'>
                    Message Sent!
                  </h3>
                  <p className='text-slate-600'>
                    Visca Barça! We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className='mt-6 text-barca-blue font-semibold hover:underline'
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid gap-6 md:grid-cols-2'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-slate-700 mb-2'
                      >
                        Full Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        required
                        className='w-full rounded-lg border-slate-300 border p-3 text-slate-900 focus:ring-2 focus:ring-barca-blue focus:border-transparent outline-none transition'
                        placeholder='Lionel Messi'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-slate-700 mb-2'
                      >
                        Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        required
                        className='w-full rounded-lg border-slate-300 border p-3 text-slate-900 focus:ring-2 focus:ring-barca-blue focus:border-transparent outline-none transition'
                        placeholder='leo@barca.com'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-slate-700 mb-2'
                    >
                      Topic
                    </label>
                    <select
                      id='subject'
                      className='w-full rounded-lg border-slate-300 border p-3 text-slate-900 focus:ring-2 focus:ring-barca-blue focus:border-transparent outline-none transition bg-white'
                    >
                      <option>General Inquiry</option>
                      <option>Membership Question</option>
                      <option>Sponsorship / Partnership</option>
                      <option>Press / Media</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-slate-700 mb-2'
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      rows={6}
                      required
                      className='w-full rounded-lg border-slate-300 border p-3 text-slate-900 focus:ring-2 focus:ring-barca-blue focus:border-transparent outline-none transition'
                      placeholder='How can we help you?'
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={status === "submitting"}
                    className='w-full rounded-xl bg-barca-blue py-4 text-lg font-bold text-white transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 3. SIDEBAR INFO */}
          <div className='space-y-8'>
            {/* Email Card */}
            <div className='bg-barca-blue text-white rounded-2xl p-8 shadow-lg'>
              <h3 className='font-bold text-xl mb-4 text-barca-gold'>
                Direct Contact
              </h3>
              <p className='text-blue-100 mb-6 text-sm'>
                Prefer email? You can reach the board directly at:
              </p>
              <a
                href='mailto:info@penyasd.com'
                className='flex items-center gap-3 font-semibold hover:text-barca-gold transition'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                info@penyasd.com
              </a>
            </div>

            {/* Socials Card */}
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-slate-100'>
              <h3 className='font-bold text-xl mb-6 text-slate-900'>
                Follow the Penya
              </h3>
              <div className='space-y-4'>
                <Link
                  href='https://www.instagram.com/penyasandiego_'
                  className='flex items-center gap-4 text-slate-600 hover:text-[#E1306C] transition group'
                >
                  <div className='h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-[#E1306C]/10'>
                    {/* Instagram Icon */}
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.36-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.36-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                    </svg>
                  </div>
                  <span className='font-medium'>@PenyaSanDiego_</span>
                </Link>

                <Link
                  href='https://www.facebook.com/PenyaSanDiego'
                  className='flex items-center gap-4 text-slate-600 hover:text-[#1877F2] transition group'
                >
                  <div className='h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-[#1877F2]/10'>
                    {/* Facebook Icon */}
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                    </svg>
                  </div>
                  <span className='font-medium'>Facebook Page</span>
                </Link>

                <Link
                  href='https://x.com/penya_san'
                  className='flex items-center gap-4 text-slate-600 hover:text-black transition group'
                >
                  <div className='h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-black/10'>
                    {/* X / Twitter Icon */}
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                    </svg>
                  </div>
                  <span className='font-medium'>X (Twitter)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
