/** File: tour.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const tourProps = buildProps({
  modelValue: Boolean,
  steps: {
    type: Array,
    default: () => [],
  },
  current: {
    type: Number,
    default: 0,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    default: 'bottom',
  },
  zIndex: Number,
} as const)

export const tourEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  change: (current: number) => typeof current === 'number',
  close: (current: number) => typeof current === 'number',
  finish: () => true,
}

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourEmits = typeof tourEmits
