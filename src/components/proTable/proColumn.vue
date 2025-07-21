<template>
  <ElTableColumn
    :type="comumnType"
    :label="columnProps.label"
    :prop="columnProps.prop"
    :align="align"
    :width="props.width"
    v-bind="attrs"
    :class-name="columnClass"
  >
    <template #default="scope">
      <slot v-if="$slots['default']" v-bind="scope"></slot>
      <component v-else :is="getRenderText(scope)"></component>
    </template>
    <template #header="scope">
      <slot v-if="$slots['header']" name="header" v-bind="scope"></slot>
      <component v-else :is="getHeaderRender(scope)"></component>
    </template>
  </ElTableColumn>
</template>
<style>
.pro-column--required {
  color: var(--pro-table--danger-color);
  margin-right: 2px;
}
.pro-column--read {
  padding: 0 10px;
  min-height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
}
.pro-column--read > div {
  width: 100%;
}
.pro-column--checkbox {
  line-height: 0;
  justify-content: center;
}
</style>
<script setup lang="ts">
import { computed, useAttrs, h } from 'vue'
import { ElTableColumn } from 'element-plus'
import { getValue } from '../utils/value'
import type { ProColumn } from './table.types'

defineOptions({
  name: 'ProColumn',
})
const attrs = useAttrs()
const props = withDefaults(defineProps<ProColumn>(), {
  valueType: 'text',
  required: false,
  proFieldProps: () => ({}),
})
type AnyType = any
// const createMemoCellRenderer = (renderer: (params: AnyType) => VNode | (() => VNode) | null) => {
//   let lastParams: AnyType = null
//   let lastVNode: VNode | null = null
//   // 不需要比较 params 中的 column 对象
//   return (params: AnyType): VNode | null => {
//     if (lastParams && isEqual(omit(lastParams, 'column'), omit(params, 'column'))) {
//       return lastVNode
//     }
//     lastParams = params
//     const dom = renderer(params)
//     lastVNode = typeof dom === 'function' ? dom() : dom
//     return lastVNode
//   }
// }
// const memoCellRenderer = props.cellRenderer ? createMemoCellRenderer(props.cellRenderer) : undefined
// 样式名
const columnClass = computed<string>(() => attrs.class as string)
// 复选框默认居中
const align = computed(() => {
  const align = props.align
  if (align) {
    return align
  }
  if (props.valueType === 'price' || props.valueType === 'inputNumber') {
    return 'right'
  }
  return props.valueType === 'checkbox' ? 'center' : 'left'
})
const types = ['expand']
const comumnType = computed(() => {
  return props.type && types.includes(props.type) ? props.type : undefined
})
// 处理属性，优先使用title和field，其次使用label和prop
const columnProps = computed(() => {
  const { title, dataKey } = props
  // 处理title和field属性
  const finalProps = {
    label: title,
    prop: dataKey,
  }
  return finalProps
})

// 处理头部渲染
const getHeaderRender = (scope: AnyType) => {
  const headerCellRenderer = props.headerCellRenderer
  return headerCellRenderer?.({
    column: scope.column,
    columnIndex: scope.$index,
  })
}
// 处理渲染文本
const getRenderText = (scope: AnyType) => {
  // table 会先渲染空的 column 获取到 column 对象
  if (scope.$index === -1) {
    return null
  }
  // const hisType = props.valueType
  const cellKey = columnProps.value.prop!
  // console.log('=column=', cellKey, scope)
  const cellRenderer = props.cellRenderer
  const dom: AnyType = cellRenderer?.({
    cellKey: cellKey,
    cellData: getValue(scope.row, cellKey),
    rowData: scope.row,
    rowIndex: scope.$index,
    column: props,
    columnIndex: scope.cellIndex,
  })
  if (dom) {
    return props.valueType !== 'option'
      ? dom
      : h(
          'div',
          {
            onClick: (e: MouseEvent) => e.stopPropagation(),
          },
          dom,
        )
  }
  return dom
}
</script>
