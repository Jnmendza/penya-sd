export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import NextMatch from "@/components/NextMatch";
import MembershipCTA from "@/components/MembershipCTA";
import CommunityHighlights from "@/components/CommunityHighlights";
import { getGlobalConfig } from "@/utils/getGlobalConfig";

export default async function Home() {
  // 1. Fetch Membership Status Only
  const { isMembershipOpen, currentSeason } = await getGlobalConfig();

  return (
    <main className='flex min-h-screen flex-col bg-slate-50'>
      <Hero />

      {/* 2. THE FIX: Just render the component. 
          It fetches its own data from the 'matches' table 
          and handles its own 'No Match' fallback state. */}
      <div className='relative z-20 mx-auto -mt-24 w-full max-w-4xl px-4'>
        <NextMatch />
      </div>

      <div className='mt-24'>
        <MembershipCTA isOpen={isMembershipOpen} seasonId={currentSeason} />
      </div>

      <CommunityHighlights />
    </main>
  );
}
