"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function MembershipPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState<boolean | null>(
    null
  ); // Null = loading state
  const router = useRouter();
  const supabase = createClient();

  // TODO: Your Stripe Link
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_123456";

  // 1. CHECK ENROLLMENT STATUS ON LOAD
  useEffect(() => {
    async function checkStatus() {
      const { data, error } = await supabase
        .from("app_config")
        .select("value")
        .eq("key", "membership_open")
        .single();

      if (data) {
        setIsEnrollmentOpen(data.value);
      } else {
        // Default to false if something goes wrong for safety
        setIsEnrollmentOpen(false);
      }
    }
    checkStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      // HARDCODED: We send 'N/A' because the DB expects a value,
      // but we aren't asking the user for it this year.
      shirt_size: "N/A",
      status: "PENDING_PAYMENT",
      season: "2025/26",
    };

    const { error } = await supabase.from("members").insert([formValues]);

    if (error) {
      console.error("Error creating member:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    const stripeUrl = new URL(STRIPE_PAYMENT_LINK);
    stripeUrl.searchParams.set("prefilled_email", formValues.email);
    window.location.href = stripeUrl.toString();
  };

  // LOADING STATE
  if (isEnrollmentOpen === null) {
    return (
      <div className='min-h-screen bg-slate-50 pt-32 text-center'>
        <p className='text-slate-500 animate-pulse'>
          Checking membership status...
        </p>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-slate-50 pt-24 pb-12'>
      <div className='container mx-auto px-4'>
        {/* HEADER IS ALWAYS VISIBLE */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-extrabold text-slate-900 mb-4'>
            Join the Family
          </h1>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            Become an official member of Penya Blaugrana San Diego for the
            2025/26 season.
          </p>
        </div>

        {isEnrollmentOpen ? (
          /* ================= ACTIVE ENROLLMENT VIEW ================= */
          <div className='max-w-5xl mx-auto grid gap-12 lg:grid-cols-2'>
            {/* BENEFITS LIST */}
            <div className='space-y-8'>
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-slate-100'>
                <h3 className='text-lg font-bold text-slate-900 mb-4'>
                  What's Included:
                </h3>
                <ul className='space-y-4'>
                  <li className='flex items-start gap-4'>
                    <div className='h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-2xl'>
                      🧣
                    </div>
                    <div>
                      <h4 className='font-bold text-slate-900'>
                        Official 25/26 Scarf
                      </h4>
                      <p className='text-sm text-slate-500'>
                        High-quality knit scarf, exclusive design for members.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-4'>
                    <div className='h-10 w-10 shrink-0 rounded-full bg-yellow-100 flex items-center justify-center text-2xl'>
                      📛
                    </div>
                    <div>
                      <h4 className='font-bold text-slate-900'>
                        Commemorative Pin
                      </h4>
                      <p className='text-sm text-slate-500'>
                        Collect them every year. A badge of honor.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-4'>
                    <div className='h-10 w-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-2xl'>
                      🎟️
                    </div>
                    <div>
                      <h4 className='font-bold text-slate-900'>
                        Priority Access
                      </h4>
                      <p className='text-sm text-slate-500'>
                        Guaranteed entry for El Clásico and special events.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* SIGNUP FORM */}
            <div className='bg-white p-8 rounded-3xl shadow-xl border border-slate-200'>
              <h2 className='text-2xl font-bold text-slate-900 mb-6'>
                Member Details
              </h2>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Full Name
                  </label>
                  <input
                    name='fullName'
                    type='text'
                    required
                    placeholder='Andrés Iniesta'
                    className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Email Address
                  </label>
                  <input
                    name='email'
                    type='email'
                    required
                    placeholder='andres@example.com'
                    className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Phone (Optional)
                  </label>
                  <input
                    name='phone'
                    type='tel'
                    placeholder='(619) 555-0199'
                    className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1'
                  />
                </div>

                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full rounded-xl bg-barca-gold py-4 text-xl font-bold text-barca-blue hover:bg-yellow-400 hover:scale-[1.02] transition shadow-lg disabled:opacity-50'
                  >
                    {isLoading ? "Processing..." : "Pay $25.00"}
                  </button>
                  <p className='mt-4 text-center text-xs text-slate-400'>
                    Redirects to Stripe for secure payment.
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ================= CLOSED ENROLLMENT VIEW ================= */
          <div className='max-w-2xl mx-auto text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100'>
            <div className='mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl'>
              🔒
            </div>
            <h2 className='text-3xl font-bold text-slate-900 mb-4'>
              Enrollment is Currently Closed
            </h2>
            <p className='text-lg text-slate-600 mb-8'>
              We accept new members during the enrollment window (typically July
              - September). Check back closer to the start of the season!
            </p>
            <div className='p-6 bg-blue-50 rounded-xl'>
              <p className='text-barca-blue font-medium'>
                Want to know when it opens? <br />
                <span className='font-bold'>
                  Follow us on social media for announcements.
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
