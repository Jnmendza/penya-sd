"use client";

import React, { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import PendingApplications, { Application } from "./PendingApplications";
import { updateMemberStatus } from "@/app/actions/updateMemberStatus";

export interface ChildMember {
  id: string;
  name: string;
  age: number;
}

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
  children?: ChildMember[];
}

interface Props {
  initialConfig: boolean;
  initialMembers: Member[];
}

interface UndoToast {
  id: string;
  message: string;
  onUndo: () => void;
}

export default function AdminDashboardClient({
  initialConfig,
  initialMembers,
}: Props) {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(initialConfig);
  const [members, setMembers] = useState(initialMembers);
  const [toasts, setToasts] = useState<UndoToast[]>([]);
  const pendingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // --- FILTERS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // --- ACCORDION & SORTING STATE ---
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "status-active" | "status-disabled" | "payment" | null>(null);

  const toggleExpandMember = (id: string) => {
    setExpandedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const supabase = createClient();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // --- FILTER & SORT LOGIC ---
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

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.full_name.localeCompare(b.full_name);
    }
    if (sortBy === "name-desc") {
      return b.full_name.localeCompare(a.full_name);
    }
    if (sortBy === "status-active") {
      const statusA = (a.status || "").toUpperCase();
      const statusB = (b.status || "").toUpperCase();
      if (statusA === "ACTIVE" && statusB !== "ACTIVE") return -1;
      if (statusA !== "ACTIVE" && statusB === "ACTIVE") return 1;
      return a.full_name.localeCompare(b.full_name);
    }
    if (sortBy === "status-disabled") {
      const statusA = (a.status || "").toUpperCase();
      const statusB = (b.status || "").toUpperCase();
      if (statusA === "DISABLED" && statusB !== "DISABLED") return -1;
      if (statusA !== "DISABLED" && statusB === "DISABLED") return 1;
      return a.full_name.localeCompare(b.full_name);
    }
    if (sortBy === "payment") {
      const payA = a.payment_method || "";
      const payB = b.payment_method || "";
      return payA.localeCompare(payB);
    }
    return 0;
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;
    const oldStatus = member.status;

    // Optimistically update
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );

    const result = await updateMemberStatus(id, newStatus);
    if (!result.success) {
      alert(`Failed to update status: ${result.message}`);
      // Revert
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: oldStatus } : m))
      );
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Status",
      "Type",
      "Payment Method",
      "Payment Handle",
      "Scarf Received",
      "Pin Received",
      "Children Count",
      "Children Details",
      "Registration Date"
    ];

    const rows = sortedMembers.map((member) => {
      const type = member.is_returning ? "Returning" : "New";
      const scarf = member.has_scarf ? "Yes" : "No";
      const pin = member.has_pin ? "Yes" : "No";
      
      const childrenDetails = member.children && member.children.length > 0
        ? member.children.map((c) => `${c.name} (Age ${c.age})`).join("; ")
        : "";

      return [
        member.full_name,
        member.email,
        member.phone || "",
        member.status || "ACTIVE",
        type,
        member.payment_method || "",
        member.payment_handle || "",
        scarf,
        pin,
        member.children_count || 0,
        childrenDetails,
        member.created_at ? new Date(member.created_at).toLocaleDateString() : ""
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => {
            const stringValue = String(value).replace(/"/g, '""');
            return `"${stringValue}"`;
          })
          .join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `penya_sd_members_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {/* 1. TOP STATS */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
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

              <div className='flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto'>
                {/* EXPORT BUTTON */}
                <button
                  onClick={exportToCSV}
                  className='flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition w-full sm:w-auto justify-center cursor-pointer'
                >
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                    />
                  </svg>
                  Export CSV
                </button>

                {/* SEARCH INPUT */}
                <div className='relative w-full sm:w-64'>
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

            {/* SORTING CONTROLS */}
            <div className='flex flex-wrap items-center gap-2 text-xs py-2.5 border-t border-b border-slate-100/80'>
              <span className='font-bold text-slate-400 uppercase tracking-wider mr-1'>Sort by:</span>
              <button
                onClick={() => setSortBy((prev) => (prev === "name-asc" ? "name-desc" : "name-asc"))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition flex items-center gap-1 cursor-pointer ${
                  sortBy === "name-asc" || sortBy === "name-desc"
                    ? "bg-barca-blue text-white border-barca-blue shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span>Name</span>
                {sortBy === "name-asc" && <span>▲</span>}
                {sortBy === "name-desc" && <span>▼</span>}
              </button>

              <button
                onClick={() => setSortBy((prev) => (prev === "status-active" ? "status-disabled" : "status-active"))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition flex items-center gap-1 cursor-pointer ${
                  sortBy === "status-active" || sortBy === "status-disabled"
                    ? "bg-barca-blue text-white border-barca-blue shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span>Status</span>
                {sortBy === "status-active" && <span>(Active First)</span>}
                {sortBy === "status-disabled" && <span>(Disabled First)</span>}
              </button>

              <button
                onClick={() => setSortBy((prev) => (prev === "payment" ? null : "payment"))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition flex items-center gap-1 cursor-pointer ${
                  sortBy === "payment"
                    ? "bg-barca-blue text-white border-barca-blue shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span>Payment Method</span>
              </button>

              {sortBy && (
                <button
                  onClick={() => setSortBy(null)}
                  className='px-2 py-1.5 text-red-600 hover:text-red-800 font-bold transition cursor-pointer'
                >
                  Clear Sort
                </button>
              )}
            </div>

            {/* A-Z FILTER */}
            <div className='flex gap-1 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
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
          {/* TABLE & CARD VIEW LIST */}
          <div className='hidden md:block max-h-[600px] overflow-auto border-t border-slate-100 relative'>
            <table className='w-full text-left text-sm border-collapse'>
              <thead className='sticky top-0 bg-slate-50 text-slate-700 border-b border-slate-200 shadow-[0_1px_0_0_rgba(226,232,240,1)] z-10'>
                <tr>
                  <th className='p-4 font-extrabold uppercase text-xs text-slate-700'>Name</th>
                  <th className='p-4 font-extrabold uppercase text-xs text-slate-700'>Email</th>
                  <th className='p-4 font-extrabold uppercase text-xs text-slate-700'>Status</th>
                  <th className='p-4 font-extrabold uppercase text-xs text-slate-700'>Type</th>
                  <th className='p-4 font-extrabold uppercase text-xs text-slate-700'>Payment</th>
                  <th className='p-4 font-extrabold uppercase text-xs text-slate-700'>Children</th>
                  <th className='p-4 font-extrabold uppercase text-xs text-center text-slate-700'>Merch Items</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {sortedMembers.map((member) => (
                  <React.Fragment key={member.id}>
                    <tr className='hover:bg-slate-50 transition border-b border-slate-100'>
                      <td className='p-4 font-bold text-slate-900'>
                        {member.full_name}
                      </td>
                      <td className='p-4 text-slate-600 font-medium'>
                        {member.email}
                      </td>

                      {/* STATUS CONTROL */}
                      <td className='p-4'>
                        <select
                          value={member.status || "ACTIVE"}
                          onChange={(e) => handleStatusChange(member.id, e.target.value)}
                          className={`text-xs font-black rounded-full px-2.5 py-1 border outline-none cursor-pointer transition appearance-none text-center ${
                            member.status === "ACTIVE"
                              ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200/80"
                              : member.status === "DISABLED"
                              ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200/80"
                              : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80"
                          }`}
                        >
                          <option value='ACTIVE'>Active</option>
                          <option value='DISABLED'>Disabled</option>
                          <option value='EXPIRED'>Expired</option>
                        </select>
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
                        {member.children && member.children.length > 0 ? (
                          <button
                            onClick={() => toggleExpandMember(member.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black transition cursor-pointer select-none border ${
                              expandedMembers.has(member.id)
                                ? "bg-barca-blue text-white border-barca-blue shadow-sm"
                               : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <span>👧</span>
                            <span>{member.children.length}</span>
                            <span className={`text-[9px] transition-transform duration-200 ${expandedMembers.has(member.id) ? "rotate-180" : ""}`}>
                              ▼
                            </span>
                          </button>
                        ) : (
                          <span className='text-slate-400 pl-2'>—</span>
                        )}
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

                    {/* CHILD ACCORDION DETAILS ROW */}
                    {expandedMembers.has(member.id) && member.children && member.children.length > 0 && (
                      <tr className='bg-slate-50/50 transition duration-200'>
                        <td colSpan={7} className='p-4 border-l-4 border-barca-blue bg-slate-50/40 pl-8'>
                          <div className='space-y-2 animate-in fade-in duration-200'>
                            <h4 className='text-xs font-black uppercase tracking-wider text-slate-400'>
                              Registered Children ({member.children.length})
                            </h4>
                            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl'>
                              {member.children.map((child) => (
                                <div
                                  key={child.id}
                                  className='flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm transition hover:shadow-md'
                                >
                                  <div className='flex items-center gap-2'>
                                    <span className='text-base'>🧒</span>
                                    <span className='font-bold text-slate-800 text-sm'>{child.name}</span>
                                  </div>
                                  <span className='text-xs font-black bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full'>
                                    Age: {child.age}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {sortedMembers.length === 0 && (
                  <tr>
                    <td colSpan={7} className='p-12 text-center text-slate-500'>
                      No members found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className='block md:hidden border-t border-slate-100 divide-y divide-slate-100 bg-slate-50/20 max-h-[600px] overflow-y-auto'>
            {sortedMembers.map((member) => (
              <div key={member.id} className='p-4 space-y-3 bg-white'>
                {/* Row 1: Name, Type Badge, and Accordion Trigger */}
                <div className='flex items-start justify-between gap-2'>
                  <div className='space-y-1'>
                    <h4 className='font-bold text-slate-950 text-sm leading-tight'>
                      {member.full_name}
                    </h4>
                    <div className='flex flex-wrap gap-1.5 items-center'>
                      {member.is_returning ? (
                        <span className='inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700'>
                          Returning
                        </span>
                      ) : (
                        <span className='inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700'>
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Children Accordion Trigger */}
                  {member.children && member.children.length > 0 ? (
                    <button
                      onClick={() => toggleExpandMember(member.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer select-none border shrink-0 ${
                        expandedMembers.has(member.id)
                          ? "bg-barca-blue text-white border-barca-blue shadow-sm"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                    >
                      <span>👧</span>
                      <span>{member.children.length}</span>
                      <span className={`text-[8px] transition-transform duration-200 ${expandedMembers.has(member.id) ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>
                  ) : null}
                </div>

                {/* Row 2: Contact Details */}
                <div className='grid grid-cols-2 gap-2 text-xs text-slate-500 font-medium'>
                  <div className='truncate'>
                    <span className='text-slate-400 font-bold uppercase text-[9px] tracking-wider block mb-0.5'>Email</span>
                    <a href={`mailto:${member.email}`} className='text-barca-blue hover:underline font-bold'>{member.email}</a>
                  </div>
                  {member.phone && (
                    <div>
                      <span className='text-slate-400 font-bold uppercase text-[9px] tracking-wider block mb-0.5'>Phone</span>
                      <a href={`tel:${member.phone}`} className='text-slate-700 font-bold hover:underline'>{member.phone}</a>
                    </div>
                  )}
                </div>

                {/* Row 3: Status & Payment */}
                <div className='grid grid-cols-2 gap-3 pt-1 border-t border-slate-50'>
                  {/* Status Dropdown */}
                  <div className='flex flex-col gap-1'>
                    <span className='text-slate-400 font-bold uppercase text-[9px] tracking-wider'>Status</span>
                    <div className='relative w-full'>
                      <select
                        value={member.status || "ACTIVE"}
                        onChange={(e) => handleStatusChange(member.id, e.target.value)}
                        className={`w-full text-xs font-black rounded-lg px-2.5 py-2 border outline-none cursor-pointer transition appearance-none text-left pr-6 ${
                          member.status === "ACTIVE"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : member.status === "DISABLED"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        <option value='ACTIVE'>Active</option>
                        <option value='DISABLED'>Disabled</option>
                        <option value='EXPIRED'>Expired</option>
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500'>
                        <span className='text-[8px]'>▼</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className='flex flex-col gap-1'>
                    <span className='text-slate-400 font-bold uppercase text-[9px] tracking-wider'>Payment</span>
                    <div className='text-xs font-bold text-slate-700 flex flex-col justify-center min-h-[34px]'>
                      <div>
                        {member.payment_method === "venmo" && <span>💸 Venmo</span>}
                        {member.payment_method === "zelle" && <span>🏦 Zelle</span>}
                        {member.payment_method === "cash" && <span>🤝 Cash</span>}
                        {!member.payment_method && <span className='text-slate-400 font-medium'>—</span>}
                      </div>
                      {member.payment_handle && (
                        <span className='font-mono text-[10px] text-slate-400 block truncate'>{member.payment_handle}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 4: Merch Toggles */}
                <div className='grid grid-cols-2 gap-2 pt-1 border-t border-slate-50'>
                  <button
                    onClick={() => toggleMerchItem(member.id, "has_scarf", member.has_scarf)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-black transition cursor-pointer ${
                      member.has_scarf
                        ? "bg-purple-50 text-purple-700 border-purple-200 shadow-sm"
                        : "bg-white text-slate-400 border-slate-200 hover:border-purple-300 hover:text-purple-600"
                    }`}
                  >
                    <span className='text-base'>🧣</span>
                    {member.has_scarf ? "Scarf Given" : "Give Scarf"}
                  </button>

                  <button
                    onClick={() => toggleMerchItem(member.id, "has_pin", member.has_pin)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-black transition cursor-pointer ${
                      member.has_pin
                        ? "bg-teal-50 text-teal-700 border-teal-200 shadow-sm"
                        : "bg-white text-slate-400 border-slate-200 hover:border-teal-300 hover:text-teal-600"
                    }`}
                  >
                    <span className='text-base'>📍</span>
                    {member.has_pin ? "Pin Given" : "Give Pin"}
                  </button>
                </div>

                {/* Row 5: Expanded Accordion */}
                {expandedMembers.has(member.id) && member.children && member.children.length > 0 && (
                  <div className='p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 mt-2 animate-in fade-in duration-200'>
                    <h5 className='text-[10px] font-black uppercase tracking-wider text-slate-400'>
                      Registered Children ({member.children.length})
                    </h5>
                    <div className='space-y-2'>
                      {member.children.map((child) => (
                        <div
                          key={child.id}
                          className='flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-sm'
                        >
                          <div className='flex items-center gap-2'>
                            <span className='text-xs'>🧒</span>
                            <span className='font-bold text-slate-800 text-xs'>{child.name}</span>
                          </div>
                          <span className='text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full'>
                            Age: {child.age}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {sortedMembers.length === 0 && (
              <div className='p-12 text-center text-slate-500 bg-white text-sm'>
                No members found matching your filters.
              </div>
            )}
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
