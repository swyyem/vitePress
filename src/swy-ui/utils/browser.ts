import { isClient, isIOS } from '@vueuse/core'

// 浏览器/设备环境检测工具函数

export const isFirefox = (): boolean => isClient && /firefox/i.test(window.navigator.userAgent)

export const isAndroid = (): boolean => isClient && /android/i.test(window.navigator.userAgent)

export { isClient, isIOS }
