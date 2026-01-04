// src/swy-ui/index.ts
// 导出所有组件
export * from './components'
export * from './proField'
/* eslint-disable @typescript-eslint/no-explicit-any */
let installed = false
// 创建插件对象
const SwyUiPlugin = {
  install(app) {
    if (installed) return // 防止重复安装

    installed = true
    // 动态导入所有组件并注册
    const components = import.meta.glob('./components/*/index.ts', { eager: true })
    const proField = import.meta.glob('./proField/index.ts', { eager: true })
    const modules = { ...components, ...proField }

    Object.keys(modules).forEach(key => {
      const module = modules[key] as any
      Object.keys(module).forEach(exportKey => {
        const component = module[exportKey]
        if (component && (component.name || exportKey.startsWith('El'))) {
          app.component(component.name || exportKey, component)
        }
      })
    })
  },
}

export default SwyUiPlugin
