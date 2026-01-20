import { buildProps, definePropType } from '@swy-ui/utils'
import type { Component, ExtractPropTypes } from 'vue'

export const iconSizes = ['small', 'default', 'large'] as const

export const iconProps = buildProps({
  /**
   * @description 图标名称（字符串）或图标组件
   */
  name: {
    type: definePropType<string | Component>([String, Object]),
    required: true,
  },
  /**
   * @description 图标颜色
   */
  color: {
    type: String,
    default: '',
  },
  /**
   * @description 图标大小，可以是预设值或具体尺寸（如 '20px'）
   */
  size: {
    type: String,
    default: 'default',
  },
} as const)

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconSize = (typeof iconSizes)[number]
