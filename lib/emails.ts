// lib/emails.ts

const logoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL || "https://erlplcduvrowbiwobjen.supabase.co"}/storage/v1/object/public/assets/pbsd-rafa-crest%20(1).png`;
const zelleQrUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL || "https://erlplcduvrowbiwobjen.supabase.co"}/storage/v1/object/public/payment-qr/zelle_pbsd_qr.png`;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface RegistrationEmailParams {
  firstName: string;
  email: string;
  paymentMethod: string; // "venmo" | "zelle" | "cash"
  venmoHandle: string;
  zelleHandle: string;
}

export async function sendRegistrationEmail({
  firstName,
  email,
  paymentMethod,
  venmoHandle,
  zelleHandle,
}: RegistrationEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[sendRegistrationEmail] Missing RESEND_API_KEY. Skipping email send.");
    return { success: false, error: "Missing API Key" };
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("[sendRegistrationEmail] Invalid recipient email format:", email);
    return { success: false, error: "Invalid email format" };
  }

  const venmoUrl = `https://venmo.com/${venmoHandle.replace("@", "")}`;

  const paymentSection =
    paymentMethod === "venmo"
      ? `<p>Please send <strong>$30</strong> to <strong>${venmoHandle}</strong> on Venmo:</p>
         <p style="text-align:center;"><a href="${venmoUrl}" style="background:#008CFF;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Pay on Venmo</a></p>`
      : paymentMethod === "zelle"
      ? `<p>Please send <strong>$30</strong> via Zelle to <strong>${zelleHandle}</strong>.</p>
         <p style="color:#6b7280;font-size:0.875rem">Open your bank app, scan the QR code below, or send to the address above.</p>
         <p style="text-align:center;margin:16px 0;">
           <img src="${zelleQrUrl}" width="200" height="243" alt="Zelle QR Code" style="width:200px;height:243px;margin:0 auto;display:block;" />
         </p>`
      : `<p>Please bring <strong>$30 cash</strong> to our next watch party. Find a board member to complete your registration.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Penya PBSD <info@penyasd.com>",
        to: [email],
        subject: "You're Registered — Penya Blaugrana San Diego",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <div style="background:linear-gradient(135deg,#004d98,#a50044);padding:24px;border-radius:12px 12px 0 0;text-align:center">
            <img src="${logoUrl}" width="80" height="100" alt="PBSD Logo" style="width:80px;height:100px;margin:0 auto 12px;display:block;" />
            <h1 style="color:white;margin:0;font-size:24px">Penya Blaugrana San Diego</h1>
            <p style="color:#edbb00;margin:8px 0 0;font-weight:bold">Registration Confirmed!</p>
          </div>
          <div style="background:#f9fafb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
            <p>Hi <strong>${escapeHtml(firstName)}</strong>,</p>
            <p>Your membership registration has been received! To complete your membership, please send your payment:</p>
            ${paymentSection}
            <p style="margin-top:20px;color:#6b7280;font-size:0.875rem">
              Once we confirm your payment, you'll receive another email activating your membership.
              ${paymentMethod === "cash" ? "" : "Include your name in the payment note so we can match it to your registration."}
            </p>
            <p style="margin-top:20px;color:#374151;font-size:0.875rem">
              In the meantime, feel free to follow us on 
              <a href="https://www.instagram.com/penyasandiego_/" style="color:#004d98;text-decoration:underline;">Instagram</a>, 
              <a href="https://x.com/penya_san" style="color:#004d98;text-decoration:underline;">X (Twitter)</a>, and 
              <a href="https://www.facebook.com/PenyaSanDiego" style="color:#004d98;text-decoration:underline;">Facebook</a> 
              for match day watch party times and announcements!
            </p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
            <div style="text-align:center;margin:16px 0;">
              <a href="https://www.facebook.com/PenyaSanDiego" target="_blank" style="display:inline-block;margin:0 8px;text-decoration:none;">
                <img src="https://img.icons8.com/ios-filled/24/6b7280/facebook-new.png" width="24" height="24" alt="Facebook" style="display:block;border:0;" />
              </a>
              <a href="https://www.instagram.com/penyasandiego_/" target="_blank" style="display:inline-block;margin:0 8px;text-decoration:none;">
                <img src="https://img.icons8.com/ios-filled/24/6b7280/instagram-new.png" width="24" height="24" alt="Instagram" style="display:block;border:0;" />
              </a>
              <a href="https://x.com/penya_san" target="_blank" style="display:inline-block;margin:0 8px;text-decoration:none;">
                <img src="https://img.icons8.com/ios-filled/24/6b7280/twitterx.png" width="24" height="24" alt="X" style="display:block;border:0;" />
              </a>
            </div>
            <p style="color:#6b7280;font-size:0.75rem;text-align:center">
              Penya Blaugrana San Diego · Official FC Barcelona Supporters Group #2309<br>
              Novo Brazil Brewing · Otay Ranch, San Diego
            </p>
          </div>
        </div>
      `,
      }),
    });

    const body = await res.json();

    if (!res.ok || body.error) {
      console.error("[sendRegistrationEmail] Resend error:", body.error || body);
      return { success: false, error: body.error?.message || "Failed to send email" };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendRegistrationEmail] Unexpected error:", err);
    return { success: false, error: err instanceof Error ? err.message : "Unexpected error" };
  }
}

interface ActivationEmailParams {
  firstName: string;
  email: string;
}

export async function sendActivationEmail({
  firstName,
  email,
}: ActivationEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[sendActivationEmail] Missing RESEND_API_KEY. Skipping email send.");
    return { success: false, error: "Missing API Key" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("[sendActivationEmail] Invalid recipient email format:", email);
    return { success: false, error: "Invalid email format" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Penya PBSD <info@penyasd.com>",
        to: [email],
        subject: "Welcome — You're an Official Member of Penya Blaugrana San Diego!",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <div style="background:linear-gradient(135deg,#004d98,#a50044);padding:24px;border-radius:12px 12px 0 0;text-align:center">
            <img src="${logoUrl}" width="80" height="100" alt="PBSD Logo" style="width:80px;height:100px;margin:0 auto 12px;display:block;" />
            <h1 style="color:white;margin:0;font-size:24px">Penya Blaugrana San Diego</h1>
            <p style="color:#edbb00;margin:8px 0 0;font-weight:bold;font-size:18px">¡Bienvenido, Cule!</p>
          </div>
          <div style="background:#f9fafb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
            <p>Hi <strong>${escapeHtml(firstName)}</strong>,</p>
            <p>Your payment has been confirmed — you are now an <strong>official member</strong> of Penya Blaugrana San Diego for the upcoming <strong>2026/2027 La Liga season</strong>! 🔵🔴 We are absolutely thrilled to welcome you to our Blaugrana family.</p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0">
              <p style="margin:0;font-weight:bold;color:#004d98">What's next:</p>
              <ul style="margin:8px 0 0;padding-left:20px;color:#374151">
                <li>Your <strong>scarf and pin</strong> will be available for pickup at any matchday event at the start of the 26/27 La Liga season. Find a board member and show this email.</li>
                <li>Join us on matchday at <strong>Novo Brazil Brewing, Otay Ranch</strong>.</li>
                <li>Follow us on <a href="https://www.instagram.com/penyasandiego_/" style="color:#004d98;text-decoration:underline;">Instagram</a>, <a href="https://x.com/penya_san" style="color:#004d98;text-decoration:underline;">X (Twitter)</a>, and <a href="https://www.facebook.com/PenyaSanDiego" style="color:#004d98;text-decoration:underline;">Facebook</a> for announcements and watch party times.</li>
              </ul>
            </div>
            <p style="color:#6b7280;font-size:0.875rem">Visca el Barça i Visca Catalunya! 💙❤️</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
            <div style="text-align:center;margin:16px 0;">
              <a href="https://www.facebook.com/PenyaSanDiego" target="_blank" style="display:inline-block;margin:0 8px;text-decoration:none;">
                <img src="https://img.icons8.com/ios-filled/24/6b7280/facebook-new.png" width="24" height="24" alt="Facebook" style="display:block;border:0;" />
              </a>
              <a href="https://www.instagram.com/penyasandiego_/" target="_blank" style="display:inline-block;margin:0 8px;text-decoration:none;">
                <img src="https://img.icons8.com/ios-filled/24/6b7280/instagram-new.png" width="24" height="24" alt="Instagram" style="display:block;border:0;" />
              </a>
              <a href="https://x.com/penya_san" target="_blank" style="display:inline-block;margin:0 8px;text-decoration:none;">
                <img src="https://img.icons8.com/ios-filled/24/6b7280/twitterx.png" width="24" height="24" alt="X" style="display:block;border:0;" />
              </a>
            </div>
            <p style="color:#6b7280;font-size:0.75rem;text-align:center">
              Penya Blaugrana San Diego · Official FC Barcelona Supporters Group #2309<br>
              Novo Brazil Brewing · Otay Ranch, San Diego
            </p>
          </div>
        </div>
      `,
      }),
    });

    const body = await res.json();

    if (!res.ok || body.error) {
      console.error("[sendActivationEmail] Resend error:", body.error || body);
      return { success: false, error: body.error?.message || "Failed to send email" };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendActivationEmail] Unexpected error:", err);
    return { success: false, error: err instanceof Error ? err.message : "Unexpected error" };
  }
}
