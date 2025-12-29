"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

export default function MasonryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className='columns-1 gap-4 sm:columns-2 lg:columns-3 space-y-4'>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className='break-inside-avoid relative group overflow-hidden rounded-xl bg-slate-100'
        >
          <div className='relative h-auto w-full'>
            {/* We use width/height '0' with 'sizes' for auto-height masonry images */}
            <Image
              src={item.src}
              alt={item.alt}
              width={500}
              height={500}
              className='h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110'
            />
          </div>

          {/* Hover Caption */}
          <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <p className='p-4 text-sm font-medium text-white'>{item.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
