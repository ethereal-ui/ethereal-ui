/** @type import('eslint').Linter.Config */
module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',

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

    // This one is hard to pick. Projects intended for Node ESM should
    // always use extensions like "js" or "mjs". Projects supporting
    // Deno could use ".ts", which will not work with Node and require a
    // TS configuration option. Web projects using bundlers like Rollup,
    // Vite, or WebPack support both. At the moment, I choose not to put
    // any extension as it has a better DX, and I'm using a bundler
    // anyway.
    'import/extensions': 0,

    // Disallow introducing side-effects by mistake when importing types
    '@typescript-eslint/no-import-type-side-effects': 'error',

    // I like the interface syntax more, and the older TS versions have
    // better DX and error reporting with interfaces. However, interface
    // support for declaration merging is the culprit of this annoying
    // issue: https://github.com/microsoft/TypeScript/issues/15300
    // My conclusion was to use type for most things and interface for
    // things that may benefit from declaration merging. As the latter is
    // impossible to detect in ESLint, I prefer to put the rule and
    // override it for particular situations.
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
