import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const sliderSizes = ['large', 'default', 'small'] as const

export const sliderProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<number | number[]>([Number, Array]),
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
  /**
   * @description 是否显示输入框
   */
  showInput: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示输入框的控制按钮
   */
  showInputControls: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示间断点
   */
  showStops: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示提示信息
   */
  showTooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 格式化提示信息
   */
  formatTooltip: {
    type: definePropType<(value: number) => string>(Function),
    default: undefined,
  },
  /**
   * @description 是否为范围选择
   */
  range: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否竖向模式
   */
  vertical: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 滑块高度（竖向模式时）
   */
  height: {
    type: String,
    default: '',
  },
  /**
   * @description 屏幕阅读器标签
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 标记对象
   */
  marks: {
    type: definePropType<Record<number, string>>(Object),
    default: undefined,
  },
} as const)

export const sliderEmits = {
  'update:modelValue': (value: number | number[]) =>
    typeof value === 'number' || Array.isArray(value),
  change: (value: number | number[]) => typeof value === 'number' || Array.isArray(value),
  input: (value: number | number[]) => typeof value === 'number' || Array.isArray(value),
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderPropsPublic = ExtractPublicPropTypes<typeof sliderProps>
export type SliderEmits = typeof sliderEmits
