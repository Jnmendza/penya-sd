import "dotenv/config";
import { sendRegistrationEmail, sendActivationEmail } from "../lib/emails";

const testEmail = process.argv[2];

if (!testEmail) {
  console.error("Error: Please provide a test email address as an argument.");
  console.error("Usage: npx tsx scratch/test-resend.ts <email>");
  process.exit(1);
}

async function run() {
  console.log(`\n--- Resend Email Test ---`);
  console.log(`Target Recipient: ${testEmail}\n`);

  console.log(`[1] Sending Registration Confirmation email...`);
  const regResult = await sendRegistrationEmail({
    firstName: "Testy",
    email: testEmail,
    paymentMethod: "venmo",
    venmoHandle: "@PenyaSD-Test",
    zelleHandle: "test@penyasd.com",
  });
  console.log("Registration email result:", regResult);

  console.log(`\n[2] Sending Account Activation email...`);
  const actResult = await sendActivationEmail({
    firstName: "Testy",
    email: testEmail,
  });
  console.log("Activation email result:", actResult);
}

run().catch(console.error);
