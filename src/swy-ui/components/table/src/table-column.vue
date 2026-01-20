<template>
  <th
    :class="[ns.b('table__cell'), ns.is(align, align !== 'left')]"
    :style="{ width: widthValue, minWidth: minWidthValue }"
  >
    {{ label }}
  </th>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tableColumnProps } from './table-column'

defineOptions({
  name: 'SwyTableColumn',
})

const props = defineProps(tableColumnProps)

const ns = useNamespace('swy')

const widthValue = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

const minWidthValue = computed(() => {
  return typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth
})
</script>
