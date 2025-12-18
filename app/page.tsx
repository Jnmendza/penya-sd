import Hero from "../components/Hero";
import NextMatch from "../components/NextMatch";
import MembershipCTA from "../components/MembershipCTA";
import CommunityHighlights from "../components/CommunityHighlights";

export default function Home() {
  // This dummy data simulates a "Big Game" at Novo Brewery
  const demoMatch = {
    opponent: "Real Madrid",
    competition: "La Liga",
    date: "Sunday, Oct 26",
    time: "12:00 PM",
    venue: "Novo Brewery • Chula Vista",
    isWatchParty: true, // Try changing this to false to see the difference!
  };

  return (
    <main className='flex min-h-screen flex-col bg-slate-50'>
      <Hero />
      <NextMatch {...demoMatch} />

      {/* Add margin to separate from the floating card */}
      <div className='mt-24'>
        <MembershipCTA />
      </div>

      {/* The new Community Section */}
      <CommunityHighlights />

      {/* Simple Footer Placeholder */}
      <footer className='bg-slate-900 py-12 text-center text-slate-400'>
        <p>© 2025 Penya Blaugrana San Diego • Official Penya #2309</p>
      </footer>
    </main>
  );
}
