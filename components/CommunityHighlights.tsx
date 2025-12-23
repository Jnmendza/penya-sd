import Link from "next/link";

export default function CommunityHighlights() {
  const highlights = [
    {
      title: "Autism Community Support",
      description:
        "We are proud to partner with local organizations to create inclusive environments and support families in the autism community.",
      icon: "🧩", // You can replace with an SVG or FontAwesome icon later
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Breast Cancer Awareness",
      description:
        "Our biggest charity partner. Every October, we raise funds and awareness to support women fighting breast cancer in San Diego.",
      icon: "🎗️",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Giving Back to SD",
      description:
        "From holiday raffles giving away TVs to donating meals, we believe in supporting the city that supports us.",
      icon: "🎁",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <section className='bg-slate-50 py-24'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-extrabold text-slate-900 sm:text-4xl'>
            More Than Just{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600'>
              90 Minutes
            </span>
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-slate-600'>
            Penya Blaugrana San Diego is dedicated to making a positive impact
            in our local community.
          </p>
        </div>

        {/* The Grid */}
        <div className='grid gap-8 md:grid-cols-3'>
          {highlights.map((item, index) => (
            <div
              key={index}
              className='group block relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl border border-slate-100'
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${item.color} text-3xl`}
              >
                {item.icon}
              </div>

              <h3 className='mb-3 text-xl font-bold text-slate-900'>
                {item.title}
              </h3>

              <p className='text-slate-600 leading-relaxed'>
                {item.description}
              </p>

              {/* Decorative hover effect */}
              <div className='absolute bottom-0 left-0 h-1 w-0 bg-barca-blue transition-all duration-300 group-hover:w-full'></div>
            </div>
          ))}
        </div>

        {/* Optional: Call to Action for Sponsors/Charities */}
        <div className='mt-16 text-center'>
          <Link
            href='/contact'
            className='inline-flex items-center font-semibold text-barca-blue hover:text-barca-red transition'
          >
            Partner with us for a cause
            <svg
              className='ml-2 h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
