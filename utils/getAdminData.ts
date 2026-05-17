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

  const [membersRes, matchesRes, applications] = await Promise.all([
    supabase.from("members").select("*").order("full_name", { ascending: true }),
    supabase.from("matches").select("*").order("utc_date", { ascending: true }),
    prisma.memberApplication.findMany({
      where: { status: "PENDING" },
      include: { children: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    user,
    members: membersRes.data || [],
    matches: matchesRes.data || [],
    applications,
  };
}
