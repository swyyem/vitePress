<template>
  <div class="property-panel">
    <div v-if="!instance" class="panel-empty">
      <div class="empty-icon">⚙️</div>
      <p>选择一个组件以编辑属性</p>
    </div>

    <template v-else>
      <!-- 组件信息头部 -->
      <div class="panel-header">
        <div class="header-info">
          <span class="header-icon">{{ meta?.icon }}</span>
          <div class="header-text">
            <h3>{{ meta?.label || instance.type }}</h3>
            <span class="comp-type">{{ instance.type }}</span>
          </div>
        </div>
        <div class="header-actions">
          <button
            class="action-btn"
            :class="{ 'is-locked': instance.locked }"
            @click="emit('toggle-lock', instance.id)"
            :title="instance.locked ? '点击解锁' : '点击锁定'"
          >
            {{ instance.locked ? '🔒' : '🔓' }}
          </button>
          <button class="action-btn action-btn--reset" @click="resetDefaults" title="重置为默认值">
            ↺
          </button>
        </div>
      </div>

      <!-- Tab 切换 -->
      <div class="panel-tabs">
        <button
          :class="['tab-btn', { active: activeTab === 'props' }]"
          @click="activeTab = 'props'"
        >
          属性
        </button>
        <button
          :class="['tab-btn', { active: activeTab === 'style' }]"
          @click="activeTab = 'style'"
        >
          样式
          <span v-if="hasAnyStyle" class="tab-dot" />
        </button>
      </div>

      <!-- 属性分组 -->
      <div v-show="activeTab === 'props'" class="panel-body">
        <div v-for="group in propGroups" :key="group.key" class="prop-group">
          <div class="group-header" @click="toggleGroup(group.key)">
            <span class="group-arrow" :class="{ expanded: expandedGroups.has(group.key) }">▶</span>
            <span class="group-icon">{{ group.icon }}</span>
            <span class="group-title">{{ group.label }}</span>
            <span class="group-count">{{ group.props.length }}</span>
            <span v-if="group.modifiedCount" class="group-modified" title="已修改属性数">
              {{ group.modifiedCount }}
            </span>
          </div>

          <div v-show="expandedGroups.has(group.key)" class="group-body">
            <!-- 开关类属性：紧凑两列网格 -->
            <div v-if="group.switches.length" class="switch-grid">
              <label
                v-for="prop in group.switches"
                :key="prop.key"
                class="switch-grid-item"
                :class="{ 'is-modified': isModified(prop) }"
              >
                <span class="sg-label">{{ prop.label }}</span>
                <div class="sg-toggle">
                  <input
                    type="checkbox"
                    :checked="!!getValue(prop.key)"
                    @change="onInputChecked($event, prop.key)"
                  />
                  <span class="sg-slider" />
                </div>
              </label>
            </div>

            <!-- 非开关属性 -->
            <div
              v-for="prop in group.others"
              :key="prop.key"
              class="prop-item"
              :class="{ 'is-modified': isModified(prop) }"
            >
              <div class="prop-label-row">
                <label class="prop-label">
                  {{ prop.label }}
                  <span v-if="prop.tips" class="prop-tips" :title="prop.tips">?</span>
                </label>
                <button
                  v-if="isModified(prop)"
                  class="prop-reset-single"
                  title="恢复默认值"
                  @click="resetSingleProp(prop)"
                >
                  ↺
                </button>
              </div>
              <div class="prop-editor">
                <!-- 分段控制器 -->
                <div v-if="prop.type === 'segment' && prop.options" class="editor-segment">
                  <button
                    v-for="opt in prop.options"
                    :key="String(opt.value)"
                    :class="[
                      'seg-btn',
                      {
                        active:
                          getValue(prop.key) === opt.value ||
                          (getValue(prop.key) === undefined && prop.defaultValue === opt.value),
                      },
                    ]"
                    @click="handleInput(prop.key, opt.value)"
                  >
                    {{ opt.label }}
                  </button>
                </div>

                <!-- 文本输入 -->
                <input
                  v-else-if="prop.type === 'input'"
                  class="editor-input"
                  :value="getValue(prop.key)"
                  :placeholder="String(prop.defaultValue ?? '')"
                  @input="onInputText($event, prop.key)"
                />

                <!-- 数字输入 -->
                <input
                  v-else-if="prop.type === 'number'"
                  class="editor-input editor-number"
                  type="number"
                  :value="getValue(prop.key)"
                  :placeholder="String(prop.defaultValue ?? '')"
                  @input="onInputNumber($event, prop.key)"
                />

                <!-- 文本域 -->
                <textarea
                  v-else-if="prop.type === 'textarea'"
                  class="editor-textarea"
                  :value="String(getValue(prop.key) ?? '')"
                  :placeholder="String(prop.defaultValue ?? '')"
                  rows="3"
                  @input="onInputText($event, prop.key)"
                />

                <!-- 下拉选择 -->
                <select
                  v-else-if="prop.type === 'select'"
                  class="editor-select"
                  :value="getValue(prop.key)"
                  @change="onInputText($event, prop.key)"
                >
                  <option v-for="opt in prop.options" :key="String(opt.value)" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>

                <!-- 颜色选择 -->
                <div v-else-if="prop.type === 'color'" class="editor-color">
                  <input
                    type="color"
                    :value="String(getValue(prop.key) ?? '#409eff')"
                    @input="onInputText($event, prop.key)"
                  />
                  <span class="color-value">{{ getValue(prop.key) || '#409eff' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 组件 ID（底部显示） -->
        <div class="prop-footer">
          <span class="footer-label">ID</span>
          <span class="footer-value" :title="instance.id">{{ instance.id }}</span>
        </div>
      </div>

      <!-- 样式编辑面板 -->
      <div v-show="activeTab === 'style'" class="panel-body">
        <div class="style-toolbar">
          <span class="style-tip">自定义组件的 CSS 样式</span>
          <button v-if="hasAnyStyle" class="style-clear" @click="clearAllStyles">清空样式</button>
        </div>

        <div v-for="gKey in styleGroupOrder" :key="gKey" class="prop-group">
          <div class="group-header" @click="toggleStyleGroup(gKey)">
            <span class="group-arrow" :class="{ expanded: expandedStyleGroups.has(gKey) }">▶</span>
            <span class="group-title">{{ STYLE_GROUPS[gKey] }}</span>
            <span class="group-count">{{ styleFieldsByGroup[gKey]?.length }}</span>
          </div>
          <div v-show="expandedStyleGroups.has(gKey)" class="group-body">
            <div
              v-for="field in styleFieldsByGroup[gKey]"
              :key="field.key"
              class="prop-item"
              :class="{ 'is-modified': !!getStyleValue(field.key) }"
            >
              <div class="prop-label-row">
                <label class="prop-label">{{ field.label }}</label>
                <button
                  v-if="getStyleValue(field.key)"
                  class="prop-reset-single"
                  title="清除"
                  @click="setStyleValue(field.key, '')"
                >
                  ↺
                </button>
              </div>
              <div class="prop-editor">
                <input
                  v-if="field.type === 'text'"
                  class="editor-input"
                  :value="getStyleValue(field.key)"
                  :placeholder="field.placeholder || ''"
                  @input="onStyleInput($event, field.key)"
                />
                <div v-else-if="field.type === 'color'" class="editor-color">
                  <input
                    type="color"
                    :value="getStyleValue(field.key) || '#ffffff'"
                    @input="onStyleInput($event, field.key)"
                  />
                  <span class="color-value">{{ getStyleValue(field.key) || '未设置' }}</span>
                </div>
                <select
                  v-else-if="field.type === 'select'"
                  class="editor-select"
                  :value="getStyleValue(field.key)"
                  @change="onStyleInput($event, field.key)"
                >
                  <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 样式 ID -->
        <div class="prop-footer">
          <span class="footer-label">ID</span>
          <span class="footer-value" :title="instance.id">{{ instance.id }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getComponentMeta } from './component-registry'
import type { ComponentInstance, PropConfig, PropGroup, CustomStyle } from './types'
import { PROP_GROUP_LABELS, PROP_GROUP_ICONS, STYLE_FIELDS, STYLE_GROUPS } from './types'

const props = defineProps<{
  instance: ComponentInstance | null
}>()

const emit = defineEmits<{
  (e: 'update-prop', id: string, key: string, value: unknown): void
  (e: 'reset-defaults', id: string): void
  (e: 'update-style', id: string, style: CustomStyle): void
  (e: 'toggle-lock', id: string): void
}>()

/* ========== 属性/样式 Tab 切换 ========== */
const activeTab = ref<'props' | 'style'>('props')

/* ========== 样式编辑逻辑 ========== */
const styleGroupOrder = ['spacing', 'sizing', 'appearance', 'border'] as const
const expandedStyleGroups = ref(new Set<string>(['spacing', 'sizing', 'appearance', 'border']))

function toggleStyleGroup(key: string) {
  if (expandedStyleGroups.value.has(key)) {
    expandedStyleGroups.value.delete(key)
  } else {
    expandedStyleGroups.value.add(key)
  }
}

function getStyleValue(key: keyof CustomStyle): string {
  return (props.instance?.customStyle?.[key] as string) ?? ''
}

function setStyleValue(key: keyof CustomStyle, value: string) {
  if (!props.instance) return
  const current = { ...(props.instance.customStyle || {}) }
  if (value) {
    current[key] = value
  } else {
    delete current[key]
  }
  emit('update-style', props.instance.id, current)
}

function clearAllStyles() {
  if (!props.instance) return
  emit('update-style', props.instance.id, {})
}

function onStyleInput(e: Event, key: keyof CustomStyle) {
  const el = e.target as HTMLInputElement
  setStyleValue(key, el.value)
}

const hasAnyStyle = computed(() => {
  if (!props.instance?.customStyle) return false
  return Object.values(props.instance.customStyle).some(v => !!v)
})

const styleFieldsByGroup = computed(() => {
  const result: Record<string, typeof STYLE_FIELDS> = {}
  for (const g of styleGroupOrder) {
    result[g] = STYLE_FIELDS.filter(f => f.group === g)
  }
  return result
})

const meta = computed(() => (props.instance ? getComponentMeta(props.instance.type) : null))

/* ========== 分组逻辑 ========== */
const GROUP_ORDER: PropGroup[] = ['content', 'style', 'size', 'behavior', 'advanced']

const expandedGroups = ref(new Set<string>(GROUP_ORDER))

function toggleGroup(key: string) {
  if (expandedGroups.value.has(key)) {
    expandedGroups.value.delete(key)
  } else {
    expandedGroups.value.add(key)
  }
}

interface GroupedSection {
  key: string
  label: string
  icon: string
  props: PropConfig[]
  switches: PropConfig[]
  others: PropConfig[]
  modifiedCount: number
}

const propGroups = computed<GroupedSection[]>(() => {
  if (!meta.value) return []
  const allProps = meta.value.props
  const grouped = new Map<string, PropConfig[]>()

  for (const p of allProps) {
    const g = p.group || 'advanced'
    if (!grouped.has(g)) grouped.set(g, [])
    grouped.get(g)!.push(p)
  }

  const result: GroupedSection[] = []
  for (const gKey of GROUP_ORDER) {
    const items = grouped.get(gKey)
    if (!items || !items.length) continue
    const switches = items.filter(p => p.type === 'switch')
    const others = items.filter(p => p.type !== 'switch')
    const modifiedCount = items.filter(p => isModified(p)).length
    result.push({
      key: gKey,
      label: PROP_GROUP_LABELS[gKey as PropGroup],
      icon: PROP_GROUP_ICONS[gKey as PropGroup],
      props: items,
      switches,
      others,
      modifiedCount,
    })
  }
  return result
})

/* ========== 值操作 ========== */
function getValue(key: string) {
  if (!props.instance) return undefined
  if (key === 'slotContent') {
    return props.instance.slotContent ?? props.instance.props.slotContent
  }
  return props.instance.props[key]
}

function isModified(prop: PropConfig): boolean {
  const val = getValue(prop.key)
  if (val === undefined && prop.defaultValue === undefined) return false
  return val !== prop.defaultValue
}

function handleInput(key: string, value: unknown) {
  if (!props.instance) return
  emit('update-prop', props.instance.id, key, value)
}

function onInputText(e: Event, key: string) {
  handleInput(key, (e.target as HTMLInputElement).value)
}

function onInputNumber(e: Event, key: string) {
  handleInput(key, Number((e.target as HTMLInputElement).value))
}

function onInputChecked(e: Event, key: string) {
  handleInput(key, (e.target as HTMLInputElement).checked)
}

function resetDefaults() {
  if (!props.instance) return
  emit('reset-defaults', props.instance.id)
}

function resetSingleProp(prop: PropConfig) {
  if (!props.instance) return
  const val = prop.defaultValue !== undefined ? prop.defaultValue : undefined
  handleInput(prop.key, val)
}
</script>

<style scoped>
.property-panel {
  width: 300px;
  height: 100%;
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* 空状态 */
.panel-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #c0c4cc;
}

.empty-icon {
  font-size: 36px;
  margin-bottom: 10px;
}
.panel-empty p {
  font-size: 13px;
}

/* 头部 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 24px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  border-radius: 8px;
  flex-shrink: 0;
}

.header-text h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
}

.comp-type {
  font-size: 11px;
  color: #909399;
  font-family: monospace;
}

.action-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #606266;
}

.action-btn:hover {
  border-color: #e6a23c;
  color: #e6a23c;
}

.action-btn.is-locked {
  border-color: #e6a23c;
  color: #e6a23c;
  background: #fdf6ec;
}

/* Tab 切换 */
.panel-tabs {
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
  gap: 0;
}

.tab-btn {
  flex: 1;
  padding: 9px 0;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 13px;
  font-weight: 500;
  color: #909399;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.tab-btn:hover {
  color: #606266;
}

.tab-btn.active {
  color: #409eff;
  border-bottom-color: #409eff;
}

.tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #409eff;
  display: inline-block;
}

/* 主体 */
.panel-body {
  flex: 1;
  padding: 0;
}

/* 分组 */
.prop-group {
  border-bottom: 1px solid #f0f2f5;
}

.group-header {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  gap: 6px;
  user-select: none;
  transition: background 0.15s;
}

.group-header:hover {
  background: #f5f7fa;
}

.group-arrow {
  font-size: 9px;
  color: #c0c4cc;
  transition: transform 0.2s;
  flex-shrink: 0;
}

.group-arrow.expanded {
  transform: rotate(90deg);
}

.group-icon {
  font-size: 13px;
  flex-shrink: 0;
}

.group-title {
  font-size: 12px;
  font-weight: 600;
  color: #303133;
  flex: 1;
}

.group-count {
  font-size: 10px;
  color: #c0c4cc;
  background: #f0f2f5;
  padding: 1px 6px;
  border-radius: 8px;
}

.group-modified {
  font-size: 10px;
  color: #fff;
  background: #409eff;
  padding: 1px 6px;
  border-radius: 8px;
  min-width: 16px;
  text-align: center;
}

.group-body {
  padding: 4px 16px 12px;
}

/* 开关网格 */
.switch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-bottom: 8px;
}

.switch-grid-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  gap: 4px;
}

.switch-grid-item:hover {
  border-color: #c6e2ff;
}

.switch-grid-item.is-modified {
  border-color: #b3d8ff;
  background: #f5faff;
}

.sg-label {
  font-size: 12px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sg-toggle {
  flex-shrink: 0;
}

.sg-toggle input {
  display: none;
}

.sg-slider {
  position: relative;
  display: block;
  width: 32px;
  height: 18px;
  background: #dcdfe6;
  border-radius: 9px;
  transition: background 0.2s;
}

.sg-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}

.sg-toggle input:checked + .sg-slider {
  background: #409eff;
}

.sg-toggle input:checked + .sg-slider::after {
  transform: translateX(14px);
}

/* 非开关属性项 */
.prop-item {
  margin-bottom: 10px;
}

.prop-item.is-modified {
  position: relative;
}

.prop-item.is-modified::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 4px;
  width: 4px;
  height: 4px;
  background: #409eff;
  border-radius: 50%;
}

.prop-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.prop-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #606266;
  font-weight: 500;
}

.prop-tips {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #e4e7ed;
  font-size: 10px;
  color: #909399;
  cursor: help;
}

.prop-reset-single {
  background: none;
  border: none;
  color: #c0c4cc;
  cursor: pointer;
  font-size: 13px;
  padding: 0 2px;
  transition: color 0.15s;
  line-height: 1;
}

.prop-reset-single:hover {
  color: #409eff;
}

/* 分段控制器 */
.editor-segment {
  display: flex;
  background: #f0f2f5;
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
}

.seg-btn {
  flex: 1;
  padding: 5px 4px;
  border: none;
  background: transparent;
  border-radius: 4px;
  font-size: 11px;
  color: #909399;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.seg-btn:hover {
  color: #606266;
}

.seg-btn.active {
  background: #fff;
  color: #409eff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  font-weight: 500;
}

/* 输入控件 */
.prop-editor {
  width: 100%;
}

.editor-input,
.editor-textarea,
.editor-select {
  width: 100%;
  padding: 5px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fff;
}

.editor-input:focus,
.editor-textarea:focus,
.editor-select:focus {
  border-color: #409eff;
}

.editor-textarea {
  resize: vertical;
  font-family: inherit;
}

.editor-select {
  cursor: pointer;
}

.editor-color {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-color input[type='color'] {
  width: 28px;
  height: 28px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 2px;
  cursor: pointer;
}

.color-value {
  font-size: 12px;
  font-family: monospace;
  color: #606266;
}

/* 底部 ID */
.prop-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-top: 1px solid #f0f2f5;
  margin-top: 4px;
}

.footer-label {
  font-size: 11px;
  color: #c0c4cc;
  font-weight: 500;
}

.footer-value {
  font-size: 11px;
  font-family: monospace;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 样式面板工具栏 */
.style-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #f0f2f5;
}

.style-tip {
  font-size: 11px;
  color: #c0c4cc;
}

.style-clear {
  background: none;
  border: 1px solid #fde2e2;
  color: #f56c6c;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.style-clear:hover {
  background: #fef0f0;
}
</style>
