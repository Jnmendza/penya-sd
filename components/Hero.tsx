import Link from "next/link";

export default function Hero() {
  return (
    <section className='relative h-screen w-full overflow-hidden bg-slate-900'>
      {/* 1. Background Image/Video Layer */}
      <div className='absolute inset-0 z-0'>
        {/* Placeholder: Replace 'src' with your actual Novo Brewery crowd photo */}
        <img
          src='https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2831&auto=format&fit=crop'
          alt='Penya Blaugrana San Diego Crowd'
          className='h-full w-full object-cover opacity-50'
        />
        {/* Gradient Overlay to make text readable */}
        <div className='absolute inset-0 bg-gradient-to-t from-barca-blue/90 via-slate-900/60 to-transparent' />
      </div>

      {/* 2. Content Layer */}
      <div className='relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white'>
        {/* Badge */}
        <div className='mb-6 inline-block rounded-full border border-barca-gold/50 bg-barca-blue/30 px-4 py-1 backdrop-blur-md'>
          <span className='text-sm font-semibold tracking-wide text-barca-gold uppercase'>
            Official Penya #2309
          </span>
        </div>

        {/* Headline */}
        <h1 className='mb-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl'>
          San Diego is <span className='text-barca-red'>Blaugrana</span>.
        </h1>

        <p className='mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl'>
          Join the official FC Barcelona supporters group of San Diego. We meet
          for every match at Novo Brazil Brewing in Otay Ranch.
        </p>

        {/* Buttons */}
        <div className='flex flex-col gap-4 sm:flex-row'>
          <Link
            href='/membership'
            className='rounded-full bg-barca-gold px-8 py-4 text-lg font-bold text-barca-blue transition hover:bg-yellow-400 hover:scale-105'
          >
            Join the Penya
          </Link>
          <Link
            href='#match-center'
            className='rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20'
          >
            View Upcoming Matches
          </Link>
        </div>
      </div>
    </section>
  );
}
