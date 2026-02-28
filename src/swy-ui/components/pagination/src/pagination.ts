/** File: pagination.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

// ========== 组件 Props 定义 ==========
export const paginationProps = buildProps({
  /**
   * @description 当前页数（支持 v-model:currentPage 双向绑定）
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * @description 每页显示条目个数（支持 v-model:pageSize 双向绑定）
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
  /**
   * @description 是否禁用分页器（所有按钮均不可点击）
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 只有一页时是否隐藏分页器
   */
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 页码按钮的数量（不含省略号），最小 5，最大 21，必须为奇数
   */
  pagerCount: {
    type: Number,
    default: 5,
  },
  /**
   * @description 每页显示个数选择器的选项列表
   */
  pageSizes: {
    type: Array as unknown as () => PropType<number[]>,
    default: () => [10, 20, 50, 100],
  },
  /**
   * @description 组件布局，子组件名用逗号分隔
   * 可选值：total, sizes, prev, pager, next, jumper
   */
  layout: {
    type: String,
    default: 'prev, pager, next',
  },
} as const)

// ========== 组件 Emits 定义 ==========
export const paginationEmits = {
  /** 当前页改变时触发，同时更新 v-model:currentPage */
  'update:currentPage': (_val: number) => true,
  /** 每页条数改变时触发，同时更新 v-model:pageSize */
  'update:pageSize': (_val: number) => true,
  /** 当前页改变时触发，回调参数为新的当前页 */
  'current-change': (_val: number) => true,
  /** 每页条数改变时触发，回调参数为新的每页条数 */
  'size-change': (_val: number) => true,
}

// ========== 类型导出 ==========
export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationPropsPublic = ExtractPublicPropTypes<typeof paginationProps>
export type PaginationEmits = typeof paginationEmits
