<template>
  <div :class="ns.b()" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div :class="ns.e('container')" :style="{ height: height }">
      <transition name="carousel-arrow-left">
        <button
          v-if="arrow !== 'never' && (arrow === 'always' || hovering)"
          :class="[ns.e('arrow'), ns.em('arrow', 'left')]"
          @click="prev"
        >
          ‹
        </button>
      </transition>
      <transition name="carousel-arrow-right">
        <button
          v-if="arrow !== 'never' && (arrow === 'always' || hovering)"
          :class="[ns.e('arrow'), ns.em('arrow', 'right')]"
          @click="next"
        >
          ›
        </button>
      </transition>
      <slot />
    </div>
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="[
        ns.e('indicators'),
        ns.em('indicators', 'horizontal'),
        ns.em('indicators', indicatorPosition),
      ]"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          ns.e('indicator'),
          ns.em('indicator', 'horizontal'),
          ns.is('active', index === activeIndex),
        ]"
        @mouseenter="trigger === 'hover' && setActiveItem(index)"
        @click="trigger === 'click' && setActiveItem(index)"
      >
        <button :class="ns.e('button')">
          <span v-if="item.label">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { carouselProps, carouselEmits } from './carousel'

defineOptions({
  name: 'SwyCarousel',
})

const props = defineProps(carouselProps)
const emit = defineEmits(carouselEmits)

const ns = useNamespace('carousel')

const activeIndex = ref(props.initialIndex)
const hovering = ref(false)
const items = ref<any[]>([])
let timer: any = null

provide('carousel', {
  activeIndex,
  items,
  addItem: (item: any) => {
    items.value.push(item)
  },
})

const setActiveItem = (index: number) => {
  const oldIndex = activeIndex.value
  activeIndex.value = index
  emit('change', index, oldIndex)
}

const prev = () => {
  const index = activeIndex.value - 1
  setActiveItem(index < 0 ? items.value.length - 1 : index)
}

const next = () => {
  const index = activeIndex.value + 1
  setActiveItem(index >= items.value.length ? 0 : index)
}

const handleMouseEnter = () => {
  hovering.value = true
  if (props.autoplay) {
    pauseTimer()
  }
}

const handleMouseLeave = () => {
  hovering.value = false
  if (props.autoplay) {
    startTimer()
  }
}

const pauseTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const startTimer = () => {
  if (props.autoplay && props.interval > 0) {
    timer = setInterval(() => {
      next()
    }, props.interval)
  }
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  pauseTimer()
})
</script>
