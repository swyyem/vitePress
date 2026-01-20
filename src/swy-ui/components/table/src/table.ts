import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tableProps = buildProps({
  /**
   * @description 表格数据
   */
  data: {
    type: Array,
    default: () => [],
  },
  /**
   * @description 表格高度
   */
  height: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 表格最大高度
   */
  maxHeight: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 是否为斑马纹
   */
  stripe: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否带边框
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 表格尺寸
   */
  size: {
    type: String,
    values: ['large', 'default', 'small'],
    default: 'default',
  },
  /**
   * @description 列的宽度是否自撑开
   */
  fit: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示表头
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 空数据时显示的文本内容
   */
  emptyText: {
    type: String,
    default: '暂无数据',
  },
} as const)

export const tableEmits = {
  'row-click': (_row: any, _column: any, _event: Event) => true,
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TablePropsPublic = ExtractPublicPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits
