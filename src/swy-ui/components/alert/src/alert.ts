/** File: alert.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const alertTypes = ['success', 'warning', 'info', 'error', 'primary'] as const
export const alertEffects = ['light', 'dark'] as const

export const alertProps = buildProps({
  /**
   * @description 提示类型
   */
  type: {
    type: String,
    values: alertTypes,
    default: 'info',
  },
  /**
   * @description 主题样式
   */
  effect: {
    type: String,
    values: alertEffects,
    default: 'light',
  },
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 描述性文本
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * @description 是否可关闭
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 文字是否居中
   */
  center: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 关闭按钮自定义文本
   */
  closeText: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示图标
   */
  showIcon: {
    type: Boolean,
    default: false,
  },
} as const)

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
export type AlertPropsPublic = ExtractPublicPropTypes<typeof alertProps>
export type AlertEmits = typeof alertEmits

export type AlertType = AlertProps['type']
export type AlertEffect = AlertProps['effect']
