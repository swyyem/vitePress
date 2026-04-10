import { createApp } from 'vue'
import SwyUiPlugin from './swy-ui'
import App from './App.vue'

const app = createApp(App)
app.use(SwyUiPlugin)
app.mount('#app')
