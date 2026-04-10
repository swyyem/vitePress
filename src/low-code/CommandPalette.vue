<template>
  <teleport to="body">
    <transition name="cmd-fade">
      <div v-if="visible" class="cmd-overlay" @click.self="$emit('close')">
        <div class="cmd-container">
          <div class="cmd-search">
            <span class="cmd-icon">🔍</span>
            <input
              ref="inputRef"
              v-model="query"
              class="cmd-input"
              placeholder="搜索命令..."
              @keydown.escape="$emit('close')"
              @keydown.enter="executeFirst"
              @keydown.up.prevent="moveSelection(-1)"
              @keydown.down.prevent="moveSelection(1)"
            />
            <span class="cmd-shortcut">ESC</span>
          </div>
          <div class="cmd-list">
            <div
              v-for="(cmd, idx) in filteredCommands"
              :key="cmd.key"
              :class="['cmd-item', { active: selectedIndex === idx }]"
              @click="execute(cmd)"
              @mouseenter="selectedIndex = idx"
            >
              <span class="cmd-item-icon">{{ cmd.icon }}</span>
              <div class="cmd-item-info">
                <span class="cmd-item-label">{{ cmd.label }}</span>
                <span v-if="cmd.description" class="cmd-item-desc">{{ cmd.description }}</span>
              </div>
              <span v-if="cmd.shortcut" class="cmd-item-shortcut">{{ cmd.shortcut }}</span>
            </div>
            <div v-if="!filteredCommands.length" class="cmd-empty">没有匹配的命令</div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

export interface Command {
  key: string
  label: string
  icon: string
  description?: string
  shortcut?: string
  action: () => void
}

const props = defineProps<{
  visible: boolean
  commands: Command[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const inputRef = ref<HTMLInputElement>()
const query = ref('')
const selectedIndex = ref(0)

const filteredCommands = computed(() => {
  if (!query.value.trim()) return props.commands
  const q = query.value.toLowerCase()
  return props.commands.filter(
    c => c.label.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q)
  )
})

watch(
  () => props.visible,
  val => {
    if (val) {
      query.value = ''
      selectedIndex.value = 0
      nextTick(() => inputRef.value?.focus())
    }
  }
)

watch(query, () => {
  selectedIndex.value = 0
})

function moveSelection(delta: number) {
  const len = filteredCommands.value.length
  if (!len) return
  selectedIndex.value = (selectedIndex.value + delta + len) % len
}

function executeFirst() {
  if (filteredCommands.value.length) {
    execute(filteredCommands.value[selectedIndex.value])
  }
}

function execute(cmd: Command) {
  emit('close')
  cmd.action()
}
</script>

<style scoped>
.cmd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  z-index: 6000;
}

.cmd-container {
  width: 520px;
  max-height: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: cmd-in 0.15s ease;
}

@keyframes cmd-in {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.cmd-search {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #e8e8e8;
  gap: 10px;
}

.cmd-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.cmd-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #303133;
  background: transparent;
}

.cmd-input::placeholder {
  color: #c0c4cc;
}

.cmd-shortcut {
  font-size: 11px;
  color: #c0c4cc;
  background: #f0f2f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.cmd-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.cmd-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  cursor: pointer;
  transition: background 0.1s;
}

.cmd-item:hover,
.cmd-item.active {
  background: #ecf5ff;
}

.cmd-item-icon {
  font-size: 16px;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.cmd-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cmd-item-label {
  font-size: 14px;
  color: #303133;
}

.cmd-item-desc {
  font-size: 11px;
  color: #909399;
  margin-top: 1px;
}

.cmd-item-shortcut {
  font-size: 11px;
  color: #909399;
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 3px;
  font-family: monospace;
  flex-shrink: 0;
}

.cmd-empty {
  padding: 24px;
  text-align: center;
  color: #c0c4cc;
  font-size: 13px;
}

/* Transition */
.cmd-fade-enter-active,
.cmd-fade-leave-active {
  transition: opacity 0.15s ease;
}
.cmd-fade-enter-from,
.cmd-fade-leave-to {
  opacity: 0;
}
</style>
