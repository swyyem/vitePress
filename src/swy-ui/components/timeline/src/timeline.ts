import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const timelineProps = buildProps({
  reverse: Boolean,
} as const)

export type TimelineProps = ExtractPropTypes<typeof timelineProps>
