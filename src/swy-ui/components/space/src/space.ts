import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const spaceProps = buildProps({
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
  size: {
    type: [String, Number],
    default: 'default',
    values: ['small', 'default', 'large'],
  },
  wrap: Boolean,
  fill: Boolean,
  fillRatio: {
    type: Number,
    default: 100,
  },
  align: {
    type: String,
    values: ['start', 'end', 'center', 'baseline', 'stretch'],
  },
  separator: {
    type: definePropType<string | object>([String, Object]),
  },
  tag: {
    type: String,
    default: 'div',
  },
} as const)

export type SpaceProps = ExtractPropTypes<typeof spaceProps>
