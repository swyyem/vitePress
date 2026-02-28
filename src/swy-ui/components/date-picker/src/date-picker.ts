/** File: date-picker.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps, definePropType } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const datePickerProps = buildProps({
  modelValue: {
    type: [String, Date],
    default: '',
  },
  type: {
    type: String,
    default: 'date',
    values: [
      'year',
      'month',
      'date',
      'dates',
      'week',
      'datetime',
      'datetimerange',
      'daterange',
      'monthrange',
    ],
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
  format: String,
  valueFormat: String,
  rangeSeparator: {
    type: String,
    default: '-',
  },
  startPlaceholder: String,
  endPlaceholder: String,
  disabledDate: Function,
} as const)

export const datePickerEmits = {
  'update:modelValue': (_value: string | Date) => true,
  change: (_value: string | Date) => true,
  blur: () => true,
  focus: () => true,
  clear: () => true,
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerEmits = typeof datePickerEmits
