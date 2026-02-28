/** File: select.ts - TypeScript File */

// ========== Dependencies Import ==========
import { useSizeProp } from '@swy-ui/hooks'
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export const selectSizes = ['small', 'default', 'large'] as const

export const selectProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 选项列表
   */
  options: {
    type: Array as () => SelectOption[],
    default: () => [],
  },
  /**
   * @description 占位文本
   */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 选择器尺寸
   */
  size: {
    ...useSizeProp,
    default: 'default',
  },
  /**
   * @description 是否可清空
   */
  clearable: {
    type: Boolean,
    default: false,
  },
} as const)

export const selectEmits = {
  'update:modelValue': (val: string | number) => typeof val === 'string' || typeof val === 'number',
  change: (val: string | number) => typeof val === 'string' || typeof val === 'number',
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectPropsPublic = ExtractPublicPropTypes<typeof selectProps>
export type SelectEmits = typeof selectEmits

export type SelectSize = SelectProps['size']
