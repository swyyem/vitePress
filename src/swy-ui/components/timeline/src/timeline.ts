/** File: timeline.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const timelineProps = buildProps({
  reverse: Boolean,
  center: Boolean,
} as const)

export type TimelineProps = ExtractPropTypes<typeof timelineProps>
