/** File: bar.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type Bar from './bar.vue'

export const barProps = buildProps({
  always: Boolean,
  minSize: {
    type: Number,
    required: true,
  },
} as const)

export type BarProps = ExtractPropTypes<typeof barProps>
export type BarInstance = InstanceType<typeof Bar>
