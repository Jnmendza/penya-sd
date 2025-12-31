"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill out all fields" };
  }

  try {
    const data = await resend.emails.send({
      // sending FROM your new domain
      from: "Penya Contact <info@penyasd.com>",
      // sending TO your new Zoho inbox
      to: ["info@penyasd.com"],
      // User's email so you can just hit "Reply"
      replyTo: email,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      return { error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: "Failed to send email" };
  }
}
