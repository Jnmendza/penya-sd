"use client";

import { useState } from "react";
import Image from "next/image";
import {
  syncSchedule,
  toggleWatchParty,
  updateMatchVenue,
} from "@/app/actions/matchSync";
import { Loader2, RefreshCw, MapPin } from "lucide-react";

export interface Match {
  id: number;
  utc_date: string;
  home_team: string;
  away_team: string;
  home_crest: string;
  away_crest: string;
  competition: string;
  is_watch_party: boolean;
  venue?: string;
}

export default function AdminMatchControl({
  matches = [],
}: {
  matches: Match[];
}) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    const result = await syncSchedule();
    setIsSyncing(false);

    if (result.success) {
      alert(`Synced ${result.count} matches! Reloading...`);
      window.location.reload();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleToggle = async (id: number, current: boolean) => {
    await toggleWatchParty(id, current);
    window.location.reload();
  };

  // NEW: Handler for changing the dropdown
  const handleVenueChange = async (id: number, newVenue: string) => {
    await updateMatchVenue(id, newVenue);
    window.location.reload();
  };

  return (
    <div className='rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden'>
      {/* HEADER */}
      <div className='p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50'>
        <div>
          <h3 className='font-bold text-lg text-slate-900'>Match Schedule</h3>
          <p className='text-xs text-slate-500'>
            Toggle matches to show them on the homepage.
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className='flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-700 disabled:opacity-50 transition'
        >
          {isSyncing ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <RefreshCw className='h-4 w-4' />
          )}
          Sync API
        </button>
      </div>

      {/* TABLE */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-white text-slate-500 border-b border-slate-100'>
            <tr>
              <th className='p-4 font-bold uppercase text-xs'>Date</th>
              <th className='p-4 font-bold uppercase text-xs'>Fixture</th>
              <th className='p-4 font-bold uppercase text-xs text-center w-[300px]'>
                Watch Party Settings
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100'>
            {matches.length === 0 ? (
              <tr>
                <td colSpan={3} className='p-8 text-center text-slate-500'>
                  No matches found. Click &quot;Sync API&quot; to fetch
                  schedule.
                </td>
              </tr>
            ) : (
              matches
                .sort(
                  (a, b) =>
                    new Date(a.utc_date).getTime() -
                    new Date(b.utc_date).getTime(),
                )
                .map((match) => (
                  <tr key={match.id} className='hover:bg-slate-50 transition'>
                    {/* DATE COL */}
                    <td className='p-4 text-slate-600 whitespace-nowrap'>
                      <div className='flex flex-col'>
                        <span className='font-bold text-slate-900'>
                          {new Date(match.utc_date).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" },
                          )}
                        </span>
                        <span className='text-xs'>
                          {new Date(match.utc_date).toLocaleTimeString(
                            undefined,
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </span>
                      </div>
                    </td>

                    {/* FIXTURE COL */}
                    <td className='p-4'>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                          <Image
                            src={match.home_crest}
                            alt='home'
                            width={24}
                            height={24}
                            className='object-contain h-6 w-6'
                          />
                          <span className='text-xs font-bold text-slate-400'>
                            vs
                          </span>
                          <Image
                            src={match.away_crest}
                            alt='away'
                            width={24}
                            height={24}
                            className='object-contain h-6 w-6'
                          />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold text-slate-900 text-xs md:text-sm'>
                            {match.home_team} vs {match.away_team}
                          </span>
                          <span className='text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 rounded w-fit'>
                            {match.competition === "Primera Division"
                              ? "La Liga"
                              : match.competition}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* TOGGLE & VENUE COL */}
                    <td className='p-4'>
                      <div className='flex flex-col items-center gap-2'>
                        {/* 1. THE TOGGLE */}
                        <div className='flex items-center gap-2'>
                          <span className='text-[10px] uppercase font-bold text-slate-400'>
                            Status
                          </span>
                          <button
                            onClick={() =>
                              handleToggle(match.id, match.is_watch_party)
                            }
                            className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition ${
                              match.is_watch_party
                                ? "bg-green-500"
                                : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                match.is_watch_party
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>

                        {/* 2. THE VENUE DROPDOWN (Conditional) */}
                        {match.is_watch_party && (
                          <div className='flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200'>
                            <MapPin
                              className={`h-3 w-3 ${
                                match.venue === "Shakespeare Pub"
                                  ? "text-amber-600"
                                  : "text-slate-400"
                              }`}
                            />
                            <select
                              value={match.venue || "Novo Brazil Otay Ranch"}
                              onChange={(e) =>
                                handleVenueChange(match.id, e.target.value)
                              }
                              className={`text-[10px] font-bold rounded border-0 py-1 pl-2 pr-6 cursor-pointer ring-1 ring-inset focus:ring-2 focus:ring-barca-blue ${
                                match.venue === "Shakespeare Pub"
                                  ? "bg-amber-50 text-amber-700 ring-amber-200" // Warning Colors
                                  : "bg-slate-50 text-slate-600 ring-slate-200"
                              }`}
                            >
                              <option value='Novo Brazil Otay Ranch'>
                                Novo Brazil
                              </option>
                              <option value='Shakespeare Pub'>
                                Shakespeare Pub
                              </option>
                            </select>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
