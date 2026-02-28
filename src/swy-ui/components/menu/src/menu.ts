/** File: menu.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const menuProps = buildProps({
  /**
   * @description 菜单模式
   */
  mode: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'vertical',
  },
  /**
   * @description 当前激活菜单的 index
   */
  defaultActive: {
    type: String,
    default: '',
  },
  /**
   * @description 背景色
   */
  backgroundColor: {
    type: String,
    default: '',
  },
  /**
   * @description 文字颜色
   */
  textColor: {
    type: String,
    default: '',
  },
  /**
   * @description 激活菜单的文字颜色
   */
  activeTextColor: {
    type: String,
    default: '',
  },
} as const)

export const menuEmits = {
  select: (_index: string, _indexPath: string[]) => true,
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuPropsPublic = ExtractPublicPropTypes<typeof menuProps>
export type MenuEmits = typeof menuEmits
