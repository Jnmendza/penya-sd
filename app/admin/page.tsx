import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminTabs from "@/components/AdminTabs";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // 1. Fetch Members
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .order("full_name", { ascending: true });

  // 2. Fetch Config
  const { data: config } = await supabase
    .from("app_config")
    .select("*")
    .eq("key", "membership_open")
    .single();

  // 3. Fetch Matches
  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .order("utc_date", { ascending: true });

  return (
    // UPDATED: Added 'min-h-screen bg-slate-50' to force light mode
    <main className='min-h-screen bg-slate-50 pb-20'>
      <div className='container mx-auto px-4 py-12'>
        <h1 className='mb-8 text-3xl font-black uppercase text-slate-900'>
          Admin Dashboard
        </h1>

        {/* The Tabs Component handles the switching */}
        <AdminTabs
          members={members || []}
          config={config?.value === true}
          matches={matches || []}
        />
      </div>
    </main>
  );
}
