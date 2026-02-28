/** File: table-column.vue - Vue Component */

<template>
  <!-- SwyTableColumn 不直接渲染 th，而是由 SwyTable 根据注册的信息统一渲染 -->
  <div v-if="false">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { inject, onMounted, onBeforeUnmount } from 'vue'
import { tableColumnProps } from './table-column'

defineOptions({
  name: 'SwyTableColumn',
})

const props = defineProps(tableColumnProps)

// 注入父组件提供的注册函数
const swyTable = inject<any>('SwyTable', null)

if (swyTable) {
  onMounted(() => {
    swyTable.registerColumn(props)
  })

  onBeforeUnmount(() => {
    swyTable.unregisterColumn(props)
  })
}
</script>
