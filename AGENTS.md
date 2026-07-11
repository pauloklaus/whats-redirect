# WhatsRedirect

TypeScript Vue 3 PWA: start WhatsApp chats without saving contacts.

**Before writing or reviewing code, read [doc/CODE_GUIDE.md](doc/CODE_GUIDE.md).**

**Project language:** English for docs, commits, issues, and PRs. **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) — see [doc/CODE_GUIDE.md](doc/CODE_GUIDE.md#commits).

All commands run in ephemeral Docker containers (`node:24-alpine`). Requires [Docker](https://docs.docker.com/get-docker/).

## Commands

| Command          | Purpose                                                             |
| ---------------- | ------------------------------------------------------------------- |
| `make`           | List available commands                                             |
| `make install`   | Install npm dependencies (Docker; always runs `npm install`)        |
| `make dev`       | Development server (Docker, port 5173)                              |
| `make typecheck` | TypeScript check (`vue-tsc`)                                        |
| `make lint`      | ESLint check                                                        |
| `make format`    | Prettier format (writes files)                                      |
| `make test`      | Unit tests (Vitest)                                                 |
| `make coverage`  | Unit tests with coverage report (min. 80% global)                   |
| `make build`     | Production build (`dist/`, includes typecheck)                      |
| `make icons`     | Regenerate PWA, favicon, and OG images from `public/icons/icon.svg` |

## Where to look

| Area           | Path                                            |
| -------------- | ----------------------------------------------- |
| App entry      | `src/App.vue`, `src/main.ts`                    |
| Config / env   | `src/config/`, `src/constants/`, `.env.example` |
| i18n           | `src/i18n/`, `src/i18n/locales/*.json`          |
| Reusable logic | `src/composables/`                              |
| Deploy / usage | `README.md`                                     |
