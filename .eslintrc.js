module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    'plugin:prettier/recommended', // Some prettier rules override eslint rules, but we accept it
    './.eslintrc-auto-import.json',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'max-len': [
      'error',
      {
        code: 100,
        ignorePattern: '^\\s*:?(class|d)=".*"',
      },
    ],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        controlComponents: ['Field'],
      },
    ],
    'no-undef': ['off'],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['@typescript-eslint', 'vuejs-accessibility'],
};
