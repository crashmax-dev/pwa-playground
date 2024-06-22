import type { ApplicationData, BeforeInstallPromptEvent } from './types'

declare global {
  interface Window {
    __APP_DATA__: ApplicationData
  }

  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export {}
