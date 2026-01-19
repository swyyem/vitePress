import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const progressTypes = ['line', 'circle', 'dashboard'] as const
export const progressStatuses = ['success', 'exception', 'warning'] as const

export const progressProps = buildProps({
  /**
   * @description 进度条类型
   */
  type: {
    type: String,
    values: progressTypes,
    default: 'line',
  },
  /**
   * @description 百分比
   */
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number) => val >= 0 && val <= 100,
  },
  /**
   * @description 状态
   */
  status: {
    type: String,
    values: progressStatuses,
    default: '',
  },
  /**
   * @description 是否显示文字
   */
  showText: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 进度条宽度
   */
  strokeWidth: {
    type: Number,
    default: 6,
  },
  /**
   * @description 文字内容
   */
  format: Function,
  /**
   * @description 进度条颜色
   */
  color: {
    type: [String, Array, Function],
    default: '',
  },
} as const)

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressPropsPublic = ExtractPublicPropTypes<typeof progressProps>

export type ProgressType = ProgressProps['type']
export type ProgressStatus = ProgressProps['status']
