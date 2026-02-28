<!-- File: time-picker.vue - 时间选择器 -->
<template>
  <div
    ref="rootRef"
    :class="[
      'swy-time-picker',
      props.size && props.size !== 'default' ? `swy-time-picker--${props.size}` : null,
      props.disabled && 'is-disabled',
      visible && 'is-open',
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="handleToggle"
  >
    <!-- ── 触发框 ── -->
    <div class="swy-time-picker__wrapper">
      <!-- 左侧时钟图标 -->
      <span class="swy-time-picker__prefix">
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          />
          <path
            d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
          />
        </svg>
      </span>

      <!-- 值 / 占位文本 -->
      <span v-if="displayValue" class="swy-time-picker__value">{{ displayValue }}</span>
      <span v-else class="swy-time-picker__placeholder">
        {{ props.placeholder || '请选择时间' }}
      </span>

      <!-- 清除按钮（hover + clearable + 有值） -->
      <span
        v-if="props.clearable && !!displayValue && isHovering"
        class="swy-time-picker__clear"
        @click.stop="handleClear"
      >
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
          />
        </svg>
      </span>
    </div>

    <!-- ── 时间面板（Teleport 到 body） ── -->
    <Teleport to="body">
      <Transition name="swy-tp-fade">
        <div v-if="visible" ref="panelRef" class="swy-tp-panel" :style="panelStyle" @click.stop>
          <!-- 三列时间 -->
          <div class="swy-tp-body">
            <!-- 小时 -->
            <div ref="hourColRef" class="swy-tp-col">
              <ul class="swy-tp-list">
                <li
                  v-for="h in 24"
                  :key="h - 1"
                  :class="['swy-tp-item', h - 1 === hour && 'is-active']"
                  @click="hour = h - 1"
                >
                  {{ pad(h - 1) }}
                </li>
              </ul>
            </div>
            <span class="swy-tp-sep">:</span>
            <!-- 分钟 -->
            <div ref="minColRef" class="swy-tp-col">
              <ul class="swy-tp-list">
                <li
                  v-for="m in 60"
                  :key="m - 1"
                  :class="['swy-tp-item', m - 1 === minute && 'is-active']"
                  @click="minute = m - 1"
                >
                  {{ pad(m - 1) }}
                </li>
              </ul>
            </div>
            <!-- 秒（format 含 ss 才显示） -->
            <template v-if="showSeconds">
              <span class="swy-tp-sep">:</span>
              <div ref="secColRef" class="swy-tp-col">
                <ul class="swy-tp-list">
                  <li
                    v-for="s in 60"
                    :key="s - 1"
                    :class="['swy-tp-item', s - 1 === second && 'is-active']"
                    @click="second = s - 1"
                  >
                    {{ pad(s - 1) }}
                  </li>
                </ul>
              </div>
            </template>
          </div>

          <!-- 底部按钮 -->
          <div class="swy-tp-footer">
            <button class="swy-tp-btn swy-tp-btn--text" @click="handleClear">清空</button>
            <button class="swy-tp-btn swy-tp-btn--primary" @click="handleConfirm">确定</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== 依赖导入 ==========
import { computed, ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { timePickerEmits, timePickerProps } from './time-picker'

defineOptions({ name: 'SwyTimePicker' })

const props = defineProps(timePickerProps)
const emit = defineEmits(timePickerEmits)

// ========== DOM 引用 ==========
const rootRef = ref<HTMLElement>()
const panelRef = ref<HTMLElement>()
const hourColRef = ref<HTMLElement>()
const minColRef = ref<HTMLElement>()
const secColRef = ref<HTMLElement>()

// ========== 状态 ==========
const visible = ref(false)
const isHovering = ref(false)
/** 面板内临时选中（确认后才写回 modelValue） */
const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const panelStyle = ref<CSSProperties>({})

// ========== 计算属性 ==========
const showSeconds = computed(() => props.format.includes('ss'))

/** 触发框显示值（来自 modelValue） */
const displayValue = computed(() => {
  const val = props.modelValue
  if (!val) return ''
  const [h, m, s] = parseTime(val)
  const base = `${pad(h)}:${pad(m)}`
  return showSeconds.value ? `${base}:${pad(s)}` : base
})

// ========== 工具 ==========
function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parseTime(val: string | Date): [number, number, number] {
  if (!val) return [0, 0, 0]
  if (val instanceof Date) return [val.getHours(), val.getMinutes(), val.getSeconds()]
  const parts = String(val).split(':').map(Number)
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0]
}

function buildValue() {
  const base = `${pad(hour.value)}:${pad(minute.value)}`
  return showSeconds.value ? `${base}:${pad(second.value)}` : base
}

// ========== 定位 ==========
function updatePosition() {
  if (!rootRef.value) return
  const rect = rootRef.value.getBoundingClientRect()
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
    zIndex: 2000,
  }
}

// ========== 打开时滚动到选中项 ==========
function scrollToSelected() {
  const ITEM_H = 32
  const COL_H = 192
  const offset = (COL_H - ITEM_H) / 2

  nextTick(() => {
    if (hourColRef.value) hourColRef.value.scrollTop = hour.value * ITEM_H - offset
    if (minColRef.value) minColRef.value.scrollTop = minute.value * ITEM_H - offset
    if (secColRef.value) secColRef.value.scrollTop = second.value * ITEM_H - offset
  })
}

// ========== 初始化内部状态 ==========
function syncFromValue() {
  const [h, m, s] = parseTime(props.modelValue ?? '')
  hour.value = h
  minute.value = m
  second.value = s
}

// ========== 交互 ==========
async function handleToggle() {
  if (props.disabled) return
  if (visible.value) {
    visible.value = false
    return
  }
  syncFromValue()
  visible.value = true
  await nextTick()
  updatePosition()
  scrollToSelected()
}

function handleConfirm() {
  const result = buildValue()
  emit('update:modelValue', result)
  emit('change', result)
  visible.value = false
}

function handleClear() {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  visible.value = false
}

// ========== 外部点击关闭 ==========
function onClickOutside(e: MouseEvent) {
  const t = e.target as Node
  if (!rootRef.value?.contains(t) && !panelRef.value?.contains(t)) {
    visible.value = false
  }
}

function onScrollOrResize() {
  if (visible.value) updatePosition()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScrollOrResize, { passive: true, capture: true })
  window.addEventListener('resize', onScrollOrResize, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScrollOrResize, { capture: true })
  window.removeEventListener('resize', onScrollOrResize)
})

watch(
  () => props.modelValue,
  () => {
    if (!visible.value) return
    syncFromValue()
  }
)

defineExpose({ visible })
</script>

<style>
/* ── 触发容器 ───────────────────────────── */
.swy-time-picker {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.swy-time-picker__wrapper {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  gap: 6px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.swy-time-picker:hover:not(.is-disabled) .swy-time-picker__wrapper {
  border-color: #c0c4cc;
}

.swy-time-picker.is-open .swy-time-picker__wrapper {
  border-color: #409eff;
}

.swy-time-picker.is-disabled {
  cursor: not-allowed;
}

.swy-time-picker.is-disabled .swy-time-picker__wrapper {
  background: #f5f7fa;
  border-color: #e4e7ed;
}

/* ── 内部元素 ──────────────────────────── */
.swy-time-picker__prefix {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
}

.swy-time-picker__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
  line-height: 30px;
}

.swy-time-picker__placeholder {
  flex: 1;
  min-width: 0;
  color: #a8abb2;
  line-height: 30px;
}

.swy-time-picker__clear {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
  transition: color 0.15s;
}

.swy-time-picker__clear:hover {
  color: #909399;
}

.swy-time-picker.is-disabled .swy-time-picker__value,
.swy-time-picker.is-disabled .swy-time-picker__placeholder {
  color: #c0c4cc;
}

/* ── 尺寸 ──────────────────────────────── */
.swy-time-picker--large .swy-time-picker__wrapper {
  height: 40px;
  font-size: 15px;
}

.swy-time-picker--small .swy-time-picker__wrapper {
  height: 24px;
  font-size: 12px;
}

/* ── 面板（Teleport 到 body） ─────────── */
.swy-tp-panel {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
}

/* ── 三列主体 ─────────────────────────── */
.swy-tp-body {
  display: flex;
  align-items: center;
  padding: 0;
}

.swy-tp-sep {
  flex-shrink: 0;
  color: #909399;
  font-size: 14px;
  padding: 0 2px;
  align-self: center;
}

/* ── 每列 ─────────────────────────────── */
.swy-tp-col {
  flex: 1;
  height: 192px;
  overflow-y: auto;
  scrollbar-width: none;
}

.swy-tp-col::-webkit-scrollbar {
  display: none;
}

/* ── 列表 ─────────────────────────────── */
.swy-tp-list {
  list-style: none;
  margin: 0;
  padding: 80px 0;
}

/* ── 选项 ─────────────────────────────── */
.swy-tp-item {
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: background 0.1s;
}

.swy-tp-item:hover {
  background: #f5f7fa;
}

.swy-tp-item.is-active {
  color: #409eff;
  font-weight: 600;
  background: #ecf5ff;
}

/* ── 底部 ─────────────────────────────── */
.swy-tp-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-top: 1px solid #f0f0f0;
}

.swy-tp-btn {
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  outline: none;
  transition:
    background 0.15s,
    color 0.15s;
}

.swy-tp-btn--text {
  background: transparent;
  color: #909399;
}

.swy-tp-btn--text:hover {
  color: #409eff;
}

.swy-tp-btn--primary {
  background: #409eff;
  color: #fff;
}

.swy-tp-btn--primary:hover {
  background: #66b1ff;
}

/* ── 过渡动画 ─────────────────────────── */
.swy-tp-fade-enter-active,
.swy-tp-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  transform-origin: top center;
}

.swy-tp-fade-enter-from,
.swy-tp-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
