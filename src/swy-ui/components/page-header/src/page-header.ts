/** File: page-header.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const pageHeaderProps = buildProps({
  title: String,
  content: String,
  backText: {
    type: String,
    default: '返回',
  },
  breadcrumb: {
    type: definePropType<Array<{ title: string; path?: string }>>(Array),
  },
} as const)

export const pageHeaderEmits = {
  back: () => true,
}

export type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>
export type PageHeaderEmits = typeof pageHeaderEmits
