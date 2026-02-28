/** File: splitter.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const splitterProps = buildProps({
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
  pane1Size: {
    type: [String, Number],
    default: 0.5,
  },
  pane1MinSize: {
    type: Number,
    default: 0.1,
  },
  pane1MaxSize: {
    type: Number,
    default: 0.9,
  },
} as const)

export const splitterEmits = {
  resize: (_pane1Size: number) => true,
}

export type SplitterProps = ExtractPropTypes<typeof splitterProps>
export type SplitterEmits = typeof splitterEmits
