/* eslint-disable security/detect-non-literal-fs-filename */
import { dependencies } from "./package.json";
import { checkModules } from "are-you-es5";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, Options } from "tsup";

type ESBuildPlugin = NonNullable<Options["esbuildPlugins"]>[number];

const es5CheckIgnore = new Set([
  "@sinclair/typebox",
  "bson",
  "@fastify/sensible",
  "fastify",
  "ajv",
  "ajv-formats",
]);
const es5CheckResult = checkModules({
  path: ".",
  checkAllNodeModules: false,
  ignoreBabelAndWebpackPackages: true,
});

const es6OnlyModules = es5CheckResult.es6Modules.filter(
  (module_) => !es5CheckIgnore.has(module_)
);

const nonExternalDepsWorkspace = Object.entries(dependencies)
  .filter(([, value]) => value.includes("workspace"))
  .map(([key]) => key);

const nonExternalDeps = [...nonExternalDepsWorkspace, ...es6OnlyModules];

const logsDirectory = path.join(process.cwd(), "logs", "build");

function createLogStream() {
  if (!global.process.env.BUILD_LOGS) return;
  fs.mkdirSync(logsDirectory, { recursive: true });
  return fs.createWriteStream(
    `${logsDirectory}/build-${new Date().toJSON()}.log`
  );
}

const logStream = createLogStream();
function log(x: unknown, label?: string) {
  if (logStream) {
    logStream?.write(
      `${label ?? ""}` + JSON.stringify(x, undefined, 2) + `,\n`
    );
  }
}

log(nonExternalDeps, "nonExternalDeps");
const managePackages: ESBuildPlugin = {
  name: "manage-packages-plugin",
  setup(build) {
    const filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
    // const filter = /.*/;
    build.onResolve({ filter }, (args) => {
      const isCjs = build.initialOptions.outdir === "dist/cjs";
      const excludeDeps = isCjs ? nonExternalDeps : [];
      if (args.kind === "entry-point") {
        log(args, "entry-point");
        return;
      }
      if (
        args.importer.includes("node_modules") &&
        !excludeDeps.includes(args.path)
      ) {
        log(args, "external nodeModules");
        return { path: args.path, external: true };
      }
      if (!excludeDeps.includes(args.path)) {
        log(args, "external nonExternalDeps");
        return { path: args.path, external: true };
      }
      log(args);
    });
  },
};

export default defineConfig({
  entry: ["src/**/*.{js,ts,tsx,jsx}"],
  format: ["esm", "cjs"],
  outDir: "dist/types",
  dts: false,
  splitting: true,
  sourcemap: false,
  treeshake: true,
  clean: true,
  minify: false,
  shims: true,
  bundle: true,
  legacyOutput: true,
  tsconfig: "./tsconfig.json",
  noExternal: nonExternalDeps,
  esbuildPlugins: [managePackages],
  esbuildOptions(options, context) {
    if (context.format === "esm") {
      options.outdir = "dist/esm";
    }
    if (context.format === "cjs") {
      options.outdir = "dist/cjs";
    }
  },
});
