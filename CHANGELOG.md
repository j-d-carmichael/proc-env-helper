<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Changelog](#changelog)
  - [[1.1.0] - 2025-11-14](#110---2025-11-14)
    - [Added](#added)
    - [Changed](#changed)
    - [Fixed](#fixed)
  - [[1.0.3] - Previous Release](#103---previous-release)
    - [Initial Features](#initial-features)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-14

### Added
- **Dual module support**: Package now ships with both CommonJS and ES Module builds
  - CommonJS output in `build/cjs/`
  - ES Module output in `build/esm/`
  - Proper `exports` field in package.json for modern module resolution
- **Precision safety**: Large integers exceeding `Number.MAX_SAFE_INTEGER` (2^53 - 1) now remain as strings to prevent precision loss
  - Added `Number.isSafeInteger()` check in `castValue` method
  - Floating point numbers still converted to number type
- Test coverage for large integer handling
- Test coverage for `MAX_SAFE_INTEGER` boundary

### Changed
- Build process now outputs to separate `build/cjs/` and `build/esm/` directories
- Updated package.json with `main`, `module`, `types`, and `exports` fields
- Enhanced README.md with:
  - Features section
  - Installation instructions
  - Module format usage examples
  - Type casting behavior table
  - Precision safety documentation

### Fixed
- Prevented precision loss when parsing large integer strings from environment variables
- ESLint `@typescript-eslint/no-loss-of-precision` errors for large numbers

## [1.0.3] - Previous Release

### Initial Features
- `getOrSetDefault()` - Get environment variable or set a default value
- `requiredOrThrow()` - Require environment variable or throw error
- Automatic type casting for:
  - Booleans (`true`, `false`, `TRUE`, `FALSE`)
  - Numbers (integers and floats)
  - Null and undefined
  - JSON objects
  - Quoted strings
- TypeScript support with full type definitions
