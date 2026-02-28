/** File: tree-node.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { TreeNode } from './tree'

export const treeNodeProps = buildProps({
  node: {
    type: Object as () => TreeNode,
    required: true,
  },
  nodeKey: {
    type: String,
    default: 'id',
  },
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  indent: {
    type: Number,
    default: 18,
  },
  level: {
    type: Number,
    default: 0,
  },
} as const)

export const treeNodeEmits = {
  'node-click': (_node: TreeNode, _event: Event) => true,
}

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>
export type TreeNodePropsPublic = ExtractPublicPropTypes<typeof treeNodeProps>
export type TreeNodeEmits = typeof treeNodeEmits
