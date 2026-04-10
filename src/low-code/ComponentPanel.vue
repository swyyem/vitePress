<template>
  <div class="component-panel">
    <div class="panel-header">
      <h3>组件库</h3>
      <input v-model="searchText" class="search-input" placeholder="搜索组件..." />
    </div>
    <div class="panel-body">
      <div v-for="(components, category) in filteredGroups" :key="category" class="category-group">
        <div class="category-title" @click="toggleCategory(String(category))">
          <span class="arrow" :class="{ expanded: expandedCategories.has(String(category)) }">
            ▶
          </span>
          {{ getCategoryLabel(String(category)) }}
          <span class="count">{{ components.length }}</span>
        </div>
        <div v-show="expandedCategories.has(String(category))" class="category-items">
          <div
            v-for="comp in components"
            :key="comp.type"
            class="component-item"
            draggable="true"
            @dragstart="handleDragStart($event, comp)"
            @click="$emit('add-component', comp.type)"
          >
            <span class="comp-icon">{{ comp.icon }}</span>
            <span class="comp-name">{{ comp.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getGroupedComponents } from './component-registry'
import { CATEGORY_LABELS } from './types'
import type { ComponentMeta } from './types'

function getCategoryLabel(cat: string): string {
  return (CATEGORY_LABELS as Record<string, string>)[cat] || cat
}

defineEmits<{
  (e: 'add-component', type: string): void
}>()

const searchText = ref('')
const grouped = getGroupedComponents()

const expandedCategories = ref(new Set(Object.keys(grouped)))

const filteredGroups = computed(() => {
  if (!searchText.value.trim()) return grouped
  const keyword = searchText.value.toLowerCase()
  const result: Record<string, ComponentMeta[]> = {}
  for (const [cat, comps] of Object.entries(grouped)) {
    const filtered = comps.filter(
      c => c.label.toLowerCase().includes(keyword) || c.type.toLowerCase().includes(keyword)
    )
    if (filtered.length) result[cat] = filtered
  }
  return result
})

function toggleCategory(cat: string) {
  if (expandedCategories.value.has(cat)) {
    expandedCategories.value.delete(cat)
  } else {
    expandedCategories.value.add(cat)
  }
}

function handleDragStart(e: DragEvent, comp: ComponentMeta) {
  e.dataTransfer?.setData('component-type', comp.type)
  e.dataTransfer!.effectAllowed = 'copy'
}
</script>

<style scoped>
.component-panel {
  width: 260px;
  height: 100%;
  background: #fafbfc;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.panel-header h3 {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.search-input {
  width: 100%;
  padding: 7px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #409eff;
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.category-title {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  cursor: pointer;
  gap: 6px;
}

.category-title:hover {
  background: #f0f2f5;
}

.arrow {
  font-size: 10px;
  transition: transform 0.2s;
  color: #909399;
}

.arrow.expanded {
  transform: rotate(90deg);
}

.count {
  margin-left: auto;
  font-size: 11px;
  color: #c0c4cc;
  font-weight: 400;
}

.category-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 4px 12px 8px;
}

.component-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s;
  background: #fff;
}

.component-item:hover {
  border-color: #409eff;
  background: #ecf5ff;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.15);
}

.component-item:active {
  cursor: grabbing;
}

.comp-icon {
  font-size: 20px;
  line-height: 1;
}

.comp-name {
  font-size: 12px;
  color: #606266;
  white-space: nowrap;
}
</style>
