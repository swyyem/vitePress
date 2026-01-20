<template>
  <div :class="[ns.b('tree-node'), ns.is('expanded', expanded)]">
    <div :class="ns.e('content')" @click="handleContentClick">
      <i
        :class="[ns.e('expand-icon'), expanded ? 'expanded' : '', isLeaf ? 'is-leaf' : '']"
        @click.stop="handleExpandClick"
      >
        ▶
      </i>
      <span :class="ns.e('label')">
        {{ node.label }}
      </span>
    </div>
    <transition name="swy-tree">
      <div v-show="expanded" :class="ns.e('children')">
        <TreeNode
          v-for="child in node.children"
          :key="child[nodeKey]"
          :node="child"
          :node-key="nodeKey"
          :expand-on-click-node="expandOnClickNode"
          :default-expand-all="defaultExpandAll"
          @node-click="handleChildNodeClick"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { treeNodeProps, treeNodeEmits } from './tree-node'
import type { TreeNode as TreeNodeType } from './tree'

defineOptions({
  name: 'SwyTreeNode',
})

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

const ns = useNamespace('swy')

const expanded = ref(false)

const isLeaf = computed(() => {
  return !props.node.children || props.node.children.length === 0
})

onMounted(() => {
  if (props.defaultExpandAll) {
    expanded.value = true
  }
})

const handleExpandClick = () => {
  if (!isLeaf.value) {
    expanded.value = !expanded.value
  }
}

const handleContentClick = (event: Event) => {
  if (props.expandOnClickNode && !isLeaf.value) {
    expanded.value = !expanded.value
  }
  emit('node-click', props.node, event)
}

const handleChildNodeClick = (node: TreeNodeType, event: Event) => {
  emit('node-click', node, event)
}
</script>
