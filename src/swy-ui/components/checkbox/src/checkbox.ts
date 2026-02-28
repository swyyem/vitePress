/** File: checkbox.ts - TypeScript File */

// ========== Dependencies Import ==========
import { useSizeProp } from '@swy-ui/hooks'
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const checkboxSizes = ['small', 'default', 'large'] as const

export const checkboxProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [Boolean, String, Number, Array],
    default: false,
  },
  /**
   * @description 选中状态的值（用于多选框组）
   */
  label: String,
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description checkbox indeterminate state
   */
  indeterminate: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 复选框尺寸
   */
  size: {
    ...useSizeProp,
    default: 'default',
  },
} as const)

export const checkboxEmits = {
  'update:modelValue': (val: boolean | string | number | any[]) =>
    typeof val === 'boolean' ||
    typeof val === 'string' ||
    typeof val === 'number' ||
    Array.isArray(val),
  change: (val: boolean) => typeof val === 'boolean',
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxPropsPublic = ExtractPublicPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits

export type CheckboxSize = CheckboxProps['size']
