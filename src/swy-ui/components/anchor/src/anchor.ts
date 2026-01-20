import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const anchorProps = buildProps({
  container: String,
  offset: {
    type: Number,
    default: 0,
  },
  bound: {
    type: Number,
    default: 15,
  },
  duration: {
    type: Number,
    default: 300,
  },
  marker: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: 'default',
    values: ['default', 'underline'],
  },
  direction: {
    type: String,
    default: 'vertical',
    values: ['vertical', 'horizontal'],
  },
} as const)

export const anchorEmits = {
  click: (href: string) => typeof href === 'string',
  change: (href: string) => typeof href === 'string',
}

export type AnchorProps = ExtractPropTypes<typeof anchorProps>
export type AnchorEmits = typeof anchorEmits
