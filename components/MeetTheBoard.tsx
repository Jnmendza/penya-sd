"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { boardMembers } from "@/utils/board";

export default function MeetTheBoard() {
  const t = useTranslations("MeetTheBoard");

  return (
    <section className='py-16 md:py-24 bg-white'>
      <div className='container mx-auto px-4'>
        {/* HEADER */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-black uppercase text-slate-900 md:text-4xl'>
            {t("title")}
          </h2>
          <p className='mt-4 text-slate-600 max-w-2xl mx-auto'>
            {t("subtitle")}
          </p>
        </div>

        {/* CARDS GRID */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          {boardMembers.map((member, index) => {
            const isLastItem = index === boardMembers.length - 1;
            const isOddTotal = boardMembers.length % 2 !== 0;
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
                {/* AVATAR */}
                <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md'>
                  <Image
                    src={member.url}
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className='flex flex-col text-left'>
                  <h3 className='text-lg font-bold text-slate-900 leading-tight'>
                    {member.name}
                  </h3>

                  {/* Dynamic Position Translation */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${member.textColor}`}
                  >
                    {t(`roles.${member.roleKey}_pos`)}
                  </span>

                  {/* Dynamic Description Translation */}
                  <p className='text-sm text-slate-500 leading-relaxed line-clamp-3 md:line-clamp-none'>
                    {t(`roles.${member.roleKey}_desc`)}
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
