import { createApp } from 'vue'

import App from './app.vue'
import { registerServiceWorker } from './service-worker'

import './style.css'

registerServiceWorker()
createApp(App).mount('#app')
