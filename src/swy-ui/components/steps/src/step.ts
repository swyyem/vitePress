/** File: step.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const stepProps = buildProps({
  title: String,
  description: String,
  icon: String,
  status: {
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
} as const)

export type StepProps = ExtractPropTypes<typeof stepProps>
