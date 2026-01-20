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
import { useNamespace } from '@swy-ui/hooks'
import { treeProps, treeEmits, type TreeNode as TreeNodeType } from './tree'
import TreeNode from './tree-node.vue'

defineOptions({
  name: 'SwyTree',
})

defineProps(treeProps)
const emit = defineEmits(treeEmits)

const ns = useNamespace('tree')

const handleNodeClick = (node: TreeNodeType, event: Event) => {
  emit('node-click', node, event)
}
</script>
