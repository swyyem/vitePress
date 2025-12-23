import DefaultTheme from 'vitepress/theme'
import './style.css'
// import 'element-plus/dist/index.css'
// import * as ElementPlus from 'element-plus'
import SwyUi from '@swy-uis/index'
import { CodePreview } from '@script-preview'
import { Demo, DemoBlock } from '@demo-block'
import { ElementPlusContainer } from '@demo-preview'
// import ProTable, {
//   ProText,
//   ProField,
//   ProForm,
//   ProFormList,
//   ModalForm,
//   DrawerForm,
//   QueryFilter,
//   ProFieldsComponent,
//   ProOption,
//   ProSelect,
//   ProTransfer,
//   ProInputTag,
//   ProColumn,
//   ProInternalAddPrefix,
// } from '../../../src/toco-ui/index'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    // try {
    //   ctx.app.use(ElementPlus)
    // } catch (e) {
    //   console.warn(`注册组件 ${key} 失败`, e)
    // }

    try {
      ctx.app.use(SwyUi)
    } catch (e) {
      console.warn(`注册组件 ${key} 失败`, e)
    }

    ctx.app.component('Demo', Demo)
    ctx.app.component('DemoBlock', DemoBlock)

    ctx.app.component('CodePreview', CodePreview)
    ctx.app.component('demo-preview', ElementPlusContainer)

    // ctx.app.component('ProField', ProField)
    // ctx.app.component('ProFormField', ProFieldsComponent)
    // ctx.app.component('ProForm', ProForm)
    // ctx.app.component('ProFormList', ProFormList)
    // ctx.app.component('ModalForm', ModalForm)
    // ctx.app.component('DrawerForm', DrawerForm)
    // ctx.app.component('QueryFilter', QueryFilter)
    // ctx.app.component('ProOption', ProOption)
    // ctx.app.component('ProSelect', ProSelect)
    // ctx.app.component('ProInputTag', ProInputTag)
    // ctx.app.component('ProTransfer', ProTransfer)
    // ctx.app.component('ProColumn', ProColumn)
    // ctx.app.component('ProInternalAddPrefix', ProInternalAddPrefix)
    // ctx.app.component('ProTable', ProTable)
    // ctx.app.component('ProText', ProText)

    // registerComponents(ctx)
  },
}
