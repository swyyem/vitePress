/** File: calendar.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const calendarProps = buildProps({
  modelValue: Date,
  range: Array,
} as const)

export const calendarEmits = {
  'update:modelValue': (_value: Date) => true,
  change: (_value: Date) => true,
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarEmits = typeof calendarEmits
