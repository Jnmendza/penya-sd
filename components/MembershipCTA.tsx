import Link from "next/link";

export default function MembershipCTA() {
  return (
    <section className='relative overflow-hidden bg-barca-blue py-24 text-white'>
      {/* Background decoration (optional subtle pattern) */}
      <div className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10'>
        <div className='h-96 w-96 rounded-full bg-barca-red blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* LEFT: The Pitch */}
          <div className='space-y-8'>
            <div className='inline-block rounded-full bg-barca-gold/20 px-4 py-1 text-sm font-bold text-barca-gold backdrop-blur-sm'>
              2025/26 SEASON MEMBERSHIP
            </div>

            <h2 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
              More Than A Match. <br />
              <span className='text-barca-gold'>More Than A Club.</span>
            </h2>

            <p className='text-lg text-blue-100 max-w-md leading-relaxed'>
              Join the official Penya Blaugrana San Diego. Your annual
              membership supports our charity work and gets you exclusive gear
              every season.
            </p>

            <ul className='space-y-4'>
              {[
                "Official Penya Membership Card",
                "Exclusive 2025 PBSD Scarf",
                "Commemorative Pin",
                "Priority Access to El Clásico Parties",
              ].map((item, index) => (
                <li key={index} className='flex items-center gap-3'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-barca-red'>
                    <svg
                      className='h-3.5 w-3.5 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <span className='font-medium text-white'>{item}</span>
                </li>
              ))}
            </ul>

            <div className='pt-4'>
              <div className='flex items-center gap-6'>
                <div>
                  <span className='block text-3xl font-bold text-white'>
                    $25.00
                  </span>
                  <span className='text-sm text-blue-200'>/ per year</span>
                </div>
                <Link
                  href='/membership'
                  className='rounded-full bg-barca-gold px-8 py-4 text-lg font-bold text-barca-blue transition hover:bg-yellow-400 hover:scale-105 shadow-xl'
                >
                  Join the Family
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: The Product Shot */}
          <div className='relative'>
            {/* PLACEHOLDER: This needs to be a real photo of your Scarf & Pin.
                For now, we use a colored div or placeholder image.
            */}
            <div className='relative aspect-square w-full max-w-lg mx-auto rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-8 border border-white/10 backdrop-blur-sm shadow-2xl'>
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center p-6'>
                {/* Replace this SVG with an <img src="/scarf.png" /> later */}
                <svg
                  className='w-32 h-32 text-white/20 mb-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1}
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  />
                </svg>
                <p className='text-white/40 font-mono text-sm uppercase tracking-widest'>
                  [ Image: 2025 Scarf & Pin Combo ]
                </p>
              </div>
            </div>

            {/* Decorative element behind the image */}
            <div className='absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-barca-red opacity-20 blur-3xl'></div>
          </div>
        </div>
      </div>
    </section>
  );
}
