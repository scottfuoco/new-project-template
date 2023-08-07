module.exports = {
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: 'all',
  arrowParens: 'always',
  quoteProps: 'as-needed',
  proseWrap: 'always',
  jsxSingleQuote: false,
  endOfLine: 'lf',
  singleAttributePerLine: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['^./environment.*', '<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        trailingComma: 'none',
        proseWrap: 'never',
      },
    },
  ],
  plugins: ['prettier-plugin-sh', 'prettier-plugin-pkg', 'prettier-plugin-jsdoc'],
};
