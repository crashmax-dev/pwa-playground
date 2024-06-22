import { createGlobalState } from '@vueuse/core'
import { onMounted, ref, shallowRef, watch } from 'vue'
import type { BeforeInstallPromptEvent } from '@/types'

import { useApplication } from './use-application'

export const usePWA = createGlobalState(() => {
  const beforeInstallPromptEvent = shallowRef<BeforeInstallPromptEvent | null>(
    null
  )
  const isInstalled = ref(false)
  const isInstallProgress = ref(false)
  const application = useApplication()

  watch(isInstalled, (installed) => {
    if (installed) {
      window.location.href = application.offer_url
    } else {
      // window.location.href = `${application.app_url}&hl=${application.language_code}`
    }
  })

  function triggerInstall() {
    if (!beforeInstallPromptEvent.value) return

    beforeInstallPromptEvent.value.prompt()
    isInstallProgress.value = true

    beforeInstallPromptEvent.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        isInstalled.value = true
      }

      isInstallProgress.value = false
    })
  }

  onMounted(async () => {
    // @ts-ignore
    const relatedApps = await navigator.getInstalledRelatedApps()
    console.log({ relatedApps })

    // on app launch
    window.addEventListener('DOMContentLoaded', () => {
      let displayMode = 'browser tab'

      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone'
      }

      if (displayMode === 'standalone') {
        isInstalled.value = true
      }
    })

    // on change of display mode
    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', (event) => {
        if (event.matches) {
          isInstalled.value = true
        }
      })

    // on prompt for install
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
      beforeInstallPromptEvent.value = event
    })
  })

  return {
    isInstalled,
    isInstallProgress,
    triggerInstall
  }
})
