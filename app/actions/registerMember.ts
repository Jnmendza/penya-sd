// app/actions/registerMember.ts
"use server";

import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/utils/supabase/admin";
import { sendRegistrationEmail } from "@/lib/emails";
import { getMembershipCount } from "@/utils/getMembershipCount";

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

  // 4. Check membership cap (150 members in total, excluding children under 8)
  const totalCount = await getMembershipCount(season);

  if (totalCount >= 150) {
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
  console.log("=== RESEND DIAGNOSTICS ===");
  console.log("API Key exists:", !!process.env.RESEND_API_KEY);
  if (process.env.RESEND_API_KEY) {
    console.log("API Key length:", process.env.RESEND_API_KEY.length);
    console.log("API Key starts with re_:", process.env.RESEND_API_KEY.startsWith("re_"));
    console.log("API Key first 5 chars:", process.env.RESEND_API_KEY.substring(0, 5));
  }

  // Test direct fetch asynchronously
  (async () => {
    try {
      console.log("[Diagnostics] Testing direct native fetch...");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Penya PBSD <info@penyasd.com>",
          to: [email],
          subject: "Test Direct Fetch Diagnostics",
          html: "<p>Direct fetch test</p>",
        }),
      });
      console.log("[Diagnostics] Direct fetch status:", res.status);
      const resBody = await res.json();
      console.log("[Diagnostics] Direct fetch body:", resBody);
    } catch (fetchErr) {
      console.error("[Diagnostics] Direct fetch failed:", fetchErr);
    }
  })();

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
