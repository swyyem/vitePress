import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const dropdownProps = buildProps({
  /**
   * @description 触发方式
   */
  trigger: {
    type: String,
    values: ['hover', 'click'],
    default: 'hover',
  },
  /**
   * @description 菜单尺寸
   */
  size: {
    type: String,
    values: ['large', 'default', 'small'],
    default: 'default',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const)

export const dropdownEmits = {
  command: (_command: string | number) => true,
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownPropsPublic = ExtractPublicPropTypes<typeof dropdownProps>
export type DropdownEmits = typeof dropdownEmits
