/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'expo',
    '@react-native',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', '@tanstack/query'],
  rules: {
    // Import rules
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unused-modules': ['error', { unusedExports: true }],
    
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],
    
    // General code quality
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    
    // React/React Native specific
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    
    // React Query rules
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};