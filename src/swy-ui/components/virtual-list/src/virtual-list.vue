/** File: virtual-list.vue - Vue Component */

<template>
  <div ref="containerRef" :class="virtualListKls" :style="containerStyle" @scroll="handleScroll">
    <div :class="ns.e('phantom')" :style="phantomStyle" />
    <div :class="ns.e('content')" :style="contentStyle">
      <div v-for="item in visibleData" :key="item.index" :class="ns.e('item')">
        <slot :item="item.data" :index="item.index">
          {{ item.data }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { virtualListProps } from './virtual-list'

defineOptions({
  name: 'SwyVirtualList',
})

const props = defineProps(virtualListProps)

const ns = useNamespace('virtual-list')
const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)

const virtualListKls = computed(() => [ns.b()])

const containerStyle = computed(() => ({
  height: props.height,
  overflow: 'auto',
}))

const totalHeight = computed(() => props.data.length * props.itemSize)

const phantomStyle = computed(() => ({
  height: `${totalHeight.value}px`,
}))

const visibleCount = computed(() => {
  return Math.ceil((parseInt(props.height) || 300) / props.itemSize)
})

const startIndex = computed(() => {
  return Math.floor(scrollTop.value / props.itemSize)
})

const endIndex = computed(() => {
  return startIndex.value + visibleCount.value
})

const visibleData = computed(() => {
  return props.data.slice(startIndex.value, endIndex.value).map((item, index) => ({
    data: item,
    index: startIndex.value + index,
  }))
})

const contentStyle = computed(() => ({
  transform: `translateY(${startIndex.value * props.itemSize}px)`,
}))

const handleScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}

defineExpose({
  containerRef,
  scrollTop,
})
</script>
