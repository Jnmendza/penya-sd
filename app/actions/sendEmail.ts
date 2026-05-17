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
  } catch {
    return { error: "Failed to send email" };
  }
}

interface RegistrationEmailParams {
  firstName: string;
  email: string;
  paymentMethod: string; // "venmo" | "cashapp" | "cash"
  venmoHandle: string;
  cashappHandle: string;
}

export async function sendRegistrationEmail({
  firstName,
  email,
  paymentMethod,
  venmoHandle,
  cashappHandle,
}: RegistrationEmailParams) {
  const venmoUrl = `https://venmo.com/${venmoHandle.replace("@", "")}`;
  const cashappUrl = `https://cash.app/${cashappHandle.startsWith("$") ? cashappHandle : "$" + cashappHandle}`;

  const paymentSection =
    paymentMethod === "venmo"
      ? `<p>Please send <strong>$30</strong> to <strong>${venmoHandle}</strong> on Venmo:</p>
         <p><a href="${venmoUrl}" style="background:#008CFF;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">Pay on Venmo</a></p>`
      : paymentMethod === "cashapp"
      ? `<p>Please send <strong>$30</strong> to <strong>${cashappHandle}</strong> on Cash App:</p>
         <p><a href="${cashappUrl}" style="background:#00D64F;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">Pay on Cash App</a></p>`
      : `<p>Please bring <strong>$30 cash</strong> to our next watch party. Find a board member to complete your registration.</p>`;

  await resend.emails.send({
    from: "Penya PBSD <info@penyasd.com>",
    to: [email],
    subject: "You're Registered — Penya Blaugrana San Diego",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <div style="background:linear-gradient(135deg,#004d98,#a50044);padding:24px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:24px">Penya Blaugrana San Diego</h1>
          <p style="color:#edbb00;margin:8px 0 0;font-weight:bold">Registration Confirmed!</p>
        </div>
        <div style="background:#f9fafb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
          <p>Hi <strong>${firstName}</strong>,</p>
          <p>Your membership registration has been received! To complete your membership, please send your payment:</p>
          ${paymentSection}
          <p style="margin-top:20px;color:#6b7280;font-size:0.875rem">
            Once we confirm your payment, you'll receive another email activating your membership.
            ${paymentMethod === "cash" ? "" : "Include your name in the payment note so we can match it to your registration."}
          </p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
          <p style="color:#6b7280;font-size:0.75rem;text-align:center">
            Penya Blaugrana San Diego · Official FC Barcelona Supporters Group #2309<br>
            Novo Brazil Brewing · Otay Ranch, San Diego
          </p>
        </div>
      </div>
    `,
  });
}

interface ActivationEmailParams {
  firstName: string;
  email: string;
}

export async function sendActivationEmail({
  firstName,
  email,
}: ActivationEmailParams) {
  await resend.emails.send({
    from: "Penya PBSD <info@penyasd.com>",
    to: [email],
    subject: "Welcome — You're an Official Member of Penya Blaugrana San Diego!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <div style="background:linear-gradient(135deg,#004d98,#a50044);padding:24px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:24px">Penya Blaugrana San Diego</h1>
          <p style="color:#edbb00;margin:8px 0 0;font-weight:bold;font-size:18px">¡Bienvenido, Cule!</p>
        </div>
        <div style="background:#f9fafb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
          <p>Hi <strong>${firstName}</strong>,</p>
          <p>Your payment has been confirmed — you are now an <strong>official member</strong> of Penya Blaugrana San Diego! 🔵🔴</p>
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0;font-weight:bold;color:#004d98">What's next:</p>
            <ul style="margin:8px 0 0;padding-left:20px;color:#374151">
              <li>Your <strong>scarf and pin</strong> are available for pickup at any matchday event — find a board member and show this email.</li>
              <li>Join us every matchday at <strong>Novo Brazil Brewing, Otay Ranch</strong>.</li>
              <li>Follow us on Instagram and X for announcements and watch party times.</li>
            </ul>
          </div>
          <p style="color:#6b7280;font-size:0.875rem">Visca el Barça i Visca Catalunya! 💙❤️</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
          <p style="color:#6b7280;font-size:0.75rem;text-align:center">
            Penya Blaugrana San Diego · Official FC Barcelona Supporters Group #2309<br>
            Novo Brazil Brewing · Otay Ranch, San Diego
          </p>
        </div>
      </div>
    `,
  });
}
