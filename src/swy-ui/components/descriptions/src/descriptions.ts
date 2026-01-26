import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const descriptionsSizes = ['large', 'default', 'small'] as const

export const descriptionsProps = buildProps({
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 尺寸
   */
  size: {
    type: String,
    values: descriptionsSizes,
    default: 'default',
  },
  /**
   * @description 列数
   */
  column: {
    type: Number,
    default: 3,
  },
  /**
   * @description 是否带边框
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 排列方向
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
} as const)

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>
export type DescriptionsPropsPublic = ExtractPublicPropTypes<typeof descriptionsProps>
