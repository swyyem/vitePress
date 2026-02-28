/** File: time-picker.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps, definePropType } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const timePickerProps = buildProps({
  modelValue: {
    type: [String, Date],
    default: '',
  },
  size: useSizeProp,
  disabled: Boolean,
  readonly: Boolean,
  clearable: {
    type: Boolean,
    default: true,
  },
  placeholder: String,
  prefixIcon: {
    type: definePropType<object>(Object),
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  valueFormat: String,
  isRange: Boolean,
  rangeSeparator: {
    type: String,
    default: '-',
  },
  startPlaceholder: String,
  endPlaceholder: String,
} as const)

export const timePickerEmits = {
  'update:modelValue': (_value: string | Date) => true,
  change: (_value: string | Date) => true,
  blur: () => true,
  focus: () => true,
  clear: () => true,
}

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
export type TimePickerEmits = typeof timePickerEmits
