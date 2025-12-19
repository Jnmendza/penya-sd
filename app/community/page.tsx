import Image from "next/image";
import Link from "next/link";
import CommunityHighlights from "@/components/CommunityHighlights";

export default function CommunityPage() {
  return (
    <main className='min-h-screen bg-slate-50 pt-24 pb-12'>
      {/* 1. HEADER SECTION */}
      <div className='container mx-auto px-4 mb-12 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4'>
          Més Que Un Club
        </h1>
        <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
          We don't just watch football. We are committed to making San Diego a
          better place through charity, inclusivity, and passion.
        </p>
      </div>

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
