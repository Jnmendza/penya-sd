import { createClient } from "@/utils/supabase/server";

export async function getGlobalConfig() {
  const supabase = await createClient();

  const [openRes, seasonRes] = await Promise.all([
    supabase
      .from("app_config")
      .select("value")
      .eq("key", "membership_open")
      .single(),
    supabase
      .from("app_config")
      .select("value")
      .eq("key", "current_season_id")
      .single(),
  ]);

  return {
    // Centralized logic: We handle the "true" string comparison HERE only.
    isMembershipOpen: openRes.data?.value === "true",

    // Centralized fallback: We handle the default season HERE only.
    currentSeason: seasonRes.data?.value || "2025/2026",
  };
}
