"use client";

import Image from "next/image";
import { board } from "@/utils/board";

export default function MeetTheBoard() {
  return (
    <section className='py-16 md:py-24 bg-white'>
      <div className='container mx-auto px-4'>
        {/* HEADER */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-black uppercase text-slate-900 md:text-4xl'>
            Meet The Board
          </h2>
          <p className='mt-4 text-slate-600 max-w-2xl mx-auto'>
            Penya Blaugrana San Diego is a non-profit run entirely by volunteers
            dedicated to growing the Barça family in Southern California.
          </p>
        </div>

        {/* NEW LAYOUT: Horizontal Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          {board.map((member, index) => {
            // Check if this is the last item in an odd-numbered list
            const isLastItem = index === board.length - 1;
            const isOddTotal = board.length % 2 !== 0;
            const isCentered = isLastItem && isOddTotal;

            return (
              <div
                key={member.id}
                className={`
                  flex items-start gap-4 rounded-2xl bg-slate-50 p-6 transition-all hover:shadow-lg border border-slate-100
                  ${
                    isCentered
                      ? "md:col-span-2 md:mx-auto md:w-full md:max-w-lg"
                      : ""
                  }
                `}
              >
                {/* AVATAR (Left Side) */}
                <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md'>
                  <Image
                    src={member.url}
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </div>

                {/* TEXT CONTENT (Right Side) */}
                <div className='flex flex-col text-left'>
                  <h3 className='text-lg font-bold text-slate-900 leading-tight'>
                    {member.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${member.textColor}`}
                  >
                    {member.position}
                  </span>
                  <p className='text-sm text-slate-500 leading-relaxed line-clamp-3 md:line-clamp-none'>
                    {member.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
