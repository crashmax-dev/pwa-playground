import type { Application, BeforeInstallPromptEvent } from './types'

declare global {
  interface Window {
    __APP__: Application
  }

  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export {}
