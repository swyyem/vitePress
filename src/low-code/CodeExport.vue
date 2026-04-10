<template>
  <div class="code-export">
    <div class="export-header">
      <h3>导出 Vue 代码</h3>
      <div class="export-actions">
        <button class="action-btn" @click="copyCode">复制代码</button>
        <button class="action-btn" @click="downloadCode">下载 .vue</button>
      </div>
    </div>
    <pre class="code-block"><code>{{ generatedCode }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getComponentMeta } from './component-registry'
import type { ComponentInstance } from './types'

const props = defineProps<{
  components: ComponentInstance[]
}>()

const emit = defineEmits<{
  (e: 'toast', message: string, type: string): void
}>()

const generatedCode = computed(() => {
  if (!props.components.length) return '<!-- 暂无组件，请先在画布中添加组件 -->'
  return generateSFC(props.components)
})

function generateSFC(components: ComponentInstance[]): string {
  const templateLines: string[] = []
  const dataFields: string[] = []
  let dataIdx = 0

  for (const comp of components) {
    const meta = getComponentMeta(comp.type)
    const tag = toKebab(comp.type)
    const propsStr = buildPropsString(comp, meta)
    const slot = comp.slotContent || (comp.props.slotContent as string) || ''

    /* 需要 v-model 的表单组件 */
    if (isFormComponent(comp.type)) {
      const fieldName = `field${dataIdx++}`
      const defaultVal = getFormDefaultValue(comp.type)
      dataFields.push(`const ${fieldName} = ref(${JSON.stringify(defaultVal)})`)
      if (slot) {
        templateLines.push(
          `    <${tag} v-model="${fieldName}"${propsStr}>${escapeHtml(slot)}</${tag}>`
        )
      } else {
        templateLines.push(`    <${tag} v-model="${fieldName}"${propsStr} />`)
      }
    } else if (slot) {
      templateLines.push(`    <${tag}${propsStr}>${escapeHtml(slot)}</${tag}>`)
    } else {
      templateLines.push(`    <${tag}${propsStr} />`)
    }
  }

  let script = ''
  if (dataFields.length) {
    script = `\n\n<script setup lang="ts">\nimport { ref } from 'vue'\n\n${dataFields.join('\n')}\n<\/script>`
  }

  return `<template>\n  <div class="page">\n${templateLines.join('\n')}\n  </div>\n</template>${script}\n\n<style scoped>\n.page {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n</style>\n`
}

function buildPropsString(
  comp: ComponentInstance,
  meta: ReturnType<typeof getComponentMeta>
): string {
  if (!meta) return ''
  const parts: string[] = []
  for (const p of meta.props) {
    if (p.key === 'slotContent') continue
    const val = comp.props[p.key]
    if (val === undefined || val === '' || val === p.defaultValue) continue
    if (typeof val === 'boolean') {
      parts.push(val ? ` ${p.key}` : ` :${p.key}="false"`)
    } else if (typeof val === 'number') {
      parts.push(` :${p.key}="${val}"`)
    } else {
      parts.push(` ${p.key}="${val}"`)
    }
  }
  return parts.join('')
}

function toKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function escapeHtml(str: string): string {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function isFormComponent(type: string): boolean {
  return ['SwyInput', 'SwyInputNumber', 'SwySelect', 'SwySwitch', 'SwySlider', 'SwyRate'].includes(
    type
  )
}

function getFormDefaultValue(type: string): unknown {
  const map: Record<string, unknown> = {
    SwyInput: '',
    SwyInputNumber: 0,
    SwySelect: '',
    SwySwitch: false,
    SwySlider: 0,
    SwyRate: 0,
  }
  return map[type] ?? ''
}

function copyCode() {
  navigator.clipboard.writeText(generatedCode.value).then(() => {
    emit('toast', '代码已复制到剪贴板', 'success')
  })
}

function downloadCode() {
  const blob = new Blob([generatedCode.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'GeneratedPage.vue'
  a.click()
  URL.revokeObjectURL(url)
  emit('toast', '文件已下载', 'success')
}
</script>

<style scoped>
.code-export {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.export-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
}

.export-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.export-actions {
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

.code-block {
  flex: 1;
  margin: 0;
  padding: 16px;
  overflow: auto;
  background: #1e1e2e;
  color: #cdd6f4;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.7;
  tab-size: 2;
  white-space: pre;
}
</style>
