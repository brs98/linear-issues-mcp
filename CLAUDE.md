# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- Build: `npm run build` or `pnpm run build`
- Start server: `npm run start` or `node dist/index.js`
- Development: `npm run dev` (TypeScript watch + Node watch)
- Lint: `npm run lint`
- Format: `npm run format`
- Publish: `npm run publish:npm` or `npm run publish:docker`

## Code Style Guidelines
- **Imports**: Group external dependencies first, then internal modules. Use `.js` extension in import paths. Use `type` keyword for type imports.
- **Types**: Use strong TypeScript types. Zod schemas for validation. Import types from `types.ts`.
- **Naming**: camelCase for variables/functions, PascalCase for types/interfaces. Use descriptive names.
- **Formatting**: 2-space indentation. Use Prettier for consistent formatting.
- **Error Handling**: Try/catch blocks around API calls. Return structured error responses with `isError: true`.
- **Module Structure**: Organize code by domain in separate files under `src/tools/`.
- **Environment Variables**: Use dotenv and validate with Zod schemas in `config.ts`.

## Testing
This project doesn't currently have test scripts. When implementing tests, use the standard npm test pattern.