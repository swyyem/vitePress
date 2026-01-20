import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const colorPickerProps = buildProps({
  modelValue: String,
  disabled: Boolean,
  size: useSizeProp,
  showAlpha: Boolean,
  colorFormat: String,
  predefine: Array,
  showPanelColor: {
    type: Boolean,
    default: true,
  },
} as const)

export const colorPickerEmits = {
  'update:modelValue': (_value: string) => true,
  change: (_value: string) => true,
  activeChange: (_value: string) => true,
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
