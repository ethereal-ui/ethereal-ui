/** @type import('eslint').Linter.Config */
module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './packages/*/tsconfig.dev.json',
  },

  ignorePatterns: ['lib'],

  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts?(x)',
          '**/*.test-d.ts?(x)',
          '**/eslint.config.{js,ts}',
          '**/vite.config.{js,ts}',
        ],
      },
    ],

    // This is the opposite to the default AirBnb rules, the reason for the switch
    // is explained here:
    // https://github.com/airbnb/javascript/issues/1365#issuecomment-617773315
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // Allow the use of ForOfStatement that is disabled by AirBnb rules:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L347
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    'no-restricted-exports': [
      'error',
      {
        // "then" causes confusion when your module is dynamically
        // `import()`ed, and will break in most node ESM versions
        restrictedNamedExports: ['then'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.config.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
