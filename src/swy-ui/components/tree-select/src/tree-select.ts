/** File: tree-select.ts - 树形选择器类型定义 */

import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes, PropType } from 'vue'

// ========== 数据结构 ==========
export interface TreeSelectOption {
  label?: string
  value?: string | number
  children?: TreeSelectOption[]
  disabled?: boolean
  [key: string]: unknown
}

export interface TreeSelectFieldNames {
  label?: string
  children?: string
  disabled?: string
}

// ========== Props ==========
export const treeSelectProps = buildProps({
  /** 当前值，单选为 string/number，多选为数组 */
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    default: undefined,
  },
  /** 树形数据 */
  data: {
    type: Array as PropType<TreeSelectOption[]>,
    default: () => [],
  },
  /** 指定节点唯一标识字段名 */
  nodeKey: {
    type: String,
    default: 'value',
  },
  /** 自定义字段名映射 */
  props: {
    type: Object as PropType<TreeSelectFieldNames>,
    default: () => ({ label: 'label', children: 'children', disabled: 'disabled' }),
  },
  /** 是否多选 */
  multiple: Boolean,
  /** 是否禁用 */
  disabled: Boolean,
  /** 是否只读 */
  readonly: Boolean,
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true,
  },
  /** 输入框尺寸 */
  size: useSizeProp,
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /** 父子节点是否互相关联（checkStrictly=true 时不联动） */
  checkStrictly: Boolean,
  /** 点击节点（含非叶节点）时直接选中 */
  checkOnClickNode: Boolean,
} as const)

// ========== Emits ==========
export const treeSelectEmits = {
  'update:modelValue': (_value: unknown) => true,
  change: (_value: unknown, _data: Record<string, unknown>, _node: Record<string, unknown>) => true,
  blur: () => true,
  focus: () => true,
  clear: () => true,
}

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
export type TreeSelectEmits = typeof treeSelectEmits
