import { buildProps, definePropType } from '@swy-ui/utils'
import { getComponentMap } from './utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

import type ProField from './proField.vue'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const componentMap = getComponentMap()

type PublicObject = Record<string, any>

// 将 EpProp 配置转换为实际类型
type EpPropToType<T> = T extends { type: infer Type; required: true }
  ? Type extends Array<infer U>
    ? U
    : Type
  : T extends { type: infer Type }
    ? Type extends Array<infer U>
      ? U | undefined
      : Type | undefined
    : any

// 提取组件 props 为实际类型
type ComponentPropsToType<Props> = {
  [K in keyof Props]: EpPropToType<Props[K]>
}

// 从组件映射中提取 props 类型
export type GetPropsByValueType<T extends ValueType> = T extends keyof typeof componentMap
  ? ComponentPropsToType<ExtractPublicPropTypes<ExtractComponentProps<(typeof componentMap)[T]>>>
  : never

// 定义 ProField 实例类型，结合 ProField 组件的实例类型 ，并添加额外的属性
export type ProFieldInstance = InstanceType<typeof ProField> & unknown

type ExtractComponentProps<T> = T extends { props: infer P } ? P : never

export type ValueType =
  | 'Alert'
  | 'Aside'
  | 'Avatar'
  | 'Badge'
  | 'Breadcrumb'
  | 'Button'
  | 'Card'
  | 'Carousel'
  | 'Checkbox'
  | 'Collapse'
  | 'Container'
  | 'Descriptions'
  | 'Dialog'
  | 'Divider'
  | 'Drawer'
  | 'Dropdown'
  | 'Empty'
  | 'Footer'
  | 'Form'
  | 'Header'
  | 'Icon'
  | 'Image'
  | 'Input'
  | 'InputNumber'
  | 'Link'
  | 'Loading'
  | 'Main'
  | 'Menu'
  | 'Message'
  | 'Modal'
  | 'Notification'
  | 'Pagination'
  | 'Popconfirm'
  | 'Popover'
  | 'Progress'
  | 'Radio'
  | 'Rate'
  | 'Result'
  | 'Select'
  | 'Skeleton'
  | 'Slider'
  | 'Switch'
  | 'Table'
  | 'Tabs'
  | 'Tag'
  | 'Text'
  | 'Tooltip'
  | 'Tree'
  | 'Upload'

export const proFieldProps = buildProps({
  /**
   * @description 组建类型
   */
  valueType: {
    type: definePropType<ValueType>(String),
    required: true,
  },
  /**
   * @description 组件属性（修复拼写错误）
   */
  fieldProps: { type: definePropType<PublicObject>(Object) },
  /**
   * @description v-model 绑定值
   */
  modelValue: { type: definePropType<any>([String, Number, Boolean, Array, Object]) },
} as const)

export const proFieldEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  'update:modelValue': (_value: any) => true,
  change: (_value: any) => true,
  input: (_value: any) => true,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export type ProFieldProps = ExtractPropTypes<typeof proFieldProps>
export type ProFieldPropsPublic = ExtractPublicPropTypes<typeof proFieldProps>
export type ProFieldEmits = typeof proFieldEmits
