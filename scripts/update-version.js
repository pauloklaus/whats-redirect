#!/usr/bin/env node
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const PREFIX_COMMANDS = {
  'fix:': 'npm version patch --no-git-tag-version',
  'fix(': 'npm version patch --no-git-tag-version',
  'refact:': 'npm version patch --no-git-tag-version',
  'refact(': 'npm version patch --no-git-tag-version',
  'refactor:': 'npm version patch --no-git-tag-version',
  'refactor(': 'npm version patch --no-git-tag-version',
  'style:': 'npm version patch --no-git-tag-version',
  'style(': 'npm version patch --no-git-tag-version',
  'feat:': 'npm version minor --no-git-tag-version',
  'feat(': 'npm version minor --no-git-tag-version',
  'breaking:': 'npm version major --no-git-tag-version',
  'breaking(': 'npm version major --no-git-tag-version',
}

function getVersionCommand(title = '') {
  for (const [prefix, command] of Object.entries(PREFIX_COMMANDS)) {
    if (title.startsWith(prefix)) return command
  }
}

function main() {
  const title = process.argv[2] ?? ''

  if (process.argv.includes('--should-tag')) {
    process.stdout.write(getVersionCommand(title) ? 'yes' : 'no')
    return
  }

  const command = getVersionCommand(title)
  if (!command) {
    console.log('No version update needed')
    return
  }

  execSync(command, { stdio: 'inherit', cwd: root })

  const packageJson = JSON.parse(
    fs.readFileSync(join(root, 'package.json'), 'utf8'),
  )
  console.info(`Version updated to "${packageJson.version}"`)
}

main()
