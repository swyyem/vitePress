/** File: message-box.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const messageBoxProps = buildProps({
  title: String,
  message: String,
  type: {
    type: String,
    values: ['success', 'warning', 'info', 'error'],
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showCancelButton: Boolean,
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  confirmButtonText: {
    type: String,
    default: '确定',
  },
  confirmButtonType: {
    type: String,
    default: 'primary',
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  buttonSize: String,
} as const)

export const messageBoxEmits = {
  close: () => true,
  cancel: () => true,
  confirm: () => true,
}

export type MessageBoxProps = ExtractPropTypes<typeof messageBoxProps>
export type MessageBoxEmits = typeof messageBoxEmits
