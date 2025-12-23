"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Users, Calendar } from "lucide-react";
import AdminDashboardClient from "./AdminDashboardClient";
import AdminMatchControl from "./AdminMatchControl";

interface AdminTabsProps {
  members: any[];
  config: boolean;
  matches: any[];
}

export default function AdminTabs({
  members,
  config,
  matches,
}: AdminTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. READ FROM URL (Default to 'members' if URL is empty)
  const activeTab = searchParams.get("tab") || "members";

  // 2. WRITE TO URL
  const handleTabChange = (tab: string) => {
    // This updates the URL without a full page reload
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  return (
    <div className='space-y-8'>
      {/* TAB NAVIGATION */}
      <div className='flex p-1 space-x-1 bg-slate-100 rounded-xl w-fit'>
        <button
          onClick={() => handleTabChange("members")}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === "members"
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Users className='h-4 w-4' />
          Member List
        </button>

        <button
          onClick={() => handleTabChange("matches")}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === "matches"
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Calendar className='h-4 w-4' />
          Match Schedule
        </button>
      </div>

      {/* CONDITIONAL RENDERING */}
      <div className='animate-in fade-in slide-in-from-bottom-2 duration-300'>
        {activeTab === "members" ? (
          <AdminDashboardClient
            initialMembers={members}
            initialConfig={config}
          />
        ) : (
          <AdminMatchControl matches={matches} />
        )}
      </div>
    </div>
  );
}
