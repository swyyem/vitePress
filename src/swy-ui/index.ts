import type { App } from 'vue'
import SwyComponents from './components'

export * from './components'
export { default as SwyComponents } from './components'

export default {
  install(app: App) {
    app.use(SwyComponents)
  },
}
