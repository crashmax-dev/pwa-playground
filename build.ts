import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { build } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

import type { Application, ApplicationContent, Manifest } from './src/types'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const application = await loadJsonFile<Application>('apps')
const manifest = await loadJsonFile<Manifest>('manifest')

async function loadJsonFile<T>(file: string): Promise<T> {
  try {
    return JSON.parse(
      await readFile(resolve(__dirname, file + '.json'), { encoding: 'utf-8' })
    )
  } catch (error) {
    throw error
  }
}

async function createManifest(
  outDir: string,
  applicationContent: ApplicationContent
) {
  const manifestData = { ...manifest }

  manifestData.icons = application.icons
  // google chrome has crashed :(
  // manifestData.screenshots = application.screenshots

  manifestData.name = applicationContent.name
  manifestData.short_name = applicationContent.name
  manifestData.lang = applicationContent.language_code
  manifestData.dir = applicationContent.dir
  manifestData.related_applications.push({
    platform: 'webapp',
    // TODO: make this configurable domain
    url: `http://localhost:4173/${applicationContent.language_code}/index.html`
  })

  await writeFile(
    resolve(outDir, 'manifest.webmanifest'),
    JSON.stringify(manifestData, null, 2)
  )
}

for (const content of application.content) {
  const outDir = resolve(__dirname, 'dist', content.language_code)

  await build({
    base: './',
    build: {
      outDir
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: false,
        entry: 'src/main.ts',
        template: 'index.html',
        inject: {
          data: {
            title: content.name,
            languageCode: content.language_code,
            direction: content.dir,
            manifest: `<link rel="manifest" href="./manifest.webmanifest" />`,
            applicationData: `<script>window.__APP__ = ${JSON.stringify(content)}</script>`
          }
        }
      })

    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })

  await createManifest(outDir, content)
}
