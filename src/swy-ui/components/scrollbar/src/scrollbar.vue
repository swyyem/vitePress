<template>
  <div :class="scrollbarKls" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div ref="wrapRef" :class="ns.e('wrap')" :style="wrapStyle" @scroll="handleScroll">
      <div ref="resizeRef" :class="ns.e('view')" :style="viewStyle">
        <slot />
      </div>
    </div>
    <div
      v-show="!props.native && thumbVisible"
      :class="[ns.e('bar'), ns.is('vertical')]"
      :style="barStyle"
    >
      <div
        ref="thumbRef"
        :class="ns.e('thumb')"
        :style="thumbStyle"
        @mousedown="handleThumbMouseDown"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { scrollbarEmits, scrollbarProps } from './scrollbar'

defineOptions({
  name: 'SwyScrollbar',
})

const props = defineProps(scrollbarProps)
const emit = defineEmits(scrollbarEmits)

const ns = useNamespace('scrollbar')
const wrapRef = ref<HTMLDivElement>()
const resizeRef = ref<HTMLDivElement>()
const thumbRef = ref<HTMLDivElement>()
const thumbVisible = ref(props.always)
const scrollbarSize = ref(0)
const moveY = ref(0)

const scrollbarKls = computed(() => [ns.b(), ns.is('always', props.always)])

const wrapStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }
  return style
})

const viewStyle = computed(() => {
  if (typeof props.viewStyle === 'string') {
    return props.viewStyle
  }
  return props.viewStyle || {}
})

const barStyle = computed(() => ({}))

const thumbStyle = computed(() => {
  const style: Record<string, string> = {}
  if (scrollbarSize.value) {
    style.height = `${scrollbarSize.value}%`
    style.transform = `translateY(${moveY.value}%)`
  }
  return style
})

const handleMouseEnter = () => {
  if (!props.always) {
    thumbVisible.value = true
  }
}

const handleMouseLeave = () => {
  if (!props.always) {
    thumbVisible.value = false
  }
}

const handleScroll = (e: Event) => {
  const wrap = e.target as HTMLElement
  const scrollTop = wrap.scrollTop
  const scrollLeft = wrap.scrollLeft

  // 计算滚动条位置
  if (wrap.scrollHeight > wrap.clientHeight) {
    const scrollRatio = scrollTop / (wrap.scrollHeight - wrap.clientHeight)
    moveY.value = scrollRatio * (100 - scrollbarSize.value)
  }

  emit('scroll', { scrollTop, scrollLeft })
}

const handleThumbMouseDown = (e: MouseEvent) => {
  e.stopPropagation()
  if (!wrapRef.value) return

  const startY = e.clientY
  const startTop = wrapRef.value.scrollTop

  const handleMouseMove = (moveEvent: MouseEvent) => {
    if (!wrapRef.value) return
    const delta = moveEvent.clientY - startY
    const scrollRatio = delta / wrapRef.value.clientHeight
    wrapRef.value.scrollTop =
      startTop + scrollRatio * (wrapRef.value.scrollHeight - wrapRef.value.clientHeight)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const update = () => {
  if (!wrapRef.value) return

  const wrap = wrapRef.value
  const heightRatio = (wrap.clientHeight / wrap.scrollHeight) * 100

  if (heightRatio >= 100) {
    scrollbarSize.value = 0
  } else {
    scrollbarSize.value = Math.max(heightRatio, props.minSize)
  }
}

const setScrollTop = (scrollTop: number) => {
  if (!wrapRef.value) return
  wrapRef.value.scrollTop = scrollTop
}

const setScrollLeft = (scrollLeft: number) => {
  if (!wrapRef.value) return
  wrapRef.value.scrollLeft = scrollLeft
}

onMounted(() => {
  if (!props.native) {
    update()
  }
})

watch(
  () => props.always,
  val => {
    thumbVisible.value = val
  }
)

defineExpose({
  wrapRef,
  update,
  setScrollTop,
  setScrollLeft,
})
</script>
