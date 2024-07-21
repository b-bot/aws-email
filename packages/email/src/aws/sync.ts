import { gitDiff } from "./git-diff"
import { manifest } from "./manifest"
import { createOrUpdateTemplate } from "./operations"

const sync = async () => {
  const changedFiles = await gitDiff()
  const results = await Promise.all(
    manifest.map((template) => {
      if (changedFiles?.includes(template.html)) {
        return createOrUpdateTemplate(template).catch((e) => {
          return {
            status: "error",
            template: template.name,
            error: `[ERROR] => ${e.message}`,
          }
        })
      } else {
        return {
          status: "skipped",
          reason: "Update Not Required",
          template: template.name,
        }
      }
    }),
  )

  const errors = results.filter((result) => result?.status === "error")

  if (errors.length > 0) {
    console.error("There were problems syncing templates.", errors)
    process.exit(1)
  }

  const syncedTemplates = results.filter((result) => result?.status !== "skipped")

  console.log(syncedTemplates)

  return results
}

sync()
