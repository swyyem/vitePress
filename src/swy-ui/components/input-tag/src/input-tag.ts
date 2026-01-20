import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const inputTagProps = buildProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  placeholder: String,
  disabled: Boolean,
  size: useSizeProp,
  max: Number,
} as const)

export const inputTagEmits = {
  'update:modelValue': (_value: string[]) => true,
  change: (_value: string[]) => true,
  remove: (_tag: string, _tags: string[]) => true,
}

export type InputTagProps = ExtractPropTypes<typeof inputTagProps>
export type InputTagEmits = typeof inputTagEmits
