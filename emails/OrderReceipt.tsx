import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link
} from "@react-email/components";
import * as React from "react";

// We use both named and default exports to prevent import errors
export const OrderReceiptEmail = ({ firstName, total, items }: any) => (
  <Html>
    <Head />
    <Preview>Your Luxe Diamond order has been confirmed.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={luxuryBrand}>LUXE DIAMOND</Text>
        <Heading style={heading}>A Legacy of Light</Heading>
        <Text style={paragraph}>Dear {firstName},</Text>
        <Text style={paragraph}>
          Thank you for choosing Luxe Diamond. Our master craftsmen have begun 
          preparing your selection.
        </Text>
        <Section style={orderBox}>
          <Text style={orderTitle}>Order Summary</Text>
          <Hr style={hr} />
          {items && items.map((item: any) => (
            <Text key={item._id || Math.random()} style={itemText}>
              {item.quantity}x {item.name} — ${item.price?.toLocaleString()}
            </Text>
          ))}
          <Hr style={hr} />
          <Text style={totalText}>Total Paid: ${total?.toLocaleString()}</Text>
        </Section>
        <Link href="https://yourwebsite.com/products" style={button}>
          Continue Shopping
        </Link>
      </Container>
    </Body>
  </Html>
);

// --- Styles ---
const main = { backgroundColor: "#ffffff", fontFamily: 'serif' };
const container = { padding: "40px 20px", margin: "0 auto", maxWidth: "600px" };
const luxuryBrand = { fontSize: "12px", letterSpacing: "4px", textAlign: "center" as const, textTransform: "uppercase" as const, color: "#000" };
const heading = { fontSize: "32px", textAlign: "center" as const, margin: "30px 0", fontWeight: "normal" as const };
const paragraph = { fontSize: "14px", lineHeight: "24px", color: "#333" };
const orderBox = { backgroundColor: "#f9f9f9", padding: "24px", marginTop: "20px", border: "1px solid #eeeeee" };
const orderTitle = { fontSize: "16px", fontWeight: "bold" as const, marginBottom: "12px", color: "#000" };
const hr = { borderColor: "#e6e6e6", margin: "12px 0" };
const itemText = { fontSize: "13px", color: "#555", margin: "8px 0" };
const totalText = { fontSize: "15px", fontWeight: "bold" as const, textAlign: "right" as const, marginTop: "12px" };
const button = { backgroundColor: "#000", color: "#fff", padding: "15px 30px", textDecoration: "none", display: "block", textAlign: "center" as const, marginTop: "30px", fontSize: "14px" };

export default OrderReceiptEmail;