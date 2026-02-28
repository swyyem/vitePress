/** File: breadcrumb.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const breadcrumbProps = buildProps({
  /**
   * @description 分隔符
   */
  separator: {
    type: String,
    default: '/',
  },
} as const)

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
export type BreadcrumbPropsPublic = ExtractPublicPropTypes<typeof breadcrumbProps>
