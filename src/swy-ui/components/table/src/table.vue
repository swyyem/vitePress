<template>
  <div
    :class="[ns.b(), ns.m(size), ns.is('border', border), ns.is('stripe', stripe)]"
    :style="{ height: heightValue, maxHeight: maxHeightValue }"
  >
    <div :class="ns.e('inner-wrapper')">
      <table :class="ns.e('content')">
        <thead v-if="showHeader" :class="ns.e('header')">
          <tr>
            <slot name="header" />
          </tr>
        </thead>
        <tbody :class="ns.e('body')">
          <template v-if="data && data.length > 0">
            <tr
              v-for="(row, index) in data"
              :key="index"
              :class="[ns.e('row'), ns.is('striped', stripe && index % 2 === 1)]"
              @click="handleRowClick(row, $event)"
            >
              <slot :row="row" :index="index" />
            </tr>
          </template>
          <tr v-else>
            <td :colspan="999" :class="ns.e('empty-block')">
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
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tableProps, tableEmits } from './table'

defineOptions({
  name: 'SwyTable',
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const ns = useNamespace('table')

const heightValue = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const maxHeightValue = computed(() => {
  return typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
})

const handleRowClick = (row: any, event: Event) => {
  emit('row-click', row, null, event)
}
</script>
