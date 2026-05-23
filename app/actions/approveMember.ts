// app/actions/approveMember.ts
"use server";

import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/utils/supabase/admin";
import { sendActivationEmail } from "@/lib/emails";

export async function approveMember(applicationId: string) {
  try {
    const supabase = await createAdminClient();

    // 1. Fetch the application with children
    const application = await prisma.memberApplication.findUnique({
      where: { id: applicationId },
      include: { children: true },
    });

    if (!application) {
      return { success: false, message: "Application not found." };
    }

    if (application.status === "APPROVED") {
      return { success: false, message: "Already approved." };
    }

    const fullName = `${application.firstName} ${application.lastName}`;

    // 2. Check if member already exists (returning member)
    const { data: existing } = await supabase
      .from("members")
      .select("id, seasons_active")
      .eq("email", application.email)
      .single();

    if (existing) {
      // Returning member: append season + update payment info
      const { error: rpcError } = await supabase.rpc("append_season_to_member", {
        member_email: application.email,
        new_season: application.season,
        new_full_name: fullName,
        new_phone: application.phone,
      });
      if (rpcError) {
        console.error("RPC error:", rpcError);
        return { success: false, message: "Failed to activate member." };
      }
      // Update new fields that the RPC doesn't handle
      await supabase
        .from("members")
        .update({
          status: "ACTIVE",
          payment_method: application.paymentMethod,
          payment_handle: application.paymentHandle,
          is_returning: application.isReturning,
          children_count: application.children.length,
        })
        .eq("email", application.email);
    } else {
      // New member: insert fresh record
      const { error: insertError } = await supabase.from("members").insert({
        email: application.email,
        full_name: fullName,
        phone: application.phone,
        status: "ACTIVE",
        seasons_active: [application.season],
        payment_method: application.paymentMethod,
        payment_handle: application.paymentHandle,
        is_returning: application.isReturning,
        children_count: application.children.length,
        has_scarf: false,
        has_pin: false,
      });
      if (insertError) {
        console.error("Insert error:", insertError);
        return { success: false, message: "Failed to activate member." };
      }
    }

    // 3. Mark application as approved
    await prisma.memberApplication.update({
      where: { id: applicationId },
      data: { status: "APPROVED" },
    });

    // 4. Send activation email (non-blocking)
    sendActivationEmail({
      firstName: application.firstName,
      email: application.email,
    }).catch(console.error);

    return { success: true };
  } catch (err) {
    console.error("[approveMember]", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { success: false, message };
  }
}
