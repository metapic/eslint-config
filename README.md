# Metapic eslint-config

Standard ESLint configuration for Metapic projects. See [`index.ts`](./src/index.ts) for the specific rules.

## Usage

Install the package

```
pnpm add -D eslint @metapic/eslint-config
```

Create an `eslint.config.mts` file:

```typescript
import metapic from '@metapic/eslint-config'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  {
    extends: [metapic.config],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // any overrides or rule customizations
    },
  },
])

```