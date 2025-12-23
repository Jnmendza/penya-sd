export const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
  </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='currentColor' /* X Logo works best as a fill, not a stroke */
    className={className}
  >
    <path d='M18.901 3h3.94l-8.603 9.84L24.392 24h-7.93l-6.214-8.125L4.05 24H.11l9.02-10.315L0 3h8.093l5.807 7.697zm-1.082 18.78h2.182L7.33 5.176H5.148z' />
  </svg>
);
