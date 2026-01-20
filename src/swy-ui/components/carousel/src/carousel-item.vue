<template>
  <div v-show="isActive" :class="ns.b('carousel-item')">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, onMounted, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { carouselItemProps } from './carousel-item'

defineOptions({
  name: 'SwyCarouselItem',
})

const props = defineProps(carouselItemProps)

const ns = useNamespace('swy')

const carousel = inject<any>('carousel')
const index = ref(0)

const isActive = computed(() => {
  return carousel?.activeIndex.value === index.value
})

onMounted(() => {
  index.value = carousel?.items.value.length || 0
  carousel?.addItem({
    name: props.name,
    label: props.label,
  })
})
</script>
