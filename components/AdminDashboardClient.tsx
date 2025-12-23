"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Member {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  has_scarf: boolean; // <--- NEW
  has_pin: boolean; // <--- NEW
}

interface Props {
  initialConfig: boolean;
  initialMembers: Member[];
}

export default function AdminDashboardClient({
  initialConfig,
  initialMembers,
}: Props) {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(initialConfig);
  const [members, setMembers] = useState(initialMembers);

  // --- FILTERS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showPendingOnly, setShowPendingOnly] = useState(false); // <--- NEW FILTER

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const supabase = createClient();

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // --- FILTER LOGIC ---
  const filteredMembers = members.filter((member) => {
    // 1. "Unpaid Only" Filter
    if (showPendingOnly && member.status === "ACTIVE") {
      return false; // Hide paid members if filter is on
    }

    // 2. Letter Filter
    if (selectedLetter) {
      return member.full_name.toUpperCase().startsWith(selectedLetter);
    }

    // 3. Search Filter
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

  const markAsPaid = async (id: string) => {
    if (!confirm("Confirm payment received?")) return;
    setLoadingId(id);
    const { error } = await supabase
      .from("members")
      .update({ status: "ACTIVE" })
      .eq("id", id);
    if (!error)
      setMembers(
        members.map((m) => (m.id === id ? { ...m, status: "ACTIVE" } : m))
      );
    setLoadingId(null);
  };

  // GENERIC MERCH TOGGLE
  const toggleMerchItem = async (
    id: string,
    item: "has_scarf" | "has_pin",
    currentValue: boolean
  ) => {
    // Optimistic Update
    const oldMembers = [...members];
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [item]: !currentValue } : m))
    );

    const { error } = await supabase
      .from("members")
      .update({ [item]: !currentValue })
      .eq("id", id);

    if (error) {
      alert(`Error updating ${item}`);
      setMembers(oldMembers); // Revert
    }
  };

  // Stats
  const totalPaid = members.filter((m) => m.status === "ACTIVE").length;
  const totalPending = members.filter(
    (m) => m.status === "PENDING_PAYMENT"
  ).length;
  const scarfsGiven = members.filter((m) => m.has_scarf).length;
  const pinsGiven = members.filter((m) => m.has_pin).length;

  return (
    <div className='space-y-8'>
      {/* 1. TOP STATS */}
      <div className='grid gap-4 md:grid-cols-5'>
        {/* Enrollment Switch */}
        <div className='col-span-1 md:col-span-1 rounded-xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col justify-between'>
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

        {/* Paid Count */}
        <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-100'>
          <p className='text-xs text-slate-500 font-bold uppercase'>Members</p>
          <p className='text-2xl font-extrabold text-barca-blue'>{totalPaid}</p>
        </div>

        {/* Pending Count */}
        <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-100'>
          <p className='text-xs text-slate-500 font-bold uppercase'>Pending</p>
          <p className='text-2xl font-extrabold text-orange-500'>
            {totalPending}
          </p>
        </div>

        {/* Scarf Stats */}
        <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-100'>
          <p className='text-xs text-slate-500 font-bold uppercase'>
            Scarves Out
          </p>
          <p className='text-2xl font-extrabold text-purple-600'>
            {scarfsGiven}
          </p>
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
            {/* Title & Count */}
            <h3 className='font-bold text-lg text-slate-900'>
              Member List{" "}
              <span className='text-slate-400 text-sm font-normal ml-2'>
                ({filteredMembers.length} visible)
              </span>
            </h3>

            <div className='flex flex-col md:flex-row gap-4 items-center'>
              {/* CHECKBOX: PENDING ONLY */}
              <label className='flex items-center gap-2 cursor-pointer select-none rounded-lg border border-slate-200 bg-white px-3 py-2 hover:border-slate-300 transition'>
                <input
                  type='checkbox'
                  checked={showPendingOnly}
                  onChange={(e) => setShowPendingOnly(e.target.checked)}
                  className='h-4 w-4 rounded border-slate-300 text-barca-blue focus:ring-barca-blue'
                />
                <span className='text-sm font-bold text-slate-700'>
                  Show Unpaid Only
                </span>
              </label>

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
                <th className='p-4 font-bold uppercase text-xs'>Status</th>
                <th className='p-4 font-bold uppercase text-xs text-center'>
                  Merch Items
                </th>
                <th className='p-4 font-bold uppercase text-xs text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {filteredMembers.map((member) => {
                const isPaid = member.status === "ACTIVE";
                return (
                  <tr key={member.id} className='hover:bg-slate-50 transition'>
                    <td className='p-4 font-bold text-slate-900'>
                      {member.full_name}
                    </td>
                    <td className='p-4 text-slate-600 font-medium'>
                      {member.email}
                    </td>

                    {/* STATUS BADGE */}
                    <td className='p-4'>
                      {isPaid ? (
                        <span className='inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700'>
                          Active
                        </span>
                      ) : (
                        <span className='inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700'>
                          Pending
                        </span>
                      )}
                    </td>

                    {/* MERCH TOGGLES (SCARF & PIN) */}
                    <td className='p-4 text-center'>
                      <div className='flex items-center justify-center gap-2'>
                        {/* 1. SCARF TOGGLE */}
                        <button
                          disabled={!isPaid}
                          onClick={() =>
                            toggleMerchItem(
                              member.id,
                              "has_scarf",
                              member.has_scarf
                            )
                          }
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition
                            ${
                              !isPaid
                                ? "opacity-30 grayscale cursor-not-allowed border-slate-200"
                                : member.has_scarf
                                ? "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                                : "bg-white text-slate-400 border-slate-200 hover:border-purple-300 hover:text-purple-600"
                            }`}
                          title='Toggle Scarf Status'
                        >
                          <span className='text-base'>🧣</span>
                          {member.has_scarf ? "Yes" : "Scarf"}
                        </button>

                        {/* 2. PIN TOGGLE */}
                        <button
                          disabled={!isPaid}
                          onClick={() =>
                            toggleMerchItem(
                              member.id,
                              "has_pin",
                              member.has_pin
                            )
                          }
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition
                            ${
                              !isPaid
                                ? "opacity-30 grayscale cursor-not-allowed border-slate-200"
                                : member.has_pin
                                ? "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200"
                                : "bg-white text-slate-400 border-slate-200 hover:border-teal-300 hover:text-teal-600"
                            }`}
                          title='Toggle Pin Status'
                        >
                          <span className='text-base'>📍</span>
                          {member.has_pin ? "Yes" : "Pin"}
                        </button>
                      </div>
                    </td>

                    <td className='p-4 text-right'>
                      {!isPaid && (
                        <button
                          onClick={() => markAsPaid(member.id)}
                          disabled={loadingId === member.id}
                          className='rounded-lg bg-barca-blue px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-900 shadow-sm'
                        >
                          {loadingId === member.id ? "..." : "Mark Paid"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {/* EMPTY STATE */}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className='p-12 text-center text-slate-500'>
                    No members found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
