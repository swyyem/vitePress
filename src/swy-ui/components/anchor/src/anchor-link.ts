/** File: anchor-link.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const anchorLinkProps = buildProps({
  href: {
    type: String,
    required: true,
  },
  title: String,
} as const)

export type AnchorLinkProps = ExtractPropTypes<typeof anchorLinkProps>
