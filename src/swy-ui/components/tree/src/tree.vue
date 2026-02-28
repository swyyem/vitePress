/** File: tree.vue - Vue Component */

<template>
  <div :class="[ns.b(), ns.is('highlight-current', highlightCurrent)]">
    <template v-if="data && data.length > 0">
      <TreeNode
        v-for="node in data"
        :key="node[nodeKey]"
        :node="node"
        :node-key="nodeKey"
        :expand-on-click-node="expandOnClickNode"
        :default-expand-all="defaultExpandAll"
        :indent="indent"
        @node-click="handleNodeClick"
      />
    </template>
    <div v-else :class="ns.e('empty-block')">
      <div :class="ns.e('empty-text')">
        {{ emptyText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { provide } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { treeProps, treeEmits, type TreeNode as TreeNodeType, treeContextKey } from './tree'
import TreeNode from './tree-node.vue'
import { useTree } from './use-tree'

defineOptions({
  name: 'SwyTree',
})

const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)

const ns = useNamespace('tree')

const { toggleCheck, getCheckedNodes, getCheckedKeys } = useTree(props, emit)

provide(treeContextKey, {
  props,
  toggleCheck,
})

const handleNodeClick = (node: TreeNodeType, event: Event) => {
  emit('node-click', node, event)
}

defineExpose({
  getCheckedNodes,
  getCheckedKeys,
})
</script>
