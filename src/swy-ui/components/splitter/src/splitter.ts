import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const splitterProps = buildProps({
  modelValue: {
    type: [String, Number],
    default: '50%',
  },
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
} as const)

export const splitterEmits = {
  'update:modelValue': (_value: string | number) => true,
  resize: (_value: string | number) => true,
}

export type SplitterProps = ExtractPropTypes<typeof splitterProps>
export type SplitterEmits = typeof splitterEmits
