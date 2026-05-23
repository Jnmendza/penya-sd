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
}

export const MembershipActivatedEmail = ({
  firstName = "Jon",
}: EmailProps) => {
  const logoUrl = "https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/assets/pbsd-rafa-crest%20(1).png";

  return (
    <Html>
      <Head />
      <Preview>Welcome — You're an Official Member of Penya Blaugrana San Diego!</Preview>
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
            <Text style={headerSubtitle}>¡Bienvenido, Cule!</Text>
          </Section>

          {/* Body */}
          <Section style={bodySection}>
            <Text style={paragraph}>
              Hi <strong>{firstName}</strong>,
            </Text>
            <Text style={paragraph}>
              Your payment has been confirmed — you are now an <strong>official member</strong> of Penya Blaugrana San Diego for the upcoming <strong>2026/2027 La Liga season</strong>! 🔵🔴 We are absolutely thrilled to welcome you to our Blaugrana family.
            </Text>

            <Section style={boxSection}>
              <Text style={boxTitle}>What's next:</Text>
              <ul style={listStyle}>
                <li style={listItem}>
                  Your <strong>scarf and pin</strong> will be available for pickup at any matchday event at the start of the 26/27 La Liga season. Find a board member and show this email.
                </li>
                <li style={listItem}>
                  Join us on matchday at <strong>Novo Brazil Brewing, Otay Ranch</strong>.
                </li>
                <li style={listItem}>
                  Follow us on <Link href="https://www.instagram.com/penyasandiego_/" style={linkStyle}>Instagram</Link>, <Link href="https://x.com/penya_san" style={linkStyle}>X (Twitter)</Link>, and <Link href="https://www.facebook.com/PenyaSanDiego" style={linkStyle}>Facebook</Link> for announcements and watch party times.
                </li>
              </ul>
            </Section>

            <Text style={salutation}>Visca el Barça i Visca Catalunya! 💙❤️</Text>

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

export default MembershipActivatedEmail;

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
  fontSize: "18px",
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

const boxSection = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
};

const boxTitle = {
  margin: "0 0 8px",
  fontWeight: "bold",
  color: "#004d98",
  fontSize: "16px",
};

const listStyle = {
  margin: "0",
  paddingLeft: "20px",
  color: "#374151",
};

const listItem = {
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 8px",
};

const salutation = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#6b7280",
  margin: "20px 0 0",
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

