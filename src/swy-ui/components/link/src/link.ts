import { buildProps, iconPropType } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'
import type Link from './link.vue'

export const linkTypes = ['primary', 'success', 'warning', 'danger', 'info', 'default'] as const

export interface LinkConfigContext {
  type?: string
  underline?: string | boolean
}

export const linkProps = buildProps({
  /**
   * @description 链接类型
   */
  type: {
    type: String,
    values: linkTypes,
    default: undefined,
  },
  /**
   * @description 下划线显示时机
   */
  underline: {
    type: [Boolean, String],
    values: [true, false, 'always', 'hover', 'never'],
    default: undefined,
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
  href: {
    type: String,
    default: '',
  },
  /**
   * @description 原生 target 属性
   */
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | string>,
    default: '_self',
  },
  /**
   * @description 图标组件
   */
  icon: {
    type: iconPropType,
  },
} as const)

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type LinkProps = ExtractPropTypes<typeof linkProps>
export type LinkPropsPublic = ExtractPublicPropTypes<typeof linkProps>
export type LinkEmits = typeof linkEmits
export type LinkInstance = InstanceType<typeof Link>
export type LinkType = LinkProps['type']
