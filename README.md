# Metapic eslint-config

Standard [ESLint configuration](https://eslint.org/docs/latest/extend/shareable-configs) for Metapic projects. See [`index.ts`](./src/index.ts) for the specific rules.

## Usage

Install the package:

```
pnpm add -D jiti eslint @metapic/eslint-config
```

Create an `eslint.config.ts` file:

```typescript
import metapic from '@metapic/eslint-config'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig({
  extends: [metapic.configs.recommended],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    // any overrides or rule customizations
  },
})
```
