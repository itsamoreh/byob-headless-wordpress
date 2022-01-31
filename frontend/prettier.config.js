// https://prettier.io/docs/en/configuration.html
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/lib/(.*)$',
    '^@/api/(.*)$',
    '^@/pages/(.*)$',
    '^@/components/structure/(.*)$',
    '^@/components/global/(.*)$',
    '^@/components/blocks/(.*)$',
    '^@/components/(.*)$',
    '^@/(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
