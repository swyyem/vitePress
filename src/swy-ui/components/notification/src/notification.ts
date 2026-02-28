/** File: notification.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const notificationProps = buildProps({
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 说明文字
   */
  message: {
    type: String,
    default: '',
  },
  /**
   * @description 类型
   */
  type: {
    type: String,
    values: ['success', 'warning', 'info', 'error'],
    default: 'info',
  },
  /**
   * @description 显示时间，毫秒。设为 0 则不会自动关闭
   */
  duration: {
    type: Number,
    default: 4500,
  },
  /**
   * @description 位置
   */
  position: {
    type: String,
    values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    default: 'top-right',
  },
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 距离顶部的偏移量
   */
  offset: {
    type: Number,
    default: 16,
  },
} as const)

export const notificationEmits = {
  close: () => true,
}

export type NotificationProps = ExtractPropTypes<typeof notificationProps>
export type NotificationPropsPublic = ExtractPublicPropTypes<typeof notificationProps>
export type NotificationEmits = typeof notificationEmits
