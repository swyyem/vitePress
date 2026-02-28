/** File: badge.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const badgeTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

export const badgeProps = buildProps({
  /**
   * @description 显示值
   */
  value: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 最大值，超过最大值会显示 '{max}+'
   */
  max: {
    type: Number,
    default: 99,
  },
  /**
   * @description 小圆点
   */
  isDot: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 隐藏徽章
   */
  hidden: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 徽章类型
   */
  type: {
    type: String,
    values: badgeTypes,
    default: 'danger',
  },
} as const)

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgePropsPublic = ExtractPublicPropTypes<typeof badgeProps>

export type BadgeType = BadgeProps['type']
