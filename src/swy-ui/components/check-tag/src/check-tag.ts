import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const checkTagProps = buildProps({
  checked: Boolean,
  disabled: Boolean,
} as const)

export const checkTagEmits = {
  'update:checked': (value: boolean) => typeof value === 'boolean',
  change: (value: boolean) => typeof value === 'boolean',
}

export type CheckTagProps = ExtractPropTypes<typeof checkTagProps>
export type CheckTagEmits = typeof checkTagEmits
