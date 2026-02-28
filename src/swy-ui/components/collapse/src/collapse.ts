/** File: collapse.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const collapseProps = buildProps({
  /**
   * @description 当前激活的面板
   */
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  /**
   * @description 是否手风琴模式
   */
  accordion: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 箭头位置
   */
  arrowPlacement: {
    type: String,
    values: ['left', 'right'],
    default: 'right',
  },
  /**
   * @description 是否为幽灵模式（无边框透明背景）
   */
  ghost: {
    type: Boolean,
    default: false,
  },
} as const)

export const collapseEmits = {
  'update:modelValue': (_value: string | number | (string | number)[]) => true,
  change: (_value: string | number | (string | number)[]) => true,
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapsePropsPublic = ExtractPublicPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits

export interface CollapseContext {
  activeNames: { value: (string | number)[] }
  handleItemClick: (name: string | number) => void
}
