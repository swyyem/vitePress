import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const linkTypes = ['primary', 'success', 'warning', 'danger', 'info', 'default'] as const

export const linkProps = buildProps({
  /**
   * @description 链接类型
   */
  type: {
    type: String,
    values: linkTypes,
    default: 'default',
  },
  /**
   * @description 是否下划线
   */
  underline: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 原生 href 属性
   */
  href: String,
  /**
   * @description 图标组件
   */
  icon: String,
} as const)

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type LinkProps = ExtractPropTypes<typeof linkProps>
export type LinkPropsPublic = ExtractPublicPropTypes<typeof linkProps>
export type LinkEmits = typeof linkEmits

export type LinkType = LinkProps['type']
