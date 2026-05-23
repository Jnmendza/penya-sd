"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Users, Calendar, ClipboardList } from "lucide-react";
import AdminDashboardClient, { Member } from "./AdminDashboardClient";
import AdminMatchControl, { Match } from "./AdminMatchControl";
import PendingApplications, { Application } from "./PendingApplications";

interface AdminTabsProps {
  members: Member[];
  config: boolean;
  matches: Match[];
  applications: Application[];
}

export default function AdminTabs({
  members,
  config,
  matches,
  applications,
}: AdminTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "members";

  const handleTabChange = (tab: string) => {
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap p-1 gap-1 bg-slate-100 rounded-xl w-fit'>
        <button
          onClick={() => handleTabChange("members")}
          className={`flex cursor-pointer items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === "members"
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Users className='h-4 w-4' />
          Member List
        </button>

        <button
          onClick={() => handleTabChange("pending")}
          className={`flex cursor-pointer items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === "pending"
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <ClipboardList className='h-4 w-4' />
          Pending Applications
          {applications.length > 0 && (
            <span className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-black animate-pulse'>
              {applications.length}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabChange("matches")}
          className={`flex cursor-pointer items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === "matches"
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Calendar className='h-4 w-4' />
          Match Schedule
        </button>
      </div>

      <div className='animate-in fade-in slide-in-from-bottom-2 duration-300'>
        {activeTab === "members" && (
          <AdminDashboardClient
            initialMembers={members}
            initialConfig={config}
          />
        )}
        {activeTab === "pending" && (
          <PendingApplications initialApplications={applications} />
        )}
        {activeTab === "matches" && (
          <AdminMatchControl matches={matches} />
        )}
      </div>
    </div>
  );
}
