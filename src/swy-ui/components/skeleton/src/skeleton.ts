/** File: skeleton.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const skeletonProps = buildProps({
  /**
   * @description 是否显示动画
   */
  animated: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 渲染多少个骨架屏
   */
  count: {
    type: Number,
    default: 1,
  },
  /**
   * @description 段落行数
   */
  rows: {
    type: Number,
    default: 3,
  },
  /**
   * @description 是否显示加载状态
   */
  loading: {
    type: Boolean,
    default: true,
  },
} as const)

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonPropsPublic = ExtractPublicPropTypes<typeof skeletonProps>
