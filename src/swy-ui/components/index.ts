// index.ts
import type { App, Plugin } from 'vue'
import type { ComponentWithInstall } from './types'
import _Button from './button'

// 单个组件类型
export type ButtonType = ComponentWithInstall<typeof _Button>

// 添加 install 方法
const Button: ButtonType = Object.assign(_Button, {
  install(app: App) {
    app.component(_Button.name, _Button)
  },
})

// 导出单个组件
export { Button }

// 组件列表
const components: Plugin[] = [Button]

// 完整库安装
export const MdUI: Plugin = {
  install(app: App) {
    components.forEach(component => {
      app.use(component)
    })

    // 可以在这里添加全局配置、指令等
    // app.config.globalProperties.$md = { version: '1.0.0' }
  },
}

// 默认导出
export default MdUI
