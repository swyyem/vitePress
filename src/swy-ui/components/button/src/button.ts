import { useSizeProp } from '@swy-ui/hooks'
import { buildProps, definePropType, iconPropType } from '@swy-ui/utils'
import { Loading } from '@element-plus/icons-vue'

import type { Component, ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  'text',
  '',
] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export const buttonProps = buildProps({
  /**
   * @description 按钮尺寸
   */
  size: useSizeProp,
  /**
   * @description 禁用按钮
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 按钮类型
   */
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  /**
   * @description 图标组件
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description 原生按钮类型
   */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button',
  },
  /**
   * @description 判断是否正在加载
   */
  loading: Boolean,
  /**
   * @description 自定义加载图标组件
   */
  loadingIcon: {
    type: iconPropType,
    default: () => Loading,
  },
  /**
   * @description 判断是否是普通按钮
   */
  plain: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 判断是否是文本按钮
   */
  text: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 判断是否是链接按钮
   */
  link: Boolean,
  /**
   * @description 判断文本按钮背景色是否常亮
   */
  bg: Boolean,
  /**
   * @description 原生按钮自动对焦
   */
  autofocus: Boolean,
  /**
   * @description 判断是否是圆角按钮
   */
  round: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 判断是否是圆形按钮
   */
  circle: Boolean,
  /**
   * @description 自定义按钮颜色，自动计算“hover”和“active”颜色
   */
  color: String,
  /**
   * @description 深色模式，自动将“颜色”转换为深色模式颜色
   */
  dark: Boolean,
  /**
   * @description 自动在两个汉字之间插入空格
   */
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 自定义元素标签
   */
  tag: {
    type: definePropType<string | Component>([String, Object]),
    default: 'button',
  },
} as const)
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonPropsPublic = ExtractPublicPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType = ButtonProps['type']
export type ButtonNativeType = ButtonProps['nativeType']

export interface ButtonConfigContext {
  type?: string
  plain?: boolean
  text?: boolean
  round?: boolean
  autoInsertSpace?: boolean
}
