/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

import withBundleAnalyzerCreator from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerCreator({
  enabled: process.env.ANALYZE === "true",
});

({
  enabled: global.process.env.ANALYZE === "true",
});

import packageJson from "./package.json" assert { type: "json" };
import gitRevSync from "git-rev-sync";

function generateBuildId() {
  const { version } = packageJson;
  try {
    let rev;
    if (global.process.env.NODE_ENV === "production") {
      rev = undefined;
    } else {
      rev = global.process.env.GIT_REVISION || gitRevSync.short();
    }
    return `v${version}::${rev}`;
  } catch {
    return `v${version}::unknown`;
  }
}

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: [
      "jwk-to-pem",
      "circular-json-es6",
      "@trpc/server",
      "fast-jwt",
      "git-rev-sync",
    ],
    urlImports: [
      "https://cdn.skypack.dev",
      "https://esm.sh",
      "https://cdn.stncharms.com",
    ],
    // workerThreads: true,  // this causes build errors in the current canary release
  },
  modularizeImports: {
    "@tabler/icons-react": {
      transform: "@tabler/icons-react/dist/esm/icons/{{member}}",
    },
    // "@sanity/icons": {
    //   transform: "@sanity/icons/dist/esm/icons/{{member}}",
    // },
  },
  output: "standalone",
  images: {
    domains: ["cdn.sanity.io"],
    minimumCacheTTL: 86_400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  compiler: {
    ...(global.process.env.NODE_ENV === "production"
      ? {
          removeConsole: { exclude: ["error", "debug", "info"] },
        }
      : {}),
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
    tsconfigPath: "./tsconfig.json",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateBuildId,
  webpack(config, { buildId, dev, webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.BUILD_ID": JSON.stringify(
          dev ? generateBuildId() : buildId,
          buildId
        ),
      })
    );

    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
});

export default nextConfig;
