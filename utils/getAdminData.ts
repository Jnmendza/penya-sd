import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function getAdminData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [membersRes, matchesRes, pendingApplications, approvedApplications] = await Promise.all([
    supabase.from("members").select("*").order("full_name", { ascending: true }),
    supabase.from("matches").select("*").order("utc_date", { ascending: true }),
    prisma.memberApplication.findMany({
      where: { status: "PENDING" },
      include: { children: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.memberApplication.findMany({
      where: { status: "APPROVED" },
      include: { children: true },
    }),
  ]);

  const members = (membersRes.data || []).map((member: any) => {
    const matchingApp = approvedApplications.find(
      (app) => app.email.toLowerCase() === member.email.toLowerCase()
    );
    return {
      ...member,
      children: matchingApp ? matchingApp.children : [],
    };
  });

  return {
    user,
    members,
    matches: matchesRes.data || [],
    applications: pendingApplications,
  };
}
