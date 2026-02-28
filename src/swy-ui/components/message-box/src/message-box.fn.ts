/** File: message-box.fn.ts - 命令式 MessageBox API */

// ========== 依赖导入 ==========
import { createVNode, render } from 'vue'
import MessageBoxComponent from './message-box.vue'
import type { MessageBoxOptions, MessageBoxResult } from './message-box'

// ========== 内部实现 ==========

/**
 * 创建并挂载 MessageBox 实例
 * @param message   消息内容
 * @param title     标题
 * @param options   配置项
 * @param boxType   弹框类型：alert / confirm / prompt
 */
function createBox(
  message: string,
  title: string,
  options: MessageBoxOptions,
  boxType: 'alert' | 'confirm' | 'prompt'
): Promise<MessageBoxResult> {
  return new Promise((resolve, reject) => {
    // 创建挂载容器
    const container = document.createElement('div')
    document.body.appendChild(container)

    /** 清理：卸载 vnode 并移除容器 */
    function cleanup() {
      render(null, container)
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }

    // 合并 props
    const mergedProps: Record<string, unknown> = {
      message,
      title,
      showCancelButton: boxType !== 'alert',
      showInput: boxType === 'prompt',
      closeOnClickModal: boxType !== 'alert',
      ...options,
      // 事件处理
      onConfirm: (value?: string) => {
        cleanup()
        resolve({ action: 'confirm', value })
      },
      onCancel: () => {
        cleanup()
        reject({ action: 'cancel' })
      },
      onClose: () => {
        cleanup()
        reject({ action: 'close' })
      },
    }

    // 渲染组件
    const vnode = createVNode(MessageBoxComponent, mergedProps)
    render(vnode, container)

    // 打开弹框（通过 expose 的 open 方法）
    const exposed = vnode.component?.exposed
    if (exposed?.open) {
      exposed.open()
    }
  })
}

// ========== 公开 API ==========

/** 命令式 MessageBox API（仿 Element Plus 风格） */
export const SwyMessageBox = {
  /**
   * 消息提示（仅确认按钮，不可通过遮罩关闭）
   * @example SwyMessageBox.alert('内容', '标题').then(() => { ... })
   */
  alert(
    message: string,
    title = '提示',
    options: MessageBoxOptions = {}
  ): Promise<MessageBoxResult> {
    return createBox(message, title, { showClose: true, ...options }, 'alert')
  },

  /**
   * 确认框（含取消和确认按钮）
   * @example SwyMessageBox.confirm('确定删除吗？').then(() => { /* 确认 *\/ }).catch(() => { /* 取消 *\/ })
   */
  confirm(
    message: string,
    title = '确认',
    options: MessageBoxOptions = {}
  ): Promise<MessageBoxResult> {
    return createBox(message, title, { showClose: true, ...options }, 'confirm')
  },

  /**
   * 输入框（含输入框、取消和确认按钮）
   * @example SwyMessageBox.prompt('请输入名称').then(({ value }) => { ... })
   */
  prompt(
    message: string,
    title = '输入',
    options: MessageBoxOptions = {}
  ): Promise<MessageBoxResult> {
    return createBox(message, title, { showClose: true, ...options }, 'prompt')
  },
}
