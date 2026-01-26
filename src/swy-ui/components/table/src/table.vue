<template>
  <div
    :class="[ns.b(), ns.m(size), ns.is('border', border), ns.is('stripe', stripe)]"
    :style="{ height: heightValue, maxHeight: maxHeightValue }"
  >
    <div :class="ns.e('inner-wrapper')">
      <!-- 隐藏的 slot 用于收集列信息 -->
      <div v-show="false" ref="columnHost">
        <slot />
      </div>

      <table :class="ns.e('content')">
        <thead v-if="showHeader" :class="ns.e('header')">
          <tr>
            <template v-if="columns.length > 0">
              <th
                v-for="(col, index) in columns"
                :key="index"
                :class="[ns.e('cell'), ns.is(col.align, col.align !== 'left')]"
                :style="getColumnStyle(col)"
              >
                {{ col.label }}
              </th>
            </template>
            <slot v-else name="header" />
          </tr>
        </thead>
        <tbody :class="ns.e('body')">
          <template v-if="data && data.length > 0">
            <tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              :class="[ns.e('row'), ns.is('striped', stripe && rowIndex % 2 === 1)]"
              @click="handleRowClick(row, $event)"
            >
              <template v-if="columns.length > 0">
                <td
                  v-for="(col, colIndex) in columns"
                  :key="colIndex"
                  :class="[ns.e('cell'), ns.is(col.align, col.align !== 'left')]"
                >
                  <template v-if="col.editable">
                    <ProField
                      :model-value="getCellValue(row, col.prop)"
                      :value-type="col.valueType"
                      :field-props="col.fieldProps"
                      size="small"
                      @update:model-value="val => setCellValue(row, col.prop, val)"
                    />
                  </template>
                  <template v-else>
                    {{ getCellValue(row, col.prop) }}
                  </template>
                </td>
              </template>
              <slot v-else :row="row" :index="rowIndex" />
            </tr>
          </template>
          <tr v-else>
            <td :colspan="columns.length || 999" :class="ns.e('empty-block')">
              <div :class="ns.e('empty-text')">
                {{ emptyText }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, onMounted, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tableProps, tableEmits } from './table'
import ProField from '../../../proField'

defineOptions({
  name: 'SwyTable',
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const ns = useNamespace('table')
const slots = useSlots()
const columnHost = ref<HTMLElement>()
const columns = ref<any[]>([])

const heightValue = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const maxHeightValue = computed(() => {
  return typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
})

const parseColumns = () => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return

  const cols: any[] = []
  const traverse = (vnodes: any[]) => {
    vnodes.forEach(vnode => {
      if (vnode.type?.name === 'SwyTableColumn') {
        cols.push(vnode.props || {})
      } else if (Array.isArray(vnode.children)) {
        traverse(vnode.children)
      }
    })
  }
  traverse(defaultSlot)
  columns.value = cols
}

onMounted(() => {
  parseColumns()
})

// 监听 slot 变化（简单处理）
watch(
  () => slots.default?.(),
  () => {
    parseColumns()
  }
)

const getColumnStyle = (col: any) => {
  const style: any = {}
  if (col.width) {
    style.width = typeof col.width === 'number' ? `${col.width}px` : col.width
  }
  if (col.minWidth) {
    style.minWidth = typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
  }
  return style
}

const handleRowClick = (row: any, event: Event) => {
  emit('row-click', row, null, event)
}

const getCellValue = (row: any, prop: string) => {
  return row[prop]
}

const setCellValue = (row: any, prop: string, value: any) => {
  row[prop] = value
}
</script>
