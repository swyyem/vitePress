<template>
  <div
    :class="[ns.b(), ns.is('expanded', expanded)]"
    :style="{ paddingLeft: `${props.level * indent}px` }"
  >
    <div :class="ns.e('content')" @click="handleContentClick">
      <i
        :class="[ns.e('expand-icon'), expanded ? 'expanded' : '', isLeaf ? 'is-leaf' : '']"
        @click.stop="handleExpandClick"
      >
        <slot name="expand-icon" :expanded="expanded" :is-leaf="isLeaf">
          <ArrowRight />
        </slot>
      </i>
      <SwyCheckbox
        v-if="tree?.props.showCheckbox"
        :model-value="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.stop
        @change="handleCheckChange"
      />
      <span :class="ns.e('label')">
        <slot :node="node" :data="node">
          {{ node.label }}
        </slot>
      </span>
    </div>
    <transition name="swy-tree">
      <div v-show="expanded" :class="ns.e('children')">
        <SwyTreeNode
          v-for="child in node.children"
          :key="child[nodeKey]"
          :node="child"
          :node-key="nodeKey"
          :expand-on-click-node="expandOnClickNode"
          :default-expand-all="defaultExpandAll"
          :indent="indent"
          :level="props.level + 1"
          @node-click="handleChildNodeClick"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import SwyCheckbox from '@swy-ui/components/checkbox'
import { treeNodeProps, treeNodeEmits } from './tree-node'
import { treeContextKey } from './tree'
import type { TreeNode as TreeNodeType } from './tree'
import { ArrowRight } from '@swy-ui/components/icon/src/icons/index'

defineOptions({
  name: 'SwyTreeNode',
})

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

const ns = useNamespace('tree-node')
const tree = inject(treeContextKey)

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

const handleCheckChange = (value: boolean) => {
  if (tree && tree.toggleCheck) {
    tree.toggleCheck(props.node, value)
  }
}

const handleChildNodeClick = (node: TreeNodeType, event: Event) => {
  emit('node-click', node, event)
}
</script>
