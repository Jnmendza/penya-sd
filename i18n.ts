import { getRequestConfig } from "next-intl/server";
import { routing } from "./utils/navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  return {
    locale, // <--- This was the missing property causing the error!
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
