"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// 1. Define your images array here
const VALUE_IMAGES = [
  "https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/community.jpg?q=80&w=2948&auto=format&fit=crop",
  "https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/charity-walk.jpg",
];

export default function ValuesSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // 2. Set up the 5-second timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % VALUE_IMAGES.length);
    }, 5000); // 5000ms = 5 seconds

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
                  priority={index === 0} // Loads the first image instantly
                />
                {/* Optional: Dark overlay so white text pops if you ever add text over images */}
                <div className='absolute inset-0 bg-blue-900/10' />
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: CONTENT (Unchanged) */}
          <div className='p-12 flex flex-col justify-center'>
            <h3 className='text-3xl font-bold text-slate-900 mb-6'>
              Our{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600'>
                Values
              </span>
            </h3>
            <div className='space-y-6'>
              <div>
                <h4 className='font-bold text-barca-blue text-lg'>
                  Inclusivity
                </h4>
                <p className='text-slate-600'>
                  Everyone is welcome at our table. Whether you've been a Culer
                  for 20 years or 20 minutes, you are family.
                </p>
              </div>
              <div>
                <h4 className='font-bold text-barca-blue text-lg'>
                  Civic Pride
                </h4>
                <p className='text-slate-600'>
                  We love San Diego as much as we love Barcelona. We actively
                  look for ways to support our local neighborhoods.
                </p>
              </div>
              <div>
                <h4 className='font-bold text-barca-blue text-lg'>Respect</h4>
                <p className='text-slate-600'>
                  We support our team with passion, but we always treat
                  opponents and guests with dignity.
                </p>
              </div>
            </div>

            <div className='mt-8'>
              <Link
                href='/contact'
                className='inline-block rounded-xl bg-barca-blue px-8 py-3 font-bold text-white transition hover:bg-blue-900'
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
