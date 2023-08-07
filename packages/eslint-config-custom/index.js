// @ts-check
const { isCI } = require("ci-info");
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["sonarjs", "woke", "write-good-comments", "deprecation"],
  extends: (isCI ? ["plugin:diff/diff"] : []).concat([
    "plugin:xss/recommended",
    // "plugin:pii/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "turbo",
    "prettier",
  ]),
  env: {
    es2022: true,
    node: true,
    browser: false,
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "woke/racism": "off",
    "woke/profanity": isCI ? "off" : "error",
    "woke/LGBTQ": isCI ? "off" : "error",
    "write-good-comments/write-good-comments": isCI ? "off" : "warn",
    "no-console": ["error", { allow: ["error", "warn", "debug"] }],
    "deprecation/deprecation": isCI ? "off" : "warn",
    "sonarjs/prefer-immediate-return": "off",
    "import/no-cycle": "error",
    "import/no-self-import": "error",
    "unicorn/prefer-spread": "off",
    "unicorn/string-content": "off",
    "unicorn/filename-case": isCI
      ? "off"
      : [
          "error",
          {
            cases: {
              camelCase: true,
            },
            ignore: [
              "^.*\\.config\\.c?[j|t]sx?$",
              "^.*\\.stor(ies|y)\\.c?[j|t]sx?$",
              "^.*\\.tests?\\.c?[j|t]sx?$",
              "^\\[.+\\]\\.c?[j|t]sx?$",
              "^.*\\.mdx?$",
            ],
          },
        ],
    "unicorn/prevent-abbreviations": [
      "warn",
      {
        allowList: {
          props: true,
          ref: true,
          req: true,
          res: true,
          env: true,
        },
        checkShorthandImports: false,
        ignore: [
          /.*Props$/,
          /^Props.+/,
          /.*Params$/,
          /^params$/,
          /.*Ref$/,
          /.*Fn$/,
          /.*Opts$/,
          /.*Env$/,
          /^Env.*$/,
          /.*Db.*$/,
        ],
        replacements: {
          args: false,
          err: {
            error: true,
          },
          errCb: {
            handleError: true,
          },
          evt: {
            event: true,
          },
        },
      },
    ],
    "unicorn/require-post-message-target-origin": "error",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/string-content": [
      "warn",
      {
        patterns: {
          "->": "→",
          "\\.\\.\\.": "…",
          "(?:^|[ \t])(http://)(?!localhost|(127|192|172|10).d.d.d|.*:(?!(?:443)$)d+).*$":
            {
              fix: false,
              message: "Please use secure links!",
              suggest: "^https:\\/\\/",
            },
        },
      },
    ],
    "unicorn/prefer-string-replace-all": "error",
    "unicorn/prefer-at": "error",
    "unicorn/no-unsafe-regex": "error",
    "unicorn/no-unreadable-array-destructuring": "error",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/prefer-top-level-await": "off",
  },
  overrides: [
    {
      files: ["*.jsx", "*.tsx"],
      rules: {
        "unicorn/string-content": [
          "warn",
          {
            patterns: {
              "--": {
                fix: true,
                message: "Use an em dash for better for typography",
                suggest: "—",
              },
              "->": "→",
              "\\.\\.\\.": "…",
              "(?:^|[ \t])(http://)(?!localhost|(127|192|172|10).d.d.d|.*:(?!(?:443)$)d+).*$":
                {
                  fix: false,
                  message: "Please use secure links!",
                  suggest: "^https:\\/\\/",
                },
            },
          },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: ["@typescript-eslint"],
      rules: {
        "no-invalid-this": "off",
        "no-unused-vars": "off",
        "prefer-destructuring": [
          "error",
          {
            object: true,
            array: false,
          },
        ],
        "@typescript-eslint/no-invalid-this": "warn",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": [
          "warn",
          { ignoreTypeValueShadow: true },
        ],
        "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
        "@typescript-eslint/no-confusing-non-null-assertion": "warn",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "sonarjs/no-duplicate-string": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
          "warn",
          {
            functions: false,
            classes: true,
            variables: true,
            allowNamedExports: false,
          },
        ],
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { argsIgnorePattern: "^_", ignoreRestSiblings: true },
        ],
      },
    },
    {
      files: [".*rc.js"],
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
});
