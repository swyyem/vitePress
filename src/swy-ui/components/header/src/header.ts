/** File: header.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const headerProps = buildProps({
  /**
   * @description 头部高度
   */
  height: {
    type: String,
    default: '60px',
  },
} as const)

export type HeaderProps = ExtractPropTypes<typeof headerProps>
export type HeaderPropsPublic = ExtractPublicPropTypes<typeof headerProps>
