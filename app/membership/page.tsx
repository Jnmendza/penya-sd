import MembershipForm from "@/components/MembershipForm";
import { getGlobalConfig } from "@/utils/getGlobalConfig";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Membership | Penya Blaugrana San Diego",
  description:
    "Join us in making San Diego a better place. Become a member today!",
};

export default async function MembershipPage() {
  const { isMembershipOpen, currentSeason } = await getGlobalConfig();

  return (
    <main className='min-h-screen bg-slate-50 pt-24 pb-12'>
      <MembershipForm
        isEnrollmentOpen={isMembershipOpen}
        currentSeason={currentSeason}
      />
    </main>
  );
}
