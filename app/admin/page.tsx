import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminTabs from "@/components/AdminTabs";
import { signOut } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

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
        {/* HEADER SECTION (Updated Layout) */}
        <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
          <div>
            <h1 className='text-3xl font-black uppercase text-slate-900'>
              Admin Dashboard
            </h1>
            <p className='mt-1 text-sm font-medium text-slate-500'>
              Logged in as: <span className='text-slate-900'>{user.email}</span>
            </p>
          </div>

          {/* LOGOUT BUTTON FORM */}
          <form action={signOut}>
            <button
              type='submit'
              className='group flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-red-600 hover:ring-red-200'
            >
              <LogOut className='h-4 w-4 transition-transform group-hover:-translate-x-0.5' />
              Sign Out
            </button>
          </form>
        </div>

        <AdminTabs
          members={members || []}
          config={config?.value === "true"}
          matches={matches || []}
        />
      </div>
    </main>
  );
}
