import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  firstName?: string;
  paymentMethod?: "venmo" | "zelle" | "cash";
  venmoHandle?: string;
  zelleHandle?: string;
}

export const RegistrationConfirmedEmail = ({
  firstName = "Jon",
  paymentMethod = "venmo",
  venmoHandle = "@Martha-Acuna-4",
  zelleHandle = "Aguilera76@gmail.com",
}: EmailProps) => {
  const logoUrl = "https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/pbsd-rafa-crest%20(1).png";
  const zelleQrUrl = "https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/payment-qr/zelle_pbsd_qr.png";
  const venmoUrl = `https://venmo.com/${venmoHandle.replace("@", "")}`;

  const paymentContent =
    paymentMethod === "venmo" ? (
      <>
        <Text style={paragraph}>
          Please send <strong>$30</strong> to <strong>{venmoHandle}</strong> on Venmo:
        </Text>
        <Section style={btnContainer}>
          <Link style={button} href={venmoUrl}>
            Pay on Venmo
          </Link>
        </Section>
      </>
    ) : paymentMethod === "zelle" ? (
      <>
        <Text style={paragraph}>
          Please send <strong>$30</strong> via Zelle to <strong>{zelleHandle}</strong>.
        </Text>
        <Text style={noteText}>
          Open your bank app, scan the QR code below, or send to the address above.
        </Text>
        <Section style={qrContainer}>
          <Img
            src={zelleQrUrl}
            width="200"
            height="243"
            alt="Zelle QR Code"
            style={qrImage}
          />
        </Section>
      </>
    ) : (
      <Text style={paragraph}>
        Please bring <strong>$30 cash</strong> to our next watch party. Find a board member to complete your registration.
      </Text>
    );

  return (
    <Html>
      <Head />
      <Preview>You're Registered — Penya Blaugrana San Diego</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Img
              src={logoUrl}
              width="80"
              height="100"
              alt="PBSD Logo"
              style={logo}
            />
            <Heading style={headerTitle}>Penya Blaugrana San Diego</Heading>
            <Text style={headerSubtitle}>Registration Confirmed!</Text>
          </Section>

          {/* Body */}
          <Section style={bodySection}>
            <Text style={paragraph}>
              Hi <strong>{firstName}</strong>,
            </Text>
            <Text style={paragraph}>
              Your membership registration has been received! To complete your membership, please send your payment:
            </Text>
            
            {paymentContent}

            <Text style={noteText}>
              Once we confirm your payment, you'll receive another email activating your membership.{" "}
              {paymentMethod !== "cash" && "Include your name in the payment note so we can match it to your registration."}
            </Text>

            <Text style={bodySocialText}>
              In the meantime, feel free to follow us on{" "}
              <Link href="https://www.instagram.com/penyasandiego_/" style={linkStyle}>Instagram</Link>,{" "}
              <Link href="https://x.com/penya_san" style={linkStyle}>X (Twitter)</Link>, and{" "}
              <Link href="https://www.facebook.com/PenyaSanDiego" style={linkStyle}>Facebook</Link>{" "}
              for match day watch party times and announcements!
            </Text>

            <Hr style={hr} />

            <Section style={socialContainer}>
              <Link href="https://www.facebook.com/PenyaSanDiego" target="_blank" style={socialLink}>
                <Img src="https://img.icons8.com/ios-filled/24/6b7280/facebook-new.png" width="24" height="24" alt="Facebook" style={socialIcon} />
              </Link>
              <Link href="https://www.instagram.com/penyasandiego_/" target="_blank" style={socialLink}>
                <Img src="https://img.icons8.com/ios-filled/24/6b7280/instagram-new.png" width="24" height="24" alt="Instagram" style={socialIcon} />
              </Link>
              <Link href="https://x.com/penya_san" target="_blank" style={socialLink}>
                <Img src="https://img.icons8.com/ios-filled/24/6b7280/twitterx.png" width="24" height="24" alt="X" style={socialIcon} />
              </Link>
            </Section>
            
            <Text style={footerText}>
              Penya Blaugrana San Diego · Official FC Barcelona Supporters Group #2309
              <br />
              Novo Brazil Brewing · Otay Ranch, San Diego
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default RegistrationConfirmedEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: 'Arial, sans-serif',
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px 0",
};

const headerSection = {
  background: "linear-gradient(135deg, #004d98, #a50044)",
  padding: "32px 24px",
  borderRadius: "12px 12px 0 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto 12px",
  display: "block",
};

const headerTitle = {
  color: "#ffffff",
  margin: "0",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
};

const headerSubtitle = {
  color: "#edbb00",
  margin: "8px 0 0",
  fontWeight: "bold",
  fontSize: "16px",
  textAlign: "center" as const,
};

const bodySection = {
  backgroundColor: "#f9fafb",
  padding: "32px 24px",
  borderRadius: "0 0 12px 12px",
  border: "1px solid #e5e7eb",
  borderTop: "none",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
  margin: "0 0 16px",
};

const noteText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#6b7280",
  margin: "16px 0 0",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#008CFF",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center" as const,
  margin: "0",
};

const linkStyle = {
  color: "#004d98",
  textDecoration: "underline",
};

const bodySocialText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#374151",
  margin: "16px 0 0",
};

const socialContainer = {
  textAlign: "center" as const,
  margin: "16px 0",
};

const socialLink = {
  display: "inline-block",
  margin: "0 8px",
};

const socialIcon = {
  display: "block",
};

const qrContainer = {
  textAlign: "center" as const,
  margin: "16px 0",
};

const qrImage = {
  margin: "0 auto",
  display: "block",
};

