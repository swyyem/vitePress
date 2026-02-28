/** File: avatar.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const avatarShapes = ['circle', 'square'] as const
export const avatarSizes = ['small', 'default', 'large'] as const

export const avatarProps = buildProps({
  /**
   * @description 头像尺寸
   */
  size: {
    type: [Number, String],
    values: avatarSizes,
    default: 'default',
  },
  /**
   * @description 头像形状
   */
  shape: {
    type: String,
    values: avatarShapes,
    default: 'circle',
  },
  /**
   * @description 图标类型
   */
  icon: String,
  /**
   * @description 图片地址
   */
  src: String,
  /**
   * @description 图片描述
   */
  alt: String,
} as const)

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
export type AvatarPropsPublic = ExtractPublicPropTypes<typeof avatarProps>
export type AvatarEmits = typeof avatarEmits

export type AvatarShape = AvatarProps['shape']
export type AvatarSize = AvatarProps['size']
