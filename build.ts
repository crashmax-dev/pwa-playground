import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { build } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

import { applicationGenerator } from './generator'

await applicationGenerator.loadFiles()

for (const content of applicationGenerator.application.content) {
  await build({
    base: './',
    build: {
      outDir: applicationGenerator.getOutputPath(content.language_code)
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: false,
        entry: 'src/main.ts',
        template: 'index.html',
        inject: {
          data: {
            title: content.application_name,
            languageCode: content.language_code,
            manifest: `<link rel="manifest" href="./manifest.webmanifest" />`,
            applicationData: `<script>window.__APP_DATA__ = ${JSON.stringify({
              ...applicationGenerator.application,
              content: content
            })};</script>`
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

  await applicationGenerator.generateManifest(content)
}
