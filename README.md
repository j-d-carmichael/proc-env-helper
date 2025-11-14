# proc-env-helper

Use to force your nodejs app to require a process env to be set, or use to ensure a default value is set.

The original process env will also be cast to the appropriate type via castValue.

## Features

- ✅ **Type casting**: Automatically converts string environment variables to appropriate types (boolean, number, null, undefined, JSON objects)
- ✅ **Precision safety**: Large integers exceeding `Number.MAX_SAFE_INTEGER` remain as strings to prevent precision loss
- ✅ **Dual module support**: Ships with both CommonJS and ES Module builds
- ✅ **TypeScript support**: Full TypeScript definitions included


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
- [Module Formats](#module-formats)
- [Available helpers](#available-helpers)
    - [getOrSetDefault](#getorsetdefault)
    - [requiredOrThrow](#requiredorthrow)
- [Example](#example)
- [Type Casting Behavior](#type-casting-behavior)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
npm install proc-env-helper
```

## Module Formats

This package supports both CommonJS and ES Modules:

```javascript
// CommonJS
const { ProcEnvHelper } = require('proc-env-helper');

// ES Module
import { ProcEnvHelper } from 'proc-env-helper';
// or
import ProcEnvHelper from 'proc-env-helper';
```

## Available helpers

#### getOrSetDefault
- **Method**: withDefault
- **Summary**: Returns the process.env value requested via ProcEnvHelper.castValue. If not found, this will 1st set a process.env value based on the default given and then return it.
```
import ProcEnvHelper from 'proc-env-helper';
ProcEnvHelper.getOrSetDefault('SWAGGER_FILE', 'latest')
```

#### requiredOrThrow
- **Method**: required
- **Summary**: Returns the process.env value requested via ProcEnvHelper.castValue or if not found,  `throw new Error(...)`
```
import ProcEnvHelper from 'proc-env-helper';
ProcEnvHelper.requiredOrThrow('JWT_SECRET')
```

## Example
```typescript
import dotenv from 'dotenv';
import ProcEnvHelper from 'proc-env-helper';
import someHelper from './helpers/someHelper';

dotenv.config();

export default {
  // Swagger file
  swaggerFile: ProcEnvHelper.getOrSetDefault('SWAGGER_FILE', 'latest'),
  jwtSecret: ProcEnvHelper.requiredOrThrow('JWT_SECRET'),

  port: ProcEnvHelper.getOrSetDefault('PORT', 666),
  
  // If PORT was not found via getOrSetDefault, it will be now be set as the default provided
  somethingElse: someHelper(process.env.PORT)
}
```

## Type Casting Behavior

The `castValue` method automatically converts string values to appropriate types:

| Input String | Output Type | Output Value         |
|--------------|-------------|----------------------|
| `"true"` or `"TRUE"` | boolean | `true`               |
| `"false"` or `"FALSE"` | boolean | `false`              |
| `"123"` | number | `123`                |
| `"10.5"` | number | `10.5`               |
| `"9007199254740992"` (> MAX_SAFE_INTEGER) | string | `"1007111254740990"` |
| `"null"` | null | `null`               |
| `"undefined"` | undefined | `undefined`          |
| `'{"key":"value"}'` | object | `{key: "value"}`     |
| `"'false'"` | string | `"false"`            |
| `"production"` | string | `"production"`       |

**Note**: Large integers that exceed `Number.MAX_SAFE_INTEGER` (2^53 - 1) are kept as strings to prevent precision loss in JavaScript.
