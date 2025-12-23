export const dynamic = "force-dynamic";

import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Hero";
import NextMatch from "@/components/NextMatch"; // No longer need MatchProps type
import MembershipCTA from "@/components/MembershipCTA";
import CommunityHighlights from "@/components/CommunityHighlights";

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch Membership Status Only
  // We removed the match fetching logic because NextMatch handles it internally now
  const { data: config } = await supabase
    .from("app_config")
    .select("value")
    .eq("key", "membership_open")
    .single();

  const isMembershipOpen = config?.value ?? false;

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
        <MembershipCTA isOpen={isMembershipOpen} />
      </div>

      <CommunityHighlights />
    </main>
  );
}
