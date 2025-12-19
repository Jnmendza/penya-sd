"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Member {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  status: string; // 'PENDING_PAYMENT' | 'ACTIVE'
  merch_collected: boolean;
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

  // --- SEARCH & FILTER STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const supabase = createClient();

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // --- FILTER LOGIC ---
  const filteredMembers = members.filter((member) => {
    // 1. If a letter is selected, filter strictly by First Letter of Name
    if (selectedLetter) {
      return member.full_name.toUpperCase().startsWith(selectedLetter);
    }
    // 2. Otherwise, use the search term (Name OR Email)
    const term = searchTerm.toLowerCase();
    return (
      member.full_name.toLowerCase().includes(term) ||
      member.email.toLowerCase().includes(term)
    );
  });

  // --- HANDLERS ---
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) setSelectedLetter(null); // Clear letter if user types
  };

  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null); // Toggle off if clicked again
    } else {
      setSelectedLetter(letter);
      setSearchTerm(""); // Clear search bar if user clicks letter
    }
  };

  // --- SERVER ACTIONS ---
  const toggleEnrollment = async () => {
    const newState = !isEnrollmentOpen;
    setIsEnrollmentOpen(newState);
    const { error } = await supabase
      .from("app_config")
      .upsert({ key: "membership_open", value: newState });
    if (error) {
      alert("Failed to update config");
      setIsEnrollmentOpen(!newState);
    }
  };

  const markAsPaid = async (id: string) => {
    if (!confirm("Confirm this member has paid $25?")) return;
    setLoadingId(id);
    const { error } = await supabase
      .from("members")
      .update({ status: "ACTIVE" })
      .eq("id", id);
    if (error) alert("Error updating member");
    else
      setMembers(
        members.map((m) => (m.id === id ? { ...m, status: "ACTIVE" } : m))
      );
    setLoadingId(null);
  };

  const updateMerchStatus = async (id: string, newStatus: boolean) => {
    const oldMembers = [...members];
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, merch_collected: newStatus } : m
      )
    );
    const { error } = await supabase
      .from("members")
      .update({ merch_collected: newStatus })
      .eq("id", id);
    if (error) {
      alert("Error updating merch status");
      setMembers(oldMembers);
    }
  };

  // Stats
  const totalPaid = members.filter((m) => m.status === "ACTIVE").length;
  const totalPending = members.filter(
    (m) => m.status === "PENDING_PAYMENT"
  ).length;
  const totalMerchGiven = members.filter((m) => m.merch_collected).length;

  return (
    <div className='space-y-8'>
      {/* 1. CONTROL PANEL */}
      <div className='grid gap-6 md:grid-cols-4'>
        {/* Toggle Card */}
        <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-100 flex items-center justify-between'>
          <div>
            <h3 className='font-bold text-slate-900'>Enrollment</h3>
            <p className='text-xs text-slate-500'>Public Signups</p>
          </div>
          <button
            onClick={toggleEnrollment}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
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
        <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-100'>
          <h3 className='font-bold text-slate-900'>Active Members</h3>
          <p className='text-3xl font-extrabold text-barca-blue'>{totalPaid}</p>
        </div>
        <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-100'>
          <h3 className='font-bold text-slate-900'>Pending</h3>
          <p className='text-3xl font-extrabold text-orange-500'>
            {totalPending}
          </p>
        </div>
        <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-100'>
          <h3 className='font-bold text-slate-900'>Merch Given</h3>
          <p className='text-3xl font-extrabold text-purple-600'>
            {totalMerchGiven}
          </p>
        </div>
      </div>

      {/* 2. MEMBER TABLE SECTION */}
      <div className='rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden'>
        {/* HEADER & FILTERS */}
        <div className='p-6 border-b border-slate-100 bg-slate-50/50 space-y-4'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <h3 className='font-bold text-lg text-slate-900'>
              Member List{" "}
              <span className='text-slate-400 text-sm font-normal ml-2'>
                ({filteredMembers.length} visible)
              </span>
            </h3>

            {/* SEARCH INPUT */}
            <div className='relative w-full md:w-72'>
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
                placeholder='Search name or email...'
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className='w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue text-slate-900'
              />
            </div>
          </div>

          {/* A-Z FILTER BAR */}
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
                onClick={() => handleLetterClick(letter)}
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
                <th className='p-4 font-bold uppercase text-xs'>
                  Merch Status
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
                    <td className='p-4'>
                      <div className='relative'>
                        <select
                          disabled={!isPaid}
                          value={member.merch_collected ? "true" : "false"}
                          onChange={(e) =>
                            updateMerchStatus(
                              member.id,
                              e.target.value === "true"
                            )
                          }
                          className={`appearance-none w-full rounded-lg border px-3 py-1.5 text-xs font-bold outline-none transition
                            ${
                              !isPaid
                                ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                                : member.merch_collected
                                ? "cursor-pointer border-purple-200 bg-purple-100 text-purple-700"
                                : "cursor-pointer border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                            }`}
                        >
                          <option value='false'>
                            {!isPaid ? "Payment Required" : "❌ Not Picked Up"}
                          </option>
                          <option value='true'>✅ Collected</option>
                        </select>
                        {isPaid && (
                          <div className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-50'>
                            ▼
                          </div>
                        )}
                      </div>
                    </td>
                    <td className='p-4 text-right'>
                      {!isPaid && (
                        <button
                          onClick={() => markAsPaid(member.id)}
                          disabled={loadingId === member.id}
                          className='rounded-lg bg-barca-blue px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-900 disabled:opacity-50 transition shadow-sm'
                        >
                          {loadingId === member.id ? "..." : "Mark Paid"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className='p-12 text-center text-slate-500'>
                    {selectedLetter
                      ? `No members starting with "${selectedLetter}"`
                      : `No matches for "${searchTerm}"`}
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
