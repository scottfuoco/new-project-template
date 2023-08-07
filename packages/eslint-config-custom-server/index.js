// @ts-check

require("@rushstack/eslint-patch/modern-module-resolution");
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: ["custom", "plugin:security/recommended", "prettier"],
  env: {
    es2021: true,
    node: true,
    browser: false,
  },
  rules: {
    "security/detect-object-injection": "off",
    "security/detect-unsafe-regexp": "off",
    "unicorn/consistent-destructuring": "off",
    "unicorn/filename-case": "off",
    "unicorn/string-content": "off",
    "unicorn/no-null": "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ],
});
