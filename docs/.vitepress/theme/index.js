import DefaultTheme from 'vitepress/theme'
import './style.css'

import SwyUi from '@swy-uis/index'
import '@swy-uis/theme-chalk/src/index.scss'
import { CodePreview } from '@script-preview'
import { Demo, DemoBlock } from '@demo-block'
import { ElementPlusContainer } from '@demo-preview'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    // 使用更可靠的组件注册检查机制
    if (!ctx.app.config.globalProperties.$swyUiInstalled) {
      ctx.app.config.globalProperties.$swyUiInstalled = true
      try {
        ctx.app.use(SwyUi)
      } catch (e) {
        console.warn(`注册 SwyUi 组件库失败`, e)
      }
    }

    ctx.app.component('Demo', Demo)
    ctx.app.component('DemoBlock', DemoBlock)

    ctx.app.component('CodePreview', CodePreview)
    ctx.app.component('demo-preview', ElementPlusContainer)
  },
}
