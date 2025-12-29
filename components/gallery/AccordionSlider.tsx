"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";
import type { GalleryItem } from "@/data/gallery";

export default function AccordionSlider({ items }: { items: GalleryItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null);

  return (
    <>
      {/* --- MOBILE VIEW: Horizontal Scroll Carousel --- 
          Visible only on small screens (< md) 
      */}
      <div className='flex w-full gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-6 md:hidden scrollbar-hide'>
        {items.map((item) => (
          <div
            key={item.id}
            className='relative h-[500px] min-w-[85vw] flex-none snap-center overflow-hidden rounded-2xl'
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className='object-cover'
            />
            {/* Always visible overlay on mobile */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />

            <div className='absolute bottom-0 left-0 p-6 text-white'>
              <h3 className='text-xl font-bold uppercase tracking-wider text-yellow-400'>
                VIP Access
              </h3>
              <p className='mt-2 text-sm font-medium leading-relaxed'>
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW: The Hover Accordion --- 
          Visible only on medium screens and up (>= md) 
      */}
      <div className='hidden h-[500px] w-full gap-2 overflow-hidden md:flex'>
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              onClick={() => setActiveId(item.id)}
              onHoverStart={() => setActiveId(item.id)}
              className={clsx(
                "relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out",
                isActive ? "flex-[3]" : "flex-[1] grayscale hover:grayscale-0"
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className='object-cover'
              />

              <div
                className={clsx(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              />

              <div
                className={clsx(
                  "absolute bottom-0 left-0 p-6 text-white transition-opacity duration-300",
                  isActive ? "opacity-100 delay-200" : "opacity-0"
                )}
              >
                <h3 className='text-xl font-bold uppercase tracking-wider text-yellow-400'>
                  VIP Access
                </h3>
                <p className='mt-2 text-base font-medium leading-relaxed'>
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
