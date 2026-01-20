import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const virtualListProps = buildProps({
  data: {
    type: Array,
    default: () => [],
  },
  itemSize: {
    type: Number,
    default: 50,
  },
  height: {
    type: String,
    default: '300px',
  },
} as const)

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>
