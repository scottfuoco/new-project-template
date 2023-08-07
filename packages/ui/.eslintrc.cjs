/* eslint-disable unicorn/prefer-module */

require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["custom-browser"],
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
