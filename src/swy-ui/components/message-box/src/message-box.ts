/** File: message-box.ts - TypeScript 类型定义 */

// ========== 依赖导入 ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, PropType } from 'vue'

// ========== Props 定义 ==========
export const messageBoxProps = buildProps({
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 消息内容 */
  message: {
    type: String,
    default: '',
  },
  /** 图标类型 */
  type: {
    type: String as PropType<'success' | 'warning' | 'info' | 'error' | ''>,
    default: '',
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /** 是否显示取消按钮 */
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  /** 是否显示确认按钮 */
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  /** 取消按钮文字 */
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  /** 确认按钮文字 */
  confirmButtonText: {
    type: String,
    default: '确定',
  },
  /** 确认按钮类型 */
  confirmButtonType: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'primary',
  },
  /** 取消按钮类型 */
  cancelButtonType: {
    type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'default',
  },
  /** 点击遮罩是否关闭 */
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  /** 按 ESC 是否关闭 */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /** 是否居中布局 */
  center: {
    type: Boolean,
    default: false,
  },
  /** 是否将 message 当作 HTML 片段渲染（注意 XSS 风险） */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
  /** 是否显示输入框（prompt 模式） */
  showInput: {
    type: Boolean,
    default: false,
  },
  /** 输入框占位文字 */
  inputPlaceholder: {
    type: String,
    default: '',
  },
  /** 输入框初始值 */
  inputValue: {
    type: String,
    default: '',
  },
} as const)

// ========== Emits 定义 ==========
export const messageBoxEmits = {
  /** 关闭弹框（×按钮 / ESC / 遮罩） */
  close: () => true,
  /** 点击取消按钮 */
  cancel: () => true,
  /** 点击确认按钮，prompt 模式时传递输入值 */
  confirm: (value?: string) => value === undefined || typeof value === 'string',
}

// ========== 类型导出 ==========
export type MessageBoxProps = ExtractPropTypes<typeof messageBoxProps>
export type MessageBoxEmits = typeof messageBoxEmits

/** 命令式 API 的选项类型（所有 Props 都可选） */
export type MessageBoxOptions = Partial<MessageBoxProps>

/** 命令式 API 的返回值 */
export interface MessageBoxResult {
  action: 'confirm' | 'cancel' | 'close'
  value?: string
}
