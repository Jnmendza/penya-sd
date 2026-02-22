"use client";

import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Chant } from "@/data/chants";

export default function ChantCard({ chant }: { chant: Chant }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't toggle open/close
    navigator.clipboard.writeText(chant.lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`group cursor-pointer overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        isOpen
          ? "border-barca-blue shadow-lg ring-1 ring-barca-blue/20"
          : "border-slate-100 shadow-sm hover:border-slate-200"
      }`}
    >
      {/* HEADER */}
      <div className='flex items-center justify-between p-5'>
        <div className='flex items-center gap-4'>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-colors ${
              isOpen
                ? "bg-barca-blue text-white"
                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
            }`}
          >
            🎵
          </div>
          <div>
            <h3
              className={`font-bold text-lg transition-colors ${
                isOpen ? "text-barca-blue" : "text-slate-900"
              }`}
            >
              {chant.title}
            </h3>
            {/* Show first line as preview when closed */}
            {!isOpen && (
              <p className='text-sm text-slate-500 line-clamp-1'>
                {chant.lyrics.split("\n")[0]}...
              </p>
            )}
          </div>
        </div>

        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* EXPANDABLE BODY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className='px-5 pb-5 pt-0'>
              <div className='h-px w-full bg-slate-100 mb-4' />

              {/* LYRICS */}
              <div className='whitespace-pre-line text-lg leading-relaxed text-slate-700 font-medium font-sans'>
                {chant.lyrics}
              </div>

              {/* ACTIONS TOOLBAR (For future audio) */}
              <div className='mt-6 flex items-center gap-3 pt-4 border-t border-slate-100'>
                {/* Placeholder for Audio Button */}
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Audio coming soon!");
                  }}
                  className='flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 transition'
                >
                  <Music className='h-3 w-3' /> Play Audio
                </button> */}

                <button
                  onClick={handleCopy}
                  className='flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 transition ml-auto'
                >
                  {copied ? (
                    <Check className='h-3 w-3 text-green-600' />
                  ) : (
                    <Copy className='h-3 w-3' />
                  )}
                  {copied ? "Copied" : "Copy Lyrics"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
