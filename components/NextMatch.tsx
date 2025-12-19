import Link from "next/link";
import Image from "next/image";

// 1. Strict Type Definition
export interface MatchProps {
  id: string; // Good practice to pass the ID
  opponent: string;
  opponentLogo: string;
  homeLogo: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  isWatchParty: boolean;
}

export default function NextMatch({
  opponent,
  opponentLogo,
  homeLogo,
  competition,
  date,
  time,
  venue,
  isWatchParty,
}: MatchProps) {
  return (
    <div className='relative z-20 mx-auto -mt-24 max-w-5xl px-4'>
      <div
        className={`overflow-hidden rounded-2xl shadow-2xl ${
          isWatchParty ? "bg-barca-blue text-white" : "bg-white text-slate-800"
        }`}
      >
        {isWatchParty && (
          <div className='bg-barca-gold py-2 text-center text-xs font-bold uppercase tracking-widest text-barca-blue'>
            Official Watch Party Confirmed
          </div>
        )}

        <div className='flex flex-col items-center justify-between gap-8 p-8 md:flex-row'>
          {/* LEFT: Teams */}
          <div className='flex items-center gap-6'>
            {/* Home Team */}
            <div className='text-center'>
              <div className='mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 shadow-sm overflow-hidden relative'>
                {/* 2. Using Next/Image with object-contain */}
                <Image
                  src={homeLogo}
                  alt='FC Barcelona'
                  fill
                  className='object-contain p-2'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <span className='font-bold tracking-wide'>Barça</span>
            </div>

            <span className='text-2xl font-light opacity-50'>VS</span>

            {/* Away Team (Opponent) */}
            <div className='text-center'>
              <div className='mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 p-2 shadow-sm overflow-hidden relative'>
                <Image
                  src={opponentLogo}
                  alt={opponent}
                  fill
                  className='object-contain p-2'
                />
              </div>
              <span className='font-bold tracking-wide'>{opponent}</span>
            </div>
          </div>

          {/* CENTER: Info */}
          <div className='flex flex-col items-center text-center'>
            <span
              className={`mb-1 text-sm font-semibold uppercase tracking-wider ${
                isWatchParty ? "text-barca-gold" : "text-barca-red"
              }`}
            >
              {competition}
            </span>
            <span className='text-3xl font-extrabold'>{time}</span>
            <span className='text-lg opacity-80'>{date}</span>
            <div className='mt-2 flex items-center gap-2'>
              <svg
                className='h-5 w-5 opacity-70'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              <span className='font-medium'>{venue}</span>
            </div>
          </div>

          {/* RIGHT: Action */}
          <div className='w-full md:w-auto'>
            {isWatchParty ? (
              <Link
                href='/location'
                className='block w-full rounded-xl bg-barca-red px-8 py-4 text-center font-bold text-white transition hover:bg-red-700 shadow-lg'
              >
                RSVP Now
              </Link>
            ) : (
              <button
                disabled
                className='block w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-8 py-4 text-center font-bold text-slate-400 cursor-not-allowed'
              >
                No Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
