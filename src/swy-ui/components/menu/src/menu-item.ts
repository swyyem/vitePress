/** File: menu-item.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const menuItemProps = buildProps({
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

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>
export type MenuItemPropsPublic = ExtractPublicPropTypes<typeof menuItemProps>
