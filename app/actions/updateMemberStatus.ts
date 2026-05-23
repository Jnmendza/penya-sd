// app/actions/updateMemberStatus.ts
"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export async function updateMemberStatus(memberId: string, status: string) {
  try {
    // Check if the user is authenticated to perform admin operations
    const serverSupabase = await createClient();
    const { data: { user } } = await serverSupabase.auth.getUser();
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const supabase = await createAdminClient();
    const { error } = await supabase
      .from("members")
      .update({ status })
      .eq("id", memberId);

    if (error) {
      console.error("Update member status error:", error);
      return { success: false, message: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("[updateMemberStatus]", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { success: false, message };
  }
}
