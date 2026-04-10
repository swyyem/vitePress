<template>
  <div class="history-panel">
    <div class="hp-header">
      <h4>操作历史</h4>
      <span class="hp-count">{{ history.length }} 步</span>
    </div>
    <div v-if="!history.length" class="hp-empty">暂无操作记录</div>
    <div v-else class="hp-list">
      <div
        v-for="(item, index) in history"
        :key="index"
        :class="[
          'hp-item',
          {
            'is-current': index === currentIndex,
            'is-past': index < currentIndex,
            'is-future': index > currentIndex,
          },
        ]"
        @click="$emit('jump', index)"
      >
        <div class="hp-dot" />
        <div class="hp-info">
          <span class="hp-label">{{ item.label }}</span>
          <span class="hp-time">{{ item.time }}</span>
        </div>
        <span class="hp-badge" v-if="index === currentIndex">当前</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface HistoryEntry {
  label: string
  time: string
  snapshot: string
}

defineProps<{
  history: HistoryEntry[]
  currentIndex: number
}>()

defineEmits<{
  (e: 'jump', index: number): void
}>()
</script>

<style scoped>
.history-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.hp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
}

.hp-header h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #303133;
}

.hp-count {
  font-size: 11px;
  color: #909399;
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 10px;
}

.hp-empty {
  padding: 30px 16px;
  text-align: center;
  color: #c0c4cc;
  font-size: 13px;
}

.hp-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.hp-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}

.hp-item:hover {
  background: #f5f7fa;
}

.hp-item.is-current {
  background: #ecf5ff;
}

.hp-item.is-future {
  opacity: 0.45;
}

.hp-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dcdfe6;
  flex-shrink: 0;
  position: relative;
}

.hp-item.is-current .hp-dot {
  background: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.2);
}

.hp-item.is-past .hp-dot {
  background: #67c23a;
}

/* 连接线 */
.hp-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 19.5px;
  top: 24px;
  width: 1px;
  height: calc(100% - 8px);
  background: #e4e7ed;
}

.hp-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.hp-label {
  font-size: 12px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hp-time {
  font-size: 10px;
  color: #c0c4cc;
  margin-top: 1px;
}

.hp-badge {
  font-size: 10px;
  color: #409eff;
  background: #ecf5ff;
  padding: 1px 6px;
  border-radius: 3px;
  flex-shrink: 0;
}
</style>
