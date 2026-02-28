/** File: tag.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tagTypes = ['success', 'info', 'warning', 'danger', 'primary'] as const
export const tagEffects = ['light', 'dark', 'plain'] as const
export const tagSizes = ['small', 'default', 'large'] as const

export const tagProps = buildProps({
  /**
   * @description 标签类型
   */
  type: {
    type: String,
    values: tagTypes,
    default: 'primary',
  },
  /**
   * @description 是否可关闭
   */
  closable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否禁用渐变动画
   */
  disableTransitions: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否有边框描边
   */
  hit: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 背景色
   */
  color: String,
  /**
   * @description 标签尺寸
   */
  size: {
    type: String,
    values: tagSizes,
    default: 'default',
  },
  /**
   * @description 主题
   */
  effect: {
    type: String,
    values: tagEffects,
    default: 'light',
  },
  /**
   * @description 是否为圆形
   */
  round: {
    type: Boolean,
    default: false,
  },
} as const)

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagPropsPublic = ExtractPublicPropTypes<typeof tagProps>
export type TagEmits = typeof tagEmits

export type TagType = TagProps['type']
export type TagSize = TagProps['size']
export type TagEffect = TagProps['effect']
