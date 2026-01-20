import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const timeSelectProps = buildProps({
  modelValue: String,
  disabled: Boolean,
  readonly: Boolean,
  editable: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  size: useSizeProp,
  placeholder: String,
  start: {
    type: String,
    default: '09:00',
  },
  end: {
    type: String,
    default: '18:00',
  },
  step: {
    type: String,
    default: '00:30',
  },
  minTime: String,
  maxTime: String,
  format: {
    type: String,
    default: 'HH:mm',
  },
} as const)

export const timeSelectEmits = {
  'update:modelValue': (_value: string) => true,
  change: (_value: string) => true,
  blur: () => true,
  focus: () => true,
  clear: () => true,
}

export type TimeSelectProps = ExtractPropTypes<typeof timeSelectProps>
export type TimeSelectEmits = typeof timeSelectEmits
