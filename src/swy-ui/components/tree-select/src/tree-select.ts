import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const treeSelectProps = buildProps({
  modelValue: [String, Number, Array],
  data: {
    type: Array,
    default: () => [],
  },
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  clearable: {
    type: Boolean,
    default: true,
  },
  size: useSizeProp,
  placeholder: {
    type: String,
    default: '请选择',
  },
  nodeKey: {
    type: String,
    default: 'id',
  },
  props: {
    type: Object,
    default: () => ({
      label: 'label',
      children: 'children',
      disabled: 'disabled',
    }),
  },
  checkStrictly: Boolean,
  checkOnClickNode: Boolean,
} as const)

export const treeSelectEmits = {
  'update:modelValue': (_value: unknown) => true,
  change: (_value: unknown, _data: Record<string, unknown>, _node: Record<string, unknown>) => true,
  blur: () => true,
  focus: () => true,
  clear: () => true,
}

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
export type TreeSelectEmits = typeof treeSelectEmits
