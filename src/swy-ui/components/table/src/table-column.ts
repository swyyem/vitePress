import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tableColumnProps = buildProps({
  /**
   * @description 列标签
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 列属性名
   */
  prop: {
    type: String,
    default: '',
  },
  /**
   * @description 列宽度
   */
  width: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 最小宽度
   */
  minWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 对齐方式
   */
  align: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'left',
  },
} as const)

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
export type TableColumnPropsPublic = ExtractPublicPropTypes<typeof tableColumnProps>
