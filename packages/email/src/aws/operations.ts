import * as fs from "fs"
import {
  CreateTemplateCommand,
  DeleteTemplateCommand,
  GetTemplateCommand,
  UpdateTemplateCommand,
} from "@aws-sdk/client-ses"

import sesClient from "./ses-client"

interface Template {
  Template: {
    TemplateName: any
    SubjectPart: any
    HtmlPart: string
    TextPart: string
  }
}

type TemplateManifest = {
  name: string
  subject: string
  html: string
  text: string
  attributes: string[]
}

export const getTemplate = async (sesObject: Template) => {
  const templateName = sesObject.Template.TemplateName
  try {
    console.log(`[INFO] => Retrieving template ${templateName}`)
    const data = await sesClient.send(
      new GetTemplateCommand({ TemplateName: sesObject.Template.TemplateName }),
    )
    console.log("Success.", data)
    return { status: "success", template: templateName, action: "get" }
  } catch (error: any) {
    console.log(`[ERROR] => Error retrieving template ${templateName}`, error.stack)
    return { status: "error", template: templateName, error }
  }
}

export const createTemplate = async (sesObject: Template) => {
  const templateName = sesObject.Template.TemplateName
  try {
    console.log(`[INFO] => Creating template ${templateName}`)
    const data = await sesClient.send(new CreateTemplateCommand(sesObject))
    console.log("Success", data)
    return { status: "success", template: templateName, action: "create" }
  } catch (error: any) {
    console.log(`[ERROR] => Error creating template ${templateName}`, error.stack)
    return { status: "error", template: templateName, error }
  }
}

export const updateTemplate = async (sesObject: Template) => {
  const templateName = sesObject.Template.TemplateName
  try {
    console.log(`[INFO] => Updating template ${templateName}`)
    const data = await sesClient.send(new UpdateTemplateCommand(sesObject))
    console.log("Success.", data)
    return { status: "success", template: templateName, action: "update" }
  } catch (error: any) {
    console.log(`[ERROR] => Error updating template ${templateName}`, error.stack)
    return { status: "error", template: templateName, error }
  }
}

export const deleteTemplate = async (sesObject: Template) => {
  const templateName = sesObject.Template.TemplateName
  try {
    console.log(`[INFO] => Deleting template ${templateName}`)
    const data = await sesClient.send(
      new DeleteTemplateCommand({
        TemplateName: sesObject.Template.TemplateName,
      }),
    )
    console.log("Success.", data)
    console.log(`Please remove ${templateName} from your manifest file.`)
    return { status: "success", template: templateName, action: "delete" }
  } catch (error: any) {
    console.log(`[ERROR] => Error updating template ${templateName}`, error.stack)
    return { status: "error", template: templateName, error }
  }
}

export const createOrUpdateTemplate = async ({
  name,
  subject,
  html,
  text,
}: TemplateManifest) => {
  const sesObject = {
    Template: {
      TemplateName: name,
      SubjectPart: subject,
      HtmlPart: fs.readFileSync(html).toString(),
      TextPart: fs.readFileSync(text).toString(),
    },
  }

  const { status, error } = await getTemplate(sesObject)

  if (status === "success") {
    return await updateTemplate(sesObject)
  } else if (status === "error") {
    if (error.Error.Code === `TemplateDoesNotExist`) {
      return await createTemplate(sesObject)
    } else {
      return { status: "error", template: name, error }
    }
  }
  return { status: "error", template: name, error }
}
