import { defineConfig } from 'eslint/config'
import globals from 'globals'

import { config } from './src/index'

export default defineConfig([
  {
    extends: [config],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
])
