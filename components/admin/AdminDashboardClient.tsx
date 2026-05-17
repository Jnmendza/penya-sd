"use client";

import { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import PendingApplications, { Application } from "./PendingApplications";

export interface Member {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  has_scarf: boolean;
  has_pin: boolean;
  payment_method?: string | null;
  payment_handle?: string | null;
  is_returning?: boolean;
  children_count?: number;
}

interface Props {
  initialConfig: boolean;
  initialMembers: Member[];
  initialApplications: Application[];
}

interface UndoToast {
  id: string;
  message: string;
  onUndo: () => void;
}

export default function AdminDashboardClient({
  initialConfig,
  initialMembers,
  initialApplications,
}: Props) {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(initialConfig);
  const [members, setMembers] = useState(initialMembers);
  const [toasts, setToasts] = useState<UndoToast[]>([]);
  const pendingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // --- FILTERS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const supabase = createClient();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // --- FILTER LOGIC ---
  const filteredMembers = members.filter((member) => {
    if (selectedLetter) {
      return member.full_name.toUpperCase().startsWith(selectedLetter);
    }
    const term = searchTerm.toLowerCase();
    return (
      member.full_name.toLowerCase().includes(term) ||
      member.email.toLowerCase().includes(term)
    );
  });

  // --- ACTIONS ---

  const toggleEnrollment = async () => {
    const newState = !isEnrollmentOpen;
    setIsEnrollmentOpen(newState);
    const { error } = await supabase
      .from("app_config")
      .upsert({ key: "membership_open", value: newState });
    if (error) {
      alert("Failed");
      setIsEnrollmentOpen(!newState);
    }
  };

  const toggleMerchItem = (
    id: string,
    item: "has_scarf" | "has_pin",
    currentValue: boolean,
  ) => {
    const newValue = !currentValue;
    const member = members.find((m) => m.id === id)!;
    const label = item === "has_scarf" ? "🧣 Scarf" : "📍 Pin";
    const toastId = `${id}-${item}`;

    // Apply optimistic UI update immediately
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [item]: newValue } : m)),
    );

    // Cancel any existing pending write for this same toggle
    const existing = pendingTimers.current.get(toastId);
    if (existing) clearTimeout(existing);

    // Schedule the DB write for 5 seconds from now
    const timeoutId = setTimeout(async () => {
      pendingTimers.current.delete(toastId);
      const { error } = await supabase
        .from("members")
        .update({ [item]: newValue })
        .eq("id", id);
      if (error) {
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { ...m, [item]: currentValue } : m)),
        );
      }
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 5000);

    pendingTimers.current.set(toastId, timeoutId);

    // Undo: cancel the write and revert the UI
    const onUndo = () => {
      clearTimeout(timeoutId);
      pendingTimers.current.delete(toastId);
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, [item]: currentValue } : m)),
      );
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    };

    setToasts((prev) => [
      ...prev.filter((t) => t.id !== toastId),
      { id: toastId, message: `${label} updated for ${member.full_name}`, onUndo },
    ]);
  };

  // Stats
  const totalMembers = members.length;
  const scarfsGiven = members.filter((m) => m.has_scarf).length;
  const pinsGiven = members.filter((m) => m.has_pin).length;

  return (
    <>
      <style>{`
        @keyframes shrink-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      <div className='space-y-8'>
        <PendingApplications initialApplications={initialApplications} />

        {/* 1. TOP STATS */}
        <div className='grid gap-4 md:grid-cols-4'>
          {/* Enrollment Switch */}
          <div className='col-span-1 rounded-xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col justify-between'>
            <p className='text-xs text-slate-500 font-bold uppercase'>
              Enrollment
            </p>
            <button
              onClick={toggleEnrollment}
              className={`mt-2 relative inline-flex h-6 w-11 items-center rounded-full transition ${
                isEnrollmentOpen ? "bg-green-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isEnrollmentOpen ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Members Count */}
          <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-100'>
            <p className='text-xs text-slate-500 font-bold uppercase'>Members</p>
            <p className='text-2xl font-extrabold text-barca-blue'>{totalMembers}</p>
          </div>

          {/* Scarf Stats */}
          <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-100'>
            <p className='text-xs text-slate-500 font-bold uppercase'>Scarves Out</p>
            <p className='text-2xl font-extrabold text-purple-600'>{scarfsGiven}</p>
          </div>

          {/* Pin Stats */}
          <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-100'>
            <p className='text-xs text-slate-500 font-bold uppercase'>Pins Out</p>
            <p className='text-2xl font-extrabold text-teal-600'>{pinsGiven}</p>
          </div>
        </div>

        {/* 2. FILTERS & TABLE */}
        <div className='rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden'>
          {/* HEADER AREA */}
          <div className='p-6 border-b border-slate-100 bg-slate-50/50 space-y-4'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <h3 className='font-bold text-lg text-slate-900'>
                Member List{" "}
                <span className='text-slate-400 text-sm font-normal ml-2'>
                  ({filteredMembers.length} visible)
                </span>
              </h3>

              <div className='flex flex-col md:flex-row gap-4 items-center'>
                {/* SEARCH INPUT */}
                <div className='relative w-full md:w-64'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      className='h-4 w-4 text-slate-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </div>
                  <input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedLetter(null);
                    }}
                    className='w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue'
                  />
                </div>
              </div>
            </div>

            {/* A-Z FILTER */}
            <div className='flex flex-wrap gap-1'>
              <button
                onClick={() => setSelectedLetter(null)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                  selectedLetter === null
                    ? "bg-barca-blue text-white"
                    : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                ALL
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter === selectedLetter ? null : letter);
                    setSearchTerm("");
                  }}
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-md transition ${
                    selectedLetter === letter
                      ? "bg-barca-blue text-white shadow-md transform scale-110"
                      : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-slate-50 text-slate-500 border-b border-slate-200'>
                <tr>
                  <th className='p-4 font-bold uppercase text-xs'>Name</th>
                  <th className='p-4 font-bold uppercase text-xs'>Email</th>
                  <th className='p-4 font-bold uppercase text-xs'>Type</th>
                  <th className='p-4 font-bold uppercase text-xs'>Payment</th>
                  <th className='p-4 font-bold uppercase text-xs'>Children</th>
                  <th className='p-4 font-bold uppercase text-xs text-center'>Merch Items</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className='hover:bg-slate-50 transition'>
                    <td className='p-4 font-bold text-slate-900'>
                      {member.full_name}
                    </td>
                    <td className='p-4 text-slate-600 font-medium'>
                      {member.email}
                    </td>

                    {/* TYPE */}
                    <td className='p-4'>
                      {member.is_returning ? (
                        <span className='inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700'>Returning</span>
                      ) : (
                        <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700'>New</span>
                      )}
                    </td>

                    {/* PAYMENT */}
                    <td className='p-4 text-sm text-slate-600'>
                      {member.payment_method === "venmo" && <span>💸 Venmo</span>}
                      {member.payment_method === "zelle" && <span>🏦 Zelle</span>}
                      {member.payment_method === "cash" && <span>🤝 Cash</span>}
                      {member.payment_handle && (
                        <p className='font-mono text-xs text-slate-400'>{member.payment_handle}</p>
                      )}
                    </td>

                    {/* CHILDREN */}
                    <td className='p-4 text-sm text-slate-500'>
                      {member.children_count && member.children_count > 0
                        ? `👧 ${member.children_count}`
                        : "—"}
                    </td>

                    {/* MERCH TOGGLES */}
                    <td className='p-4 text-center'>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          onClick={() => toggleMerchItem(member.id, "has_scarf", member.has_scarf)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
                            member.has_scarf
                              ? "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                              : "bg-white text-slate-400 border-slate-200 hover:border-purple-300 hover:text-purple-600"
                          }`}
                        >
                          <span className='text-base'>🧣</span>
                          {member.has_scarf ? "Yes" : "Scarf"}
                        </button>

                        <button
                          onClick={() => toggleMerchItem(member.id, "has_pin", member.has_pin)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
                            member.has_pin
                              ? "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200"
                              : "bg-white text-slate-400 border-slate-200 hover:border-teal-300 hover:text-teal-600"
                          }`}
                        >
                          <span className='text-base'>📍</span>
                          {member.has_pin ? "Yes" : "Pin"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={6} className='p-12 text-center text-slate-500'>
                      No members found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UNDO TOASTS */}
      <div className='fixed bottom-6 right-6 flex flex-col gap-2 z-50'>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className='flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl w-80 relative overflow-hidden'
          >
            <p className='text-sm flex-1'>{toast.message}</p>
            <button
              onClick={toast.onUndo}
              className='text-xs font-bold text-yellow-400 hover:text-yellow-300 shrink-0 transition'
            >
              Undo
            </button>
            <div
              className='absolute bottom-0 left-0 h-0.5 bg-white/30'
              style={{ animation: 'shrink-progress 5s linear forwards' }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
