import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const messageTypes = ['primary', 'success', 'info', 'warning', 'error'] as const

export const messageProps = buildProps({
  /**
   * @description 消息类型
   */
  type: {
    type: String,
    values: messageTypes,
    default: 'info',
  },
  /**
   * @description 消息内容
   */
  message: {
    type: String,
    default: '',
  },
  /**
   * @description 显示时长，毫秒。设为 0 则不会自动关闭
   */
  duration: {
    type: Number,
    default: 3000,
  },
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否居中显示
   */
  center: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自定义图标
   */
  icon: {
    type: String,
    default: '',
  },
} as const)

export const messageEmits = {
  close: () => true,
}

export type MessageProps = ExtractPropTypes<typeof messageProps>
export type MessagePropsPublic = ExtractPublicPropTypes<typeof messageProps>
export type MessageEmits = typeof messageEmits
