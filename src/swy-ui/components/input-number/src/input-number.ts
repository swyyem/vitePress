/** File: input-number.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const inputNumberSizes = ['large', 'default', 'small'] as const

export const inputNumberProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最小值
   */
  min: {
    type: Number,
    default: -Infinity,
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: Infinity,
  },
  /**
   * @description 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 数值精度
   */
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === parseInt(String(val), 10),
  },
  /**
   * @description 尺寸
   */
  size: {
    type: String,
    values: inputNumberSizes,
    default: 'default',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示控制按钮
   */
  controls: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 控制按钮位置
   */
  controlsPosition: {
    type: String,
    values: ['', 'right'],
    default: '',
  },
} as const)

export const inputNumberEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number',
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
export type InputNumberPropsPublic = ExtractPublicPropTypes<typeof inputNumberProps>
export type InputNumberEmits = typeof inputNumberEmits
