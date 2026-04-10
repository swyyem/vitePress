<template>
  <div class="schema-panel">
    <div class="schema-header">
      <h3>JSON Schema</h3>
      <div class="schema-actions">
        <button class="action-btn" @click="copySchema">复制</button>
        <button class="action-btn action-btn--primary" @click="applySchema">应用</button>
      </div>
    </div>
    <textarea
      ref="textareaRef"
      class="schema-editor"
      :value="schemaText"
      spellcheck="false"
      @input="onInput"
    />
    <div v-if="error" class="schema-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ComponentInstance } from './types'

const props = defineProps<{
  components: ComponentInstance[]
}>()

const emit = defineEmits<{
  (e: 'import', components: ComponentInstance[]): void
}>()

const textareaRef = ref<HTMLTextAreaElement>()
const schemaText = ref('')
const error = ref('')

watch(
  () => props.components,
  val => {
    schemaText.value = JSON.stringify(val, null, 2)
    error.value = ''
  },
  { immediate: true, deep: true }
)

function onInput(e: Event) {
  schemaText.value = (e.target as HTMLTextAreaElement).value
  error.value = ''
}

function copySchema() {
  navigator.clipboard.writeText(schemaText.value).then(() => {
    alert('已复制到剪贴板')
  })
}

function applySchema() {
  try {
    const parsed = JSON.parse(schemaText.value)
    if (!Array.isArray(parsed)) {
      error.value = '格式错误：根节点需为数组'
      return
    }
    emit('import', parsed)
    error.value = ''
  } catch {
    error.value = 'JSON 解析失败，请检查语法'
  }
}
</script>

<style scoped>
.schema-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.schema-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
}

.schema-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.schema-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  padding: 4px 12px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.action-btn--primary {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.action-btn--primary:hover {
  background: #66b1ff;
}

.schema-editor {
  flex: 1;
  padding: 12px;
  border: none;
  outline: none;
  resize: none;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #303133;
  background: #fafbfc;
  tab-size: 2;
}

.schema-error {
  padding: 8px 16px;
  background: #fef0f0;
  color: #f56c6c;
  font-size: 12px;
  border-top: 1px solid #fde2e2;
}
</style>
