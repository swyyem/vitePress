/** File: divider.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const dividerDirections = ['horizontal', 'vertical'] as const
export const dividerContentPositions = ['left', 'center', 'right'] as const

export const dividerProps = buildProps({
  /**
   * @description 分割线方向
   */
  direction: {
    type: String,
    values: dividerDirections,
    default: 'horizontal',
  },
  /**
   * @description 文案位置
   */
  contentPosition: {
    type: String,
    values: dividerContentPositions,
    default: 'center',
  },
} as const)

export type DividerProps = ExtractPropTypes<typeof dividerProps>
export type DividerPropsPublic = ExtractPublicPropTypes<typeof dividerProps>

export type DividerDirection = DividerProps['direction']
export type DividerContentPosition = DividerProps['contentPosition']
