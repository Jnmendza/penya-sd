import { prisma } from "@/lib/prisma";

/**
 * Counts the total active and pending membership for a given season,
 * excluding children under the age of 8.
 *
 * @param season The current season ID (e.g. "2026/2027")
 * @returns The total number of members counting toward the cap
 */
export async function getMembershipCount(season: string): Promise<number> {
  // 1. Count all primary applications for the season that are not rejected
  const primaryCount = await prisma.memberApplication.count({
    where: {
      season,
      status: { not: "REJECTED" },
    },
  });

  // 2. Count all children >= 8 years old for the season that are not rejected
  const childrenCount = await prisma.childMember.count({
    where: {
      age: { gte: 8 },
      application: {
        season,
        status: { not: "REJECTED" },
      },
    },
  });

  return primaryCount + childrenCount;
}
