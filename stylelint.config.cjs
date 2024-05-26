module.exports = {
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: ['stylelint-config-recommended-vue'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'tailwind',
        ],
      },
    ],
    'no-descending-specificity': null,
    'order/properties-order': [],
  },
};
