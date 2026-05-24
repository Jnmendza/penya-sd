"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordClient() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      // Explicitly extract tokens from URL hash and establish session
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1)); // remove '#'
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        if (access_token && refresh_token) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (sessionError) {
            console.warn("Failed to set session from hash:", sessionError.message);
          }
        }
      }
    } catch (err) {
      console.error("Error parsing auth hash:", err);
    }

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      alert("Failed to update password: " + error.message);
    } else {
      setDone(true);
      setTimeout(() => router.push("/login"), 2500);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold text-slate-900'>Set New Password</h1>
          <p className='text-slate-500 mt-2'>Choose a strong password for your account.</p>
        </div>

        {done ? (
          <div className='text-center space-y-4'>
            <div className='text-4xl'>✅</div>
            <p className='text-slate-700 font-medium'>Password updated!</p>
            <p className='text-sm text-slate-500'>Redirecting you to sign in...</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className='space-y-6'>
            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700'>
                New Password
              </label>
              <input
                type='password'
                required
                placeholder='••••••••'
                className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue text-slate-900'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700'>
                Confirm Password
              </label>
              <input
                type='password'
                required
                placeholder='••••••••'
                className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue text-slate-900'
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full rounded-xl bg-barca-blue py-4 font-bold text-white transition hover:bg-blue-900 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg'
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
