import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-slate-900 border-t border-slate-800 text-slate-400 py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Identity */}
          <div className='text-center md:text-left'>
            <h3 className='text-white font-bold text-lg'>
              Penya Blaugrana San Diego
            </h3>
            <p className='text-sm mt-1'>Official Supporters Group #2309</p>
          </div>

          {/* Quick Links */}
          <div className='flex gap-6 text-sm font-medium'>
            <Link href='/' className='hover:text-barca-gold transition'>
              Home
            </Link>
            <Link href='/location' className='hover:text-barca-gold transition'>
              Location
            </Link>
            <Link
              href='/community'
              className='hover:text-barca-gold transition'
            >
              Community
            </Link>
            <Link href='/contact' className='hover:text-barca-gold transition'>
              Contact
            </Link>
          </div>

          {/* Socials / Copyright */}
          <div className='text-center md:text-right text-sm'>
            <p>© 2025 PBSD. Visca Barça.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
