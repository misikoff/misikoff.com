module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:markdown/recommended',
    'plugin:mdx/recommended',
    'plugin:yml/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'before' },

          { pattern: 'next', group: 'external', position: 'before' },
          { pattern: 'next/**', group: 'external', position: 'before' },
          {
            pattern: 'contentlayer/generated',
            group: 'external',
            position: 'after',
          },

          {
            pattern: 'lib/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'content/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'components/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        distinctGroup: false,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.mdx'],
      rules: {
        // because some components are bundled with MDXContent
        'react/jsx-no-undef': 'off',
        // because math syntax causes false positives
        'no-unused-expressions': 'off',
      },
    },
  ],
}
