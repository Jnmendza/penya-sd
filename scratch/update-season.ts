import "dotenv/config";
import { prisma } from "../lib/prisma";

async function run() {
  console.log("Updating current_season_id in app_config to 2026/2027...");
  const count = await prisma.$executeRawUnsafe(
    `UPDATE app_config SET value = '2026/2027' WHERE key = 'current_season_id'`
  );
  console.log("Update completed. Rows affected:", count);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
