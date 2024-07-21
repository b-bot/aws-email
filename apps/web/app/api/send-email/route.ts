import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "./index";

const emailService = new EmailService();

export async function POST(request: NextRequest) {
  try {
    const { email, dynamic } = await request.json();

    await emailService.sendEmail({
      to: [email],
      from: `MonoKit <${process.env.AWS_SES_IDENTITY}>`,
      templateName: "welcome",
      templateData: {
        dynamic: dynamic,
      },
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
