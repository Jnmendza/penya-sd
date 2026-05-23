// app/actions/registerMember.ts
"use server";

import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/utils/supabase/admin";
import { sendRegistrationEmail } from "@/lib/emails";

export async function registerMember(formData: FormData) {
  try {
  const supabase = await createAdminClient();

  // 1. Extract form data
  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().toLowerCase().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() || null;
  const isReturning = formData.get("isReturning") === "true";
  const paymentMethod = formData.get("paymentMethod")?.toString() ?? "";
  const paymentHandle = formData.get("paymentHandle")?.toString().trim() || null;

  if (!firstName || !lastName || !email || !paymentMethod) {
    return { success: false, message: "Please fill in all required fields." };
  }

  // 2. Check enrollment is open
  const { data: configOpen } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "membership_open")
    .single();

  if (configOpen?.value !== "true") {
    return { success: false, message: "Enrollment is currently closed." };
  }

  // 3. Get current season
  const { data: configSeason } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "current_season_id")
    .single();

  const season = configSeason?.value || "2026/2027";

  // 4. Check membership cap (200 active adult members)
  const { count } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("status", "ACTIVE");

  if ((count ?? 0) >= 200) {
    return { success: false, message: "cap_reached" };
  }

  // 5. Check for duplicate application this season
  const existing = await prisma.memberApplication.findFirst({
    where: { email, season, status: { not: "REJECTED" } },
  });

  if (existing) {
    return { success: false, message: "already_applied" };
  }

  // 6. Parse children from form
  const childrenRaw = formData.get("children")?.toString();
  const children: { name: string; age: number }[] = childrenRaw
    ? JSON.parse(childrenRaw)
    : [];

  // 7. Create MemberApplication record
  const application = await prisma.memberApplication.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      isReturning,
      paymentMethod,
      paymentHandle,
      season,
      children: {
        create: children
          .filter((c) => c.name.trim())
          .map((c) => ({ name: c.name.trim(), age: c.age })),
      },
    },
  });

  // 8. Get payment handles for email
  const { data: venmoConfig } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "venmo_handle")
    .single();

  const { data: zelleConfig } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "zelle_handle")
    .single();

  // 9. Send confirmation email (non-blocking)
  sendRegistrationEmail({
    firstName,
    email,
    paymentMethod,
    venmoHandle: venmoConfig?.value || "@Martha-Acuna-4",
    zelleHandle: zelleConfig?.value || "Aguilera76@gmail.com",
  }).catch(console.error);

  return { success: true, applicationId: application.id, paymentMethod };
  } catch (err) {
    console.error("[registerMember]", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { success: false, message };
  }
}
