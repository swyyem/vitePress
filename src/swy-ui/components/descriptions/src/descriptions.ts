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
} as const)

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>
export type DescriptionsPropsPublic = ExtractPublicPropTypes<typeof descriptionsProps>
