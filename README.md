# @metapic/eslint-config

Shareable ESLint configuration for Metapic projects using TypeScript.

## Features

This configuration includes:
- **typescript-eslint**: TypeScript-specific linting rules
- **@stylistic/eslint-plugin**: Code style and formatting rules
- **eslint-plugin-import**: Import/export statement linting

## Installation

```bash
npm install --save-dev @metapic/eslint-config eslint typescript
```

## Usage

Create an `eslint.config.js` file in your project root:

```javascript
import metapicConfig from '@metapic/eslint-config';

export default [
  ...metapicConfig,
  // Your custom configuration can go here
];
```

Or if using CommonJS:

```javascript
const metapicConfig = require('@metapic/eslint-config');

module.exports = [
  ...metapicConfig,
  // Your custom configuration can go here
];
```

## Included Rules

### TypeScript ESLint
- Uses recommended TypeScript ESLint configuration
- Enforces proper type usage with warnings for `any` types
- Enforces unused variable checks (with `_` prefix exception)

### Stylistic
- Indent: 2 spaces
- Quotes: Single quotes
- Semicolons: Required
- Trailing commas: Required in multiline
- Object spacing: Required
- Array spacing: Not allowed
- Brace style: 1tbs (one true brace style)
- Max line length: 120 characters (warning)

### Import
- Enforces import order (builtin → external → internal → parent → sibling → index)
- Alphabetizes imports
- Prevents duplicate imports
- Delegates resolution to TypeScript

## Development

To build this package:

```bash
npm run build
```

## License

ISC