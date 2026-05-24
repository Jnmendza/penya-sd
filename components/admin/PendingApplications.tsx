// components/admin/PendingApplications.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface ConfirmModalState {
  isOpen: boolean;
  type: "approve" | "reject" | null;
  applicationId: string | null;
  title: string;
  message: string;
  confirmText: string;
  confirmColor: string;
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
  const router = useRouter();

  const [modal, setModal] = useState<ConfirmModalState>({
    isOpen: false,
    type: null,
    applicationId: null,
    title: "",
    message: "",
    confirmText: "",
    confirmColor: "",
  });

  const handleApproveClick = (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    setModal({
      isOpen: true,
      type: "approve",
      applicationId: id,
      title: "Confirm Payment",
      message: `Confirm that payment has been received from ${app.firstName} ${app.lastName} via ${PAYMENT_LABELS[app.paymentMethod] || app.paymentMethod} and activate their membership.`,
      confirmText: "Yes, Activate",
      confirmColor: "bg-barca-blue hover:bg-blue-900 shadow-blue-900/10",
    });
  };

  const handleRejectClick = (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    setModal({
      isOpen: true,
      type: "reject",
      applicationId: id,
      title: "Reject Application",
      message: `Are you sure you want to reject the application of ${app.firstName} ${app.lastName}? This action cannot be undone.`,
      confirmText: "Yes, Reject",
      confirmColor: "bg-red-600 hover:bg-red-700 shadow-red-600/10",
    });
  };

  const confirmAction = async () => {
    const { type, applicationId } = modal;
    if (!applicationId || !type) return;

    setModal((prev) => ({ ...prev, isOpen: false }));
    setLoadingId(applicationId);

    if (type === "approve") {
      const result = await approveMember(applicationId);
      if (result.success) {
        setApplications((prev) => prev.filter((a) => a.id !== applicationId));
        router.refresh();
      } else {
        alert(result.message || "Failed to approve.");
      }
    } else if (type === "reject") {
      const result = await rejectMember(applicationId);
      if (result.success) {
        setApplications((prev) => prev.filter((a) => a.id !== applicationId));
        router.refresh();
      } else {
        alert(result.message || "Failed to reject.");
      }
    }
    setLoadingId(null);
  };

  if (applications.length === 0) {
    return (
      <div className="rounded-xl bg-white shadow-sm border border-slate-150 overflow-hidden mb-6">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-700">
            Pending Applications
          </h3>
          <span className="text-xs text-slate-500">All payments verified</span>
        </div>
        <div className="p-8 text-center text-slate-400 text-sm font-medium">
          No pending applications. All registered members are fully paid and active.
        </div>
      </div>
    );
  }

  return (
    <>
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

        <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
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
              <div className="flex gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                <button onClick={() => handleApproveClick(app.id)} disabled={loadingId === app.id}
                  className="flex-1 md:flex-initial flex items-center justify-center rounded-lg bg-barca-blue px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-900 shadow-sm disabled:opacity-50 cursor-pointer transition">
                  {loadingId === app.id ? "..." : "✓ Confirm Payment & Approve"}
                </button>
                <button onClick={() => handleRejectClick(app.id)} disabled={loadingId === app.id}
                  className="flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-50 cursor-pointer transition">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOM CONFIRMATION MODAL */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-300">
          {/* Dark Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
          />

          {/* Modal Card */}
          <div className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-2xl duration-300 animate-in zoom-in-95">
            <div className="text-center">
              {/* Visual Icon */}
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                modal.type === "approve" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
              }`}>
                {modal.type === "approve" ? (
                  <span className="text-2xl">💸</span>
                ) : (
                  <span className="text-2xl">⚠️</span>
                )}
              </div>

              <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-slate-900">
                {modal.title}
              </h3>

              <p className="mb-6 text-sm text-slate-500 leading-relaxed">
                {modal.message}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
                  className="flex-1 cursor-pointer rounded-xl bg-slate-100 hover:bg-slate-200 py-3 text-sm font-bold text-slate-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`flex-1 cursor-pointer rounded-xl py-3 text-sm font-bold text-white shadow-lg transition ${
                    modal.type === "approve"
                      ? "bg-barca-blue hover:bg-blue-900 shadow-blue-900/10"
                      : "bg-red-600 hover:bg-red-700 shadow-red-600/10"
                  }`}
                >
                  {modal.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
