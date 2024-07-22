import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import createAttribute from "./utils/create-attribute.ts";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>This is a test email from MonoKit</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <div style={logo}>
            <Img
              src={`${baseUrl}/static/logo.png`}
              width="50"
              height="50"
              alt="MonoKit"
            />{" "}
          </div>
          <Hr style={hr} />
          <Text style={paragraph}>Welcome to MonoKit</Text>
          <Text style={paragraph}>
            The dynamic value passed in was: {createAttribute("dynamic")}
          </Text>
          <Button style={button} href="https://monokit.dev">
            Buy the kit!
          </Button>
          <Hr style={hr} />
          <Text style={footer}>MonoKit Boilerplate</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const logo = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "bold",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#ee3c2e",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
