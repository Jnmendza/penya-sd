import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es", "ca"],

  // Used when no locale matches
  defaultLocale: "en",

  // Optional: prevent /en from showing in the URL
  localePrefix: "as-needed",
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
