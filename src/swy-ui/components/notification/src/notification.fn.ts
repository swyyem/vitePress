/** File: notification.fn.ts - 通知命令式调用 API */

// ========== Dependencies Import ==========
import { createVNode, render } from 'vue'
import NotificationVue from './notification.vue'
import type { NotificationProps } from './notification'

// ────────────────────────────────────────────────────────────────
// 类型定义
// ────────────────────────────────────────────────────────────────

/** showNotification 接受的配置选项（offset 由 API 内部管理，不需外部传入） */
export type NotificationOptions = Partial<Omit<NotificationProps, 'offset'>> & {
  /** 关闭时的自定义回调 */
  onClose?: () => void
}

/** 内部追踪每个叠放实例的结构 */
interface StackedInstance {
  /** 通知的根 DOM 元素，用于读取高度 */
  el: HTMLElement | null
  /** 组件暴露的方法（close / setOffset） */
  vm: {
    close: () => void
    setOffset: (val: number) => void
  } | null
}

// ────────────────────────────────────────────────────────────────
// 全局状态：各角落的通知实例队列
// ────────────────────────────────────────────────────────────────

/** 每个角落独立维护一个先进先出的实例队列，用于计算叠放偏移 */
const instanceQueues: Record<string, StackedInstance[]> = {
  'top-right': [],
  'top-left': [],
  'bottom-right': [],
  'bottom-left': [],
}

/** 通知之间的竖向间距（px） */
const GAP = 16

// ────────────────────────────────────────────────────────────────
// 工具函数
// ────────────────────────────────────────────────────────────────

/**
 * 计算在指定位置新增一条通知时应使用的 offset。
 * 遍历当前已存在的通知，将其高度与间距累加。
 */
function calcNextOffset(position: string): number {
  const list = instanceQueues[position] || []
  return list.reduce((acc, inst) => {
    return acc + (inst.el?.offsetHeight ?? 68) + GAP
  }, GAP)
}

/**
 * 重新计算并更新指定位置所有剩余通知的偏移量。
 * 当某条通知关闭后调用，使剩余通知平滑上移（或下移）填补空位。
 * 利用通知 SCSS 中定义的 `transition: top 0.4s / bottom 0.3s` 完成动画。
 */
function recalcOffsets(position: string): void {
  const list = instanceQueues[position] || []
  let current = GAP
  list.forEach(inst => {
    inst.vm?.setOffset(current)
    current += (inst.el?.offsetHeight ?? 68) + GAP
  })
}

// ────────────────────────────────────────────────────────────────
// 核心 API
// ────────────────────────────────────────────────────────────────

/**
 * 命令式创建并显示一条通知。
 *
 * @example
 * // 基础用法
 * showNotification({ title: '成功', message: '操作已完成', type: 'success' })
 *
 * // 快捷方法
 * showNotification.success({ title: '成功', message: '数据保存成功' })
 * showNotification.error({ title: '错误', message: '请求失败，请重试' })
 *
 * // 手动关闭
 * const close = showNotification({ title: '加载中', duration: 0 })
 * // ...
 * close()
 *
 * @param options 通知配置项
 * @returns 关闭函数，调用后立即关闭该条通知
 */
export function showNotification(options: NotificationOptions = {}): () => void {
  const position = options.position || 'top-right'

  // 计算新通知的初始偏移（在已有通知下方/上方叠加）
  const offset = calcNextOffset(position)

  // 创建独立挂载点
  const container = document.createElement('div')
  document.body.appendChild(container)

  // 用于自引用（在 onClose 回调里访问自身）
  const instance: StackedInstance = { el: null, vm: null }

  // 创建 VNode，将 onClose 作为 close emit 的监听器传入
  const vnode = createVNode(NotificationVue, {
    // 展开用户配置
    ...options,
    // 由计算得到的偏移，覆盖用户可能传入的 offset
    offset,
    // 监听 close emit：移除实例、重排偏移、卸载 DOM
    onClose: () => {
      // 从队列中移除当前实例
      const list = instanceQueues[position]
      const idx = list.indexOf(instance)
      if (idx !== -1) list.splice(idx, 1)

      // 触发剩余通知的平滑位移动画
      recalcOffsets(position)

      // 等待退出动画（约 300ms）完成后卸载 DOM
      setTimeout(() => {
        render(null, container)
        container.parentNode?.removeChild(container)
      }, 400)

      // 调用用户自定义的关闭回调
      options.onClose?.()
    },
  })

  // 渲染到 container 并挂载到 body
  render(vnode, container)

  // 填充实例数据（渲染后 el / vm 才能取到）
  instance.el = container.firstElementChild as HTMLElement
  instance.vm = vnode.component?.exposed as StackedInstance['vm']

  // 加入队列，供后续通知计算偏移
  instanceQueues[position].push(instance)

  // 返回手动关闭函数
  return () => instance.vm?.close()
}

// ────────────────────────────────────────────────────────────────
// 快捷方法（与 Element Plus ElNotification.success 用法一致）
// ────────────────────────────────────────────────────────────────

/** 显示成功通知 */
showNotification.success = (opts: Omit<NotificationOptions, 'type'>) =>
  showNotification({ ...opts, type: 'success' })

/** 显示警告通知 */
showNotification.warning = (opts: Omit<NotificationOptions, 'type'>) =>
  showNotification({ ...opts, type: 'warning' })

/** 显示错误通知 */
showNotification.error = (opts: Omit<NotificationOptions, 'type'>) =>
  showNotification({ ...opts, type: 'error' })

/** 显示普通信息通知 */
showNotification.info = (opts: Omit<NotificationOptions, 'type'>) =>
  showNotification({ ...opts, type: 'info' })
