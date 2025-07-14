import DefaultTheme from 'vitepress/theme'
import './style.css'
import Button from '../../../src/components/Button.vue'
import '../../../src/styles/index.css'
import 'element-plus/dist/index.css'
import * as ElementPlus from 'element-plus'
// import 'vitepress-script-preview/components/style.css'; // import commonents styles
import { CodePreview, registerContext } from '../plugins/script-preview/component/';
import './registerContext'
import Demo from '../plugins/demo-block/component/container/Demo.vue'
import DemoBlock from '../plugins/demo-block/component/container/DemoBlock.vue'



import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from "../plugins/demo-preview/component/index";



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
    // ctx.app.component('DemoPreview', AntDesignContainer)
    ctx.app.component('demo-preview', ElementPlusContainer)
  }
}
