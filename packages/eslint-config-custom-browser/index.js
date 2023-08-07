// @ts-check

require("@rushstack/eslint-patch/modern-module-resolution");

const { defineConfig } = require("eslint-define-config");
const restrictedGlobals = require("confusing-browser-globals");

module.exports = defineConfig({
  extends: ["custom", "next", "next/core-web-vitals", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-restricted-globals": ["error", ...restrictedGlobals],
    "unicorn/no-null": "off",
    "unicorn/string-content": "off",
    "unicorn/consistent-destructuring": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
  },
  overrides: [
    {
      files: ["*.stor{ies,y}.{j,t}s?(x)"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "unicorn/string-content": "off",
        "unicorn/filename-case": "off",
      },
    },
  ],
});
