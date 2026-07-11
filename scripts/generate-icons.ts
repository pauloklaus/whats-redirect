#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const iconsDir = join(root, 'public', 'icons')

const sourceSvg = readFileSync(join(iconsDir, 'icon.svg'), 'utf8')
const iconPaths =
  sourceSvg.replace(/currentColor/g, '#25D366').match(/<g[\s\S]*<\/g>/)?.[0] ??
  sourceSvg

const ogLocales: Record<string, string> = {
  en: 'WhatsApp redirect PWA',
  pt: 'Redirecionador WhatsApp PWA',
  es: 'Redireccionador WhatsApp PWA',
}

const OG_FONT_FAMILY = 'DejaVu Sans, sans-serif'

function buildAppIcon(size: number): string {
  const padding = Math.round(size * 0.18)
  const iconSize = size - padding * 2
  const radius = Math.round(size * 0.12)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#ffffff"/>
  <svg x="${padding}" y="${padding}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24">
    ${iconPaths}
  </svg>
</svg>`
}

function buildFaviconBadge(size: number, background: string): string {
  const padding = Math.round(size * 0.18)
  const iconSize = size - padding * 2
  const radius = Math.round(size * 0.22)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${background}"/>
  <svg x="${padding}" y="${padding}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24">
    ${iconPaths}
  </svg>
</svg>`
}

function buildFaviconSvg(background: string): string {
  const padding = 4
  const iconSize = 24

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${background}"/>
  <svg x="${padding}" y="${padding}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24">
    ${iconPaths}
  </svg>
</svg>`
}

function buildOgImage(subtitle: string): string {
  const width = 1200
  const height = 630

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#f5f5f5"/>
  <rect x="80" y="80" width="470" height="470" rx="48" fill="#ffffff" stroke="#e0e0e0" stroke-width="2"/>
  <svg x="155" y="155" width="320" height="320" viewBox="0 0 24 24">
    ${iconPaths}
  </svg>
  <text x="620" y="250" fill="#1a1a1a" font-family="${OG_FONT_FAMILY}" font-size="72" font-weight="700">WhatsRedirect</text>
  <text x="620" y="340" fill="#666666" font-family="${OG_FONT_FAMILY}" font-size="36">${subtitle}</text>
  <text x="620" y="420" fill="#25D366" font-family="${OG_FONT_FAMILY}" font-size="28">whats.pauloklaus.com.br</text>
</svg>`
}

async function writePng(
  filename: string,
  svg: string,
  size: number,
): Promise<void> {
  const output = join(iconsDir, filename)
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(output)
  console.log(`Created ${filename}`)
}

async function writeOgImage(filename: string, subtitle: string): Promise<void> {
  const output = join(iconsDir, filename)
  await sharp(Buffer.from(buildOgImage(subtitle)))
    .png()
    .toFile(output)
  console.log(`Created ${filename}`)
}

await writePng('icon-192.png', buildAppIcon(192), 192)
await writePng('icon-512.png', buildAppIcon(512), 512)
await writePng('apple-touch-icon.png', buildAppIcon(180), 180)
await writePng('favicon-light-32.png', buildFaviconBadge(32, '#ffffff'), 32)
await writePng('favicon-dark-32.png', buildFaviconBadge(32, '#1a1a1a'), 32)
await writePng('favicon-light-16.png', buildFaviconBadge(16, '#ffffff'), 16)
await writePng('favicon-dark-16.png', buildFaviconBadge(16, '#1a1a1a'), 16)

writeFileSync(
  join(iconsDir, 'favicon-light.svg'),
  buildFaviconSvg('#ffffff'),
  'utf8',
)
writeFileSync(
  join(iconsDir, 'favicon-dark.svg'),
  buildFaviconSvg('#1a1a1a'),
  'utf8',
)
console.log('Created favicon-light.svg')
console.log('Created favicon-dark.svg')

for (const [locale, subtitle] of Object.entries(ogLocales)) {
  await writeOgImage(`og-image-${locale}.png`, subtitle)
}
