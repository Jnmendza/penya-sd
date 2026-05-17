"use client";

import dynamic from "next/dynamic";

const ResetPasswordClient = dynamic(
  () => import("@/components/ResetPasswordClient"),
  { ssr: false },
);

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
