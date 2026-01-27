import { buildProps, definePropType } from '@swy-ui/utils'

import type { ComputedRef, ExtractPropTypes, InjectionKey } from 'vue'
import type ColorPickerPanel from './color-picker-panel.vue'
import type Color from './utils/color'

export const colorPickerPanelProps = buildProps({
  modelValue: {
    type: definePropType<string | null>(String),
    default: undefined,
  },
  border: {
    type: Boolean,
    default: true,
  },
  showAlpha: Boolean,
  colorFormat: String,
  disabled: Boolean,
  predefine: {
    type: definePropType<string[]>(Array),
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
} as const)

export const colorPickerPanelEmits = {
  'update:modelValue': (_val: string | null) => true,
}

export type ColorPickerPanelProps = ExtractPropTypes<typeof colorPickerPanelProps>
export type ColorPickerPanelEmits = typeof colorPickerPanelEmits
export type ColorPickerPanelInstance = InstanceType<typeof ColorPickerPanel>

export interface ColorPickerPanelContext {
  currentColor: ComputedRef<string>
}

export interface CommonColorContext {
  color: Color
}

export const ROOT_COMMON_COLOR_INJECTION_KEY: InjectionKey<CommonColorContext> =
  Symbol('colorCommonPickerKey')
export const colorPickerPanelContextKey: InjectionKey<ColorPickerPanelContext> = Symbol(
  'colorPickerPanelContextKey'
)
