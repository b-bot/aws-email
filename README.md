# AWS SES Transactional Email

This is a monorepo structure for a project that sends production-grade transactional emails using AWS SES. It will enable the uploading templates created using React Email. The project is built using Turbo, a zero-config tool for monorepos.

## Setup

1. Add the identity of the domain you want to send emails from in AWS SES. You will also need to add the email you want to test sending an email to as a verified identity while you wait on production access. This can be requested from the dashboard in SES.

2. Create an IAM user in AWS SES with the following policy attached:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "ses:ListTemplates",
        "ses:SendEmail",
        "ses:SendTemplatedEmail",
        "ses:DeleteTemplate",
        "ses:UpdateTemplate",
        "ses:CreateTemplate",
        "ses:SendRawEmail",
        "ses:GetTemplate"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Add the access key and secret key to the `.env` file in the root of the projects of both the `apps/web` and `packages/email` folders.

4. `pnpm install` at the root of the project.

5. `pnpm dev` to start the development servers in both the `apps/web` and `packages/email` folders. This will start them on port 3000 and 3001 respectively.

6. Modify your emails according to the templates and then run `pnpm sync` to upload the templates to AWS SES.

7. You can now navigate to your browser and send a test email to the email you verified in step 1.

### Resources

- AWS SES Documentation: [Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html)
- Video Guide: [YouTube](https://nextjs.org/)
