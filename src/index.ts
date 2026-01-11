import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import * as importPlugin from 'eslint-plugin-import';

const config: Linter.Config[] = [
  // TypeScript ESLint recommended config
  ...tseslint.configs.recommended,
  
  // Stylistic plugin configuration
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Stylistic rules
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/max-len': ['warn', { code: 120 }],
    },
  },
  
  // Import plugin configuration
  {
    plugins: {
      import: importPlugin,
    },
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
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/named': 'off', // TypeScript handles this
    },
  },
  
  // TypeScript-specific rules
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export = config;
