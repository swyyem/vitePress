import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const paginationProps = buildProps({
  /**
   * @description 当前页数
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * @description 每页显示条目个数
   */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**
   * @description 总条目数
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * @description 是否使用小型分页样式
   */
  small: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否为分页按钮添加背景色
   */
  background: {
    type: Boolean,
    default: false,
  },
} as const)

export const paginationEmits = {
  'update:currentPage': (_val: number) => true,
  'current-change': (_val: number) => true,
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationPropsPublic = ExtractPublicPropTypes<typeof paginationProps>
export type PaginationEmits = typeof paginationEmits
