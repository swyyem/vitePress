import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const cascaderProps = buildProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  size: useSizeProp,
  disabled: Boolean,
  readonly: Boolean,
  clearable: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  showAllLevels: {
    type: Boolean,
    default: true,
  },
  separator: {
    type: String,
    default: '/',
  },
  filterable: Boolean,
  props: {
    type: Object,
    default: () => ({
      value: 'value',
      label: 'label',
      children: 'children',
      disabled: 'disabled',
    }),
  },
} as const)

export const cascaderEmits = {
  'update:modelValue': (_value: unknown[]) => true,
  change: (_value: unknown[]) => true,
  blur: () => true,
  focus: () => true,
  clear: () => true,
  expandChange: (_value: unknown[]) => true,
}

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderEmits = typeof cascaderEmits
