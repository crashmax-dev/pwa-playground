if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then((registration) => {
      // Notification.requestPermission().then((result) => {
      //   if (result === 'granted') {
      //     navigator.serviceWorker.ready.then(() => {
      //       registration.showNotification(window.__APP_DATA__.content.name, {
      //         body: 'Добро пожаловать на страницу с установкой приложения',
      //         icon: window.__APP_DATA__.icons[0].src
      //       })
      //     })
      //   }
      // })

      console.log(
        `ServiceWorker registration successful with scope: ${registration.scope}`
      )
      return registration.update()
    })
    .then(() => console.log(`ServiceWorker updated`))
    .catch((err) => console.log('ServiceWorker registration failed: ', err))

  navigator.serviceWorker.ready.then((registration) => {
    if (!registration.active) return
    registration.active.postMessage({
      type: 'init',
      data: window.__APP_DATA__
    })
  })
}
