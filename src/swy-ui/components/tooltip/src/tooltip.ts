import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tooltipProps = buildProps({
  /**
   * @description 显示的内容
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description Tooltip 的出现位置
   */
  placement: {
    type: String,
    values: ['top', 'bottom', 'left', 'right'],
    default: 'top',
  },
  /**
   * @description 主题
   */
  effect: {
    type: String,
    values: ['dark', 'light'],
    default: 'dark',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 延迟出现，单位毫秒
   */
  showAfter: {
    type: Number,
    default: 0,
  },
} as const)

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipPropsPublic = ExtractPublicPropTypes<typeof tooltipProps>
