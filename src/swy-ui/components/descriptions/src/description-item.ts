import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const descriptionsItemProps = buildProps({
  /**
   * @description 标签文本
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 列跨度
   */
  span: {
    type: Number,
    default: 1,
  },
  /**
   * @description 列宽度
   */
  width: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 列最小宽度
   */
  minWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 内容对齐方式
   */
  align: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'left',
  },
  /**
   * @description 标签对齐方式
   */
  labelAlign: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'left',
  },
  /**
   * @description 自定义内容类名
   */
  className: {
    type: String,
    default: '',
  },
  /**
   * @description 自定义标签类名
   */
  labelClassName: {
    type: String,
    default: '',
  },
} as const)

export type DescriptionsItemProps = ExtractPropTypes<typeof descriptionsItemProps>
