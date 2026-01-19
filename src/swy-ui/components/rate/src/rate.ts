import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const rateSizes = ['large', 'default', 'small'] as const

export const rateProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最大分数
   */
  max: {
    type: Number,
    default: 5,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否允许半选
   */
  allowHalf: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 尺寸
   */
  size: {
    type: String,
    values: rateSizes,
    default: 'default',
  },
  /**
   * @description 是否显示辅助文字
   */
  showText: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自定义图标（空星）
   */
  voidIcon: {
    type: String,
    default: '☆',
  },
  /**
   * @description 自定义图标（满星）
   */
  icon: {
    type: String,
    default: '★',
  },
} as const)

export const rateEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number',
}

export type RateProps = ExtractPropTypes<typeof rateProps>
export type RatePropsPublic = ExtractPublicPropTypes<typeof rateProps>
export type RateEmits = typeof rateEmits
