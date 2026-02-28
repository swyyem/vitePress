/** File: timeline-item.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const timelineItemProps = buildProps({
  timestamp: String,
  hideTimestamp: Boolean,
  placement: {
    type: String,
    default: 'bottom',
    values: ['top', 'bottom'],
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'danger', 'info'],
  },
  size: {
    type: String,
    default: 'normal',
    values: ['normal', 'large'],
  },
  icon: {
    type: definePropType<object>(Object),
  },
  color: String,
  hollow: Boolean,
} as const)

export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
