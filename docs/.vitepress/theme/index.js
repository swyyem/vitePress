import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
import './style.css'
import Button from '../../../src/components/Button.vue'
import '../../../src/styles/index.css'
import 'element-plus/dist/index.css'
import * as ElementPlus from 'element-plus'
import 'vitepress-script-preview/components/style.css'; // import commonents styles
import { CodePreview } from 'vitepress-script-preview/components';
import './registerContext'


import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
//  import { ElementPlusContainer } from '@vitepress-demo-preview/component'

    import '@vitepress-demo-preview/component/dist/style.css'



export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    try {
      ctx.app.use(ElementPlus)
    } catch (e) {
      console.warn(`注册组件 ${key} 失败`, e)
    }

    useComponents(ctx.app)
    ctx.app.component(Button.name, Button)
    ctx.app.component('CodePreview', CodePreview);
    // ctx.app.component('DemoPreview', AntDesignContainer)
    ctx.app.component('demo-preview', ElementPlusContainer)
  }
}
