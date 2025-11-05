import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import i18n from './i18n.js' // ← Importar desde tu archivo

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(i18n) // ← Usar la instancia de i18n

app.mount('#app')