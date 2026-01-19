import { buildProps, definePropType } from '@swy-ui/utils'
import { createComponentMap } from './utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

import type ProField from './proField.vue'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const componentMap = createComponentMap()

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
  | 'SwyBadge'
  | 'SwyButton'
  | 'SwyCard'
  | 'SwyCheckbox'
  | 'SwyDivider'
  | 'SwyForm'
  | 'SwyInput'
  | 'SwyModal'
  | 'SwySelect'
  | 'SwySwitch'
  | 'SwyTable'
  | 'SwyTabs'
  | 'SwyTag'
  | 'SwyTree'
  | 'SwyUpload'

export const proFieldProps = buildProps({
  /**
   * @description 组建类型
   */
  valueType: {
    type: definePropType<ValueType>(String),
    required: true,
  },
  filedProps: { type: definePropType<PublicObject>(Object) },
} as const)
export const proFieldEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ProFieldProps = ExtractPropTypes<typeof proFieldProps>
export type ProFieldPropsPublic = ExtractPublicPropTypes<typeof proFieldProps>
export type ProFieldEmits = typeof proFieldEmits
