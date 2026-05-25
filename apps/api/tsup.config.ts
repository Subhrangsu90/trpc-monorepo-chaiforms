import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  noExternal: ["@formforge"],
  splitting: false,
  bundle: true,
  outDir: "./dist",
  clean: true,
  format: "esm",
  env: { IS_SERVER_BUILD: "true" },
  loader: { ".json": "copy" },
  minify: true,
  sourcemap: false,
});
