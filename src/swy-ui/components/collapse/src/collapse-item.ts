/** File: collapse-item.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const collapseItemProps = buildProps({
  /**
   * @description 唯一标志符
   */
  name: {
    type: [String, Number],
    required: true,
  },
  /**
   * @description 面板标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const)

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
export type CollapseItemPropsPublic = ExtractPublicPropTypes<typeof collapseItemProps>
