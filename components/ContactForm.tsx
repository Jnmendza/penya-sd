"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  ChevronDown,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { InstagramIcon, XIcon, FacebookIcon } from "@/components/Icons";

export default function ContactForm() {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // TODO: Wire this up to Supabase or an API endpoint later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form Submitted:", formData);
    setIsSuccess(true);
    setIsSubmitting(false);

    setFormData({ name: "", email: "", topic: "General Inquiry", message: "" });
  };

  return (
    <section className='bg-slate-50 py-16 md:py-24 border-t border-slate-200'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:flex'>
          {/* LEFT: INFO PANEL */}
          <div className='bg-slate-900 p-10 text-white lg:w-2/5'>
            <h3 className='mb-6 text-2xl font-black uppercase'>Contact Info</h3>
            <p className='mb-8 text-slate-300'>
              Direct inquiries regarding membership, sponsorship, or press.
            </p>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <Mail className='h-6 w-6 text-yellow-400 shrink-0' />
                <div>
                  <p className='font-bold'>Email</p>
                  <Link
                    href='mailto:info@penyasd.com'
                    className='text-slate-300 hover:text-white transition'
                  >
                    info@penyasd.com
                  </Link>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <MapPin className='h-6 w-6 text-yellow-400 shrink-0' />
                <div>
                  <p className='font-bold'>HQ Address</p>
                  <p className='text-slate-300'>
                    Novo Brazil Brewery
                    <br />
                    2015 Birch Rd, Suite 1017
                    <br />
                    Chula Vista, CA 91915
                  </p>
                </div>
              </div>
              <div className='pt-8 mt-8 border-t border-slate-800'>
                <p className='font-bold mb-4'>Follow Us</p>
                <div className='flex gap-4'>
                  <Link
                    href='https://www.instagram.com/penyasandiego_'
                    className='h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-barca-blue transition'
                  >
                    <InstagramIcon className='h-5 w-5' />
                  </Link>
                  <Link
                    href='https://x.com/penya_san'
                    className='h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-barca-blue transition'
                  >
                    <XIcon className='h-5 w-5' />
                  </Link>
                  <Link
                    href='https://www.facebook.com/PenyaSanDiego'
                    className='h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-barca-blue transition'
                  >
                    <FacebookIcon className='h-5 w-5' />
                  </Link>
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
                    <label className='mb-2 block text-sm font-bold'>Name</label>
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
                  <label className='mb-2 block text-sm font-bold'>Topic</label>
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
  );
}
