/** File: loading.fn.ts - Loading 命令式 API */

// ========== Dependencies Import ==========
import { createVNode, render } from 'vue'
import LoadingVue from './loading.vue'

// ────────────────────────────────────────────────────────────────
// 类型定义
// ────────────────────────────────────────────────────────────────

/** showLoading 可接受的配置项 */
export interface ShowLoadingOptions {
  /** 加载中文案 */
  text?: string
  /** 遮罩背景色，例如 'rgba(0,0,0,0.8)' */
  background?: string
  /** spinner 主色，覆盖默认主题色 */
  color?: string
  /** 是否锁定页面滚动，默认 true */
  lock?: boolean
}

// ────────────────────────────────────────────────────────────────
// 内部状态
// ────────────────────────────────────────────────────────────────

/**
 * 当前全屏加载的挂载容器。
 * 同一时刻只允许存在一个全屏加载，重复调用 showLoading 会先关闭前一个。
 */
let fullscreenContainer: HTMLElement | null = null

// ────────────────────────────────────────────────────────────────
// 核心 API
// ────────────────────────────────────────────────────────────────

/**
 * 命令式创建并显示全屏加载。
 *
 * @example
 * // 基础用法
 * const close = showLoading({ text: '数据加载中...' })
 *
 * // 异步结束后关闭
 * await fetchData()
 * close()
 *
 * // 或者直接调用 closeLoading()
 * closeLoading()
 *
 * @param options 配置项（可选）
 * @returns 关闭函数
 */
export function showLoading(options: ShowLoadingOptions = {}): () => void {
  // 先关闭已有的全屏加载（防止重复叠加）
  if (fullscreenContainer) {
    closeLoading()
  }

  // 创建挂载容器并追加到 body
  const container = document.createElement('div')
  document.body.appendChild(container)
  fullscreenContainer = container

  // 创建 VNode（fullscreen=true 让组件内部通过 teleport 挂载遮罩到 body）
  const vnode = createVNode(LoadingVue, {
    loading: true,
    fullscreen: true,
    text: options.text ?? '',
    background: options.background ?? '',
    color: options.color ?? '',
    lock: options.lock !== false, // 默认锁定滚动
  })

  render(vnode, container)

  return closeLoading
}

/**
 * 关闭全屏加载。
 * 可以作为 showLoading 返回值调用，也可以独立调用。
 */
export function closeLoading(): void {
  if (!fullscreenContainer) return

  // 卸载 Vue 组件（会同步清理 teleport 挂载的 DOM 和 scroll lock watch）
  render(null, fullscreenContainer)

  // 从 body 移除容器
  fullscreenContainer.parentNode?.removeChild(fullscreenContainer)
  fullscreenContainer = null

  // 确保 body scroll 解锁（组件 watch cleanup 有时序问题时兜底）
  document.body.style.overflow = ''
}
