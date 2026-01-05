"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/utils/navigation"; // Use i18n Link
import { useTranslations } from "next-intl";

const VALUE_IMAGES = [
  "https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/community.jpg?q=80&w=2948&auto=format&fit=crop",
  "https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/charity-walk.jpg",
];

export default function ValuesSection() {
  // Use the new CommunityPage.Values namespace
  const t = useTranslations("CommunityPage.Values");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % VALUE_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
        <div className='grid md:grid-cols-2'>
          {/* LEFT SIDE: CAROUSEL */}
          <div className='relative h-64 md:h-auto bg-slate-200 overflow-hidden'>
            {VALUE_IMAGES.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt='PBSD Values'
                  fill
                  className='object-cover'
                  priority={index === 0}
                />
                <div className='absolute inset-0 bg-blue-900/10' />
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className='p-12 flex flex-col justify-center'>
            <h3 className='text-3xl font-bold text-slate-900 mb-6'>
              {t.rich("title", {
                highlight: (chunks) => (
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600'>
                    {chunks}
                  </span>
                ),
              })}
            </h3>
            <div className='space-y-6'>
              <div>
                <h4 className='font-bold text-barca-blue text-lg'>
                  {t("inclusivity_title")}
                </h4>
                <p className='text-slate-600'>{t("inclusivity_desc")}</p>
              </div>
              <div>
                <h4 className='font-bold text-barca-blue text-lg'>
                  {t("civic_title")}
                </h4>
                <p className='text-slate-600'>{t("civic_desc")}</p>
              </div>
              <div>
                <h4 className='font-bold text-barca-blue text-lg'>
                  {t("respect_title")}
                </h4>
                <p className='text-slate-600'>{t("respect_desc")}</p>
              </div>
            </div>

            <div className='mt-8'>
              <Link
                href='/contact'
                className='inline-block rounded-xl bg-barca-blue px-8 py-3 font-bold text-white transition hover:bg-blue-900'
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
