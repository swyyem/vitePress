/** File: footer.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const footerProps = buildProps({
  /**
   * @description 底部高度
   */
  height: {
    type: String,
    default: '60px',
  },
} as const)

export type FooterProps = ExtractPropTypes<typeof footerProps>
export type FooterPropsPublic = ExtractPublicPropTypes<typeof footerProps>
