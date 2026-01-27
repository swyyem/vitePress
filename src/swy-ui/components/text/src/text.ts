import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const textTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const
export const textSizes = ['large', 'default', 'small'] as const

export const textProps = buildProps({
  /**
   * @description 文本类型
   */
  type: {
    type: String,
    values: textTypes,
    default: '',
  },
  /**
   * @description 文本尺寸
   */
  size: {
    type: String,
    values: textSizes,
    default: '',
  },
  /**
   * @description 是否截断
   */
  truncated: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 显示的行数
   */
  lineClamp: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 自定义元素标签
   */
  tag: {
    type: String,
    default: 'span',
  },
} as const)

export type TextProps = ExtractPropTypes<typeof textProps>
export type TextPropsPublic = ExtractPublicPropTypes<typeof textProps>

export type TextType = TextProps['type']
export type TextSize = TextProps['size']
