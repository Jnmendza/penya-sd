"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Login failed: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    setLoading(false);
    if (error) {
      alert("Failed to send reset email: " + error.message);
    } else {
      setResetSent(true);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold text-slate-900'>
            {mode === "login" ? "Board Member Access" : "Reset Password"}
          </h1>
          <p className='text-slate-500 mt-2'>
            {mode === "login"
              ? "Please sign in to manage the Penya."
              : "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className='space-y-6'>
            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700'>
                Email Address
              </label>
              <input
                type='email'
                required
                placeholder='admin@penyasd.com'
                className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue text-slate-900'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className='flex items-center justify-between mb-2'>
                <label className='block text-sm font-medium text-slate-700'>
                  Password
                </label>
                <button
                  type='button'
                  onClick={() => setMode("forgot")}
                  className='text-xs text-barca-blue hover:underline'
                >
                  Forgot password?
                </button>
              </div>
              <input
                type='password'
                required
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
        ) : resetSent ? (
          <div className='text-center space-y-4'>
            <div className='text-4xl'>📬</div>
            <p className='text-slate-700 font-medium'>Check your inbox</p>
            <p className='text-sm text-slate-500'>
              We sent a password reset link to <strong>{email}</strong>. Click
              the link in that email to set a new password.
            </p>
            <button
              onClick={() => { setMode("login"); setResetSent(false); }}
              className='text-sm text-barca-blue hover:underline'
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className='space-y-6'>
            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700'>
                Email Address
              </label>
              <input
                type='email'
                required
                placeholder='admin@penyasd.com'
                className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue text-slate-900'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full rounded-xl bg-barca-blue py-4 font-bold text-white transition hover:bg-blue-900 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg'
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              type='button'
              onClick={() => setMode("login")}
              className='w-full text-sm text-slate-500 hover:text-slate-700'
            >
              Back to sign in
            </button>
          </form>
        )}

        {mode === "login" && (
          <div className='mt-6 text-center'>
            <p className='text-xs text-slate-400'>
              Authorized personnel only.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
