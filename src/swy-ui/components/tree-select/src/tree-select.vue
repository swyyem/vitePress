<!-- File: tree-select.vue - 树形选择器 -->
<template>
  <div
    ref="rootRef"
    :class="[
      'swy-tree-select',
      props.size && props.size !== 'default' ? `swy-tree-select--${props.size}` : null,
      props.disabled && 'is-disabled',
      visible && 'is-open',
    ]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="handleToggle"
  >
    <!-- ── 触发框 ── -->
    <div class="swy-tree-select__wrapper">
      <!-- 多选：标签 -->
      <template v-if="props.multiple">
        <span v-if="checkedLabels.length" class="swy-tree-select__tags">
          <span v-for="(lbl, i) in checkedLabels.slice(0, 2)" :key="i" class="swy-tree-select__tag">
            {{ lbl }}
          </span>
          <span
            v-if="checkedLabels.length > 2"
            class="swy-tree-select__tag swy-tree-select__tag--more"
          >
            +{{ checkedLabels.length - 2 }}
          </span>
        </span>
        <span v-else class="swy-tree-select__placeholder">{{ props.placeholder }}</span>
      </template>
      <!-- 单选：值文本 -->
      <template v-else>
        <span v-if="selectedLabel" class="swy-tree-select__value">{{ selectedLabel }}</span>
        <span v-else class="swy-tree-select__placeholder">{{ props.placeholder }}</span>
      </template>

      <!-- 后缀图标（绝对定位，防抖动） -->
      <span class="swy-tree-select__suffix">
        <span
          v-if="props.clearable && hasValue && isHovering && !props.disabled"
          class="swy-tree-select__clear"
          @click.stop="handleClear"
        >
          <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
            />
          </svg>
        </span>
        <span v-else :class="['swy-tree-select__arrow', { 'is-reverse': visible }]">
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

    <!-- ── 下拉面板（Teleport 到 body，全内联样式） ── -->
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
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '4px 0',
        }"
        @click.stop
      >
        <!-- 空数据 -->
        <div
          v-if="!flatList.length"
          style="
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #909399;
            font-size: 13px;
          "
        >
          暂无数据
        </div>

        <!-- 树节点 -->
        <div
          v-for="node in flatList"
          :key="node.key"
          :style="{
            display: 'flex',
            alignItems: 'center',
            height: '34px',
            paddingLeft: node.level * 18 + 8 + 'px',
            paddingRight: '12px',
            fontSize: '14px',
            color: node.disabled ? '#c0c4cc' : isNodeHighlighted(node) ? '#409eff' : '#303133',
            fontWeight: isNodeHighlighted(node) ? '500' : 'normal',
            background: isNodeHighlighted(node) ? '#f0f7ff' : 'transparent',
            cursor: node.disabled ? 'not-allowed' : 'pointer',
            boxSizing: 'border-box',
            userSelect: 'none',
            flexShrink: '0',
          }"
          @click="handleNodeClick(node)"
          @mouseenter="
            e => {
              if (!node.disabled)
                (e.currentTarget as HTMLElement).style.background = isNodeHighlighted(node)
                  ? '#e6f0fb'
                  : '#f5f7fa'
            }
          "
          @mouseleave="
            e => {
              ;(e.currentTarget as HTMLElement).style.background = isNodeHighlighted(node)
                ? '#f0f7ff'
                : 'transparent'
            }
          "
        >
          <!-- 展开/折叠图标 -->
          <span
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 16px;
              height: 16px;
              flex-shrink: 0;
              margin-right: 2px;
            "
            @click.stop="toggleExpand(node)"
          >
            <svg
              v-if="node.hasChildren"
              :style="{
                transform: isExpanded(node) ? 'rotate(90deg)' : 'rotate(0)',
                transition: 'transform 0.15s',
                display: 'block',
              }"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="#909399"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span>

          <!-- 多选 checkbox -->
          <span
            v-if="props.multiple"
            :style="{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '14px',
              height: '14px',
              flexShrink: '0',
              marginRight: '8px',
              border: isChecked(node) ? '1px solid #409eff' : '1px solid #dcdfe6',
              borderRadius: '2px',
              background: isChecked(node) ? '#409eff' : '#fff',
              boxSizing: 'border-box',
              transition: 'background 0.15s, border-color 0.15s',
            }"
            @click.stop="toggleCheck(node)"
          >
            <svg v-if="isChecked(node)" viewBox="0 0 1024 1024" width="10" height="10" fill="#fff">
              <path
                d="M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z"
              />
            </svg>
          </span>

          <!-- 节点标签 -->
          <span
            style="
              flex: 1;
              min-width: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{ node.label }}
          </span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { treeSelectProps, treeSelectEmits } from './tree-select'

defineOptions({ name: 'SwyTreeSelect' })

const props = defineProps(treeSelectProps)
const emit = defineEmits(treeSelectEmits)

// ========== DOM 引用 ==========
const rootRef = ref<HTMLElement>()
const panelRef = ref<HTMLElement>()

// ========== 状态 ==========
const visible = ref(false)
const isHovering = ref(false)
const panelStyle = ref<CSSProperties>({})

/** 展开节点的 key 集合 */
const expandedKeys = ref<Set<string | number>>(new Set())
/** 多选：已选节点 key 集合 */
const checkedKeys = ref<Set<string | number>>(new Set())
/** 单选：已选节点 key */
const selectedKey = ref<string | number | null>(null)

// ========== 字段名映射 ==========
const lKey = computed(() => (props.props as any)?.label ?? 'label')
const cKey = computed(() => (props.props as any)?.children ?? 'children')
const dKey = computed(() => (props.props as any)?.disabled ?? 'disabled')
const vKey = computed(() => props.nodeKey ?? 'value')

// ========== 节点扁平结构 ==========
interface FlatNode {
  key: string | number
  label: string
  level: number
  disabled: boolean
  hasChildren: boolean
  raw: Record<string, unknown>
}

function flattenTree(nodes: any[], level = 0): FlatNode[] {
  const result: FlatNode[] = []
  for (const n of nodes) {
    const key = n[vKey.value]
    const children = n[cKey.value] as any[] | undefined
    result.push({
      key,
      label: String(n[lKey.value] ?? ''),
      level,
      disabled: !!n[dKey.value],
      hasChildren: !!children?.length,
      raw: n,
    })
    if (children?.length && expandedKeys.value.has(key)) {
      result.push(...flattenTree(children, level + 1))
    }
  }
  return result
}

const flatList = computed(() => flattenTree(props.data ?? []))

// ========== 辅助查找 ==========
function findNodeByKey(nodes: any[], key: string | number): any {
  for (const n of nodes) {
    if (n[vKey.value] === key) return n
    const children = n[cKey.value] as any[] | undefined
    if (children?.length) {
      const found = findNodeByKey(children, key)
      if (found) return found
    }
  }
  return null
}

// ========== 展示值 ==========
const selectedLabel = computed(() => {
  if (selectedKey.value === null || selectedKey.value === undefined || selectedKey.value === '')
    return ''
  const node = findNodeByKey(props.data ?? [], selectedKey.value)
  return node ? String(node[lKey.value] ?? '') : String(selectedKey.value)
})

const checkedLabels = computed(() => {
  const labels: string[] = []
  for (const key of checkedKeys.value) {
    const node = findNodeByKey(props.data ?? [], key)
    if (node) labels.push(String(node[lKey.value] ?? ''))
  }
  return labels
})

const hasValue = computed(() => {
  if (props.multiple) return checkedKeys.value.size > 0
  return selectedKey.value !== null && selectedKey.value !== undefined && selectedKey.value !== ''
})

// ========== 节点状态判断 ==========
function isExpanded(node: FlatNode) {
  return expandedKeys.value.has(node.key)
}

function isChecked(node: FlatNode) {
  return checkedKeys.value.has(node.key)
}

function isNodeHighlighted(node: FlatNode) {
  if (props.multiple) return checkedKeys.value.has(node.key)
  return selectedKey.value === node.key
}

// ========== 展开/折叠 ==========
function toggleExpand(node: FlatNode) {
  if (!node.hasChildren) return
  if (expandedKeys.value.has(node.key)) {
    expandedKeys.value.delete(node.key)
  } else {
    expandedKeys.value.add(node.key)
  }
  // 触发 Set 响应式更新
  expandedKeys.value = new Set(expandedKeys.value)
}

// ========== 节点点击 ==========
function handleNodeClick(node: FlatNode) {
  if (node.disabled) return
  if (props.multiple) {
    toggleCheck(node)
  } else {
    // 有子节点且未设置 checkOnClickNode：仅展开/折叠
    if (node.hasChildren && !props.checkOnClickNode) {
      toggleExpand(node)
      return
    }
    // 选中当前节点
    selectedKey.value = node.key
    emit('update:modelValue', node.key)
    emit('change', node.key, node.raw, node.raw)
    visible.value = false
  }
}

function toggleCheck(node: FlatNode) {
  if (node.disabled) return
  if (checkedKeys.value.has(node.key)) {
    checkedKeys.value.delete(node.key)
  } else {
    checkedKeys.value.add(node.key)
  }
  checkedKeys.value = new Set(checkedKeys.value)
  const vals = Array.from(checkedKeys.value)
  emit('update:modelValue', vals)
  emit('change', vals, node.raw, node.raw)
}

// ========== 从 modelValue 同步 ==========
function syncFromValue() {
  if (props.multiple) {
    const vals = (props.modelValue ?? []) as (string | number)[]
    checkedKeys.value = new Set(Array.isArray(vals) ? vals : [])
  } else {
    const val = props.modelValue as string | number | undefined
    selectedKey.value = val !== undefined && val !== null && val !== '' ? val : null
  }
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

// ========== 开关 ==========
function handleToggle() {
  if (props.disabled || props.readonly) return
  visible.value = !visible.value
  if (visible.value) {
    syncFromValue()
    updatePosition()
    emit('focus')
    nextTick(updatePosition)
  }
}

function handleClear() {
  if (props.multiple) {
    checkedKeys.value = new Set()
    emit('update:modelValue', [])
    emit('change', [], {} as any, {} as any)
  } else {
    selectedKey.value = null
    emit('update:modelValue', '')
    emit('change', '', {} as any, {} as any)
  }
  emit('clear')
  visible.value = false
}

// ========== 外部点击关闭 ==========
function onClickOutside(e: MouseEvent) {
  const t = e.target as Node
  if (!rootRef.value?.contains(t) && !panelRef.value?.contains(t)) {
    visible.value = false
    emit('blur')
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
    if (!visible.value) syncFromValue()
  },
  { deep: true, immediate: true }
)

defineExpose({ visible, selectedKey, checkedKeys })
</script>

<style>
/* ══ 触发容器 ══════════════════════════════ */
.swy-tree-select {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.swy-tree-select.is-disabled {
  cursor: not-allowed;
}

.swy-tree-select__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 3px 30px 3px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s;
  flex-wrap: wrap;
  gap: 4px;
}

.swy-tree-select:hover:not(.is-disabled) .swy-tree-select__wrapper {
  border-color: #c0c4cc;
}

.swy-tree-select.is-open .swy-tree-select__wrapper {
  border-color: #409eff;
}

.swy-tree-select.is-disabled .swy-tree-select__wrapper {
  background: #f5f7fa;
  border-color: #e4e7ed;
  cursor: not-allowed;
}

/* 尺寸 */
.swy-tree-select--large .swy-tree-select__wrapper {
  min-height: 40px;
  font-size: 15px;
  padding: 4px 32px 4px 14px;
}

.swy-tree-select--small .swy-tree-select__wrapper {
  min-height: 24px;
  font-size: 12px;
  padding: 2px 26px 2px 10px;
}

/* 值 / 占位 */
.swy-tree-select__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
  line-height: 24px;
}

.swy-tree-select__placeholder {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #a8abb2;
  line-height: 24px;
}

/* 多选标签区 */
.swy-tree-select__tags {
  display: contents;
}

.swy-tree-select__tag {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
  color: #606266;
  background: #f4f4f5;
  border: 1px solid #e9e9eb;
  border-radius: 3px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
}

.swy-tree-select__tag--more {
  background: #f0f0f0;
  color: #909399;
}

/* 后缀（绝对定位，防 hover 跳动） */
.swy-tree-select__suffix {
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
}

.swy-tree-select__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #c0c4cc;
  transition: color 0.2s;
}

.swy-tree-select__clear:hover {
  color: #909399;
}

.swy-tree-select__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.swy-tree-select__arrow.is-reverse {
  transform: rotate(180deg);
}
</style>
