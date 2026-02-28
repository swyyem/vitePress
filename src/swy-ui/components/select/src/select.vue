<!-- File: select.vue - 下拉选择组件 -->
<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      props.size && props.size !== 'default' ? ns.m(props.size) : null,
      ns.is('disabled', props.disabled),
      ns.is('open', visible),
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="handleToggle"
  >
    <!-- ── 触发区域 ── -->
    <div class="swy-select__wrapper">
      <!-- 已选标签 / 占位文字 -->
      <span v-if="selectedLabel" class="swy-select__label">{{ selectedLabel }}</span>
      <span v-else class="swy-select__placeholder">{{ props.placeholder }}</span>

      <!-- 后缀图标（绝对定位，防止切换时布局抖动） -->
      <span class="swy-select__suffix">
        <!-- hover + clearable + 有值 → 清除按钮 -->
        <span
          v-if="props.clearable && !!selectedLabel && isHovering"
          class="swy-select__clear"
          @click.stop="handleClear"
        >
          <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
            />
          </svg>
        </span>
        <!-- 其他情况 → 下拉箭头（居中 stroke 风格 SVG） -->
        <span v-else :class="['swy-select__arrow', { 'is-reverse': visible }]">
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

    <!-- ── 下拉面板 ── -->
    <Teleport to="body">
      <Transition name="swy-select-fade">
        <div
          v-if="visible"
          ref="dropdownRef"
          class="swy-select__dropdown"
          :style="dropdownStyle"
          @click.stop
        >
          <ul class="swy-select__list">
            <li v-if="!props.options.length" class="swy-select__empty">暂无数据</li>
            <li
              v-for="option in props.options"
              :key="option.value"
              :class="[
                'swy-select__item',
                isSelected(option.value) && 'is-selected',
                option.disabled && 'is-disabled',
              ]"
              @click="handleSelect(option)"
            >
              <span class="swy-select__item-label">{{ option.label }}</span>
              <span v-if="isSelected(option.value)" class="swy-select__check">
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
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { selectProps, selectEmits } from './select'
import type { SelectOption } from './select'

defineOptions({ name: 'SwySelect' })

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

// ========== 命名空间 ==========
const ns = useNamespace('select')

// ========== 状态 ==========
const rootRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()
/** 下拉是否可见 */
const visible = ref(false)
/** 鼠标是否悬停在触发器上（用于显示清除按钮） */
const isHovering = ref(false)
/** 下拉面板 fixed 定位样式 */
const dropdownStyle = ref<CSSProperties>({})

// ========== 计算属性 ==========
const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found?.label ?? ''
})

function isSelected(val: string | number) {
  return props.modelValue === val
}

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
function handleToggle() {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value) nextTick(updatePosition)
}

function handleSelect(option: SelectOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  visible.value = false
}

function handleClear() {
  emit('update:modelValue', '')
  emit('change', '')
  visible.value = false
}

// ========== 全局事件 ==========
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

defineExpose({ rootRef })
</script>

<style>
/* ── 触发器 ─────────────────────────────── */
.swy-select {
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.swy-select__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 30px 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.swy-select:hover:not(.is-disabled) .swy-select__wrapper {
  border-color: #c0c4cc;
}

.swy-select.is-open .swy-select__wrapper {
  border-color: #409eff;
  outline: none;
}

.swy-select.is-disabled {
  cursor: not-allowed;
}

.swy-select.is-disabled .swy-select__wrapper {
  background: #f5f7fa;
  border-color: #e4e7ed;
}

/* ── 已选 / 占位 ─────────────────────────── */
.swy-select__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
  line-height: 30px;
}

.swy-select__placeholder {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #a8abb2;
  line-height: 30px;
}

.swy-select.is-disabled .swy-select__label,
.swy-select.is-disabled .swy-select__placeholder {
  color: #c0c4cc;
}

/* ── 后缀图标 ────────────────────────────── */
.swy-select__suffix {
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

.swy-select__clear {
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
  cursor: pointer;
  transition: color 0.15s;
}

.swy-select__clear:hover {
  color: #909399;
}

.swy-select__arrow {
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
  transition: transform 0.25s;
}

.swy-select__arrow.is-reverse {
  transform: rotate(180deg);
}

/* ── 尺寸：large ─────────────────────────── */
.swy-select--large .swy-select__wrapper {
  height: 40px;
  padding: 0 32px 0 14px;
  font-size: 15px;
}

.swy-select--large .swy-select__label,
.swy-select--large .swy-select__placeholder {
  line-height: 38px;
}

/* ── 尺寸：small ─────────────────────────── */
.swy-select--small .swy-select__wrapper {
  height: 24px;
  padding: 0 26px 0 10px;
  font-size: 12px;
}

.swy-select--small .swy-select__label,
.swy-select--small .swy-select__placeholder {
  line-height: 22px;
}

/* ── 下拉面板（Teleport 到 body）─────────── */
.swy-select__dropdown {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
}

.swy-select__list {
  list-style: none;
  margin: 0;
  padding: 4px 0;
  max-height: 274px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.swy-select__list::-webkit-scrollbar {
  width: 4px;
}

.swy-select__list::-webkit-scrollbar-thumb {
  background: #e4e7ed;
  border-radius: 2px;
}

/* ── 选项条目 ────────────────────────────── */
.swy-select__item {
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

.swy-select__item:hover {
  background: #f5f7fa;
}

.swy-select__item.is-selected {
  color: #409eff;
  font-weight: 500;
  background: #ecf5ff;
}

.swy-select__item.is-selected:hover {
  background: #d9ecff;
}

.swy-select__item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.swy-select__item.is-disabled:hover {
  background: transparent;
}

.swy-select__item-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.swy-select__check {
  flex-shrink: 0;
  margin-left: 8px;
  color: #409eff;
  display: inline-flex;
  align-items: center;
}

/* ── 空数据 ──────────────────────────────── */
.swy-select__empty {
  height: 34px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
  cursor: default;
}

/* ── 过渡动画 ────────────────────────────── */
.swy-select-fade-enter-active,
.swy-select-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  transform-origin: top center;
}

.swy-select-fade-enter-from,
.swy-select-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
