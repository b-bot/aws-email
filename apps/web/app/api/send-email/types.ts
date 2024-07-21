interface WelcomeTemplateData {
  dynamic: string;
}

export type SendEmailTemplateDataMap = {
  // Add other template names <-> template data interfaces pairs here
  welcome: WelcomeTemplateData;
};

export interface SendEmailProps<T extends keyof SendEmailTemplateDataMap> {
  from: string;
  to: string[];
  bcc?: string[];
  templateName: T;
  templateData: T extends keyof SendEmailTemplateDataMap
    ? SendEmailTemplateDataMap[T]
    : never;
}
