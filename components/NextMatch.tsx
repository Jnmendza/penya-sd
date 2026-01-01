import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, AlertTriangle } from "lucide-react";
import { VENUES } from "@/utils/venues";

export default async function NextMatch() {
  const supabase = await createClient();

  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .eq("is_watch_party", true)
    .gt("utc_date", new Date().toISOString())
    .order("utc_date", { ascending: true })
    .limit(1);

  const nextMatch = matches?.[0];

  if (!nextMatch) {
    return (
      <div className='w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center'>
        <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
          <Calendar className='h-6 w-6' />
        </div>
        <h3 className='text-lg font-bold text-slate-900'>
          No Watch Parties Scheduled
        </h3>
        <p className='text-slate-500'>Check back soon for the next fixture!</p>
      </div>
    );
  }

  const matchDate = new Date(nextMatch.utc_date);

  const dateStr = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(matchDate);

  const timeStr = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  }).format(matchDate);

  const isShakespeare = nextMatch.venue === VENUES.SHAKESPEARE.name;
  const venueConfig = isShakespeare ? VENUES.SHAKESPEARE : VENUES.NOVO;

  return (
    <div className='group relative w-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 transition hover:shadow-2xl hover:shadow-blue-900/5'>
      {/* Top Banner (Gradient accent) */}
      <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-red-600' />

      {/* FIX 1: THE ALERT BANNER */}
      {isShakespeare && (
        <div className='absolute top-1.5 left-0 right-0 z-10 bg-amber-400 py-1 text-center text-[10px] font-black uppercase tracking-widest text-amber-900 shadow-sm'>
          <AlertTriangle className='inline-block h-3 w-3 mr-1 -mt-0.5' />
          Special Early Kickoff Venue
        </div>
      )}

      {/* Added pt-8 to account for banner if present */}
      <div className={`p-6 md:p-8 ${isShakespeare ? "pt-10" : ""}`}>
        {/* HEADER: STATUS & COMPETITION */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='relative flex h-2.5 w-2.5'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500'></span>
            </span>
            <span className='text-xs font-bold uppercase tracking-widest text-slate-500'>
              Next Watch Party
            </span>
          </div>

          <div className='rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-100'>
            {nextMatch.competition === "Primera Division"
              ? "La Liga"
              : nextMatch.competition}
          </div>
        </div>

        {/* TEAMS LAYOUT */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8'>
          <div className='flex flex-col items-center gap-3 w-1/3 order-1 md:order-1'>
            <div className='relative h-16 w-16 md:h-20 md:w-20 drop-shadow-sm transition-transform group-hover:scale-110 duration-500'>
              <Image
                src={nextMatch.home_crest}
                alt={nextMatch.home_team}
                fill
                className='object-contain'
              />
            </div>
            <span className='font-bold text-slate-900 text-center leading-tight text-sm md:text-base'>
              {nextMatch.home_team}
            </span>
          </div>

          <div className='flex flex-col items-center justify-center w-1/3 order-2 md:order-2'>
            <div className='text-sm font-black text-slate-300 mb-2'>VS</div>
            <div className='flex items-center justify-center rounded-lg bg-slate-50 px-4 py-2 w-full md:w-auto border border-slate-100 whitespace-nowrap'>
              <span className='text-xl md:text-2xl font-black text-slate-900'>
                {timeStr}
              </span>
            </div>
          </div>

          <div className='flex flex-col items-center gap-3 w-1/3 order-3 md:order-3'>
            <div className='relative h-16 w-16 md:h-20 md:w-20 drop-shadow-sm transition-transform group-hover:scale-110 duration-500'>
              <Image
                src={nextMatch.away_crest}
                alt={nextMatch.away_team}
                fill
                className='object-contain'
              />
            </div>
            <span className='font-bold text-slate-900 text-center leading-tight text-sm md:text-base'>
              {nextMatch.away_team}
            </span>
          </div>
        </div>

        <hr className='my-6 border-slate-100' />

        {/* FOOTER DETAILS */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm font-medium text-slate-600'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-barca-blue' />
              {dateStr}
            </div>

            {/* FIX 2: DYNAMIC VENUE COLOR */}
            <div
              className={`flex items-center gap-2 ${
                isShakespeare ? "text-amber-700 font-bold" : ""
              }`}
            >
              {/* Uses dynamic color from config */}
              <MapPin className={`h-4 w-4 ${venueConfig.color}`} />
              {nextMatch.venue || "Novo Brazil Otay Ranch"}
            </div>
          </div>

          {/* FIX 3: DYNAMIC LINK AND COLORS */}
          <Link
            href={venueConfig.url} // Now points to Google Maps directly if Shakespeare
            target={isShakespeare ? "_blank" : undefined} // Open map in new tab if external
            className={`inline-flex items-center gap-1 text-sm font-bold transition hover:translate-x-1 ${
              isShakespeare
                ? "text-amber-600 hover:text-amber-800"
                : "text-barca-blue hover:text-blue-900"
            }`}
          >
            Get Directions <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
