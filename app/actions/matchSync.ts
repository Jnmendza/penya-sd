"use server";

import { createClient } from "@/utils/supabase/server";

const API_KEY = process.env.FOOTBALL_DATA_KEY;
const BARCA_ID = 81; // FC Barcelona Team ID

export async function syncSchedule() {
  if (!API_KEY) {
    return { success: false, error: "Missing API Key. Check .env.local" };
  }

  try {
    const supabase = await createClient();

    // 1. Fetch Schedule (Next 10 matches)
    const res = await fetch(
      `https://api.football-data.org/v4/teams/${BARCA_ID}/matches?status=SCHEDULED&limit=10`,
      {
        headers: { "X-Auth-Token": API_KEY },
        cache: "no-store", // Critical: Don't cache the fetch!
      }
    );

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.matches) {
      return { success: false, error: "No matches found in API response" };
    }

    // 2. Upsert to Supabase
    let upsertCount = 0;

    for (const match of data.matches) {
      // Determine competition name safely
      const competitionName =
        match.competition?.name === "Primera Division"
          ? "La Liga"
          : match.competition?.name || "Unknown Competition";

      const { error } = await supabase.from("matches").upsert(
        {
          id: match.id,
          utc_date: match.utcDate,
          status: match.status,
          home_team: match.homeTeam.shortName || match.homeTeam.name,
          away_team: match.awayTeam.shortName || match.awayTeam.name,
          home_crest: match.homeTeam.crest,
          away_crest: match.awayTeam.crest,
          competition: competitionName,
          // We do NOT update 'is_watch_party' or 'venue' here so we don't overwrite your manual settings
        },
        {
          onConflict: "id",
          ignoreDuplicates: false,
        }
      );

      if (error) {
        console.error("Supabase Upsert Error:", error);
      } else {
        upsertCount++;
      }
    }

    return { success: true, count: upsertCount };
  } catch (error) {
    console.error("Sync Failed:", error);
    return { success: false, error: "Failed to sync schedule" };
  }
}

// TOGGLE WATCH PARTY STATUS
export async function toggleWatchParty(matchId: number, currentState: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("matches")
    .update({ is_watch_party: !currentState })
    .eq("id", matchId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
