import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const rowProps = buildProps({
  tag: {
    type: String,
    default: 'div',
  },
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    default: 'start',
    values: ['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'],
  },
  align: {
    type: String,
    default: 'top',
    values: ['top', 'middle', 'bottom'],
  },
} as const)

export type RowProps = ExtractPropTypes<typeof rowProps>
