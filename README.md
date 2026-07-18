# WhatsRedirect

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live demo](https://img.shields.io/badge/demo-whats.pauloklaus.com.br-25D366.svg)](https://whats.pauloklaus.com.br)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vitejs.dev/)

Open-source Vue 3 PWA that lets you start WhatsApp chats without saving contacts to your address book.

**Live demo:** [whats.pauloklaus.com.br](https://whats.pauloklaus.com.br)

Repository: [github.com/pauloklaus/whats-redirect](https://github.com/pauloklaus/whats-redirect)

## Goal

Enter a Brazilian phone number (+55), tap **Start chat**, and open the conversation in WhatsApp Web or the native app. Installable as a PWA on mobile and desktop.

## Features

- **Phone input:** Brazilian format with live masking `(DD) XXXXX-XXXX`
- **Validation:** accepts 10 or 11 digits (DDD + number)
- **Redirect:** opens `wa.me` — native app on mobile when installed, web on desktop
- **PWA:** installable on Android via Chrome; iOS via Add to Home Screen
- **i18n:** English, Portuguese (Brazil), and Spanish

## Stack

- Vue 3 (`<script setup lang="ts">`)
- TypeScript
- Vite 6
- vite-plugin-pwa
- Cloudflare Pages

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)

All project commands (`make install`, `make dev`, `make build`, `make test`, etc.) run in ephemeral containers using the `node:24-alpine` image. No local Node.js installation is required.

## Development

Clone the repository and, from the project root:

```bash
git clone https://github.com/pauloklaus/whats-redirect.git
cd whats-redirect
make dev
```

This starts an ephemeral Node 24 container, installs dependencies, and runs Vite at `http://localhost:5173`.

Press `Ctrl+C` in the terminal to stop.

### Environment variables (optional)

Copy the example file and adjust values:

```bash
cp .env.example .env
```

| Variable                   | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| `VITE_APP_NAME`            | App name shown in the UI, document title, and PWA manifest |
| `VITE_SITE_URL`            | Canonical site URL (Open Graph and meta tags)              |
| `VITE_WHATSAPP_URL_PREFIX` | WhatsApp API URL prefix (default includes country code 55) |

Restart the dev server after changing `.env`.

## Production build

```bash
make build
```

Output is written to `dist/`.

### Typecheck

```bash
make typecheck
```

Runs `vue-tsc --noEmit` (also included in `make build` and `npm run build`).

### Unit tests

```bash
make test
```

Runs Vitest once inside Docker (`vitest run`).

Coverage report (terminal + `coverage/` HTML). Fails if global coverage drops below **80%**:

```bash
make coverage
```

The project is deployed to Cloudflare Pages at [whats.pauloklaus.com.br](https://whats.pauloklaus.com.br).

| Setting                | Value           |
| ---------------------- | --------------- |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node.js version        | `24`            |

SPA routing is handled by `public/_redirects` (`/* → /index.html`).

## Icons

PNG icons are generated from `public/icons/icon.svg`:

```bash
make icons
```

## Internationalization

Supported languages: **English** (fallback), **Portuguese (Brazil)**, and **Spanish**.

The UI language is detected from the browser (`navigator.languages`).

## Android installation

1. Open the app in Chrome (HTTPS or localhost)
2. Tap **Install** (when available) or use Chrome menu → **Install app**

## Project structure

```
src/
├── App.vue                 # Root orchestrator
├── main.ts                 # App bootstrap
├── components/             # Vue SFCs + barrel (index.ts)
├── composables/            # Reusable logic (phone input, PWA, meta)
├── config/                 # Env reader (readEnv.ts)
├── constants/              # Shared constants
├── i18n/                   # vue-i18n setup and locales
├── types/                  # Shared TypeScript types
├── test/                   # Test helpers
└── utils/                  # Pure helpers (phone formatting, URL building)
```

See [doc/CODE_GUIDE.md](doc/CODE_GUIDE.md) for coding conventions.

## Contributing

Contributions are welcome! Read [doc/CODE_GUIDE.md](doc/CODE_GUIDE.md) before submitting changes.

Open an [issue](https://github.com/pauloklaus/whats-redirect/issues) to report bugs or suggest improvements, or submit a pull request.

## License

This project is open source under the [MIT](LICENSE) license.
