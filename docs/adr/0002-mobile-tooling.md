# ADR 0002: Mobile Development Tooling

## Status
Accepted

## Context
Following the initial mobile scaffold (ADR 0001), we need to establish development tooling and CI pipeline for the React Native (Expo) mobile application. This includes linting, formatting, testing infrastructure, and continuous integration to maintain code quality and consistency.

## Decision

### ESLint Configuration
We adopt a comprehensive ESLint setup with:
- **Base configs**: Expo, @react-native, @typescript-eslint/recommended
- **Additional plugins**: react-hooks, @tanstack/eslint-plugin-query
- **Custom rules**:
  - Strict import ordering and organization
  - No unused variables/imports (with underscore prefix exception)
  - Consistent type imports
  - React Native specific rules (no inline styles, no color literals, etc.)
  - React Query exhaustive deps and object syntax preferences

**Rationale**: Provides comprehensive code quality checks tailored for React Native + TypeScript + React Query stack while remaining extensible.

### Prettier Configuration
Standard Prettier setup with:
- Single quotes, trailing commas (ES5)
- 120 character print width
- 2-space indentation
- Arrow function parentheses avoided when possible

**Rationale**: Aligns with modern JavaScript/TypeScript conventions and provides sufficient line length for mobile development.

### Jest Testing Setup
Expo preset with custom configuration:
- Test setup file configuring @testing-library/jest-native
- Custom providers wrapper for QueryClient, Auth, and Theme contexts
- Path aliases matching TypeScript configuration
- Coverage thresholds set to 70% (adjustable)
- jest-junit reporter for CI integration

**Rationale**: Comprehensive testing infrastructure that mirrors production app structure while avoiding test pollution through fresh QueryClient instances.

### Node.js Version
Standardized to Node.js 20.14.0 across development and CI.

**Rationale**: Aligns with Expo's recommended Node.js version and provides consistency with existing project infrastructure (which was using Node 20.x).

### CI Pipeline Scope
Mobile-specific GitHub Actions workflow triggered only by changes to:
- mobile/** directory
- .github/workflows/mobile-ci.yml

**Rationale**: Avoids unnecessary CI runs for server/client changes and provides focused feedback for mobile development.

## Consequences

### Positive
- Consistent code formatting and quality across mobile development
- Early detection of TypeScript errors, linting issues, and test failures
- Isolated CI pipeline prevents mobile issues from affecting other project areas
- Extensible configuration allows for future enhancements

### Neutral
- Additional development dependencies and CI complexity
- Learning curve for developers unfamiliar with React Native linting rules

### TODO Items
Since the mobile scaffold (PR #1) is still pending, some integration tasks are deferred:
- **Package.json scripts**: Will add lint, format, test, typecheck scripts once mobile/package.json exists
- **Index ADR**: Will link this ADR from docs/adr/README.md once index is created

## Future Enhancements
- **Monorepo root tooling**: Consider unifying linting/formatting rules across client, server, and mobile
- **Incremental type-checking**: Implement TypeScript project references for faster CI
- **Metro caching**: Add Metro bundler caching to CI for faster builds
- **E2E testing**: Detox setup once core features are implemented
- **Code coverage integration**: Connect coverage reports to PR comments or external services

## Implementation Status
- ✅ Repository root: .editorconfig, .nvmrc updated
- ✅ Mobile tooling: ESLint, Prettier, Jest configuration
- ✅ Test infrastructure: setup.tsx, providers.tsx
- ✅ CI workflow: mobile-ci.yml
- ⏳ Package scripts: Pending mobile/package.json from scaffold PR
- ✅ Documentation: This ADR

---
**Date**: 2025-08-30  
**Authors**: Development Team  
**Reviewers**: TBD