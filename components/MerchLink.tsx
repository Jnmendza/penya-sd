"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ShoppingBag,
  X,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

export default function MerchLink({
  className = "",
  mobile = false,
  isMaintenance = false,
}: {
  className?: string;
  mobile?: boolean;
  isMaintenance?: boolean;
}) {
  const t = useTranslations("MerchLink");
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("PENYAREWARDS");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* THE TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${className} cursor-pointer flex items-center gap-2 transition-colors hover:text-yellow-400`}
      >
        {t("label")}
        {!mobile && <ShoppingBag className='h-4 w-4 opacity-70' />}
      </button>

      {/* THE MODAL */}
      {isOpen && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-200'>
          <div
            className='absolute inset-0 bg-black/80 backdrop-blur-sm'
            onClick={() => setIsOpen(false)}
          />

          <div className='relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200'>
            {/* HEADER */}
            <div className='bg-slate-900 p-6 text-white flex justify-between items-start'>
              <div>
                <h3 className='text-xl font-bold flex items-center gap-2'>
                  {isMaintenance ? (
                    <AlertTriangle className='h-5 w-5 text-yellow-400' />
                  ) : (
                    <ShoppingBag className='h-5 w-5 text-yellow-400' />
                  )}
                  {isMaintenance ? t("maintenance_title") : t("store_title")}
                </h3>
                <p className='text-slate-400 text-sm mt-1'>
                  {isMaintenance
                    ? t("maintenance_subtitle")
                    : t("store_subtitle")}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='text-slate-400 cursor-pointer hover:text-white transition'
              >
                <X className='h-6 w-6' />
              </button>
            </div>

            {/* BODY - CONDITIONAL RENDERING */}
            <div className='p-6'>
              {isMaintenance ? (
                // MAINTENANCE UI
                <div className='text-center py-4'>
                  <p className='text-slate-600 mb-6'>{t("maintenance_body")}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='w-full cursor-pointer rounded-lg bg-slate-100 py-3 font-bold text-slate-700 hover:bg-slate-200 transition'
                  >
                    {t("close_btn")}
                  </button>
                </div>
              ) : (
                // STANDARD UI
                <>
                  <p className='text-slate-600 mb-4'>
                    {t.rich("store_intro", {
                      bold: (chunks) => (
                        <span className='font-bold text-slate-900'>
                          {chunks}
                        </span>
                      ),
                    })}
                  </p>

                  <div
                    onClick={handleCopy}
                    className='group cursor-pointer rounded-lg border-2 border-dashed border-barca-blue/30 bg-blue-50 p-4 text-center transition hover:border-barca-blue hover:bg-blue-100 mb-6'
                  >
                    <p className='text-xs font-bold uppercase tracking-wider text-slate-500 mb-1'>
                      {t("copy_label")}
                    </p>
                    <div className='flex items-center justify-center gap-2'>
                      <span className='text-2xl font-black text-barca-blue tracking-widest'>
                        PENYAREWARDS
                      </span>
                      {copied ? (
                        <Check className='h-5 w-5 text-green-600' />
                      ) : (
                        <Copy className='h-5 w-5 text-slate-400 group-hover:text-barca-blue transition' />
                      )}
                    </div>
                    {copied && (
                      <p className='text-xs text-green-600 font-bold mt-1 animate-pulse'>
                        {t("copied_msg")}
                      </p>
                    )}
                  </div>

                  <div className='grid gap-3'>
                    <a
                      href='https://www.wegotsoccer.com/penya'
                      target='_blank'
                      rel='noreferrer'
                      onClick={() => setIsOpen(false)}
                      className='flex cursor-pointer items-center justify-center gap-2 w-full rounded-lg bg-barca-red py-3 font-bold text-white hover:bg-red-700 transition'
                    >
                      {t("go_btn")} <ExternalLink className='h-4 w-4' />
                    </a>
                    <button
                      onClick={() => setIsOpen(false)}
                      className='w-full cursor-pointer py-2 text-sm font-semibold text-slate-500 hover:text-slate-800'
                    >
                      {t("cancel_btn")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
