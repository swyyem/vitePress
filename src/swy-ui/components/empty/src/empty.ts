/** File: empty.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const emptyProps = buildProps({
  /**
   * @description 图片地址
   */
  image: {
    type: String,
    default: '',
  },
  /**
   * @description 图片尺寸
   */
  imageSize: Number,
  /**
   * @description 描述文字
   */
  description: {
    type: String,
    default: '',
  },
} as const)

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
export type EmptyPropsPublic = ExtractPublicPropTypes<typeof emptyProps>
