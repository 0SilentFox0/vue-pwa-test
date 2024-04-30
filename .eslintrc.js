module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'eslint:recommended',
    'airbnb-typescript/base',
    'prettier',
  ],
  rules: {
    // '@typescript-eslint/indent': ['error', 2],
    // always === except when comparing to null. undefined == null -> true.
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'import/extensions': 'off',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'import/no-extraneous-dependencies': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below',
      },
    ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below',
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'CONDITIONALS',
          'DEFINITION',
          'LIST_RENDERING',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    quotes: [2, 'single', { avoidEscape: true }],
    'vue/no-v-html': 'off',
    // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',
    // TS already checks for that, and Typescript-Eslint recommends to disable it
    // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  ignorePatterns: [
    '**/*.js',
    '.eslintrc.cjs',
    'stylelint.config.js',
    'postcss.config.js',
    'src/useFunctions/*.js',
    'src/tests/unit/*.js',
    'dist',
  ],
};
