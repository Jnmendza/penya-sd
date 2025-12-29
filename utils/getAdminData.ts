import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getAdminData() {
  const supabase = await createClient();

  // 1. Security Check: Ensure user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Parallel Fetching (Faster)
  const [membersRes, matchesRes] = await Promise.all([
    supabase
      .from("members")
      .select("*")
      .order("full_name", { ascending: true }),
    supabase.from("matches").select("*").order("utc_date", { ascending: true }),
  ]);

  return {
    user,
    members: membersRes.data || [],
    matches: matchesRes.data || [],
  };
}
