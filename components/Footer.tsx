import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "../utils/navLinks";

export default function Footer() {
  return (
    <footer className='bg-slate-900 border-t border-slate-800 text-slate-400 py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Identity */}
          <div className='flex items-center gap-4'>
            <div className='relative h-14 w-14 shrink-0'>
              <Image
                src='https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/logo.png'
                alt='PBSD Logo'
                fill
                className='object-contain'
              />
            </div>
            <div className='flex flex-col'>
              <h3 className='text-white font-bold text-lg leading-tight'>
                Penya Blaugrana{" "}
                <span className='text-barca-gold'>San Diego</span>
              </h3>
              <p className='text-sm mt-1'>Official Supporters Group #2309</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='flex gap-4 text-sm font-medium'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='hover:text-barca-gold transition'
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials / Copyright */}
          <div className='text-center md:text-right text-sm'>
            <p>© 2026 PBSD. Visca Barça.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
