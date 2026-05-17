// app/actions/rejectMember.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function rejectMember(applicationId: string) {
  await prisma.memberApplication.update({
    where: { id: applicationId },
    data: { status: "REJECTED" },
  });

  return { success: true };
}
