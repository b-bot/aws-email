import { SendEmailCommand, SendEmailCommandInput, SES } from "@aws-sdk/client-ses"
import { render } from "@react-email/components"
import * as dotenv from "dotenv"
import React, { ReactElement } from "react"

import sesClient from "./aws/ses-client"

dotenv.config()

interface EmailVariables {
  [key: string]: any
}

interface SendEmailParams {
  to: string
  subject: string
  variables: EmailVariables
  EmailTemplate: (props: EmailVariables) => ReactElement
}

export async function sendEmail({
  to,
  subject,
  variables,
  EmailTemplate,
}: SendEmailParams): Promise<void> {
  let emailHtml
  if (typeof window == "undefined") {
    // Server-side rendering
    emailHtml = render(EmailTemplate(variables))
  } else {
    // Client-side rendering
    emailHtml = render(React.createElement(EmailTemplate, variables))
  }

  const params: SendEmailCommandInput = {
    Source: process.env.AWS_SES_IDENTITY || "you@example.com",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  }

  const command = new SendEmailCommand(params)

  try {
    await sesClient.send(command)
    console.log("Email sent successfully")
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
