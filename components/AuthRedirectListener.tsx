"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirectListener() {
  const router = useRouter();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      if (
        hash &&
        (hash.includes("type=invite") || hash.includes("type=recovery")) &&
        !path.includes("/auth/reset-password")
      ) {
        router.replace(`/auth/reset-password${hash}`);
      }
    };

    // Run on initial mount
    handleHash();

    // Listen to hash changes in case they happen dynamically
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [router]);

  return null;
}
