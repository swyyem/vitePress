/** File: cascader.ts - 级联选择器类型定义 */

import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes, PropType } from 'vue'

// ========== 选项数据结构 ==========
export interface CascaderOption {
  value: string | number
  label: string
  children?: CascaderOption[]
  disabled?: boolean
  /** 扩展字段，兼容自定义 fieldNames */
  [key: string]: unknown
}

/** fieldNames 映射配置（自定义字段名） */
export interface CascaderFieldNames {
  value?: string
  label?: string
  children?: string
  disabled?: string
}

// ========== Props ==========
export const cascaderProps = buildProps({
  /** 当前选中路径（各级 value 组成的数组） */
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  /** 树形选项数据 */
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  /** 输入框尺寸 */
  size: useSizeProp,
  /** 是否禁用 */
  disabled: Boolean,
  /** 是否只读 */
  readonly: Boolean,
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true,
  },
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /** 是否展示完整路径（如"省 / 市 / 区"），false 时只显示最后一级 */
  showAllLevels: {
    type: Boolean,
    default: true,
  },
  /** 路径各级之间的分隔符 */
  separator: {
    type: String,
    default: '/',
  },
  /** 是否可搜索 */
  filterable: Boolean,
  /** 自定义字段名映射 */
  props: {
    type: Object as PropType<CascaderFieldNames>,
    default: () => ({
      value: 'value',
      label: 'label',
      children: 'children',
      disabled: 'disabled',
    }),
  },
} as const)

// ========== Emits ==========
export const cascaderEmits = {
  /** 最终确认选中时 */
  'update:modelValue': (_value: (string | number)[]) => true,
  change: (_value: (string | number)[]) => true,
  /** 展开某一级时（activePath 的 values） */
  expandChange: (_value: (string | number)[]) => true,
  blur: () => true,
  focus: () => true,
  clear: () => true,
  visibleChange: (_visible: boolean) => true,
}

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderEmits = typeof cascaderEmits
