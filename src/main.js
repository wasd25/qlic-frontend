// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import './style.css'
import i18n from './i18n'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(i18n)

app.mount('#app')

