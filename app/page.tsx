export const dynamic = "force-dynamic";

import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Hero";
import NextMatch, { MatchProps } from "@/components/NextMatch";
import MembershipCTA from "@/components/MembershipCTA"; // Component updated
import CommunityHighlights from "@/components/CommunityHighlights";

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch Next Match
  const { data: match, error: matchError } = await supabase
    .from("events")
    .select("*")
    .gt("kickoff_time", new Date().toISOString())
    .order("kickoff_time", { ascending: true })
    .limit(1)
    .single();

  if (matchError && matchError.code !== "PGRST116") {
    // Ignore "no rows" error
    console.error("Supabase Match Error:", matchError);
  }

  // 2. Fetch Membership Status (NEW)
  const { data: config, error: configError } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "membership_open")
    .single();

  // Default to false if config is missing or error
  const isMembershipOpen = config?.value ?? false;

  // --- Logic for Match Props (Same as before) ---
  let matchProps: MatchProps | null = null;
  if (match) {
    const matchDate = new Date(match.kickoff_time);
    const isHome = match.home_team.includes("Barcelona");
    const fallbackLogo =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    matchProps = {
      id: match.id,
      opponent: isHome ? match.away_team : match.home_team,
      opponentLogo:
        (isHome ? match.away_team_logo : match.home_team_logo) || fallbackLogo,
      homeLogo:
        (isHome ? match.home_team_logo : match.away_team_logo) || fallbackLogo,
      competition: match.competition || "Matchday",
      date: matchDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      time: matchDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      venue: match.venue || "TBD",
      isWatchParty: match.is_watch_party || false,
    };
  }

  return (
    <main className='flex min-h-screen flex-col bg-slate-50'>
      <Hero />

      {matchProps ? (
        <NextMatch {...matchProps} />
      ) : (
        <div className='relative z-20 mx-auto -mt-24 max-w-2xl px-4 text-center'>
          <div className='rounded-2xl bg-white p-8 shadow-xl'>
            <h3 className='text-xl font-bold text-slate-800'>
              No Upcoming Matches
            </h3>
            <p className='text-slate-500'>
              Check back soon for the next schedule update.
            </p>
          </div>
        </div>
      )}

      <div className='mt-24'>
        {/* Pass the dynamic status here */}
        <MembershipCTA isOpen={isMembershipOpen} />
      </div>

      <CommunityHighlights />
      {/* Footer is in Layout now */}
    </main>
  );
}
