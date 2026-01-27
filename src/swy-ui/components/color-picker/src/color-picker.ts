import { buildProps, definePropType } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@swy-ui/constants'

import type { ExtractPropTypes } from 'vue'

export const colorPickerProps = buildProps({
  modelValue: {
    type: definePropType<string | null>(String),
    default: undefined,
  },
  id: String,
  showAlpha: Boolean,
  colorFormat: String,
  disabled: Boolean,
  size: useSizeProp,
  popperClass: {
    type: String,
    default: '',
  },
  popperStyle: {
    type: [String, Object, Array],
    default: '',
  },
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  appendTo: {
    type: definePropType<string | HTMLElement>(String),
  },
  predefine: {
    type: definePropType<string[]>(Array),
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
} as const)

export const colorPickerEmits = {
  [UPDATE_MODEL_EVENT]: (_val: string | null) => true,
  [CHANGE_EVENT]: (_val: string | null) => true,
  activeChange: (_val: string | null) => true,
  focus: (_evt: FocusEvent) => true,
  blur: (_evt: FocusEvent) => true,
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
