// utils/getGlobalConfig.ts
import { createClient } from "@/utils/supabase/server";

export async function getGlobalConfig() {
  const supabase = await createClient();

  const [openRes, seasonRes, venmoRes, zelleRes, seasonEndRes, venmoQrRes, zelleQrRes] =
    await Promise.all([
      supabase.from("app_config").select("value").eq("key", "membership_open").single(),
      supabase.from("app_config").select("value").eq("key", "current_season_id").single(),
      supabase.from("app_config").select("value").eq("key", "venmo_handle").single(),
      supabase.from("app_config").select("value").eq("key", "zelle_handle").single(),
      supabase.from("app_config").select("value").eq("key", "season_end_date").single(),
      supabase.from("app_config").select("value").eq("key", "venmo_qr_url").single(),
      supabase.from("app_config").select("value").eq("key", "zelle_qr_url").single(),
    ]);

  return {
    isMembershipOpen: openRes.data?.value === "true",
    currentSeason: seasonRes.data?.value ?? "2026/2027",
    venmoHandle: venmoRes.data?.value ?? "@Martha-Acuna-4",
    zelleHandle: zelleRes.data?.value ?? "Aguilera76@gmail.com",
    seasonEndDate: seasonEndRes.data?.value ?? "2026-06-30",
    venmoQrUrl: venmoQrRes.data?.value ?? null,
    zelleQrUrl: zelleQrRes.data?.value ?? null,
  };
}
