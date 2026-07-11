import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'
import { loadEnv, type Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const packageJsonPath = fileURLToPath(
  new URL('./package.json', import.meta.url),
)
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
  version: string
}

function injectBuildMeta(
  version: string,
  buildDate: string,
  siteUrl: string,
): Plugin {
  return {
    name: 'inject-build-meta',
    transformIndexHtml(html) {
      return html
        .replaceAll('%VERSION%', version)
        .replaceAll('%BUILD_DATE%', buildDate)
        .replaceAll('%VITE_SITE_URL%', siteUrl)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const appName = env.VITE_APP_NAME || 'WhatsRedirect'
  const siteUrl = (
    env.VITE_SITE_URL || 'https://whats.pauloklaus.com.br'
  ).replace(/\/$/, '')
  const buildDate = new Date().toISOString()

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      vue(),
      injectBuildMeta(packageJson.version, buildDate, siteUrl),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icons/*.png', 'icons/*.svg'],
        manifest: {
          name: appName,
          short_name: appName,
          description: 'Start WhatsApp chats without saving contacts',
          theme_color: '#25D366',
          background_color: '#f5f5f5',
          display: 'standalone',
          orientation: 'any',
          icons: [
            {
              src: 'icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],
    test: {
      environment: 'happy-dom',
      include: ['src/**/*.{test,spec}.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{ts,vue}'],
        exclude: [
          'src/**/*.{test,spec}.ts',
          'src/test/**',
          'src/types/**',
          'src/constants/**',
          'src/main.ts',
          'src/**/index.ts',
          'src/shims-vue.d.ts',
          'src/env.d.ts',
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  }
})
