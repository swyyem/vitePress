<template>
  <teleport to="body">
    <transition-group name="toast-slide" tag="div" class="toast-container">
      <div v-for="item in toasts" :key="item.id" :class="['toast-item', 'toast--' + item.type]">
        <span class="toast-icon">{{ iconMap[item.type] }}</span>
        <span class="toast-msg">{{ item.message }}</span>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

const iconMap: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
}

const toasts = ref<ToastItem[]>([])
let seq = 0

function show(message: string, type: ToastItem['type'] = 'info', duration = 2500) {
  const id = ++seq
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, duration)
}

defineExpose({ show })
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}

.toast-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  pointer-events: auto;
  backdrop-filter: blur(8px);
}

.toast--success {
  background: #f0f9eb;
  color: #67c23a;
  border: 1px solid #e1f3d8;
}

.toast--error {
  background: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fde2e2;
}

.toast--info {
  background: #f4f4f5;
  color: #909399;
  border: 1px solid #e9e9eb;
}

.toast--warning {
  background: #fdf6ec;
  color: #e6a23c;
  border: 1px solid #faecd8;
}

.toast-icon {
  font-size: 16px;
  font-weight: 700;
}

.toast-slide-enter-active {
  transition: all 0.3s ease;
}

.toast-slide-leave-active {
  transition: all 0.25s ease;
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
