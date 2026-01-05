import MembershipForm from "@/components/MembershipForm";
import { getGlobalConfig } from "@/utils/getGlobalConfig";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

// 1. DYNAMIC METADATA
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "MembershipPage.Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

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
