"use server";

// app/actions/sendEmail.ts

export async function sendContactEmail(formData: FormData) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[sendContactEmail] Missing RESEND_API_KEY.");
    return { error: "Email configuration is incomplete." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill out all fields" };
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email format" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // sending FROM your new domain
        from: "Penya Contact <info@penyasd.com>",
        // sending TO your new Zoho inbox
        to: ["info@penyasd.com"],
        // User's email so you can just hit "Reply"
        replyTo: email,
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    const body = await res.json();

    if (!res.ok || body.error) {
      console.error("[sendContactEmail] Resend error:", body.error || body);
      return { error: body.error?.message || "Failed to send email" };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendContactEmail] Unexpected error:", err);
    return { error: "Failed to send email" };
  }
}
