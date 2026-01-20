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
} as const)

export const treeNodeEmits = {
  'node-click': (_node: TreeNode, _event: Event) => true,
}

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>
export type TreeNodePropsPublic = ExtractPublicPropTypes<typeof treeNodeProps>
export type TreeNodeEmits = typeof treeNodeEmits
