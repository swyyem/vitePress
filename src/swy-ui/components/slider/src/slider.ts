import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const sliderSizes = ['large', 'default', 'small'] as const

export const sliderProps = buildProps({
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
    default: 0,
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * @description 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 尺寸
   */
  size: {
    type: String,
    values: sliderSizes,
    default: 'default',
  },
} as const)

export const sliderEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number',
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderPropsPublic = ExtractPublicPropTypes<typeof sliderProps>
export type SliderEmits = typeof sliderEmits
