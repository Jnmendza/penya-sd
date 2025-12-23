"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold text-slate-900'>
            Board Member Access
          </h1>
          <p className='text-slate-500 mt-2'>
            Please sign in to manage the Penya.
          </p>
        </div>

        <form onSubmit={handleLogin} className='space-y-6'>
          <div suppressHydrationWarning>
            <label className='mb-2 block text-sm font-medium text-slate-700'>
              Email Address
            </label>
            <input
              type='email'
              required
              suppressHydrationWarning
              placeholder='admin@penyasd.com'
              className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue text-slate-900'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-slate-700'>
              Password
            </label>
            <input
              type='password'
              required
              suppressHydrationWarning
              placeholder='••••••••'
              className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue text-slate-900'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-barca-blue py-4 font-bold text-white transition hover:bg-blue-900 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg'
          >
            {loading ? "Signing in..." : "Enter Dashboard"}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-xs text-slate-400'>
            Authorized personnel only. <br />
            Contact the webmaster if you lost your access.
          </p>
        </div>
      </div>
    </main>
  );
}
