"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

export default function CardStack({ items }: { items: GalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className='relative h-[450px] w-full flex items-center justify-center'>
      <div className='relative h-[400px] w-full max-w-md'>
        <AnimatePresence>
          {items.map((item, index) => {
            // Only render the current one and the next 2 for performance
            const diff = (index - currentIndex + items.length) % items.length;
            if (diff > 2) return null;

            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: diff === 0 ? 1 : 1 - diff * 0.05, // Top card is largest
                  rotate: diff === 0 ? 0 : diff % 2 === 0 ? 3 : -3, // Random tilt
                  zIndex: 100 - diff, // Top card is highest z-index
                  y: diff * 15, // Offset down slightly
                  opacity: 1,
                }}
                exit={{ x: 200, opacity: 0, rotate: 20 }} // Fly out to right
                transition={{ duration: 0.4 }}
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % items.length)
                }
                className='absolute inset-0 rounded-3xl border-4 border-white bg-white shadow-2xl cursor-pointer overflow-hidden'
              >
                <div className='relative h-4/5 w-full'>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex h-1/5 items-center justify-center bg-white px-4'>
                  <p className='text-center font-handwriting text-slate-800 text-sm font-bold'>
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
