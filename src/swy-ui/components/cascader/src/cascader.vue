<!-- File: cascader.vue - 级联选择器 -->
<template>
  <div
    ref="rootRef"
    :class="[
      'swy-cascader',
      props.size && props.size !== 'default' ? `swy-cascader--${props.size}` : null,
      props.disabled && 'is-disabled',
      visible && 'is-open',
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="handleToggle"
  >
    <!-- ── 触发框 ── -->
    <div class="swy-cascader__wrapper">
      <!-- 路径标签 -->
      <span v-if="displayValue" class="swy-cascader__value">{{ displayValue }}</span>
      <span v-else class="swy-cascader__placeholder">{{ props.placeholder }}</span>

      <!-- 后缀图标 -->
      <span class="swy-cascader__suffix">
        <span
          v-if="props.clearable && !!displayValue && isHovering && !props.disabled"
          class="swy-cascader__clear"
          @click.stop="handleClear"
        >
          <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
            />
          </svg>
        </span>
        <span v-else :class="['swy-cascader__arrow', { 'is-reverse': visible }]">
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

    <!-- ── 级联面板（Teleport 到 body） ── -->
    <Teleport to="body">
      <div
        v-if="visible"
        ref="panelRef"
        :style="{
          ...panelStyle,
          background: '#fff',
          border: '1px solid #e4e7ed',
          borderRadius: '4px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }"
        @click.stop
      >
        <!-- 搜索框（filterable 模式） -->
        <div
          v-if="props.filterable"
          style="padding: 8px 8px 6px; border-bottom: 1px solid #f0f0f0; width: 100%"
          @click.stop
        >
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            style="
              width: 100%;
              height: 28px;
              padding: 0 8px;
              font-size: 13px;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              outline: none;
              box-sizing: border-box;
              color: #303133;
              background: #fff;
            "
            placeholder="请输入关键词搜索"
            @input="onSearchInput"
          />
        </div>

        <!-- 搜索结果列表 -->
        <template v-if="props.filterable && searchQuery">
          <div style="min-width: 200px; max-height: 274px; overflow-y: auto">
            <div
              v-if="!filteredOptions.length"
              style="
                height: 34px;
                padding: 0 14px;
                display: flex;
                align-items: center;
                color: #909399;
                font-size: 13px;
              "
            >
              无匹配数据
            </div>
            <div
              v-for="(item, idx) in filteredOptions"
              :key="idx"
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '34px',
                padding: '0 14px',
                fontSize: '14px',
                color: item.isSelected ? '#409eff' : '#303133',
                fontWeight: item.isSelected ? '500' : 'normal',
                cursor: 'pointer',
                background: 'transparent',
                boxSizing: 'border-box',
              }"
              @click="handleSuggestionClick(item)"
              @mouseenter="($event.currentTarget as HTMLElement).style.background = '#f5f7fa'"
              @mouseleave="($event.currentTarget as HTMLElement).style.background = 'transparent'"
            >
              <span
                style="
                  flex: 1;
                  min-width: 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ item.pathLabel }}
              </span>
            </div>
          </div>
        </template>

        <!-- 级联菜单列 -->
        <template v-else>
          <div
            v-for="(col, colIdx) in columns"
            :key="colIdx"
            style="
              min-width: 160px;
              max-height: 274px;
              overflow-y: auto;
              border-right: 1px solid #f0f0f0;
              box-sizing: border-box;
            "
          >
            <div
              v-for="opt in col"
              :key="getVal(opt)"
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '34px',
                padding: '0 12px 0 16px',
                fontSize: '14px',
                color: getDis(opt)
                  ? '#c0c4cc'
                  : isActive(opt, colIdx) || isSelected(opt, colIdx)
                    ? '#409eff'
                    : '#303133',
                fontWeight: isActive(opt, colIdx) || isSelected(opt, colIdx) ? '500' : 'normal',
                background: isActive(opt, colIdx) ? '#f0f7ff' : 'transparent',
                cursor: getDis(opt) ? 'not-allowed' : 'pointer',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
              }"
              @click="handleNodeClick(opt, colIdx)"
              @mouseenter="
                e => {
                  if (!getDis(opt))
                    (e.currentTarget as HTMLElement).style.background = isActive(opt, colIdx)
                      ? '#e6f0fb'
                      : '#f5f7fa'
                }
              "
              @mouseleave="
                e => {
                  ;(e.currentTarget as HTMLElement).style.background = isActive(opt, colIdx)
                    ? '#f0f7ff'
                    : 'transparent'
                }
              "
            >
              <span style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis">
                {{ getLbl(opt) }}
              </span>
              <span
                v-if="getChildren(opt)?.length"
                style="
                  flex-shrink: 0;
                  margin-left: 8px;
                  display: inline-flex;
                  align-items: center;
                  color: #c0c4cc;
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </span>
              <span
                v-else-if="isSelected(opt, colIdx)"
                style="
                  flex-shrink: 0;
                  margin-left: 8px;
                  display: inline-flex;
                  align-items: center;
                  color: #409eff;
                "
              >
                <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
                  <path
                    d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </template>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== 依赖导入 ==========
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { cascaderEmits, cascaderProps } from './cascader'
import type { CascaderOption } from './cascader'

defineOptions({ name: 'SwyCascader' })

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)

// ========== DOM 引用 ==========
const rootRef = ref<HTMLElement>()
const panelRef = ref<HTMLElement>()
const searchInputRef = ref<HTMLInputElement>()

// ========== 状态 ==========
const visible = ref(false)
const isHovering = ref(false)
const panelStyle = ref<CSSProperties>({})

/** 当前展开路径（用于渲染列） */
const activePath = ref<CascaderOption[]>([])
/** 已确认选中路径 */
const selectedPath = ref<CascaderOption[]>([])
/** 搜索关键词 */
const searchQuery = ref('')

// ========== 字段名映射 ==========
const vKey = computed(() => (props.props as any)?.value ?? 'value')
const lKey = computed(() => (props.props as any)?.label ?? 'label')
const cKey = computed(() => (props.props as any)?.children ?? 'children')
const dKey = computed(() => (props.props as any)?.disabled ?? 'disabled')

function getVal(opt: CascaderOption) {
  return opt[vKey.value] as string | number
}
function getLbl(opt: CascaderOption) {
  return String(opt[lKey.value] ?? '')
}
function getChildren(opt: CascaderOption) {
  return opt[cKey.value] as CascaderOption[] | undefined
}
function getDis(opt: CascaderOption) {
  return !!opt[dKey.value]
}

// ========== 级联列 ==========
const columns = computed<CascaderOption[][]>(() => {
  const cols: CascaderOption[][] = []
  if (props.options?.length) cols.push(props.options)
  for (const item of activePath.value) {
    const children = getChildren(item)
    if (children?.length) cols.push(children)
  }
  return cols
})

// ========== 显示值 ==========
const displayValue = computed(() => {
  if (!selectedPath.value.length) return ''
  if (!props.showAllLevels) {
    return getLbl(selectedPath.value[selectedPath.value.length - 1])
  }
  return selectedPath.value.map(getLbl).join(` ${props.separator} `)
})

// ========== 搜索 ==========
interface SuggestionItem {
  path: CascaderOption[]
  pathLabel: string
  isSelected: boolean
}

function flattenOptions(
  opts: CascaderOption[],
  parentPath: CascaderOption[] = []
): SuggestionItem[] {
  const result: SuggestionItem[] = []
  for (const opt of opts) {
    const path = [...parentPath, opt]
    const children = getChildren(opt)
    if (children?.length) {
      result.push(...flattenOptions(children, path))
    } else {
      const pathLabel = path.map(getLbl).join(` ${props.separator} `)
      result.push({
        path,
        pathLabel,
        isSelected:
          selectedPath.value.length === path.length &&
          path.every((n, i) => getVal(n) === getVal(selectedPath.value[i])),
      })
    }
  }
  return result
}

const filteredOptions = computed<SuggestionItem[]>(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return flattenOptions(props.options ?? []).filter(item =>
    item.pathLabel.toLowerCase().includes(q)
  )
})

function onSearchInput() {
  // searchQuery 已通过 v-model 更新，computed 自动更新
}

function handleSuggestionClick(item: SuggestionItem) {
  selectedPath.value = item.path
  activePath.value = item.path
  const values = item.path.map(getVal)
  emit('update:modelValue', values)
  emit('change', values)
  visible.value = false
  searchQuery.value = ''
}

// ========== 从 modelValue 反推路径 ==========
function syncFromValue() {
  const vals = (props.modelValue ?? []) as (string | number)[]
  if (!vals.length) {
    selectedPath.value = []
    activePath.value = []
    return
  }
  const path: CascaderOption[] = []
  let currentOpts = props.options ?? []
  for (const val of vals) {
    const found = currentOpts.find(opt => getVal(opt) === val)
    if (!found) break
    path.push(found)
    currentOpts = getChildren(found) ?? []
  }
  selectedPath.value = path
  activePath.value = [...path]
}

// ========== 定位 ==========
function updatePosition() {
  if (!rootRef.value) return
  const rect = rootRef.value.getBoundingClientRect()
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    zIndex: 2000,
  }
}

// ========== 节点点击 ==========
function handleNodeClick(opt: CascaderOption, colIdx: number) {
  if (getDis(opt)) return
  // 更新 activePath（截断后续列）
  activePath.value = [...activePath.value.slice(0, colIdx), opt]
  emit('expandChange', activePath.value.map(getVal))

  const children = getChildren(opt)
  if (!children?.length) {
    // 叶节点：确认选中，关闭面板
    selectedPath.value = [...activePath.value]
    const values = selectedPath.value.map(getVal)
    emit('update:modelValue', values)
    emit('change', values)
    visible.value = false
    emit('visibleChange', false)
  }
}

// ========== 判断状态 ==========
function isActive(opt: CascaderOption, colIdx: number): boolean {
  const active = activePath.value[colIdx]
  if (!active) return false
  return getVal(active) === getVal(opt)
}

function isSelected(opt: CascaderOption, colIdx: number): boolean {
  const sel = selectedPath.value[colIdx]
  if (!sel) return false
  return getVal(sel) === getVal(opt)
}

// ========== 开关 ==========
function handleToggle() {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value) {
    syncFromValue()
    updatePosition() // 同步先算好坐标，面板出现时位置已就绪
    emit('visibleChange', true)
    emit('focus')
    nextTick(() => {
      updatePosition() // DOM 更新后再精校一次
      if (props.filterable) searchInputRef.value?.focus()
    })
  } else {
    emit('visibleChange', false)
  }
}

function handleClear() {
  selectedPath.value = []
  activePath.value = []
  emit('update:modelValue', [])
  emit('change', [])
  emit('clear')
  visible.value = false
}

// ========== 外部点击关闭 ==========
function onClickOutside(e: MouseEvent) {
  const t = e.target as Node
  if (!rootRef.value?.contains(t) && !panelRef.value?.contains(t)) {
    visible.value = false
    emit('blur')
    emit('visibleChange', false)
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

// ========== 监听外部 modelValue 变化 ==========
watch(
  () => props.modelValue,
  () => {
    if (!visible.value) syncFromValue()
  },
  { deep: true, immediate: true }
)

defineExpose({ visible, selectedPath })
</script>

<style>
/* ══ 触发容器 ══════════════════════════════ */
.swy-cascader {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.swy-cascader.is-disabled {
  cursor: not-allowed;
}

.swy-cascader__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 30px 0 12px;
  gap: 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.swy-cascader:hover:not(.is-disabled) .swy-cascader__wrapper {
  border-color: #c0c4cc;
}

.swy-cascader.is-open .swy-cascader__wrapper {
  border-color: #409eff;
}

.swy-cascader.is-disabled .swy-cascader__wrapper {
  background: #f5f7fa;
  border-color: #e4e7ed;
  cursor: not-allowed;
}

/* 尺寸 */
.swy-cascader--large .swy-cascader__wrapper {
  height: 40px;
  font-size: 15px;
  padding: 0 32px 0 14px;
}

.swy-cascader--small .swy-cascader__wrapper {
  height: 24px;
  font-size: 12px;
  padding: 0 26px 0 10px;
}

/* 值 / 占位 */
.swy-cascader__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
  line-height: 30px;
}

.swy-cascader__placeholder {
  flex: 1;
  min-width: 0;
  color: #a8abb2;
  line-height: 30px;
}

.swy-cascader.is-disabled .swy-cascader__value,
.swy-cascader.is-disabled .swy-cascader__placeholder {
  color: #c0c4cc;
}

/* 后缀（绝对定位防抖动） */
.swy-cascader__suffix {
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

.swy-cascader__clear {
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
  cursor: pointer;
  transition: color 0.15s;
}

.swy-cascader__clear:hover {
  color: #909399;
}

.swy-cascader__arrow {
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
  transition: transform 0.25s;
}

.swy-cascader__arrow.is-reverse {
  transform: rotate(180deg);
}

/* ══ 面板容器 ══════════════════════════════ */
.swy-cas-panel {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* ══ 搜索框 ════════════════════════════════ */
.swy-cas-search {
  padding: 8px 8px 6px;
  border-bottom: 1px solid #f0f0f0;
}

.swy-cas-search__input {
  width: 100%;
  height: 28px;
  padding: 0 8px;
  font-size: 13px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  color: #606266;
  background: #fff;
  transition: border-color 0.2s;
}

.swy-cas-search__input:focus {
  border-color: #409eff;
}

/* ══ 搜索建议列表 ══════════════════════════ */
.swy-cas-suggestions {
  max-height: 240px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.swy-cas-suggestions::-webkit-scrollbar {
  width: 4px;
}
.swy-cas-suggestions::-webkit-scrollbar-thumb {
  background: #e4e7ed;
  border-radius: 2px;
}

.swy-cas-suggestion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  padding: 0 14px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: background 0.1s;
  box-sizing: border-box;
}

.swy-cas-suggestion:hover {
  background: #f5f7fa;
}

.swy-cas-suggestion.is-selected {
  color: #409eff;
  font-weight: 500;
}

.swy-cas-suggestion__path {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.swy-cas-suggestion__check {
  flex-shrink: 0;
  margin-left: 8px;
  color: #409eff;
  display: inline-flex;
  align-items: center;
}

.swy-cas-suggestions__empty {
  height: 34px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 13px;
  cursor: default;
}

/* ══ 级联菜单主体 ══════════════════════════ */
.swy-cas-menus {
  display: flex;
  align-items: flex-start;
}

/* 每一列 */
.swy-cas-menu {
  min-width: 160px;
  max-height: 274px;
  overflow-y: auto;
  border-right: 1px solid #f0f0f0;
  scrollbar-width: thin;
  box-sizing: border-box;
  padding: 4px 0;
}

.swy-cas-menu:last-child {
  border-right: none;
}

.swy-cas-menu::-webkit-scrollbar {
  width: 4px;
}
.swy-cas-menu::-webkit-scrollbar-thumb {
  background: #e4e7ed;
  border-radius: 2px;
}

/* 节点 */
.swy-cas-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  padding: 0 12px 0 16px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: background 0.1s;
  box-sizing: border-box;
}

.swy-cas-node:hover {
  background: #f5f7fa;
}

/* 激活态（已展开该路径） */
.swy-cas-node.is-active {
  color: #409eff;
  background: #f0f7ff;
  font-weight: 500;
}

.swy-cas-node.is-active:hover {
  background: #e6f0fb;
}

/* 选中态（最终选定的叶节点） */
.swy-cas-node.is-selected {
  color: #409eff;
  font-weight: 500;
}

/* 禁用态 */
.swy-cas-node.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.swy-cas-node.is-disabled:hover {
  background: transparent;
}

.swy-cas-node__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.swy-cas-node__arrow,
.swy-cas-node__check {
  flex-shrink: 0;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  color: #c0c4cc;
}

.swy-cas-node.is-active .swy-cas-node__arrow {
  color: #409eff;
}
.swy-cas-node__check {
  color: #409eff;
}

/* ══ 过渡动画 ══════════════════════════════ */
.swy-cas-fade-enter-active,
.swy-cas-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  transform-origin: top center;
}

.swy-cas-fade-enter-from,
.swy-cas-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
