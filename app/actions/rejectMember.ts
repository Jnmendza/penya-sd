// app/actions/rejectMember.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function rejectMember(applicationId: string) {
  try {
    await prisma.memberApplication.update({
      where: { id: applicationId },
      data: { status: "REJECTED" },
    });

    return { success: true };
  } catch (err) {
    console.error("[rejectMember]", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { success: false, message };
  }
}
