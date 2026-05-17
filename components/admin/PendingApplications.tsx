// components/admin/PendingApplications.tsx
"use client";

import { useState } from "react";
import { approveMember } from "@/app/actions/approveMember";
import { rejectMember } from "@/app/actions/rejectMember";

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  isReturning: boolean;
  paymentMethod: string;
  paymentHandle: string | null;
  season: string;
  createdAt: Date;
  children: { id: string; name: string; age: number }[];
}

interface Props {
  initialApplications: Application[];
}

const PAYMENT_ICONS: Record<string, string> = {
  venmo: "💸",
  zelle: "🏦",
  cash: "🤝",
};

const PAYMENT_LABELS: Record<string, string> = {
  venmo: "Venmo",
  zelle: "Zelle",
  cash: "Cash",
};

export default function PendingApplications({ initialApplications }: Props) {
  const [applications, setApplications] = useState(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    if (!confirm("Confirm payment received and activate this member?")) return;
    setLoadingId(id);
    const result = await approveMember(id);
    if (result.success) {
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert(result.message || "Failed to approve.");
    }
    setLoadingId(null);
  };

  const handleReject = async (id: string) => {
    if (!confirm("Reject this application? This cannot be undone.")) return;
    setLoadingId(id);
    await rejectMember(id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setLoadingId(null);
  };

  if (applications.length === 0) return null;

  return (
    <div className="rounded-xl bg-white shadow-sm border border-amber-200 overflow-hidden mb-6">
      <div className="px-6 py-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
        <h3 className="font-bold text-amber-900">
          Pending Applications
          <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black">
            {applications.length}
          </span>
        </h3>
        <span className="text-xs text-amber-700">Waiting for payment verification</span>
      </div>

      <div className="divide-y divide-slate-100">
        {applications.map((app) => (
          <div key={app.id} className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
            {/* Name + contact */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900">
                {app.firstName} {app.lastName}
                {app.isReturning && (
                  <span className="ml-2 text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    Returning
                  </span>
                )}
                {!app.isReturning && (
                  <span className="ml-2 text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{app.email} {app.phone ? `· ${app.phone}` : ""}</p>
              {app.children.length > 0 && (
                <p className="text-xs text-purple-600 font-semibold mt-1">
                  👧 {app.children.length} child{app.children.length > 1 ? "ren" : ""}:{" "}
                  {app.children.map((c) => `${c.name} (${c.age})`).join(", ")}
                </p>
              )}
            </div>

            {/* Payment info */}
            <div className="shrink-0 text-sm">
              <p className="font-bold text-slate-800">
                {PAYMENT_ICONS[app.paymentMethod]} {PAYMENT_LABELS[app.paymentMethod]}
              </p>
              {app.paymentHandle && (
                <p className="font-mono text-xs text-slate-500">{app.paymentHandle}</p>
              )}
            </div>

            {/* Submitted date */}
            <div className="shrink-0 text-xs text-slate-400">
              {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleApprove(app.id)} disabled={loadingId === app.id}
                className="rounded-lg bg-barca-blue px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-900 shadow-sm disabled:opacity-50">
                {loadingId === app.id ? "..." : "✓ Approve"}
              </button>
              <button onClick={() => handleReject(app.id)} disabled={loadingId === app.id}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-50">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
