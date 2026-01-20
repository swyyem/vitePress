import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const segmentedProps = buildProps({
  modelValue: [String, Number, Boolean],
  options: {
    type: Array,
    default: () => [],
  },
  size: useSizeProp,
  block: Boolean,
  disabled: Boolean,
} as const)

export const segmentedEmits = {
  'update:modelValue': (_value: string | number | boolean) => true,
  change: (_value: string | number | boolean, _index: number) => true,
}

export type SegmentedProps = ExtractPropTypes<typeof segmentedProps>
export type SegmentedEmits = typeof segmentedEmits
