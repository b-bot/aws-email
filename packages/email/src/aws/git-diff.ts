import { execSync } from "child_process"

export const gitDiff = async () => {
  const diffTarget = "origin/main"

  try {
    const changedFiles = execSync(
      `git diff --name-only ${diffTarget} templates/**`,
    ).toString()
    return changedFiles
  } catch (error) {
    console.error(error)
    return
  }
}
