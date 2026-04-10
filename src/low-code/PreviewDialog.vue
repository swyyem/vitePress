<template>
  <teleport to="body">
    <transition name="preview-fade">
      <div v-if="visible" class="preview-overlay" @click.self="$emit('close')">
        <div class="preview-container">
          <div class="preview-header">
            <h3>页面预览</h3>
            <div class="preview-actions">
              <button
                v-for="device in devices"
                :key="device.name"
                class="device-btn"
                :class="{ active: currentDevice === device.name }"
                @click="currentDevice = device.name"
              >
                {{ device.icon }} {{ device.label }}
              </button>
            </div>
            <button class="close-btn" @click="$emit('close')">✕</button>
          </div>
          <div class="preview-body">
            <div
              class="preview-frame"
              :style="{
                width: currentDeviceConfig.width,
                minHeight: currentDeviceConfig.height,
              }"
            >
              <div class="preview-content">
                <ComponentRenderer v-for="comp in components" :key="comp.id" :instance="comp" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ComponentRenderer from './ComponentRenderer.vue'
import type { ComponentInstance } from './types'

defineProps<{
  visible: boolean
  components: ComponentInstance[]
}>()

defineEmits<{
  (e: 'close'): void
}>()

const devices = [
  { name: 'desktop', label: '桌面', icon: '🖥️', width: '100%', height: '600px' },
  { name: 'tablet', label: '平板', icon: '📱', width: '768px', height: '600px' },
  { name: 'mobile', label: '手机', icon: '📲', width: '375px', height: '667px' },
]

const currentDevice = ref('desktop')

const currentDeviceConfig = computed(() => {
  return devices.find(d => d.name === currentDevice.value) || devices[0]
})
</script>

<style scoped>
.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.preview-container {
  width: 90vw;
  height: 85vh;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.preview-header {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #e8e8e8;
  background: #fafbfc;
  gap: 16px;
}

.preview-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.preview-actions {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.device-btn {
  padding: 5px 12px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.device-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.device-btn.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.close-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #f0f2f5;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f56c6c;
  color: #fff;
}

.preview-body {
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f0f2f5;
}

.preview-frame {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  overflow: auto;
}

.preview-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Transition */
.preview-fade-enter-active,
.preview-fade-leave-active {
  transition: opacity 0.25s ease;
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;
}
</style>
