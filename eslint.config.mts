import { defineConfig } from 'eslint/config'
import globals from 'globals'

import { configs } from './src/index'

export default defineConfig([
  {
    extends: [configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
])
