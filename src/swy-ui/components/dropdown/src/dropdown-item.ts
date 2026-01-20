import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const dropdownItemProps = buildProps({
  /**
   * @description 指令
   */
  command: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示分隔线
   */
  divided: {
    type: Boolean,
    default: false,
  },
} as const)

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type DropdownItemPropsPublic = ExtractPublicPropTypes<typeof dropdownItemProps>
