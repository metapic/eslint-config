import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { type Linter } from 'eslint'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

type MetapicCustomizeOptions = {
  extraIgnores?: string[]
  extraAllowedImports?: string[]
}

const customize = (options?: MetapicCustomizeOptions): Linter.Config[] => [
  eslint.configs.recommended,

  {
    ignores: [
      '**/.*',
      '**/.*/',
      '**/node_modules/',
      '**/dist/',
      '**/dist-*/',
      '**/coverage/',
      'public/',
      ...(options?.extraIgnores ?? []),
    ],
  },

  /**
   * TypeScript
   * see https://typescript-eslint.io/rules/
   */
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      // https://typescript-eslint.io/getting-started/typed-linting
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
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
          disallowTypeAnnotations: false,
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
    },
  },

  /**
   * Stylistic and Prettier
   * see https://eslint.style/rules
   * see https://github.com/prettier/eslint-plugin-prettier
   * see https://prettier.io/docs/options
   *
   * The sole reason we are using Prettier is to get automatic formatting
   * for printWidth (max-len in stylistic). ESLint currently cannot
   * autoformat that rule, so we use Prettier just for that.
   *
   * The order of merging is important here: Prettier disables some Stylistic
   * rules that it handles itself. We re-enable some of them below with
   * our own preferences.
   */
  stylistic.configs.recommended,
  prettierPlugin,
  {
    rules: {
      // some rules are handled by Prettier (for now at least)
      // '@stylistic/array-bracket-spacing': ['error', 'never'],
      // '@stylistic/arrow-parens': ['error', 'always'],
      // '@stylistic/brace-style': ['error', '1tbs'],
      // '@stylistic/comma-dangle': ['error', 'always-multiline'],
      // '@stylistic/eol-last': ['error', 'always'],
      // '@stylistic/indent': ['error', 2, { offsetTernaryExpressions: true, SwitchCase: 1 }],
      // '@stylistic/max-len': ['error', { code: 140, tabWidth: 2, ignoreUrls: true }],
      // '@stylistic/no-trailing-spaces': 'error',
      // '@stylistic/object-curly-spacing': ['error', 'always'],
      // '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      // '@stylistic/semi': ['error', 'never'],
      // '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
          },
          singleline: {
            delimiter: 'semi',
          },
        },
      ],
    },
  },

  /**
   * Import plugin
   * see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
   */
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'import/no-named-as-default-member': 'off',
      'import/no-relative-parent-imports': [
        'error',
        { ignore: ['@/', ...(options?.extraAllowedImports ?? [])] },
      ],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          named: true,
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  /**
   * Custom rules
   */
  {
    rules: {
      curly: ['error', 'all'],

      'no-console': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.type='MemberExpression']" +
            '[callee.property.name=/^(log|error|warn|debug|verbose)$/]' +
            '[callee.object.name=/logger/i]' +
            "[arguments.0.type='TemplateLiteral']" +
            '[arguments.0.expressions.length>0]',
          message:
            'Do not use interpolated template literals in logger messages.' +
            ' Use a plain string with structured metadata instead.',
        },
        {
          selector:
            "CallExpression[callee.type='MemberExpression']" +
            '[callee.property.name=/^(log|error|warn|debug|verbose)$/]' +
            '[callee.object.property.name=/logger/i]' +
            "[arguments.0.type='TemplateLiteral']" +
            '[arguments.0.expressions.length>0]',
          message:
            'Do not use interpolated template literals in logger messages.' +
            ' Use a plain string with structured metadata instead.',
        },
      ],
    },
  },
]

export const configs = {
  recommended: customize(),
}

export default {
  configs,
}
