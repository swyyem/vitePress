/** File: tooltip.ts - TypeScript File */

// ========== Dependencies Import ==========
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
    values: [
      'top',
      'bottom',
      'left',
      'right',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-start',
      'left-end',
      'right-start',
      'right-end',
    ] as const,
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
  /**
   * @description 是否手动控制显示
   */
  visible: {
    type: Boolean,
    default: null,
  },
} as const)

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipPropsPublic = ExtractPublicPropTypes<typeof tooltipProps>
