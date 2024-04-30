module.exports = {
  plugins: ['stylelint-prettier', 'stylelint-order', 'stylelint-scss'],
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-rational-order',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'variants', 'responsive', 'screen', 'layer'],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'prettier/prettier': true,
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'empty-line-between-groups': true,
      },
    ],
  },
};
