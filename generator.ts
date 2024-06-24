import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { applicationSchema, manifestSchema } from './src/schemas'
import type { Application, ApplicationContent, Manifest } from './src/schemas'

export const rootDir = fileURLToPath(new URL('.', import.meta.url))

class ApplicationGenerator {
  manifest: Manifest
  application: Application

  private async loadJsonFile(file: string) {
    try {
      return JSON.parse(
        await readFile(resolve(rootDir, file + '.json'), { encoding: 'utf-8' })
      )
    } catch (error) {
      throw error
    }
  }

  async loadFiles() {
    try {
      const application = await this.loadJsonFile('application')
      const manifest = await this.loadJsonFile('manifest')

      this.manifest = manifestSchema.parse(manifest)
      this.application = applicationSchema.parse(application)
    } catch (error) {
      throw error
    }
  }

  getOutputPath(path: string) {
    return resolve(rootDir, 'dist', path)
  }

  async generateManifest(applicationContent: ApplicationContent) {
    const outDir = this.getOutputPath(applicationContent.language_code)
    const manifest = { ...this.manifest }

    manifest.icons.push(this.application.vertical.collage_template.icon_image)
    // Google Chrome on Fedora linux has been crashing :(
    // manifest.screenshots = this.application.vertical.collage_template.horizontal_slider_images

    manifest.name = applicationContent.application_name
    manifest.short_name = applicationContent.application_developer_name
    manifest.lang = applicationContent.language_code

    await writeFile(
      resolve(outDir, 'manifest.webmanifest'),
      JSON.stringify(manifest, null, 2)
    )
  }
}

export const applicationGenerator = new ApplicationGenerator()
