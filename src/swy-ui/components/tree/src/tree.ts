import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export interface TreeNode {
  id?: string | number
  label: string
  children?: TreeNode[]
  disabled?: boolean
  parent?: TreeNode | null
  checked?: boolean
  indeterminate?: boolean
  [key: string]: unknown
}

export const treeProps = buildProps({
  /**
   * @description 树形数据
   */
  data: {
    type: Array as () => TreeNode[],
    default: () => [],
  },
  /**
   * @description 空数据时的文本
   */
  emptyText: {
    type: String,
    default: '暂无数据',
  },
  /**
   * @description 每个树节点用来作为唯一标识的属性
   */
  nodeKey: {
    type: String,
    default: 'id',
  },
  /**
   * @description 是否默认展开所有节点
   */
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否在点击节点的时候展开或者收缩节点
   */
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否高亮当前选中节点
   */
  highlightCurrent: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 相邻级节点间的水平缩进，单位为像素
   */
  indent: {
    type: Number,
    default: 18,
  },
  /**
   * @description 是否显示复选框
   */
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 默认勾选的节点的 key 的数组
   */
  defaultCheckedKeys: {
    type: Array as () => (string | number)[],
    default: () => [],
  },
  /**
   * @description 默认展开的节点的 key 的数组
   */
  defaultExpandedKeys: {
    type: Array as () => (string | number)[],
    default: () => [],
  },
} as const)

export const treeEmits = {
  'node-click': (_node: TreeNode, _event: Event) => true,
  'check-change': (_node: TreeNode, _checked: boolean, _indeterminate: boolean) => true,
}

export type TreeProps = ExtractPropTypes<typeof treeProps>
export type TreePropsPublic = ExtractPublicPropTypes<typeof treeProps>
export type TreeEmits = typeof treeEmits

export const treeContextKey = Symbol('treeContextKey')
