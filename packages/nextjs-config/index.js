/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */
// All options are available here: https://github.com/vercel/next.js/blob/canary/packages/next/src/server/config-shared.ts

const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: global.process.env.ANALYZE === "true",
});

function generateBuildId() {
  const { version } = require("./package.json");
  try {
    const rev =
      global.process.env.NODE_ENV === "production"
        ? undefined
        : global.process.env.GIT_REVISION || require("git-rev-sync").short();
    return `v${version}::${rev}`;
  } catch {
    return `v${version}::unknown`;
  }
}

const nextConfig = withBundleAnalyzer({
  // transpilePackages: ["@stn/theme"],
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
  reactStrictMode: false,
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

module.exports = nextConfig;
