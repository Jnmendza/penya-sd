// components/MembershipForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { registerMember } from "@/app/actions/registerMember";
import { FacebookIcon, InstagramIcon, XIcon } from "./Icons";
import { useTranslations } from "next-intl";

interface Child {
  name: string;
  age: string;
}

interface Props {
  isEnrollmentOpen: boolean;
  currentSeason: string;
  venmoHandle: string;
  cashappHandle: string;
}

type PaymentMethod = "venmo" | "cashapp" | "cash" | "";

type SuccessState = {
  paymentMethod: PaymentMethod;
  message: "cap_reached" | "already_applied" | null;
};

export default function MembershipForm({
  isEnrollmentOpen,
  currentSeason,
  venmoHandle,
  cashappHandle,
}: Props) {
  const t = useTranslations("MembershipPage");

  const shortSeason = `${currentSeason.split("/")[0].slice(-2)}/${
    currentSeason.split("/")[1]?.slice(-2) || "26"
  }`;

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [isReturning, setIsReturning] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [paymentHandle, setPaymentHandle] = useState("");
  const [children, setChildren] = useState<Child[]>([]);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    let formatted = input;
    if (input.length > 0) formatted = `(${input.substring(0, 3)}`;
    if (input.length >= 4) formatted += `) ${input.substring(3, 6)}`;
    if (input.length >= 7) formatted += `-${input.substring(6, 10)}`;
    setPhone(formatted);
  };

  const addChild = () => setChildren([...children, { name: "", age: "" }]);

  const updateChild = (index: number, field: keyof Child, value: string) => {
    setChildren(children.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const removeChild = (index: number) =>
    setChildren(children.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("isReturning", String(isReturning));
    formData.set("paymentMethod", paymentMethod);
    const prefix = paymentMethod === "venmo" ? "@" : paymentMethod === "cashapp" ? "$" : "";
    const fullHandle = paymentHandle.trim() ? `${prefix}${paymentHandle.trim()}` : "";
    formData.set("paymentHandle", fullHandle);
    formData.set(
      "children",
      JSON.stringify(
        children
          .filter((c) => c.name.trim())
          .map((c) => ({ name: c.name, age: parseInt(c.age) || 0 })),
      ),
    );

    const result = await registerMember(formData);

    if (!result.success) {
      if (result.message === "cap_reached" || result.message === "already_applied") {
        setSuccess({ paymentMethod: "", message: result.message as SuccessState["message"] });
      } else {
        setError(result.message ?? t("Form.error_alert"));
      }
    } else {
      setSuccess({ paymentMethod: result.paymentMethod as PaymentMethod, message: null });
    }

    setIsLoading(false);
  };

  const paymentHandleLabel =
    paymentMethod === "venmo"
      ? t("Form.handle_label_venmo")
      : t("Form.handle_label_cashapp");

  return (
    <div className="container mx-auto px-4">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          {t("Header.title")}
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          {t("Header.subtitle", { season: currentSeason })}
        </p>
      </div>

      {!isEnrollmentOpen ? (
        /* ── CLOSED ── */
        <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
            🔒
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("Closed.title")}</h2>
          <p className="text-lg text-slate-600 mb-8">{t("Closed.description")}</p>
          <div className="p-6 bg-blue-50 rounded-xl">
            <p className="text-barca-blue font-medium">
              {t.rich("Closed.social_text", {
                br: (<br key="br" />) as unknown as string,
                bold: (chunks) => <span className="font-bold">{chunks}</span>,
              })}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="https://www.instagram.com/penyasandiego_" className="h-10 w-10 flex items-center justify-center rounded-full bg-barca-blue/80 hover:bg-barca-blue/100 transition">
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/penya_san" className="h-10 w-10 flex items-center justify-center rounded-full bg-barca-blue/80 hover:bg-barca-blue/100 transition">
                <XIcon className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/PenyaSanDiego" className="h-10 w-10 flex items-center justify-center rounded-full bg-barca-blue/80 hover:bg-barca-blue/100 transition">
                <FacebookIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      ) : success ? (
        /* ── SUCCESS / SPECIAL MESSAGE ── */
        <div className="max-w-lg mx-auto text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          {success.message === "cap_reached" ? (
            <>
              <div className="mb-4 text-5xl">😔</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{t("Success.cap_reached")}</h2>
            </>
          ) : success.message === "already_applied" ? (
            <>
              <div className="mb-4 text-5xl">📬</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{t("Success.already_applied")}</h2>
            </>
          ) : (
            <>
              <div className="mb-4 text-5xl">🎉</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{t("Success.title")}</h2>
              <p className="text-slate-600 mb-6">
                {success.paymentMethod === "venmo"
                  ? t("Success.venmo_msg", { handle: venmoHandle })
                  : success.paymentMethod === "cashapp"
                  ? t("Success.cashapp_msg", { handle: cashappHandle })
                  : t("Success.cash_msg")}
              </p>
              <p className="text-sm text-slate-400">{t("Success.email_note")}</p>
            </>
          )}
        </div>
      ) : (
        /* ── FORM ── */
        <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2">
          {/* Benefits */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{t("Benefits.title")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-2xl">🧣</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t("Benefits.scarf_title", { year: shortSeason })}</h4>
                    <p className="text-sm text-slate-500">{t("Benefits.scarf_desc")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">📛</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t("Benefits.pin_title")}</h4>
                    <p className="text-sm text-slate-500">{t("Benefits.pin_desc")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-2xl">🎟️</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t("Benefits.priority_title")}</h4>
                    <p className="text-sm text-slate-500">{t("Benefits.priority_desc")}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t("Form.title")}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t("Form.first_name_label")} *</label>
                  <input name="firstName" type="text" required placeholder={t("Form.first_name_placeholder")}
                    className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t("Form.last_name_label")} *</label>
                  <input name="lastName" type="text" required placeholder={t("Form.last_name_placeholder")}
                    className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t("Form.email_label")} *</label>
                  <input name="email" type="email" required placeholder={t("Form.email_placeholder")}
                    className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-barca-blue focus:ring-1 text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t("Form.phone_label")} <span className="text-slate-400 font-normal text-xs">({t("Form.phone_optional")})</span>
                  </label>
                  <input name="phone" type="tel" placeholder={t("Form.phone_placeholder")} maxLength={14}
                    value={phone} onChange={handlePhoneChange}
                    className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-barca-blue focus:ring-1" />
                </div>
              </div>

              {/* Returning toggle */}
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                <span className="text-sm font-semibold text-barca-blue">{t("Form.returning_label")}</span>
                <div className="flex bg-slate-200 rounded-full p-0.5 gap-0.5">
                  <button type="button" onClick={() => setIsReturning(true)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${isReturning ? "bg-barca-blue text-white" : "text-slate-500"}`}>
                    {t("Form.returning_yes")}
                  </button>
                  <button type="button" onClick={() => setIsReturning(false)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${!isReturning ? "bg-barca-blue text-white" : "text-slate-500"}`}>
                    {t("Form.returning_no")}
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">{t("Form.payment_section")} *</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["venmo", "cashapp", "cash"] as const).map((method) => {
                    const label = method === "venmo" ? t("Form.venmo_label") : method === "cashapp" ? t("Form.cashapp_label") : t("Form.cash_label");
                    const sublabel = method === "venmo" ? venmoHandle : method === "cashapp" ? cashappHandle : t("Form.cash_sublabel");
                    const emoji = method === "venmo" ? "💸" : method === "cashapp" ? "💰" : "🤝";
                    return (
                      <button key={method} type="button" onClick={() => { setPaymentMethod(method); setPaymentHandle(""); }}
                        className={`rounded-xl border-2 p-3 text-center transition ${paymentMethod === method ? "border-barca-blue bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                        <div className="text-xl mb-1">{emoji}</div>
                        <div className="text-xs font-bold text-slate-800">{label}</div>
                        <div className="text-xs text-slate-400 truncate w-full">{sublabel}</div>
                      </button>
                    );
                  })}
                </div>

                {(paymentMethod === "venmo" || paymentMethod === "cashapp") && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {paymentHandleLabel} <span className="text-slate-400 font-normal text-xs">({t("Form.handle_optional")})</span>
                    </label>
                    <div className="flex rounded-lg border border-slate-300 overflow-hidden focus-within:border-barca-blue focus-within:ring-1 focus-within:ring-barca-blue">
                      <span className="flex items-center px-3 bg-slate-50 text-slate-500 font-mono text-sm border-r border-slate-300 select-none">
                        {paymentMethod === "venmo" ? "@" : "$"}
                      </span>
                      <input
                        type="text"
                        value={paymentHandle}
                        onChange={(e) => setPaymentHandle(e.target.value.replace(/^[@$]/, ""))}
                        placeholder={paymentMethod === "venmo" ? "username" : "cashtag"}
                        className="flex-1 p-3 outline-none text-slate-900 bg-white"
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{t("Form.handle_hint")}</p>
                  </div>
                )}
              </div>

              {/* Children */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">{t("Form.children_section")}</p>
                {children.map((child, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                    <input type="text" value={child.name} onChange={(e) => updateChild(i, "name", e.target.value)}
                      placeholder={t("Form.child_name_label")}
                      className="flex-1 rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-barca-blue focus:ring-1 text-slate-900" />
                    <input type="number" value={child.age} onChange={(e) => updateChild(i, "age", e.target.value)}
                      placeholder={t("Form.child_age_label")} min={0} max={8}
                      className="w-20 rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-barca-blue focus:ring-1 text-slate-900" />
                    <button type="button" onClick={() => removeChild(i)} className="text-slate-400 hover:text-red-500 text-lg px-1">✕</button>
                  </div>
                ))}
                <button type="button" onClick={addChild}
                  className="text-sm text-barca-blue font-semibold border border-dashed border-blue-300 rounded-lg px-4 py-2 hover:bg-blue-50 transition">
                  {t("Form.add_child")}
                </button>
              </div>

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

              <button type="submit" disabled={isLoading}
                className="w-full rounded-xl bg-barca-gold py-4 text-xl font-bold text-barca-blue hover:bg-yellow-400 hover:scale-[1.02] transition shadow-lg disabled:opacity-50">
                {isLoading ? t("Form.processing") : t("Form.submit_btn")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
