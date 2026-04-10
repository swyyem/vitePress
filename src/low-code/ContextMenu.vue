<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="context-menu"
      :style="{ left: x + 'px', top: y + 'px' }"
      @contextmenu.prevent
    >
      <div
        v-for="item in menuItems"
        :key="item.key"
        :class="['menu-item', { disabled: item.disabled, divider: item.divider }]"
        @click="handleClick(item)"
      >
        <template v-if="!item.divider">
          <span class="menu-icon">{{ item.icon }}</span>
          <span class="menu-label">{{ item.label }}</span>
          <span v-if="item.shortcut" class="menu-shortcut">{{ item.shortcut }}</span>
        </template>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

export interface MenuItem {
  key: string
  label?: string
  icon?: string
  shortcut?: string
  disabled?: boolean
  divider?: boolean
}

defineProps<{
  visible: boolean
  x: number
  y: number
  menuItems: MenuItem[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'action', key: string): void
}>()

function handleClick(item: MenuItem) {
  if (item.disabled || item.divider) return
  emit('action', item.key)
  emit('close')
}

function onClickOutside() {
  emit('close')
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('contextmenu', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('contextmenu', onClickOutside)
})
</script>

<style scoped>
.context-menu {
  position: fixed;
  min-width: 180px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 4px 0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  z-index: 5000;
  animation: ctx-in 0.15s ease;
}

@keyframes ctx-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 13px;
  color: #303133;
  transition: background 0.15s;
  gap: 8px;
}

.menu-item:hover:not(.disabled):not(.divider) {
  background: #ecf5ff;
  color: #409eff;
}

.menu-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.menu-item.divider {
  height: 1px;
  padding: 0;
  margin: 4px 12px;
  background: #e8e8e8;
  cursor: default;
}

.menu-icon {
  width: 18px;
  text-align: center;
  font-size: 14px;
  flex-shrink: 0;
}

.menu-label {
  flex: 1;
}

.menu-shortcut {
  font-size: 11px;
  color: #909399;
  margin-left: 20px;
}
</style>
