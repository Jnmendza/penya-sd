"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/utils/navigation"; // Verify this path points to your navigation.ts
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale(); // e.g. 'en', 'es', or 'ca'
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // This magic line swaps the locale in the URL
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className='flex items-center gap-1 border border-white/20 rounded-lg px-2 py-1 hover:bg-white/10 transition'>
      <Globe className='h-4 w-4 text-white/80' />
      <select
        value={locale}
        onChange={handleChange}
        className='bg-transparent text-xs font-bold uppercase text-white outline-none cursor-pointer appearance-none pl-1'
      >
        <option value='en' className='text-slate-900'>
          EN
        </option>
        <option value='es' className='text-slate-900'>
          ES
        </option>
        <option value='ca' className='text-slate-900'>
          CA
        </option>
      </select>
    </div>
  );
}
