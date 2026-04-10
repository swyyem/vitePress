<template>
  <teleport to="body">
    <transition name="tpl-fade">
      <div v-if="visible" class="tpl-overlay" @click.self="$emit('close')">
        <div class="tpl-container">
          <div class="tpl-header">
            <h3>选择页面模板</h3>
            <button class="tpl-close" @click="$emit('close')">✕</button>
          </div>
          <div class="tpl-body">
            <div class="tpl-grid">
              <div
                v-for="tpl in pageTemplates"
                :key="tpl.name"
                class="tpl-card"
                @click="selectTemplate(tpl)"
              >
                <div class="tpl-icon">{{ tpl.icon }}</div>
                <div class="tpl-name">{{ tpl.name }}</div>
                <div class="tpl-desc">{{ tpl.description }}</div>
                <div class="tpl-badge">{{ tpl.factory().length }} 个组件</div>
              </div>
              <!-- 空白模板 -->
              <div class="tpl-card tpl-card--blank" @click="$emit('close')">
                <div class="tpl-icon">📄</div>
                <div class="tpl-name">空白页面</div>
                <div class="tpl-desc">从零开始创建你的页面</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { pageTemplates } from './page-templates'
import type { PageTemplate } from './page-templates'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', tpl: PageTemplate): void
}>()

function selectTemplate(tpl: PageTemplate) {
  emit('select', tpl)
  emit('close')
}
</script>

<style scoped>
.tpl-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.tpl-container {
  width: 720px;
  max-height: 80vh;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.tpl-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
}

.tpl-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.tpl-close {
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

.tpl-close:hover {
  background: #f56c6c;
  color: #fff;
}

.tpl-body {
  padding: 24px;
  overflow-y: auto;
}

.tpl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tpl-card {
  padding: 20px;
  border: 2px solid #ebeef5;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s;
  text-align: center;
  position: relative;
}

.tpl-card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.15);
  transform: translateY(-2px);
}

.tpl-card--blank {
  border-style: dashed;
  background: #fafbfc;
}

.tpl-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.tpl-name {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 6px;
}

.tpl-desc {
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.tpl-badge {
  display: inline-block;
  margin-top: 10px;
  padding: 2px 10px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 10px;
  font-size: 11px;
}

/* Transition */
.tpl-fade-enter-active,
.tpl-fade-leave-active {
  transition: opacity 0.25s ease;
}

.tpl-fade-enter-from,
.tpl-fade-leave-to {
  opacity: 0;
}
</style>
