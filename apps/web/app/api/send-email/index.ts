import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";

import type { SendEmailProps, SendEmailTemplateDataMap } from "./types";

const config = {
  region: process.env.AWS_REGION || "us-east-1",
};

const client = new SESClient(config);

export class EmailService {
  public async sendEmail<T extends keyof SendEmailTemplateDataMap>({
    from,
    to,
    bcc,
    templateData,
    templateName,
  }: SendEmailProps<T>) {
    const params = {
      Source: `MonoKit <${from}>`,
      Destination: {
        ToAddresses: to,
        BccAddresses: bcc,
      },
      Template: templateName,
      TemplateData: JSON.stringify(templateData),
      ConfigurationSetName: "EmailRenderingFailure",
    };

    const command = new SendTemplatedEmailCommand(params);

    try {
      const response = await client.send(command);
      console.log(response, "Templated email sent successfully");
    } catch (error) {
      console.log(error, "Error sending templated email");
    }
  }
}
