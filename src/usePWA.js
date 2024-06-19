import { ref, shallowRef, onMounted, watch } from "vue"
import { createGlobalState, useLocalStorage } from "@vueuse/core"

export const usePWA = createGlobalState(() => {
  const pwa = shallowRef(null)
  const isInstalled = ref(false)
  const isInstallProgress = ref(false)
  const isDownloaded = useLocalStorage('is-downloaded', false)

  watch(isInstalled, (installed) => {
    if (installed) {
      window.location.href = 'https://example.com'
    }
  })

  function triggerInstall() {
    if (!pwa.value) return

    pwa.value.prompt()
    isInstallProgress.value = true

    pwa.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        isInstalled.value = true
        isDownloaded.value = true
      }

      isInstallProgress.value = false
    })
  }

  onMounted(() => {
    // on app launch
    window.addEventListener('DOMContentLoaded', () => {
      let displayMode = 'browser tab'

      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
      }

      if (displayMode === 'standalone') {
        isInstalled.value = true
      }
    });

    // on change of display mode
    window.matchMedia('(display-mode: standalone)')
      .addEventListener("change", (event) => {
      if (event.matches) {
        isInstalled.value = true
      }
    })

    // on prompt for install
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      isDownloaded.value = false;
      pwa.value = event;
    });
  })

  return {
    isInstalled,
    isInstallProgress,
    isDownloaded,
    triggerInstall
  }
})
