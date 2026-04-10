<template>
  <div class="low-code-editor" tabindex="0" @keydown="handleKeydown">
    <!-- Toast 提示 -->
    <ToastMessage ref="toastRef" />

    <!-- 顶部工具栏 -->
    <header class="editor-header">
      <div class="header-left">
        <span class="logo">🧩</span>
        <h1>SWY-UI 低代码平台</h1>
      </div>
      <div class="header-center">
        <button class="header-btn" @click="handleUndo" :disabled="!canUndo" title="撤销 Ctrl+Z">
          ↶ 撤销
        </button>
        <button class="header-btn" @click="handleRedo" :disabled="!canRedo" title="重做 Ctrl+Y">
          ↷ 重做
        </button>
        <span class="separator" />
        <button class="header-btn" @click="clearAll" :disabled="!components.length">🗑️ 清空</button>
        <span class="separator" />
        <button class="header-btn" @click="showTemplates = true">📑 模板</button>
        <span class="separator" />
        <button
          class="header-btn"
          @click="exportWorkspace"
          :disabled="!components.length"
          title="导出 JSON"
        >
          📥 导出
        </button>
        <button class="header-btn" @click="triggerImport" title="导入 JSON">📤 导入</button>
        <input
          ref="importInputRef"
          type="file"
          accept=".json"
          style="display: none"
          @change="importWorkspace"
        />
      </div>
      <div class="header-right">
        <!-- 缩放控制 -->
        <div class="zoom-control">
          <button class="zoom-btn" @click="changeZoom(-0.1)" :disabled="zoom <= 0.5" title="缩小">
            −
          </button>
          <span class="zoom-value" @click="zoom = 1">{{ Math.round(zoom * 100) }}%</span>
          <button class="zoom-btn" @click="changeZoom(0.1)" :disabled="zoom >= 2" title="放大">
            +
          </button>
        </div>
        <span class="separator" />
        <button
          class="header-btn"
          :class="{ active: rightPanel === 'tree' }"
          @click="toggleRight('tree')"
        >
          🌳 大纲
        </button>
        <button
          class="header-btn"
          :class="{ active: rightPanel === 'history' }"
          @click="toggleRight('history')"
        >
          📜 历史
        </button>
        <button
          class="header-btn"
          :class="{ active: rightPanel === 'code' }"
          @click="toggleRight('code')"
        >
          &lt;/&gt; 代码
        </button>
        <button
          class="header-btn"
          :class="{ active: rightPanel === 'schema' }"
          @click="toggleRight('schema')"
        >
          { } Schema
        </button>
        <span class="separator" />
        <button
          class="header-btn header-btn--primary"
          @click="showPreview = true"
          :disabled="!components.length"
        >
          ▶ 预览
        </button>
      </div>
    </header>

    <!-- 多选批量操作栏 -->
    <div v-if="selectedIds.length > 1" class="batch-bar">
      <span class="batch-info">已选中 {{ selectedIds.length }} 个组件</span>
      <button class="batch-btn" @click="batchDuplicate">⧉ 批量复制</button>
      <button class="batch-btn batch-btn--danger" @click="batchDelete">🗑️ 批量删除</button>
      <button class="batch-btn" @click="selectedIds = []">✕ 取消选择</button>
    </div>

    <!-- 主体区域 -->
    <div class="editor-body">
      <!-- 左侧组件面板 -->
      <ComponentPanel @add-component="addComponent" />

      <!-- 中间画布 -->
      <div class="editor-center" @wheel.ctrl.prevent="handleWheel">
        <CanvasArea
          :components="components"
          :selected-ids="selectedIds"
          :zoom="zoom"
          @select="handleSelect"
          @drop-new="handleDropNew"
          @reorder="handleReorder"
          @move-up="moveUp"
          @move-down="moveDown"
          @duplicate="duplicateComponent"
          @remove="removeComponent"
          @contextmenu="handleContextMenu"
        />
      </div>

      <!-- 右侧面板 -->
      <div class="editor-right">
        <PropertyPanel
          v-if="rightPanel === 'props'"
          :instance="selectedInstance"
          @update-prop="updateProp"
          @reset-defaults="resetDefaults"
          @update-style="updateStyle"
          @toggle-lock="toggleLock"
        />
        <ComponentTree
          v-else-if="rightPanel === 'tree'"
          :components="components"
          :selected-id="selectedIds[0] || null"
          @select="handleTreeSelect"
          @remove="removeComponent"
          @reorder="handleReorder"
        />
        <HistoryPanel
          v-else-if="rightPanel === 'history'"
          :history="historyEntries"
          :current-index="historyIndex"
          @jump="jumpToHistory"
        />
        <CodeExport v-else-if="rightPanel === 'code'" :components="components" @toast="showToast" />
        <SchemaPanel
          v-else-if="rightPanel === 'schema'"
          :components="components"
          @import="importSchema"
        />
      </div>
    </div>

    <!-- 预览 -->
    <PreviewDialog :visible="showPreview" :components="components" @close="showPreview = false" />

    <!-- 模板选择器 -->
    <TemplateSelector
      :visible="showTemplates"
      @close="showTemplates = false"
      @select="applyTemplate"
    />

    <!-- 右键菜单 -->
    <ContextMenu
      :visible="ctxMenu.visible"
      :x="ctxMenu.x"
      :y="ctxMenu.y"
      :menu-items="ctxMenuItems"
      @close="ctxMenu.visible = false"
      @action="handleCtxAction"
    />

    <!-- 命令面板 -->
    <CommandPalette
      :visible="showCommandPalette"
      :commands="commandList"
      @close="showCommandPalette = false"
    />

    <!-- 底部状态栏 -->
    <footer class="editor-footer">
      <span>组件: {{ components.length }}</span>
      <span class="separator-dot" />
      <span v-if="selectedIds.length > 1">已选中 {{ selectedIds.length }} 个</span>
      <span v-else-if="selectedInstance">
        已选: {{ getComponentMeta(selectedInstance.type)?.label || selectedInstance.type }}
      </span>
      <span v-else>未选中</span>
      <span class="separator-dot" />
      <span>缩放: {{ Math.round(zoom * 100) }}%</span>
      <span class="footer-right">
        <span class="shortcut-hint">
          Ctrl+P 命令面板 | Ctrl+Z/Y 撤销重做 | Shift+点击 多选 | Delete 删除
        </span>
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import ComponentPanel from './ComponentPanel.vue'
import CanvasArea from './CanvasArea.vue'
import PropertyPanel from './PropertyPanel.vue'
import SchemaPanel from './SchemaPanel.vue'
import PreviewDialog from './PreviewDialog.vue'
import ComponentTree from './ComponentTree.vue'
import CodeExport from './CodeExport.vue'
import ToastMessage from './ToastMessage.vue'
import TemplateSelector from './TemplateSelector.vue'
import ContextMenu from './ContextMenu.vue'
import HistoryPanel from './HistoryPanel.vue'
import CommandPalette from './CommandPalette.vue'
import { getComponentMeta } from './component-registry'
import type { ComponentInstance, CustomStyle } from './types'
import type { PageTemplate } from './page-templates'
import type { MenuItem } from './ContextMenu.vue'
import type { HistoryEntry } from './HistoryPanel.vue'
import type { Command } from './CommandPalette.vue'

const STORAGE_KEY = 'swy-lowcode-state'

/* ===================== Refs ===================== */
const toastRef = ref<InstanceType<typeof ToastMessage>>()
const importInputRef = ref<HTMLInputElement>()

/* ===================== 状态 ===================== */
const components = ref<ComponentInstance[]>([])
const selectedIds = ref<string[]>([])
const showPreview = ref(false)
const showTemplates = ref(false)
const showCommandPalette = ref(false)
const rightPanel = ref<'props' | 'tree' | 'code' | 'schema' | 'history'>('props')
const zoom = ref(1)

/* ===================== 缩放 ===================== */
function changeZoom(delta: number) {
  zoom.value = Math.round(Math.min(2, Math.max(0.5, zoom.value + delta)) * 10) / 10
}

function handleWheel(e: WheelEvent) {
  changeZoom(e.deltaY < 0 ? 0.05 : -0.05)
}

/* ===================== 右侧面板切换 ===================== */
function toggleRight(panel: 'tree' | 'code' | 'schema' | 'history') {
  rightPanel.value = rightPanel.value === panel ? 'props' : panel
}

/* ===================== Toast 封装 ===================== */
function showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
  toastRef.value?.show(message, type)
}

/* ===================== 历史记录（撤销/重做） ===================== */
const historyEntries = ref<HistoryEntry[]>([])
const historyIndex = ref(-1)
const isUndoRedo = ref(false)
let lastActionLabel = '初始状态'

const canUndo = computed(() => historyIndex.value > 0)
const canRedo = computed(() => historyIndex.value < historyEntries.value.length - 1)

function pushHistory(label?: string) {
  const snapshot = JSON.stringify(components.value)
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  historyEntries.value = historyEntries.value.slice(0, historyIndex.value + 1)
  historyEntries.value.push({
    label: label || lastActionLabel,
    time,
    snapshot,
  })
  historyIndex.value = historyEntries.value.length - 1
  /* 限制历史记录最大数量 */
  if (historyEntries.value.length > 60) {
    historyEntries.value.shift()
    historyIndex.value--
  }
  lastActionLabel = '修改属性'
}

watch(
  components,
  () => {
    if (!isUndoRedo.value) pushHistory()
    isUndoRedo.value = false
  },
  { deep: true }
)

function handleUndo() {
  if (!canUndo.value) return
  isUndoRedo.value = true
  historyIndex.value--
  components.value = JSON.parse(historyEntries.value[historyIndex.value].snapshot)
  selectedIds.value = []
  showToast('已撤销', 'info')
}

function handleRedo() {
  if (!canRedo.value) return
  isUndoRedo.value = true
  historyIndex.value++
  components.value = JSON.parse(historyEntries.value[historyIndex.value].snapshot)
  selectedIds.value = []
  showToast('已重做', 'info')
}

function jumpToHistory(index: number) {
  if (index === historyIndex.value) return
  isUndoRedo.value = true
  historyIndex.value = index
  components.value = JSON.parse(historyEntries.value[index].snapshot)
  selectedIds.value = []
  showToast(`已跳转到: ${historyEntries.value[index].label}`, 'info')
}

/* ===================== localStorage 持久化 ===================== */
function saveToStorage() {
  try {
    const data = { components: components.value, version: 2 }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      if (data && Array.isArray(data.components)) {
        components.value = data.components
        showToast('已恢复上次编辑内容', 'success')
        return
      }
    }
  } catch {
    /* ignore */
  }
}

/* 自动保存（防抖） */
let saveTimer: ReturnType<typeof setTimeout> | null = null
watch(
  components,
  () => {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(saveToStorage, 800)
  },
  { deep: true }
)

/* 初始加载 */
onMounted(() => {
  loadFromStorage()
  lastActionLabel = '初始状态'
  pushHistory('初始状态')
})

/* ===================== 选择逻辑 ===================== */
const selectedInstance = computed(() => {
  if (selectedIds.value.length !== 1) return null
  return components.value.find(c => c.id === selectedIds.value[0]) || null
})

function handleSelect(id: string | null, multi: boolean) {
  if (id === null) {
    selectedIds.value = []
    return
  }
  if (multi) {
    /* Shift 多选 */
    const idx = selectedIds.value.indexOf(id)
    if (idx >= 0) {
      selectedIds.value = selectedIds.value.filter(i => i !== id)
    } else {
      selectedIds.value = [...selectedIds.value, id]
    }
  } else {
    selectedIds.value = [id]
  }
}

function handleTreeSelect(id: string) {
  selectedIds.value = [id]
}

/* 当选中组件时自动切换到属性面板 */
watch(selectedIds, val => {
  if (val.length === 1 && !['props'].includes(rightPanel.value)) {
    rightPanel.value = 'props'
  }
})

/* ===================== 组件操作 ===================== */
let idCounter = 0
function genId(): string {
  return `comp_${Date.now()}_${++idCounter}`
}

function createInstance(type: string): ComponentInstance {
  const meta = getComponentMeta(type)
  const props: Record<string, unknown> = {}
  let slotContent = ''
  if (meta) {
    for (const p of meta.props) {
      if (p.key === 'slotContent') {
        slotContent = String(p.defaultValue ?? '')
      } else if (p.defaultValue !== undefined) {
        props[p.key] = p.defaultValue
      }
    }
  }
  return { id: genId(), type, props, slotContent }
}

function addComponent(type: string) {
  const instance = createInstance(type)
  components.value.push(instance)
  selectedIds.value = [instance.id]
  lastActionLabel = `添加 ${getComponentMeta(type)?.label || type}`
  showToast(`已添加 ${getComponentMeta(type)?.label || type}`, 'success')
}

function handleDropNew(type: string, index?: number) {
  const instance = createInstance(type)
  if (index !== undefined) {
    components.value.splice(index, 0, instance)
  } else {
    components.value.push(instance)
  }
  selectedIds.value = [instance.id]
  lastActionLabel = `拖入 ${getComponentMeta(type)?.label || type}`
}

function handleReorder(from: number, to: number) {
  const arr = [...components.value]
  const [moved] = arr.splice(from, 1)
  arr.splice(to, 0, moved)
  components.value = arr
  lastActionLabel = '调整顺序'
}

function moveUp(index: number) {
  if (index <= 0) return
  const arr = [...components.value]
  ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
  components.value = arr
  lastActionLabel = '上移组件'
}

function moveDown(index: number) {
  if (index >= components.value.length - 1) return
  const arr = [...components.value]
  ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
  components.value = arr
  lastActionLabel = '下移组件'
}

function duplicateComponent(index: number) {
  const source = components.value[index]
  const copy: ComponentInstance = {
    ...JSON.parse(JSON.stringify(source)),
    id: genId(),
  }
  components.value.splice(index + 1, 0, copy)
  selectedIds.value = [copy.id]
  lastActionLabel = `复制 ${getComponentMeta(source.type)?.label || source.type}`
  showToast('已复制组件', 'success')
}

function removeComponent(index: number) {
  const removed = components.value[index]
  const label = getComponentMeta(removed.type)?.label || removed.type
  if (removed.locked) {
    showToast('该组件已锁定，无法删除', 'warning')
    return
  }
  components.value.splice(index, 1)
  selectedIds.value = selectedIds.value.filter(id => id !== removed.id)
  lastActionLabel = `删除 ${label}`
  showToast(`已删除 ${label}`, 'info')
}

function clearAll() {
  if (!components.value.length) return
  components.value = []
  selectedIds.value = []
  lastActionLabel = '清空所有组件'
  showToast('已清空所有组件', 'warning')
}

/* ===================== 批量操作 ===================== */
function batchDelete() {
  const lockedCount = selectedIds.value.filter(
    id => components.value.find(c => c.id === id)?.locked
  ).length
  if (lockedCount > 0) {
    showToast(`${lockedCount} 个组件已锁定，已跳过`, 'warning')
  }
  const toDelete = selectedIds.value.filter(id => !components.value.find(c => c.id === id)?.locked)
  components.value = components.value.filter(c => !toDelete.includes(c.id))
  selectedIds.value = []
  lastActionLabel = `批量删除 ${toDelete.length} 个组件`
  showToast(`已批量删除 ${toDelete.length} 个组件`, 'info')
}

function batchDuplicate() {
  const copies: ComponentInstance[] = []
  for (const id of selectedIds.value) {
    const source = components.value.find(c => c.id === id)
    if (source) {
      copies.push({ ...JSON.parse(JSON.stringify(source)), id: genId() })
    }
  }
  components.value.push(...copies)
  selectedIds.value = copies.map(c => c.id)
  lastActionLabel = `批量复制 ${copies.length} 个组件`
  showToast(`已批量复制 ${copies.length} 个组件`, 'success')
}

/* ===================== 属性更新 ===================== */
function updateProp(id: string, key: string, value: unknown) {
  const comp = components.value.find(c => c.id === id)
  if (!comp) return
  if (key === 'slotContent') {
    comp.slotContent = String(value)
    comp.props.slotContent = String(value)
  } else {
    comp.props[key] = value
  }
  lastActionLabel = '修改属性'
}

/* ===================== 自定义样式更新 ===================== */
function updateStyle(id: string, style: CustomStyle) {
  const comp = components.value.find(c => c.id === id)
  if (!comp) return
  comp.customStyle = { ...style }
  lastActionLabel = '修改样式'
}

/* ===================== 锁定切换 ===================== */
function toggleLock(id: string) {
  const comp = components.value.find(c => c.id === id)
  if (!comp) return
  comp.locked = !comp.locked
  showToast(comp.locked ? '已锁定组件' : '已解锁组件', 'info')
  lastActionLabel = comp.locked ? '锁定组件' : '解锁组件'
}

/* ===================== 重置默认值 ===================== */
function resetDefaults(id: string) {
  const comp = components.value.find(c => c.id === id)
  if (!comp) return
  const meta = getComponentMeta(comp.type)
  if (!meta) return
  for (const p of meta.props) {
    if (p.key === 'slotContent') {
      comp.slotContent = String(p.defaultValue ?? '')
      comp.props.slotContent = String(p.defaultValue ?? '')
    } else if (p.defaultValue !== undefined) {
      comp.props[p.key] = p.defaultValue
    }
  }
  lastActionLabel = '重置默认值'
  showToast('已重置为默认值', 'success')
}

/* ===================== Schema 导入 ===================== */
function importSchema(imported: ComponentInstance[]) {
  components.value = imported
  selectedIds.value = []
  lastActionLabel = '导入 Schema'
  showToast('Schema 已应用', 'success')
}

/* ===================== 模板应用 ===================== */
function applyTemplate(tpl: PageTemplate) {
  components.value = tpl.factory()
  selectedIds.value = []
  lastActionLabel = `加载模板: ${tpl.name}`
  showToast(`已加载模板: ${tpl.name}`, 'success')
}

/* ===================== 导入/导出工作区 ===================== */
function exportWorkspace() {
  const data = {
    name: 'SWY-UI Low Code Workspace',
    version: 2,
    exportTime: new Date().toISOString(),
    components: components.value,
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lowcode-workspace-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  showToast('工作区已导出', 'success')
}

function triggerImport() {
  importInputRef.value?.click()
}

function importWorkspace(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result as string)
      if (data && Array.isArray(data.components)) {
        components.value = data.components
        selectedIds.value = []
        lastActionLabel = '导入工作区'
        showToast(`已导入 ${data.components.length} 个组件`, 'success')
      } else {
        showToast('文件格式无效', 'error')
      }
    } catch {
      showToast('JSON 解析失败', 'error')
    }
  }
  reader.readAsText(file)
  /* 重置 input 以支持重复导入同一文件 */
  if (importInputRef.value) importInputRef.value.value = ''
}

/* ===================== 命令面板 ===================== */
const commandList = computed<Command[]>(() => [
  { key: 'undo', label: '撤销', icon: '↶', shortcut: 'Ctrl+Z', action: handleUndo },
  { key: 'redo', label: '重做', icon: '↷', shortcut: 'Ctrl+Y', action: handleRedo },
  { key: 'clearAll', label: '清空所有组件', icon: '🗑️', action: clearAll },
  {
    key: 'preview',
    label: '预览页面',
    icon: '▶',
    shortcut: '',
    action: () => {
      showPreview.value = true
    },
  },
  {
    key: 'template',
    label: '选择模板',
    icon: '📑',
    action: () => {
      showTemplates.value = true
    },
  },
  { key: 'export', label: '导出工作区 JSON', icon: '📥', action: exportWorkspace },
  { key: 'import', label: '导入工作区 JSON', icon: '📤', action: triggerImport },
  {
    key: 'exportCode',
    label: '查看导出代码',
    icon: '📦',
    action: () => {
      rightPanel.value = 'code'
    },
  },
  {
    key: 'schema',
    label: '查看 Schema',
    icon: '{ }',
    action: () => {
      rightPanel.value = 'schema'
    },
  },
  {
    key: 'tree',
    label: '组件大纲',
    icon: '🌳',
    action: () => {
      rightPanel.value = 'tree'
    },
  },
  {
    key: 'history',
    label: '操作历史',
    icon: '📜',
    action: () => {
      rightPanel.value = 'history'
    },
  },
  { key: 'zoomIn', label: '放大画布', icon: '🔍', action: () => changeZoom(0.1) },
  { key: 'zoomOut', label: '缩小画布', icon: '🔎', action: () => changeZoom(-0.1) },
  {
    key: 'zoomReset',
    label: '重置缩放',
    icon: '🔄',
    action: () => {
      zoom.value = 1
    },
  },
  {
    key: 'batchDelete',
    label: '批量删除选中',
    icon: '🗑️',
    description: '删除所有选中的组件',
    action: batchDelete,
  },
  {
    key: 'batchDuplicate',
    label: '批量复制选中',
    icon: '⧉',
    description: '复制所有选中的组件',
    action: batchDuplicate,
  },
])

/* ===================== 键盘快捷键 ===================== */
function handleKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement
  /* 排除输入框内的按键 */
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

  const ctrl = e.ctrlKey || e.metaKey

  if (ctrl && e.key === 'p') {
    e.preventDefault()
    showCommandPalette.value = !showCommandPalette.value
  } else if (ctrl && e.key === 'z') {
    e.preventDefault()
    handleUndo()
  } else if (ctrl && e.key === 'y') {
    e.preventDefault()
    handleRedo()
  } else if (ctrl && e.key === 'd') {
    e.preventDefault()
    if (selectedIds.value.length > 1) {
      batchDuplicate()
    } else if (selectedIds.value.length === 1) {
      const idx = components.value.findIndex(c => c.id === selectedIds.value[0])
      if (idx >= 0) duplicateComponent(idx)
    }
  } else if (ctrl && e.key === 'a') {
    e.preventDefault()
    selectedIds.value = components.value.map(c => c.id)
    showToast(`已全选 ${components.value.length} 个组件`, 'info')
  } else if (e.key === 'Delete' || e.key === 'Backspace') {
    if (selectedIds.value.length > 1) {
      e.preventDefault()
      batchDelete()
    } else if (selectedIds.value.length === 1) {
      e.preventDefault()
      const idx = components.value.findIndex(c => c.id === selectedIds.value[0])
      if (idx >= 0) removeComponent(idx)
    }
  } else if (e.key === 'Escape') {
    selectedIds.value = []
    ctxMenu.value.visible = false
    showCommandPalette.value = false
  } else if (ctrl && e.key === '=') {
    e.preventDefault()
    changeZoom(0.1)
  } else if (ctrl && e.key === '-') {
    e.preventDefault()
    changeZoom(-0.1)
  } else if (ctrl && e.key === '0') {
    e.preventDefault()
    zoom.value = 1
  }
}

/* ===================== 右键菜单 ===================== */
const ctxMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  targetId: '',
  targetIndex: -1,
})

const ctxMenuItems = computed<MenuItem[]>(() => {
  const idx = ctxMenu.value.targetIndex
  const len = components.value.length
  const comp = components.value[idx]
  const isLocked = comp?.locked
  return [
    { key: 'select', label: '选中组件', icon: '👆' },
    { key: 'divider-1', divider: true },
    { key: 'lock', label: isLocked ? '解锁' : '锁定', icon: isLocked ? '🔓' : '🔒' },
    { key: 'divider-1b', divider: true },
    { key: 'moveUp', label: '上移', icon: '↑', shortcut: '', disabled: idx <= 0 },
    { key: 'moveDown', label: '下移', icon: '↓', shortcut: '', disabled: idx >= len - 1 },
    { key: 'divider-2', divider: true },
    { key: 'duplicate', label: '复制', icon: '⧉', shortcut: 'Ctrl+D' },
    { key: 'delete', label: '删除', icon: '🗑️', shortcut: 'Delete', disabled: isLocked },
    { key: 'divider-3', divider: true },
    { key: 'resetDefaults', label: '重置默认值', icon: '↺' },
    { key: 'selectAll', label: '全选', icon: '☑', shortcut: 'Ctrl+A' },
  ]
})

function handleContextMenu(e: MouseEvent, _id: string, index: number) {
  ctxMenu.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    targetId: _id,
    targetIndex: index,
  }
}

function handleCtxAction(key: string) {
  const { targetId, targetIndex } = ctxMenu.value
  switch (key) {
    case 'select':
      selectedIds.value = [targetId]
      break
    case 'lock':
      toggleLock(targetId)
      break
    case 'moveUp':
      moveUp(targetIndex)
      break
    case 'moveDown':
      moveDown(targetIndex)
      break
    case 'duplicate':
      duplicateComponent(targetIndex)
      break
    case 'delete':
      removeComponent(targetIndex)
      break
    case 'resetDefaults':
      resetDefaults(targetId)
      break
    case 'selectAll':
      selectedIds.value = components.value.map(c => c.id)
      break
  }
}
</script>

<style>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.low-code-editor {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  outline: none;
}

/* 顶部栏 */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  font-size: 22px;
}

.header-left h1 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

.header-center,
.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.separator {
  width: 1px;
  height: 20px;
  background: #dcdfe6;
  margin: 0 4px;
}

.header-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.header-btn:hover:not(:disabled) {
  border-color: #409eff;
  color: #409eff;
}

.header-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.header-btn.active {
  background: #ecf5ff;
  border-color: #409eff;
  color: #409eff;
}

.header-btn--primary {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.header-btn--primary:hover:not(:disabled) {
  background: #66b1ff;
  color: #fff;
}

/* 缩放控制 */
.zoom-control {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  overflow: hidden;
}

.zoom-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.zoom-btn:hover:not(:disabled) {
  background: #ecf5ff;
  color: #409eff;
}

.zoom-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.zoom-value {
  padding: 0 8px;
  font-size: 12px;
  font-weight: 500;
  color: #303133;
  min-width: 44px;
  text-align: center;
  cursor: pointer;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  line-height: 28px;
}

.zoom-value:hover {
  background: #f5f7fa;
}

/* 批量操作栏 */
.batch-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  background: #ecf5ff;
  border-bottom: 1px solid #d9ecff;
  flex-shrink: 0;
}

.batch-info {
  font-size: 13px;
  font-weight: 500;
  color: #409eff;
}

.batch-btn {
  padding: 4px 12px;
  border: 1px solid #d9ecff;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  color: #606266;
  transition: all 0.2s;
}

.batch-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.batch-btn--danger {
  border-color: #fde2e2;
  color: #f56c6c;
}

.batch-btn--danger:hover {
  background: #fef0f0;
}

/* 主体 */
.editor-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.editor-center {
  flex: 1;
  overflow: auto;
  display: flex;
}

.editor-right {
  width: 300px;
  flex-shrink: 0;
  background: #fafbfc;
  border-left: 1px solid #e8e8e8;
  overflow: hidden;
  display: flex;
}

/* 底部状态栏 */
.editor-footer {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 16px;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  font-size: 12px;
  color: #909399;
  flex-shrink: 0;
  gap: 8px;
}

.separator-dot::before {
  content: '·';
  font-weight: 700;
  margin: 0 2px;
}

.footer-right {
  margin-left: auto;
}

.shortcut-hint {
  font-size: 11px;
  color: #c0c4cc;
}
</style>
