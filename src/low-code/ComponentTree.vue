<template>
  <div class="component-tree">
    <div class="tree-header">
      <h4>组件大纲</h4>
      <span class="tree-count">{{ components.length }} 个</span>
    </div>
    <div v-if="!components.length" class="tree-empty">暂无组件</div>
    <div v-else class="tree-list">
      <div
        v-for="(comp, index) in components"
        :key="comp.id"
        :class="['tree-node', { 'is-active': selectedId === comp.id }]"
        @click="$emit('select', comp.id)"
        draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover.prevent="onDragOver($event, index)"
        @drop.prevent="onDrop($event, index)"
        @dragend="dragIdx = null"
      >
        <span class="node-icon">{{ getMeta(comp.type)?.icon || '📦' }}</span>
        <span class="node-label">{{ getMeta(comp.type)?.label || comp.type }}</span>
        <span class="node-tag">{{ comp.type.replace('Swy', '') }}</span>
        <button class="node-del" title="删除" @click.stop="$emit('remove', index)">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getComponentMeta } from './component-registry'
import type { ComponentInstance } from './types'

defineProps<{
  components: ComponentInstance[]
  selectedId: string | null
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'remove', index: number): void
  (e: 'reorder', from: number, to: number): void
}>()

const dragIdx = ref<number | null>(null)

function getMeta(type: string) {
  return getComponentMeta(type)
}

function onDragStart(e: DragEvent, index: number) {
  dragIdx.value = index
  e.dataTransfer!.effectAllowed = 'move'
}

function onDragOver(e: DragEvent, _index: number) {
  e.dataTransfer!.dropEffect = 'move'
}

function onDrop(_e: DragEvent, toIndex: number) {
  if (dragIdx.value !== null && dragIdx.value !== toIndex) {
    emit('reorder', dragIdx.value, toIndex)
  }
  dragIdx.value = null
}
</script>

<style scoped>
.component-tree {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tree-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
}

.tree-header h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #303133;
}

.tree-count {
  font-size: 11px;
  color: #909399;
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 10px;
}

.tree-empty {
  padding: 30px 16px;
  text-align: center;
  color: #c0c4cc;
  font-size: 13px;
}

.tree-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 13px;
  border-left: 3px solid transparent;
}

.tree-node:hover {
  background: #f5f7fa;
}

.tree-node.is-active {
  background: #ecf5ff;
  border-left-color: #409eff;
}

.node-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.node-label {
  color: #303133;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.node-tag {
  font-size: 10px;
  color: #909399;
  background: #f0f2f5;
  padding: 1px 5px;
  border-radius: 3px;
  flex-shrink: 0;
}

.node-del {
  display: none;
  background: none;
  border: none;
  color: #c0c4cc;
  cursor: pointer;
  font-size: 12px;
  padding: 2px;
  flex-shrink: 0;
}

.tree-node:hover .node-del {
  display: block;
}

.node-del:hover {
  color: #f56c6c;
}
</style>
