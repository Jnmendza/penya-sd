"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export async function signOut() {
  const supabase = await createClient();
  const locale = await getLocale();

  await supabase.auth.signOut();

  // Redirect to the root of the CURRENT language
  // e.g. /es -> /es, /en -> / (handled by middleware)
  return redirect(`/${locale}`);
}
