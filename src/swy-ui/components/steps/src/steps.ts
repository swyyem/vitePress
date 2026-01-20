import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const stepsProps = buildProps({
  active: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
  space: [String, Number],
  finishStatus: {
    type: String,
    default: 'finish',
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
  processStatus: {
    type: String,
    default: 'process',
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
  alignCenter: Boolean,
  simple: Boolean,
} as const)

export const stepsEmits = {
  change: (_newVal: number, _oldVal: number) => true,
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>
export type StepsEmits = typeof stepsEmits
