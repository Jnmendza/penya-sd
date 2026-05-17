// utils/getGlobalConfig.ts
import { createClient } from "@/utils/supabase/server";

export async function getGlobalConfig() {
  const supabase = await createClient();

  const [openRes, seasonRes, venmoRes, cashappRes, seasonEndRes] =
    await Promise.all([
      supabase.from("app_config").select("value").eq("key", "membership_open").single(),
      supabase.from("app_config").select("value").eq("key", "current_season_id").single(),
      supabase.from("app_config").select("value").eq("key", "venmo_handle").single(),
      supabase.from("app_config").select("value").eq("key", "cashapp_handle").single(),
      supabase.from("app_config").select("value").eq("key", "season_end_date").single(),
    ]);

  return {
    isMembershipOpen: openRes.data?.value === "true",
    currentSeason: seasonRes.data?.value ?? "2025/2026",
    venmoHandle: venmoRes.data?.value ?? "@PenyaSD",
    cashappHandle: cashappRes.data?.value ?? "$PenyaSD",
    seasonEndDate: seasonEndRes.data?.value ?? "2026-06-30",
  };
}
