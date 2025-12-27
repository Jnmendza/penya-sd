"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  ChevronDown,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { InstagramIcon, XIcon, FacebookIcon } from "@/components/Icons";

export default function ContactPage() {
  // 1. STATE MANAGEMENT
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 2. INPUT HANDLER
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 3. VALIDATION LOGIC
  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 4. SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // TODO: Wire this up to Supabase or an API endpoint later
    // For now, we simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form Submitted:", formData);
    setIsSuccess(true);
    setIsSubmitting(false);

    // Reset form
    setFormData({ name: "", email: "", topic: "General Inquiry", message: "" });
  };

  return (
    <main className='min-h-screen bg-slate-50'>
      {/* 1. HERO SECTION */}
      <section className='relative w-full overflow-hidden bg-slate-900 py-20 md:py-28'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-blue-900 opacity-90' />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <span className='mb-6 inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/20 backdrop-blur-sm'>
            Club Offices
          </span>
          <h1 className='mb-6 text-5xl font-black uppercase tracking-wide text-white sm:text-7xl drop-shadow-lg'>
            Get in <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-red-600'>
              Touch
            </span>
          </h1>
          <p className='mx-auto max-w-2xl text-lg font-medium text-slate-300 md:text-xl'>
            Have questions about membership, events, or partnerships? We are
            here to help.
          </p>
        </div>
      </section>

      {/* 2. MEET THE BOARD */}
      <section className='py-16 md:py-24 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-black uppercase text-slate-900 md:text-4xl'>
              Meet The Board
            </h2>
            <p className='mt-4 text-slate-600 max-w-2xl mx-auto'>
              Penya Blaugrana San Diego is a non-profit run entirely by
              volunteers dedicated to growing the Barça family in Southern
              California.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-3 max-w-5xl mx-auto'>
            {/* BOARD MEMBER 1 */}
            <div className='group text-center'>
              <div className='relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg transition duration-500 group-hover:border-barca-blue group-hover:scale-105'>
                <Image
                  src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/president.jpeg?q=80&w=400&auto=format&fit=crop'
                  alt='President'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-xl font-bold text-slate-900'>
                Ruben Aguilera
              </h3>
              <p className='text-sm font-bold uppercase tracking-wider text-barca-red'>
                President
              </p>
              <p className='mt-2 text-sm text-slate-500'>
                Leading the vision and official Penya relations.
              </p>
            </div>
            {/* BOARD MEMBER 2 */}
            <div className='group text-center'>
              <div className='relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg transition duration-500 group-hover:border-barca-blue group-hover:scale-105'>
                <Image
                  src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/vp.jpeg?q=80&w=400&auto=format&fit=crop'
                  alt='Vice President'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-xl font-bold text-slate-900'>Carlos Acuña</h3>
              <p className='text-sm font-bold uppercase tracking-wider text-barca-blue'>
                Vice President
              </p>
              <p className='mt-2 text-sm text-slate-500'>
                Overseeing matchday operations and events.
              </p>
            </div>
            {/* BOARD MEMBER 3 */}
            <div className='group text-center'>
              <div className='relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg transition duration-500 group-hover:border-barca-blue group-hover:scale-105'>
                <Image
                  src='https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/sec.jpeg?q=80&w=400&auto=format&fit=crop'
                  alt='Treasurer'
                  fill
                  className='object-cover'
                />
              </div>
              <h3 className='text-xl font-bold text-slate-900'>Daniel Lopez</h3>
              <p className='text-sm font-bold uppercase tracking-wider text-yellow-500'>
                Treasurer
              </p>
              <p className='mt-2 text-sm text-slate-500'>
                Managing memberships and non-profit compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & INFO SPLIT */}
      <section className='bg-slate-50 py-16 md:py-24 border-t border-slate-200'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:flex'>
            {/* LEFT: INFO PANEL */}
            <div className='bg-slate-900 p-10 text-white lg:w-2/5'>
              <h3 className='mb-6 text-2xl font-black uppercase'>
                Contact Info
              </h3>
              <p className='mb-8 text-slate-300'>
                Direct inquiries regarding membership, sponsorship, or press.
              </p>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <Mail className='h-6 w-6 text-yellow-400 shrink-0' />
                  <div>
                    <p className='font-bold'>Email</p>
                    <a
                      href='mailto:info@penyasd.com'
                      className='text-slate-300 hover:text-white transition'
                    >
                      info@penyasd.com
                    </a>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <MapPin className='h-6 w-6 text-yellow-400 shrink-0' />
                  <div>
                    <p className='font-bold'>Mailing Address</p>
                    <p className='text-slate-300'>
                      Penya Blaugrana San Diego
                      <br />
                      PO Box 12345
                      <br />
                      San Diego, CA 92101
                    </p>
                  </div>
                </div>
                <div className='pt-8 mt-8 border-t border-slate-800'>
                  <p className='font-bold mb-4'>Follow Us</p>
                  <div className='flex gap-4'>
                    <a
                      href='https://www.instagram.com/penyasandiego_'
                      className='h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-barca-blue transition'
                    >
                      <InstagramIcon className='h-5 w-5' />
                    </a>
                    <a
                      href='https://x.com/penya_san'
                      className='h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-barca-blue transition'
                    >
                      <XIcon className='h-5 w-5' />
                    </a>
                    <a
                      href='https://www.facebook.com/PenyaSanDiego'
                      className='h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-barca-blue transition'
                    >
                      <FacebookIcon className='h-5 w-5' />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: THE FORM */}
            <div className='p-10 lg:w-3/5'>
              {isSuccess ? (
                <div className='h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500'>
                  <div className='h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4'>
                    <CheckCircle className='h-8 w-8' />
                  </div>
                  <h3 className='text-2xl font-bold text-slate-900'>
                    Message Sent!
                  </h3>
                  <p className='text-slate-600 mt-2 max-w-sm'>
                    Thank you for reaching out. A board member will get back to
                    you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className='mt-6 text-barca-blue font-bold hover:underline'
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid gap-6 md:grid-cols-2'>
                    {/* NAME */}
                    <div className='text-slate-900'>
                      <label className='mb-2 block text-sm font-bold'>
                        Name
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-slate-50 p-3 outline-none focus:ring-1 transition ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-barca-blue focus:ring-barca-blue"
                        }`}
                        placeholder='Leo Messi'
                      />
                      {errors.name && (
                        <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                          <AlertCircle className='h-3 w-3' /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className='text-slate-900'>
                      <label className='mb-2 block text-sm font-bold'>
                        Email
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-slate-50 p-3 outline-none focus:ring-1 transition ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-barca-blue focus:ring-barca-blue"
                        }`}
                        placeholder='leo@barca.com'
                      />
                      {errors.email && (
                        <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                          <AlertCircle className='h-3 w-3' /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* TOPIC */}
                  <div className='text-slate-900'>
                    <label className='mb-2 block text-sm font-bold'>
                      Topic
                    </label>
                    <div className='relative'>
                      <select
                        name='topic'
                        value={formData.topic}
                        onChange={handleChange}
                        className='w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 p-3 outline-none focus:border-barca-blue focus:ring-1 focus:ring-barca-blue '
                      >
                        <option>General Inquiry</option>
                        <option>Membership Question</option>
                        <option>Sponsorship / Partnership</option>
                        <option>Press / Media</option>
                      </select>
                      <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none' />
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div className='text-slate-900'>
                    <label className='mb-2 block text-sm font-bold '>
                      Message
                    </label>
                    <textarea
                      name='message'
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full rounded-lg border bg-slate-50 p-3 outline-none focus:ring-1 transition ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-300 focus:border-barca-blue focus:ring-barca-blue"
                      }`}
                      placeholder='How can we help?'
                    ></textarea>
                    {errors.message && (
                      <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                        <AlertCircle className='h-3 w-3' /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full rounded-lg bg-barca-blue px-8 py-4 font-bold text-white transition hover:bg-blue-900 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                  >
                    {isSubmitting ? (
                      <>
                        <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white mr-2'></div>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className='py-16 md:py-24 container mx-auto px-4 max-w-4xl'>
        <h2 className='text-center text-3xl font-black uppercase text-slate-900 mb-12'>
          Frequently Asked
        </h2>
        <div className='space-y-4'>
          <details className='group rounded-xl bg-white shadow-sm border border-slate-100 open:ring-1 open:ring-slate-200'>
            <summary className='flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900 list-none'>
              Do I need to be a member to watch games?
              <span className='transition group-open:rotate-180'>
                <ChevronDown className='h-5 w-5 text-slate-400' />
              </span>
            </summary>
            <div className='px-6 pb-6 text-slate-600 leading-relaxed'>
              No! Everyone is welcome to watch matches with us at Novo Brazil
              Brewing. Membership is optional but supports the Penya and gets
              you exclusive merch and perks.
            </div>
          </details>
          <details className='group rounded-xl bg-white shadow-sm border border-slate-100 open:ring-1 open:ring-slate-200'>
            <summary className='flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900 list-none'>
              Are kids allowed at the watch parties?
              <span className='transition group-open:rotate-180'>
                <ChevronDown className='h-5 w-5 text-slate-400' />
              </span>
            </summary>
            <div className='px-6 pb-6 text-slate-600 leading-relaxed'>
              Absolutely. Novo Brazil Otay Ranch is a family-friendly venue. We
              have many members who bring their children to enjoy the matches.
            </div>
          </details>
          <details className='group rounded-xl bg-white shadow-sm border border-slate-100 open:ring-1 open:ring-slate-200'>
            <summary className='flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900 list-none'>
              How do I pick up my membership merch?
              <span className='transition group-open:rotate-180'>
                <ChevronDown className='h-5 w-5 text-slate-400' />
              </span>
            </summary>
            <div className='px-6 pb-6 text-slate-600 leading-relaxed'>
              Merch is available for pickup at any matchday event. Just find a
              board member (look for the people checking in members), show your
              confirmation email, and we'll get you sorted!
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
