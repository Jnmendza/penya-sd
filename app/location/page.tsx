import Image from "next/image";
import Link from "next/link";

export default function LocationPage() {
  return (
    <main className='min-h-screen bg-slate-50 pt-24 pb-12'>
      {/* 1. HEADER SECTION */}
      <div className='container mx-auto px-4 mb-12 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4'>
          Our Home Ground
        </h1>
        <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
          Experience the atmosphere of Camp Nou right here in Chula Vista. We
          meet for every official match at Novo Brazil Brewing in Otay Ranch.
        </p>
      </div>

      {/* 2. VENUE SHOWCASE */}
      <div className='container mx-auto px-4 mb-16'>
        <div className='grid gap-12 lg:grid-cols-2 items-center'>
          {/* Left: The Visual */}
          <div className='relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl'>
            {/* TIP: Replace this with a photo of the Otay Ranch location.
              It has that nice outdoor patio look.
            */}
            <Image
              src='https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=2940&auto=format&fit=crop'
              alt='Novo Brazil Brewing Otay Ranch'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8'>
              <div className='text-white'>
                <h3 className='text-2xl font-bold'>Novo Brazil Brewing</h3>
                <p className='font-medium text-barca-gold'>
                  Otay Ranch Town Center
                </p>
              </div>
            </div>
          </div>

          {/* Right: The Details */}
          <div className='space-y-8'>
            <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100'>
              <h3 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-2'>
                <span className='text-2xl'>🏟️</span> The HQ
              </h3>
              <div className='space-y-4 text-slate-600'>
                <p className='text-lg font-medium text-slate-900'>
                  2015 Birch Road, Suite 1017
                  <br />
                  Chula Vista, CA 91915
                </p>
                <ul className='space-y-3 pt-2'>
                  <li className='flex items-start gap-3'>
                    <svg
                      className='w-5 h-5 text-barca-blue mt-1 shrink-0'
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
                    <span>
                      <strong>Indoor & Outdoor:</strong> Huge open-air patio
                      with fire pits and screens everywhere.
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <svg
                      className='w-5 h-5 text-barca-blue mt-1 shrink-0'
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
                    <span>
                      <strong>Massive LED Screen:</strong> You won't miss a
                      single goal or controversial VAR call.
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <svg
                      className='w-5 h-5 text-barca-blue mt-1 shrink-0'
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
                    <span>
                      <strong>Full Kitchen:</strong> Burgers, tacos, and plenty
                      of options for kids.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='https://www.novobrew.com/menu/'
                target='_blank'
                className='flex-1 rounded-xl bg-slate-900 px-6 py-4 text-center font-bold text-white hover:bg-slate-800 transition'
              >
                View Menu
              </Link>
              <Link
                href='https://maps.app.goo.gl/4r2Ce7ui9ApAq93E7'
                target='_blank'
                className='flex-1 rounded-xl border-2 border-slate-200 px-6 py-4 text-center font-bold text-slate-700 hover:bg-slate-50 transition'
              >
                Open in Maps
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAP & LOGISTICS GRID */}
      <div className='container mx-auto px-4'>
        <div className='grid gap-8 lg:grid-cols-3'>
          {/* The Map (Takes up 2 columns) */}
          <div className='lg:col-span-2 rounded-2xl overflow-hidden shadow-lg h-[400px] bg-slate-200 relative'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.103728646944!2d-116.96967482348588!3d32.62367219150171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94f583fc7fbd7%3A0x9f8c35d1d88181de!2sNovo%20Brazil%20Brewing%20-%20Otay%20Ranch!5e0!3m2!1sen!2sus!4v1709228945123!5m2!1sen!2sus'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={true}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>

          {/* Logistics Info Card */}
          <div className='bg-barca-blue text-white p-8 rounded-2xl shadow-lg flex flex-col justify-center h-[400px]'>
            <h3 className='text-2xl font-bold mb-6 text-barca-gold'>
              Matchday Logistics
            </h3>

            <div className='space-y-6'>
              <div>
                <h4 className='font-bold text-lg mb-1 flex items-center gap-2'>
                  <span>🚗</span> Parking
                </h4>
                <p className='text-blue-100 text-sm leading-relaxed'>
                  Otay Ranch Town Center has massive free parking lots. We are
                  closest to the **Apple Store** and **Macy's** side of the
                  mall.
                </p>
              </div>

              <div>
                <h4 className='font-bold text-lg mb-1 flex items-center gap-2'>
                  <span>📍</span> Meeting Point
                </h4>
                <p className='text-blue-100 text-sm leading-relaxed'>
                  Look for the Blaugrana flags! We usually take over the main
                  patio tables right in front of the big screen.
                </p>
              </div>

              <div>
                <h4 className='font-bold text-lg mb-1 flex items-center gap-2'>
                  <span>👨‍👩‍👧‍👦</span> Vibe Check
                </h4>
                <p className='text-blue-100 text-sm leading-relaxed'>
                  Otay Ranch is super family-friendly. There is a dog park
                  nearby and a splash pad for kids if the match gets stressful!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
