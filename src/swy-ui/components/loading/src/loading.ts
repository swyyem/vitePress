/** File: loading.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const loadingProps = buildProps({
  /**
   * @description 是否显示加载
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 加载文案
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * @description 是否全屏显示
   */
  fullscreen: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 遮罩背景色
   */
  background: {
    type: String,
    default: '',
  },
} as const)

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
export type LoadingPropsPublic = ExtractPublicPropTypes<typeof loadingProps>
