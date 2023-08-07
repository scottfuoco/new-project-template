import type { StorybookConfig, TypescriptOptions } from "@storybook/types";
import type { ForkTsCheckerWebpackPluginOptions } from "fork-ts-checker-webpack-plugin/lib/plugin-options";
import path from "path";
import type { PluginOptions as ReactDocgenTypescriptPluginOptions } from "react-docgen-typescript-plugin";

// Extended default config as storybook 7 is in beta and the type doesn't quite match up yet.
interface TypescriptOptionsExtended extends TypescriptOptions {
  check: boolean; // Use fork-ts-checker-webpack-plugin
  checkOptions?: ForkTsCheckerWebpackPluginOptions;
  reactDocgen?: "react-docgen-typescript" | "react-docgen" | false; // which reactDocgen parser to use
  reactDocgenTypescriptOptions: ReactDocgenTypescriptPluginOptions;
}
interface StorybookConfigExtended extends StorybookConfig {
  typescript: Partial<TypescriptOptionsExtended>;
}

const config: StorybookConfigExtended = {
  stories: [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-swc",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
    },
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
