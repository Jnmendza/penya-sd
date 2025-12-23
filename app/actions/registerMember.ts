"use server";

import { createAdminClient } from "@/utils/supabase/admin";

export async function registerMember(formData: FormData) {
  const supabase = await createAdminClient();

  // 1. Extract Data
  const email = formData.get("email")?.toString().toLowerCase().trim();
  const fullName = formData.get("full_name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();

  if (!email || !fullName) {
    return { success: false, message: "Name and Email are required." };
  }

  // 2. Get Current Season from Config
  const { data: config } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "current_season_id")
    .single();

  // Ensure currentSeason is a string (default if missing)
  const currentSeason = config?.value || "2025/2026";

  // 3. ATTEMPT 1: Try to Insert a NEW Member
  const { error: insertError } = await supabase.from("members").insert({
    email: email,
    full_name: fullName,
    phone: phone,
    status: "ACTIVE",
    seasons_active: [currentSeason],
    // created_at handles itself
  });

  // Success? Great, new member joined.
  if (!insertError) {
    return { success: true, message: "Welcome to the family!" };
  }

  // 4. ATTEMPT 2: Handle "Unique Violation" (User Exists)
  if (insertError.code === "23505") {
    // --- NEW LOGIC START ---

    // A. Fetch the existing member to see their current badges
    const { data: existingMember } = await supabase
      .from("members")
      .select("seasons_active")
      .eq("email", email)
      .single();

    // B. Check if they already have this season's badge
    if (existingMember?.seasons_active?.includes(currentSeason)) {
      return {
        success: false, // Return false so the UI knows nothing changed
        message: `You are already registered for the ${currentSeason} season!`,
      };
    }

    // --- NEW LOGIC END ---

    // C. If they don't have it, perform the Renewal (Append Season)
    const { error: rpcError } = await supabase.rpc("append_season_to_member", {
      member_email: email,
      new_season: currentSeason,
      new_full_name: fullName,
      new_phone: phone,
    });

    if (rpcError) {
      console.error("RPC Error:", rpcError);
      return { success: false, message: "Failed to renew membership." };
    }

    return { success: true, message: "Welcome back! Membership renewed." };
  }

  // Generic Error Catch
  console.error("Registration Error:", insertError);
  return { success: false, message: "An unexpected error occurred." };
}
