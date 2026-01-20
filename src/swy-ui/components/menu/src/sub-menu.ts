import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const subMenuProps = buildProps({
  /**
   * @description 唯一标志
   */
  index: {
    type: String,
    required: true,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const)

export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>
export type SubMenuPropsPublic = ExtractPublicPropTypes<typeof subMenuProps>
