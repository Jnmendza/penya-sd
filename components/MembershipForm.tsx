"use client";

import { useState } from "react";
import Link from "next/link"; // External links can use standard Link
import { createClient } from "@/utils/supabase/client";
import { FacebookIcon, InstagramIcon, XIcon } from "./Icons";
import { useTranslations } from "next-intl";

interface Props {
  isEnrollmentOpen: boolean;
  currentSeason: string;
}

export default function MembershipForm({
  isEnrollmentOpen,
  currentSeason,
}: Props) {
  const t = useTranslations("MembershipPage");
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const supabase = createClient();

  // Helper to format season string (e.g. "2024/2025" -> "24/25")
  const shortSeason = `${currentSeason.split("/")[0].slice(-2)}/${
    currentSeason.split("/")[1]?.slice(-2) || "26"
  }`;

  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_123456";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      shirt_size: "N/A",
      status: "PENDING_PAYMENT",
      season: currentSeason,
    };

    const { error } = await supabase.from("members").insert([formValues]);

    if (error) {
      console.error("Error creating member:", error);
      alert(t("Form.error_alert")); // Translated Alert
      setIsLoading(false);
      return;
    }

    const stripeUrl = new URL(STRIPE_PAYMENT_LINK);
    stripeUrl.searchParams.set("prefilled_email", formValues.email);
    window.location.href = stripeUrl.toString();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    let formatted = input;
    if (input.length > 0) formatted = `(${input.substring(0, 3)}`;
    if (input.length >= 4) formatted += `) ${input.substring(3, 6)}`;
    if (input.length >= 7) formatted += `-${input.substring(6, 10)}`;
    setPhone(formatted);
  };

  return (
    <div className='container mx-auto px-4'>
      {/* HEADER IS ALWAYS VISIBLE */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-extrabold text-slate-900 mb-4'>
          {t("Header.title")}
        </h1>
        <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
          {t("Header.subtitle", { season: currentSeason })}
        </p>
      </div>

      {isEnrollmentOpen ? (
        /* ================= ACTIVE ENROLLMENT VIEW ================= */
        <div className='max-w-5xl mx-auto grid gap-12 lg:grid-cols-2'>
          {/* BENEFITS LIST */}
          <div className='space-y-8'>
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-slate-100'>
              <h3 className='text-lg font-bold text-slate-900 mb-4'>
                {t("Benefits.title")}
              </h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-4'>
                  <div className='h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-2xl'>
                    🧣
                  </div>
                  <div>
                    <h4 className='font-bold text-slate-900'>
                      {t("Benefits.scarf_title", { year: shortSeason })}
                    </h4>
                    <p className='text-sm text-slate-500'>
                      {t("Benefits.scarf_desc")}
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-4'>
                  <div className='h-10 w-10 shrink-0 rounded-full bg-yellow-100 flex items-center justify-center text-2xl'>
                    📛
                  </div>
                  <div>
                    <h4 className='font-bold text-slate-900'>
                      {t("Benefits.pin_title")}
                    </h4>
                    <p className='text-sm text-slate-500'>
                      {t("Benefits.pin_desc")}
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-4'>
                  <div className='h-10 w-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-2xl'>
                    🎟️
                  </div>
                  <div>
                    <h4 className='font-bold text-slate-900'>
                      {t("Benefits.priority_title")}
                    </h4>
                    <p className='text-sm text-slate-500'>
                      {t("Benefits.priority_desc")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* SIGNUP FORM */}
          <div className='bg-white p-8 rounded-3xl shadow-xl border border-slate-200'>
            <h2 className='text-2xl font-bold text-slate-900 mb-6'>
              {t("Form.title")}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  {t("Form.name_label")}
                </label>
                <input
                  name='fullName'
                  type='text'
                  required
                  placeholder={t("Form.name_placeholder")}
                  className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 text-slate-900'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  {t("Form.email_label")}
                </label>
                <input
                  name='email'
                  type='email'
                  required
                  placeholder={t("Form.email_placeholder")}
                  className='w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 text-slate-900'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
                  {t("Form.phone_label")}
                </label>
                <input
                  name='phone'
                  type='tel'
                  placeholder={t("Form.phone_placeholder")}
                  maxLength={14}
                  value={phone}
                  onChange={handlePhoneChange}
                  className='w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue'
                />
              </div>

              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full rounded-xl bg-barca-gold py-4 text-xl font-bold text-barca-blue hover:bg-yellow-400 hover:scale-[1.02] transition shadow-lg disabled:opacity-50'
                >
                  {isLoading ? t("Form.processing") : t("Form.submit_btn")}
                </button>
                <p className='mt-4 text-center text-xs text-slate-400'>
                  {t("Form.stripe_note")}
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
            {t("Closed.title")}
          </h2>
          <p className='text-lg text-slate-600 mb-8'>
            {t("Closed.description")}
          </p>
          <div className='p-6 bg-blue-50 rounded-xl'>
            <p className='text-barca-blue font-medium'>
              {t.rich("Closed.social_text", {
                br: (<br key='br' />) as unknown as string,
                bold: (chunks) => <span className='font-bold'>{chunks}</span>,
              })}
            </p>
            <div className='flex justify-center gap-4 mt-4'>
              <Link
                href='https://www.instagram.com/penyasandiego_'
                className='h-10 w-10 flex items-center justify-center rounded-full bg-barca-blue/80 hover:bg-barca-blue/100 transition'
              >
                <InstagramIcon className='h-5 w-5' />
              </Link>
              <Link
                href='https://x.com/penya_san'
                className='h-10 w-10 flex items-center justify-center rounded-full bg-barca-blue/80 hover:bg-barca-blue/100 transition'
              >
                <XIcon className='h-5 w-5' />
              </Link>
              <Link
                href='https://www.facebook.com/PenyaSanDiego'
                className='h-10 w-10 flex items-center justify-center rounded-full bg-barca-blue/80 hover:bg-barca-blue/100 transition'
              >
                <FacebookIcon className='h-5 w-5' />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
