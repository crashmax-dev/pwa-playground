export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const sw = await navigator.serviceWorker.register('./service-worker.js')

      navigator.serviceWorker.ready.then((registration) => {
        if (!registration.active) return
        registration.active.postMessage({
          type: 'init',
          data: window.__APP_DATA__
        })
      })

      if (sw.installing) {
        console.log('Service worker installing')

        Notification.requestPermission().then((result) => {
          if (result === 'granted') {
            navigator.serviceWorker.ready.then(() => {
              sw.showNotification(window.__APP_DATA__.content.name, {
                body: 'Добро пожаловать на страницу с установкой приложения',
                icon: window.__APP_DATA__.icons[0].src
              })
            })
          }
        })
      } else if (sw.waiting) {
        console.log('Service worker installed')
      } else if (sw.active) {
        console.log('Service worker active')
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
  }
}
