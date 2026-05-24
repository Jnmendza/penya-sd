export const dynamic = "force-dynamic";

export const metadata = {
  title: "Penya Blaugrana San Diego",
  description:
    "Where the magic happens. Our headquarters in Otay Ranch, San Diego.",
};

import Hero from "@/components/Hero";
import NextMatch from "@/components/NextMatch";
import MembershipCTA from "@/components/MembershipCTA";
import CommunityHighlights from "@/components/CommunityHighlights";
import { getGlobalConfig } from "@/utils/getGlobalConfig";
import AnnouncementModal from "@/components/AnnouncementModal";

export default async function Home() {
  // 1. Fetch Membership Status Only
  const { isMembershipOpen, isCapReached, currentSeason } = await getGlobalConfig();

  return (
    <main className='flex min-h-screen flex-col bg-slate-50'>
      <AnnouncementModal />
      <Hero />

      <div className='relative z-20 mx-auto -mt-12 md:-mt-24 w-full max-w-4xl px-4'>
        <NextMatch />
      </div>

      <div className='mt-24'>
        <MembershipCTA isOpen={isMembershipOpen && !isCapReached} seasonId={currentSeason} />
      </div>

      <CommunityHighlights />
    </main>
  );
}
