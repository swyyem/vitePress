<!-- File: autocomplete.vue - 自动完成输入框 -->
<template>
  <div
    ref="rootRef"
    :class="[
      'swy-autocomplete',
      props.size && props.size !== 'default' ? `swy-autocomplete--${props.size}` : null,
      props.disabled && 'is-disabled',
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <!-- ── 输入框 ── -->
    <div class="swy-autocomplete__wrapper">
      <input
        ref="inputRef"
        :value="inputValue"
        class="swy-autocomplete__input"
        :placeholder="props.placeholder || '请输入'"
        :disabled="props.disabled"
        autocomplete="off"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <!-- 后缀区（绝对定位，防跳动） -->
      <span class="swy-autocomplete__suffix">
        <!-- 加载中 -->
        <span v-if="loading" class="swy-autocomplete__loading">
          <svg viewBox="0 0 1024 1024" width="14" height="14" fill="#c0c4cc" class="swy-spin">
            <path
              d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V736a32 32 0 0 1 32-32zM192 512a32 32 0 0 1-32 32H-32a32 32 0 0 1 0-64H160a32 32 0 0 1 32 32zm832 0a32 32 0 0 1-32 32H800a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z"
            />
          </svg>
        </span>
        <!-- 清除 -->
        <span
          v-else-if="props.clearable && !!inputValue && isHovering && !props.disabled"
          class="swy-autocomplete__clear"
          @mousedown.prevent="handleClear"
        >
          <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
            />
          </svg>
        </span>
      </span>
    </div>

    <!-- ── 建议列表（Teleport 到 body，全内联样式） ── -->
    <Teleport to="body">
      <div
        v-if="panelVisible"
        ref="panelRef"
        :style="{
          ...panelStyle,
          background: '#fff',
          border: '1px solid #e4e7ed',
          borderRadius: '4px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          maxHeight: '280px',
          overflowY: 'auto',
          padding: '4px 0',
        }"
        @mousedown.prevent
      >
        <!-- 空结果 -->
        <div
          v-if="!suggestions.length"
          style="
            height: 34px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            color: #909399;
            font-size: 13px;
          "
        >
          无匹配数据
        </div>

        <!-- 建议项 -->
        <div
          v-for="(item, idx) in suggestions"
          :key="idx"
          :style="{
            display: 'block',
            minHeight: '34px',
            padding: '0 16px',
            fontSize: '14px',
            color: '#303133',
            background: idx === highlightedIndex ? '#f5f7fa' : 'transparent',
            cursor: 'pointer',
            boxSizing: 'border-box',
            lineHeight: '34px',
          }"
          @click="handleSelect(item)"
          @mouseenter="highlightedIndex = idx"
          @mouseleave="highlightedIndex = -1"
        >
          <slot :item="item">
            <span
              style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
            >
              {{ item[props.valueKey] }}
            </span>
          </slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { autocompleteProps, autocompleteEmits } from './autocomplete'

defineOptions({ name: 'SwyAutocomplete' })

const props = defineProps(autocompleteProps)
const emit = defineEmits(autocompleteEmits)

// ========== DOM 引用 ==========
const rootRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const panelRef = ref<HTMLElement>()

// ========== 状态 ==========
const inputValue = ref(props.modelValue ?? '')
const suggestions = ref<Record<string, unknown>[]>([])
const visible = ref(false)
const loading = ref(false)
const isHovering = ref(false)
const highlightedIndex = ref(-1)
const panelStyle = ref<CSSProperties>({})

/** 面板可见：已聚焦 + 有建议 */
const panelVisible = computed(() => visible.value && suggestions.value.length > 0)

// ========== 防抖 ==========
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function debouncedFetch(query: string) {
  if (debounceTimer) clearTimeout(debounceTimer)
  loading.value = true
  debounceTimer = setTimeout(() => {
    if (!props.fetchSuggestions) {
      loading.value = false
      return
    }
    props.fetchSuggestions(query, (data: Record<string, unknown>[]) => {
      loading.value = false
      suggestions.value = data ?? []
      highlightedIndex.value = props.highlightFirstItem && data?.length ? 0 : -1
      visible.value = true
    })
  }, props.debounce ?? 300)
}

// ========== 定位 ==========
function updatePosition() {
  if (!rootRef.value) return
  const rect = rootRef.value.getBoundingClientRect()
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: 2000,
  }
}

// ========== 事件处理 ==========
function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  inputValue.value = val
  emit('update:modelValue', val)
  emit('input', val)
  updatePosition()
  debouncedFetch(val)
}

function handleFocus() {
  emit('focus')
  updatePosition()
  if (props.triggerOnFocus) {
    debouncedFetch(inputValue.value)
  }
}

function handleBlur() {
  // 延迟关闭，让 handleSelect 的 click 能正常触发
  setTimeout(() => {
    visible.value = false
    highlightedIndex.value = -1
  }, 150)
  emit('blur')
}

function handleClear() {
  inputValue.value = ''
  suggestions.value = []
  visible.value = false
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => inputRef.value?.focus())
}

function handleSelect(item: Record<string, unknown>) {
  const val = item[props.valueKey] as string
  inputValue.value = val
  suggestions.value = []
  visible.value = false
  emit('update:modelValue', val)
  emit('select', item)
}

function handleKeydown(e: KeyboardEvent) {
  if (!panelVisible.value) return
  const len = suggestions.value.length
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlightedIndex.value = (highlightedIndex.value + 1) % len
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlightedIndex.value = (highlightedIndex.value - 1 + len) % len
  } else if (e.key === 'Enter') {
    if (highlightedIndex.value >= 0) {
      e.preventDefault()
      handleSelect(suggestions.value[highlightedIndex.value])
    }
  } else if (e.key === 'Escape') {
    visible.value = false
    highlightedIndex.value = -1
  }
}

// ========== 外部点击关闭 ==========
function onClickOutside(e: MouseEvent) {
  const t = e.target as Node
  if (!rootRef.value?.contains(t) && !panelRef.value?.contains(t)) {
    visible.value = false
    highlightedIndex.value = -1
  }
}

function onScrollOrResize() {
  if (panelVisible.value) updatePosition()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScrollOrResize, { passive: true, capture: true })
  window.addEventListener('resize', onScrollOrResize, { passive: true })
})

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScrollOrResize, { capture: true })
  window.removeEventListener('resize', onScrollOrResize)
})

// ========== 外部 modelValue 变化同步 ==========
watch(
  () => props.modelValue,
  val => {
    inputValue.value = val ?? ''
  }
)

// ========== 暴露 ==========
defineExpose({ inputRef, visible, suggestions, focus: () => inputRef.value?.focus() })
</script>

<style>
/* ══ 外层容器 ══════════════════════════════ */
.swy-autocomplete {
  display: inline-block;
  width: 100%;
  font-size: 14px;
}

/* ══ 输入框包装 ══════════════════════════ */
.swy-autocomplete__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.swy-autocomplete:not(.is-disabled) .swy-autocomplete__wrapper:hover {
  border-color: #c0c4cc;
}

.swy-autocomplete__wrapper:focus-within {
  border-color: #409eff;
}

.swy-autocomplete.is-disabled .swy-autocomplete__wrapper {
  background: #f5f7fa;
  border-color: #e4e7ed;
  cursor: not-allowed;
}

/* 尺寸 */
.swy-autocomplete--large .swy-autocomplete__wrapper {
  height: 40px;
  font-size: 15px;
}
.swy-autocomplete--small .swy-autocomplete__wrapper {
  height: 24px;
  font-size: 12px;
}

/* ══ 原生 input ══════════════════════════ */
.swy-autocomplete__input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 30px 0 12px;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  color: #606266;
  box-sizing: border-box;
}

.swy-autocomplete__input::placeholder {
  color: #a8abb2;
}

.swy-autocomplete.is-disabled .swy-autocomplete__input {
  cursor: not-allowed;
  color: #c0c4cc;
}

/* ══ 后缀（绝对定位，防抖动） ══════════ */
.swy-autocomplete__suffix {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #c0c4cc;
  pointer-events: none;
}

.swy-autocomplete__clear,
.swy-autocomplete__loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.swy-autocomplete__clear {
  cursor: pointer;
  transition: color 0.2s;
}

.swy-autocomplete__clear:hover {
  color: #909399;
}

/* ══ 旋转动画（loading） ════════════════ */
@keyframes swy-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.swy-spin {
  animation: swy-spin 1s linear infinite;
}
</style>
