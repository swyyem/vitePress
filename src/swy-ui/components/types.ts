// types/index.ts
import type { App, Plugin } from 'vue'

export interface ComponentOptions {
  name?: string
  install?: (app: App) => void
}

// 组件类型
export type ComponentWithInstall<T> = T & Plugin

// 安装函数类型
export type InstallFunction<T> = T & Plugin
