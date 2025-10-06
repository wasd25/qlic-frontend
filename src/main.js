// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import './style.css'


const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')

