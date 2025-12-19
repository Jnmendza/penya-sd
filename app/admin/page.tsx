import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export default async function AdminPage() {
  const supabase = await createClient();

  // 1. SECURITY: Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // 2. SECURITY: Check if user is an ADMIN
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") {
    return (
      <div className='min-h-screen flex items-center justify-center bg-red-50 text-red-800 font-bold p-4'>
        ⛔ Access Denied. You do not have Board Member permissions.
      </div>
    );
  }

  // 3. FETCH DATA
  const { data: config } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "membership_open")
    .single();

  const { data: members } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className='min-h-screen bg-slate-50 p-4 md:p-8 pt-24'>
      <div className='container mx-auto max-w-6xl'>
        {/* HEADER SECTION */}
        <div className='my-12 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900'>
              Admin Dashboard
            </h1>
            <p className='text-slate-500 text-sm mt-1'>
              Logged in as {user.email}
            </p>
          </div>

          {/* LOGOUT BUTTON (Server Action) */}
          <form
            action={async () => {
              "use server";
              const sb = await createClient();
              await sb.auth.signOut();
              redirect("/login");
            }}
          >
            <button
              type='submit'
              className='rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 hover:border-red-100 transition shadow-sm'
            >
              Log Out
            </button>
          </form>
        </div>

        {/* CLIENT COMPONENT */}
        <AdminDashboardClient
          initialConfig={config?.value ?? false}
          initialMembers={members || []}
        />
      </div>
    </main>
  );
}
