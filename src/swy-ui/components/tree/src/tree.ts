import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export interface TreeNode {
  id?: string | number
  label: string
  children?: TreeNode[]
  disabled?: boolean
  [key: string]: any
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
} as const)

export const treeEmits = {
  'node-click': (_node: TreeNode, _event: Event) => true,
}

export type TreeProps = ExtractPropTypes<typeof treeProps>
export type TreePropsPublic = ExtractPublicPropTypes<typeof treeProps>
export type TreeEmits = typeof treeEmits
