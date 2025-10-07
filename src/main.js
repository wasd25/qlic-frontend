// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import 'primeicons/primeicons.css'
import './style.css'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primevue/themes'


const MyAura = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#ffffff',
            100: '#ffffff',
            200: '#ffffff',
            300: '#ffffff',
            400: '#ffffff',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{primary.500}',
                    contrastColor: '#ffffff',
                    hoverColor: '{primary.600}',
                    activeColor: '{primary.700}'
                },
                highlight: {
                    background: 'transparent',
                    focusBackground: 'transparent',
                    color: '{primary.700}',
                    focusColor: '{primary.800}'
                },
                surface: {
                    0: '#ffffff'
                }
            }
        }
    },
    components: {
        select: {
            item: {
                selectedBackground: 'transparent',
                hoverBackground: 'transparent',
                selectedColor: '#1e3a8a',
                hoverColor: '#374151',
                border: 'none',
                borderRadius: '0px',
                fontWeight: '500'
            },
            root: {
                borderRadius: '8px',
                fontSize: '0.9rem',
                height: '2.5rem',
                background: '#ffffff',
                borderColor: '#d1d5db',
                padding: '0 0.75rem'
            }
        }
    }
})



const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: MyAura
    }
})
import Select from 'primevue/select'
app.component('Select', Select)

app.mount('#app')
