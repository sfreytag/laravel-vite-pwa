import './bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import { usePwa } from './composables/usePwa'
const { createPwa } = usePwa()
createPwa()
createApp(App).mount('#app')
