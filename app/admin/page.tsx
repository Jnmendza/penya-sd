import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminTabs from "@/components/AdminTabs";
// import TestForm from "@/components/TestForm"; // You can remove this if done testing

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
    <main className='min-h-screen bg-slate-50 pb-20'>
      <div className='container mx-auto px-4 py-12'>
        {/* HEADER SECTION */}
        <div className='mb-8'>
          <h1 className='text-3xl font-black uppercase text-slate-900'>
            Admin Dashboard
          </h1>
          <p className='mt-2 text-sm font-medium text-slate-500'>
            Logged in as: <span className='text-slate-900'>{user.email}</span>
          </p>
        </div>

        <AdminTabs
          members={members || []}
          config={config?.value === "true"} // Ensure we check for string "true"
          matches={matches || []}
        />
      </div>
    </main>
  );
}
