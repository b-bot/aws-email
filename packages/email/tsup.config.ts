import { defineConfig } from "tsup"

// eslint-disable-next-line import/no-default-export -- config
export default defineConfig({
  entry: ["src/index.ts", "src/aws/sync.ts", "src/aws/delete.ts"],
  dts: true,
})
