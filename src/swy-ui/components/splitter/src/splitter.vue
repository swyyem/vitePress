/** File: splitter.vue - Vue Component */

<template>
  <div :class="splitterKls" :style="containerStyle">
    <div :class="ns.e('pane')" :style="pane1Style">
      <slot name="pane1" />
    </div>
    <div ref="barRef" :class="ns.e('bar')" @mousedown="handleMouseDown">
      <div :class="ns.e('bar-handle')">
        <span v-if="props.direction === 'horizontal'">⋮</span>
        <span v-else>⋯</span>
      </div>
    </div>
    <div :class="ns.e('pane')" :style="pane2Style">
      <slot name="pane2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { splitterEmits, splitterProps } from './splitter'

defineOptions({
  name: 'SwySplitter',
})

const props = defineProps(splitterProps)
const emit = defineEmits(splitterEmits)

const ns = useNamespace('splitter')
const barRef = ref<HTMLDivElement>()
const currentSize = ref<number>(0)
const isDragging = ref(false)

// 初始化当前尺寸
const initSize = () => {
  if (typeof props.pane1Size === 'number') {
    currentSize.value = props.pane1Size
  } else {
    // 如果是字符串（如 "30%"），转换为小数
    const match = props.pane1Size.toString().match(/^(\d+(?:\.\d+)?)%?$/)
    if (match) {
      const num = parseFloat(match[1])
      currentSize.value = num > 1 ? num / 100 : num
    } else {
      currentSize.value = 0.5
    }
  }
}

initSize()

watch(() => props.pane1Size, initSize)

const splitterKls = computed(() => [ns.b(), ns.m(props.direction)])

const containerStyle = computed(() => ({
  flexDirection: props.direction === 'horizontal' ? ('row' as const) : ('column' as const),
}))

const pane1Style = computed(() => {
  const size = `${currentSize.value * 100}%`
  return props.direction === 'horizontal'
    ? { width: size, height: '100%' }
    : { height: size, width: '100%' }
})

const pane2Style = computed(() => ({
  flex: 1,
  overflow: 'auto',
}))

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging.value = true

  const splitter = (e.currentTarget as HTMLElement).parentElement as HTMLElement
  const isHorizontal = props.direction === 'horizontal'
  const startPos = isHorizontal ? e.clientX : e.clientY
  const splitterSize = isHorizontal ? splitter.offsetWidth : splitter.offsetHeight
  const startSize = currentSize.value

  const handleMouseMove = (moveEvent: MouseEvent) => {
    const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY
    const delta = currentPos - startPos
    let newSize = startSize + delta / splitterSize

    // 应用最小最大限制
    newSize = Math.max(props.pane1MinSize, Math.min(props.pane1MaxSize, newSize))

    currentSize.value = newSize
    emit('resize', newSize)
  }

  const handleMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  document.body.style.cursor = isHorizontal ? 'ew-resize' : 'ns-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

defineExpose({
  currentSize,
})
</script>
