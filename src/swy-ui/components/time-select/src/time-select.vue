<!-- File: time-select.vue - 固定时间段下拉选择 -->
<template>
  <div
    ref="rootRef"
    :class="[
      'swy-time-select',
      props.size && props.size !== 'default' ? `swy-time-select--${props.size}` : null,
      props.disabled && 'is-disabled',
      visible && 'is-open',
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="handleToggle"
  >
    <!-- ── 触发框 ── -->
    <div class="swy-time-select__wrapper">
      <!-- 左侧时钟图标 -->
      <span class="swy-time-select__prefix">
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
      <span v-if="props.modelValue" class="swy-time-select__value">{{ props.modelValue }}</span>
      <span v-else class="swy-time-select__placeholder">
        {{ props.placeholder || '请选择时间' }}
      </span>

      <!-- 后缀：hover+clearable+有值 → 清除；否则 → 箭头 -->
      <span class="swy-time-select__suffix">
        <span
          v-if="props.clearable && !!props.modelValue && isHovering"
          class="swy-time-select__clear"
          @click.stop="handleClear"
        >
          <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
            />
          </svg>
        </span>
        <span v-else :class="['swy-time-select__arrow', { 'is-reverse': visible }]">
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </span>
    </div>

    <!-- ── 下拉面板（Teleport 到 body） ── -->
    <Teleport to="body">
      <Transition name="swy-ts-fade">
        <div
          v-if="visible"
          ref="dropdownRef"
          class="swy-ts-dropdown"
          :style="dropdownStyle"
          @click.stop
        >
          <ul class="swy-ts-list">
            <li v-if="!timeList.length" class="swy-ts-empty">暂无选项</li>
            <li
              v-for="item in timeList"
              :key="item.value"
              :class="[
                'swy-ts-item',
                item.value === props.modelValue && 'is-selected',
                item.disabled && 'is-disabled',
              ]"
              @click="handleSelect(item)"
            >
              <span class="swy-ts-item__label">{{ item.value }}</span>
              <span v-if="item.value === props.modelValue" class="swy-ts-item__check">
                <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
                  <path
                    d="M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== 依赖导入 ==========
import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import { timeSelectEmits, timeSelectProps } from './time-select'

defineOptions({ name: 'SwyTimeSelect' })

const props = defineProps(timeSelectProps)
const emit = defineEmits(timeSelectEmits)

// ========== DOM 引用 ==========
const rootRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()

// ========== 状态 ==========
const visible = ref(false)
const isHovering = ref(false)
const dropdownStyle = ref<CSSProperties>({})

// ========== 时间列表生成 ==========
function timeToMins(time: string): number {
  const [h = 0, m = 0] = time.split(':').map(Number)
  return h * 60 + m
}

function minsToTime(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const timeList = computed(() => {
  const result: Array<{ value: string; disabled: boolean }> = []
  const startMins = timeToMins(props.start)
  const endMins = timeToMins(props.end)
  const stepMins = timeToMins(props.step)

  if (stepMins <= 0) return result

  const minMins = props.minTime ? timeToMins(props.minTime) : -Infinity
  const maxMins = props.maxTime ? timeToMins(props.maxTime) : Infinity

  for (let cur = startMins; cur <= endMins; cur += stepMins) {
    result.push({
      value: minsToTime(cur),
      disabled: cur <= minMins || cur >= maxMins,
    })
  }
  return result
})

// ========== 定位 ==========
function updatePosition() {
  if (!rootRef.value) return
  const rect = rootRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: 2000,
  }
}

// ========== 交互 ==========
async function handleToggle() {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value) {
    await nextTick()
    updatePosition()
    // 滚动到选中项
    nextTick(() => {
      if (!dropdownRef.value || !props.modelValue) return
      const active = dropdownRef.value.querySelector('.is-selected') as HTMLElement
      active?.scrollIntoView({ block: 'nearest' })
    })
  }
}

function handleSelect(item: { value: string; disabled: boolean }) {
  if (item.disabled) return
  emit('update:modelValue', item.value)
  emit('change', item.value)
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
  if (!rootRef.value?.contains(t) && !dropdownRef.value?.contains(t)) {
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

defineExpose({ visible })
</script>

<style>
/* ── 触发容器 ───────────────────────────── */
.swy-time-select {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.swy-time-select__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 30px 0 12px;
  gap: 6px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.swy-time-select:hover:not(.is-disabled) .swy-time-select__wrapper {
  border-color: #c0c4cc;
}

.swy-time-select.is-open .swy-time-select__wrapper {
  border-color: #409eff;
}

.swy-time-select.is-disabled {
  cursor: not-allowed;
}

.swy-time-select.is-disabled .swy-time-select__wrapper {
  background: #f5f7fa;
  border-color: #e4e7ed;
}

/* ── 内部元素 ──────────────────────────── */
.swy-time-select__prefix {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
}

.swy-time-select__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
  line-height: 30px;
}

.swy-time-select__placeholder {
  flex: 1;
  min-width: 0;
  color: #a8abb2;
  line-height: 30px;
}

.swy-time-select.is-disabled .swy-time-select__value,
.swy-time-select.is-disabled .swy-time-select__placeholder {
  color: #c0c4cc;
}

/* ── 后缀（绝对定位防止布局抖动） ──────── */
.swy-time-select__suffix {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.swy-time-select__clear {
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
  cursor: pointer;
  transition: color 0.15s;
}

.swy-time-select__clear:hover {
  color: #909399;
}

.swy-time-select__arrow {
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
  transition: transform 0.25s;
}

.swy-time-select__arrow.is-reverse {
  transform: rotate(180deg);
}

/* ── 尺寸 ──────────────────────────────── */
.swy-time-select--large .swy-time-select__wrapper {
  height: 40px;
  font-size: 15px;
  padding: 0 32px 0 14px;
}

.swy-time-select--small .swy-time-select__wrapper {
  height: 24px;
  font-size: 12px;
  padding: 0 26px 0 10px;
}

/* ── 下拉面板（Teleport 到 body） ────────── */
.swy-ts-dropdown {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
}

.swy-ts-list {
  list-style: none;
  margin: 0;
  padding: 4px 0;
  max-height: 274px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.swy-ts-list::-webkit-scrollbar {
  width: 4px;
}

.swy-ts-list::-webkit-scrollbar-thumb {
  background: #e4e7ed;
  border-radius: 2px;
}

/* ── 选项 ──────────────────────────────── */
.swy-ts-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  padding: 0 12px 0 16px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.1s;
}

.swy-ts-item:hover {
  background: #f5f7fa;
}

.swy-ts-item.is-selected {
  color: #409eff;
  font-weight: 500;
  background: #ecf5ff;
}

.swy-ts-item.is-selected:hover {
  background: #d9ecff;
}

.swy-ts-item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.swy-ts-item.is-disabled:hover {
  background: transparent;
}

.swy-ts-item__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.swy-ts-item__check {
  flex-shrink: 0;
  margin-left: 8px;
  color: #409eff;
  display: inline-flex;
  align-items: center;
}

.swy-ts-empty {
  height: 34px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
  cursor: default;
}

/* ── 过渡动画 ─────────────────────────── */
.swy-ts-fade-enter-active,
.swy-ts-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  transform-origin: top center;
}

.swy-ts-fade-enter-from,
.swy-ts-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
