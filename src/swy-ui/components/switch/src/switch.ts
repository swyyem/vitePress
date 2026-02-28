/** File: switch.ts - TypeScript File */

// ========== Dependencies Import ==========
import { useSizeProp } from '@swy-ui/hooks'
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const switchSizes = ['small', 'default', 'large'] as const

export const switchProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 打开时的文字描述
   */
  activeText: String,
  /**
   * @description 关闭时的文字描述
   */
  inactiveText: String,
  /**
   * @description 打开时的值
   */
  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  /**
   * @description 关闭时的值
   */
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  /**
   * @description 开关尺寸
   */
  size: {
    ...useSizeProp,
    default: 'default',
  },
} as const)

export const switchEmits = {
  'update:modelValue': (val: boolean | string | number) =>
    typeof val === 'boolean' || typeof val === 'string' || typeof val === 'number',
  change: (val: boolean | string | number) =>
    typeof val === 'boolean' || typeof val === 'string' || typeof val === 'number',
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchPropsPublic = ExtractPublicPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits

export type SwitchSize = SwitchProps['size']
