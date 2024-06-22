export interface Application {
  offer_url: string
  application_url: string
  icons: Icon[]
  screenshots: Screenshoot[]
  content: ApplicationContent[]
}

export interface ApplicationContent {
  name: string
  dir: string
  language_code: string
}

export interface Manifest {
  name: string
  short_name: string
  lang: string
  dir: string
  display: string
  start_url: string
  scope: string
  icons: Icon[]
  screenshots: Screenshoot[]
  prefer_related_applications: boolean
  related_applications: RelatedApplication[]
}

interface Icon {
  src: string
  sizes: string
  type: string
}

interface Screenshoot extends Icon {
  form_factor: 'narrow' | 'wide'
}

interface RelatedApplication {
  id?: string
  url: string
  // https://github.com/w3c/manifest/wiki/Platforms
  platform: string
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}
