<template>
  <div
    class="canvas-area"
    :style="{ transform: `scale(${zoom})`, transformOrigin: 'top center' }"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
    @click.self="handleCanvasClick"
  >
    <div v-if="!components.length" class="canvas-empty">
      <div class="empty-icon">🎨</div>
      <p>从左侧拖拽组件到此处</p>
      <p class="sub">或点击组件直接添加</p>
    </div>

    <div
      v-for="(comp, index) in components"
      :key="comp.id"
      class="canvas-item"
      :class="{
        'is-selected': selectedIds.includes(comp.id),
        'is-locked': comp.locked,
        'drag-over-top': dragOverIndex === index && dragPosition === 'top',
        'drag-over-bottom': dragOverIndex === index && dragPosition === 'bottom',
      }"
      :draggable="!comp.locked ? 'true' : 'false'"
      @click.stop="handleItemClick($event, comp.id)"
      @contextmenu.prevent.stop="onContextMenu($event, comp.id, index)"
      @dragstart="handleItemDragStart($event, index)"
      @dragover.prevent.stop="handleItemDragOver($event, index)"
      @dragleave="handleItemDragLeave"
      @drop.prevent.stop="handleItemDrop($event, index)"
      @dragend="handleDragEnd"
    >
      <!-- 锁定标记 -->
      <span v-if="comp.locked" class="lock-badge">🔒</span>
      <!-- 操作工具栏 -->
      <div v-if="selectedIds.length === 1 && selectedIds[0] === comp.id" class="item-toolbar">
        <span class="toolbar-label">{{ getLabel(comp.type) }}</span>
        <div class="toolbar-actions">
          <button
            class="tb-btn"
            title="上移"
            :disabled="index === 0"
            @click.stop="$emit('move-up', index)"
          >
            ↑
          </button>
          <button
            class="tb-btn"
            title="下移"
            :disabled="index === components.length - 1"
            @click.stop="$emit('move-down', index)"
          >
            ↓
          </button>
          <button class="tb-btn" title="复制" @click.stop="$emit('duplicate', index)">⧉</button>
          <button class="tb-btn tb-btn--danger" title="删除" @click.stop="$emit('remove', index)">
            ✕
          </button>
        </div>
      </div>
      <!-- 多选标记 -->
      <div v-if="selectedIds.length > 1 && selectedIds.includes(comp.id)" class="multi-badge">
        {{ selectedIds.indexOf(comp.id) + 1 }}
      </div>
      <!-- 组件渲染 -->
      <div class="item-content">
        <ComponentRenderer :instance="comp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getComponentMeta } from './component-registry'
import ComponentRenderer from './ComponentRenderer.vue'
import type { ComponentInstance } from './types'

const props = defineProps<{
  components: ComponentInstance[]
  selectedIds: string[]
  zoom: number
}>()

const emit = defineEmits<{
  (e: 'select', id: string | null, multi: boolean): void
  (e: 'drop-new', type: string, index?: number): void
  (e: 'reorder', from: number, to: number): void
  (e: 'move-up', index: number): void
  (e: 'move-down', index: number): void
  (e: 'duplicate', index: number): void
  (e: 'remove', index: number): void
  (e: 'contextmenu', event: MouseEvent, id: string, index: number): void
}>()

const dragOverIndex = ref<number | null>(null)
const dragPosition = ref<'top' | 'bottom'>('bottom')
const draggingIndex = ref<number | null>(null)

function getLabel(type: string) {
  return getComponentMeta(type)?.label || type
}

function handleCanvasClick(e: MouseEvent) {
  if (!e.shiftKey) {
    emit('select', null, false)
  }
}

function handleItemClick(e: MouseEvent, id: string) {
  emit('select', id, e.shiftKey)
}

function handleDragOver(e: DragEvent) {
  e.dataTransfer!.dropEffect = 'copy'
}

function handleDrop(e: DragEvent) {
  const type = e.dataTransfer?.getData('component-type')
  if (type) {
    emit('drop-new', type)
  }
  resetDragState()
}

function handleItemDragStart(e: DragEvent, index: number) {
  draggingIndex.value = index
  e.dataTransfer?.setData('reorder-index', String(index))
  e.dataTransfer!.effectAllowed = 'move'
}

function handleItemDragOver(e: DragEvent, index: number) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const midY = rect.top + rect.height / 2
  dragOverIndex.value = index
  dragPosition.value = e.clientY < midY ? 'top' : 'bottom'
}

function handleItemDragLeave() {
  dragOverIndex.value = null
}

function handleItemDrop(e: DragEvent, index: number) {
  /* 新组件拖入 */
  const newType = e.dataTransfer?.getData('component-type')
  if (newType) {
    const insertIndex = dragPosition.value === 'top' ? index : index + 1
    emit('drop-new', newType, insertIndex)
    resetDragState()
    return
  }
  /* 排序 */
  const fromStr = e.dataTransfer?.getData('reorder-index')
  if (fromStr !== undefined && fromStr !== '') {
    const from = Number(fromStr)
    let to = dragPosition.value === 'top' ? index : index + 1
    if (from < to) to--
    if (from !== to) emit('reorder', from, to)
  }
  resetDragState()
}

function handleDragEnd() {
  resetDragState()
}

function resetDragState() {
  dragOverIndex.value = null
  draggingIndex.value = null
}

function onContextMenu(e: MouseEvent, id: string, index: number) {
  if (!props.selectedIds.includes(id)) {
    emit('select', id, false)
  }
  emit('contextmenu', e, id, index)
}
</script>

<style scoped>
.canvas-area {
  flex: 1;
  min-height: 100%;
  padding: 20px;
  background:
    linear-gradient(90deg, #f0f2f5 1px, transparent 1px),
    linear-gradient(#f0f2f5 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #f5f7fa;
  overflow-y: auto;
}

.canvas-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #c0c4cc;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.canvas-empty p {
  margin: 4px 0;
  font-size: 14px;
}

.canvas-empty .sub {
  font-size: 12px;
  color: #dcdfe6;
}

.canvas-item {
  position: relative;
  margin-bottom: 8px;
  padding: 12px;
  background: #fff;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.canvas-item:hover {
  border-color: #c6e2ff;
}

.canvas-item.is-locked {
  opacity: 0.7;
  cursor: not-allowed;
}

.lock-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 12px;
  z-index: 5;
}

.canvas-item.is-selected {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.12);
}

.canvas-item.drag-over-top {
  border-top: 3px solid #409eff;
}

.canvas-item.drag-over-bottom {
  border-bottom: 3px solid #409eff;
}

.item-toolbar {
  position: absolute;
  top: -28px;
  left: -2px;
  right: -2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  padding: 0 8px;
  background: #409eff;
  border-radius: 4px 4px 0 0;
  font-size: 12px;
  color: #fff;
  z-index: 10;
}

.toolbar-label {
  font-weight: 500;
}

.toolbar-actions {
  display: flex;
  gap: 2px;
}

.tb-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  width: 22px;
  height: 20px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
}

.tb-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}

.tb-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tb-btn--danger:hover {
  background: #f56c6c;
}

.multi-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 22px;
  height: 22px;
  background: #409eff;
  color: #fff;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.3);
}

.item-content {
  min-height: 20px;
}
</style>
