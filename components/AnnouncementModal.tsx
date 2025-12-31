"use client";

import { useState, useEffect } from "react";
import { X, Megaphone } from "lucide-react"; // Or use a Gift icon for holidays
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    active: "false",
    title: "",
    message: "",
    image: "",
    id: "1.0",
  });

  const supabase = createClient();

  useEffect(() => {
    async function checkAnnouncement() {
      // 1. Fetch all announcement settings at once
      const { data } = await supabase
        .from("app_config")
        .select("*")
        .in("key", [
          "announcement_active",
          "announcement_title",
          "announcement_message",
          "announcement_image",
          "announcement_id",
        ]);

      if (!data) return;

      // Convert array of rows to a simple object
      const settings = data.reduce((acc, row) => {
        acc[row.key] = row.value;
        return acc;
      }, {} as any);

      // 2. Logic: Should we show it?
      if (settings.announcement_active === "true") {
        // Check LocalStorage to see if user already closed THIS specific announcement
        const seenId = localStorage.getItem("pbsd_announcement_seen");

        if (seenId !== settings.announcement_id) {
          setConfig({
            active: settings.announcement_active,
            title: settings.announcement_title,
            message: settings.announcement_message,
            image: settings.announcement_image,
            id: settings.announcement_id,
          });
          // Delay slightly for smooth entrance
          setTimeout(() => setIsOpen(true), 1000);
        }
      }
    }

    checkAnnouncement();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen so it doesn't pop up again until you change the ID in DB
    localStorage.setItem("pbsd_announcement_seen", config.id);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-300'>
      {/* Dark Backdrop */}
      <div
        className='absolute inset-0 bg-black/70 backdrop-blur-sm'
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className='relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300'>
        {/* Optional: Header Image */}
        {config.image && (
          <div className='relative h-48 w-full bg-slate-100'>
            <Image
              src={config.image}
              alt='Announcement'
              fill
              className='object-cover'
            />
          </div>
        )}

        <div className='p-8 text-center'>
          {/* Icon (only if no image) */}
          {!config.image && (
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-barca-blue'>
              <Megaphone className='h-8 w-8' />
              {/* Note: You can swap this icon based on the title if you want to get fancy! */}
            </div>
          )}

          <h2 className='mb-3 text-2xl font-black uppercase tracking-tight text-slate-900'>
            {config.title}
          </h2>

          <p className='mb-8 text-lg text-slate-600 leading-relaxed'>
            {config.message}
          </p>

          <button
            onClick={handleClose}
            className='w-full cursor-pointer rounded-full bg-barca-blue px-8 py-4 text-lg font-bold text-white transition hover:bg-blue-900 shadow-xl shadow-blue-900/20'
          >
            Got it
          </button>
        </div>

        {/* Close 'X' Button */}
        <button
          onClick={handleClose}
          className='absolute cursor-pointer top-4 right-4 p-2 rounded-full bg-white/20 text-slate-500 hover:text-slate-900 hover:bg-white/50 transition backdrop-blur-md'
        >
          <X className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
}
