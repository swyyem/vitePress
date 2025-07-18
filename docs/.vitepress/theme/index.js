import DefaultTheme from 'vitepress/theme'
import './style.css'
import Button from '@component/Button.vue'
import '@styles'
import 'element-plus/dist/index.css'
import * as ElementPlus from 'element-plus'
import { CodePreview } from '@script-preview';
import { Demo, DemoBlock } from '@demo-block'
import { ElementPlusContainer } from "@demo-preview";
import { ProField } from "@component/index"



export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    try {
      ctx.app.use(ElementPlus)
    } catch (e) {
      console.warn(`注册组件 ${key} 失败`, e)
    }

    ctx.app.component('Demo', Demo)
    ctx.app.component('DemoBlock', DemoBlock)


    ctx.app.component(Button.name, Button)
    ctx.app.component('CodePreview', CodePreview);
    ctx.app.component('demo-preview', ElementPlusContainer)
    ctx.app.component('ProField', ProField)


    // registerComponents(ctx)
  }
}
