/** File: tooltip.vue - Vue Component */

<template>
  <div
    :class="[ns.b(), ns.is('disabled', props.disabled)]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div :class="[ns.e('trigger'), ns.is('disabled', props.disabled)]" ref="triggerRef">
      <slot />
    </div>
    <teleport to="body">
      <transition name="swy-tooltip-fade">
        <div
          v-if="shouldShow"
          ref="popperRef"
          :class="[ns.e('popper'), ns.m(placement), ns.is(effect)]"
          :style="popperStyle"
        >
          <div :class="[ns.e('arrow'), ns.m(placement)]" />
          <slot name="content" :fallback="content">
            {{ content }}
          </slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tooltipProps } from './tooltip'

defineOptions({
  name: 'SwyTooltip',
})

const props = defineProps(tooltipProps)

const ns = useNamespace('tooltip')
const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()

const internalVisible = ref(false)
let timer: any = null

// 计算弹出层的位置样式
const popperStyle = computed(() => {
  if (!triggerRef.value || !popperRef.value) {
    return {}
  }

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popperRect = popperRef.value.getBoundingClientRect()

  let top = 0
  let left = 0

  switch (props.placement) {
    case 'top':
      top = triggerRect.top - popperRect.height - 8
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'top-start':
      top = triggerRect.top - popperRect.height - 8
      left = triggerRect.left
      break
    case 'top-end':
      top = triggerRect.top - popperRect.height - 8
      left = triggerRect.right - popperRect.width
      break
    case 'bottom':
      top = triggerRect.bottom + 8
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'bottom-start':
      top = triggerRect.bottom + 8
      left = triggerRect.left
      break
    case 'bottom-end':
      top = triggerRect.bottom + 8
      left = triggerRect.right - popperRect.width
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.left - popperRect.width - 8
      break
    case 'left-start':
      top = triggerRect.top
      left = triggerRect.left - popperRect.width - 8
      break
    case 'left-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.left - popperRect.width - 8
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.right + 8
      break
    case 'right-start':
      top = triggerRect.top
      left = triggerRect.right + 8
      break
    case 'right-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.right + 8
      break
  }

  // 边界检测，防止超出窗口
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // 确保元素不会超出窗口边界
  left = Math.max(8, Math.min(left, viewportWidth - popperRect.width - 8))
  top = Math.max(8, Math.min(top, viewportHeight - popperRect.height - 8))

  // 将相对于视口的坐标转换为相对于文档的坐标
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  return {
    top: `${scrollTop + top}px`,
    left: `${scrollLeft + left}px`,
  }
})

const shouldShow = computed(() => {
  if (props.disabled) return false
  if (props.visible !== null) return props.visible
  return internalVisible.value
})

const handleMouseEnter = () => {
  if (props.disabled || props.visible !== null) return

  if (props.showAfter > 0) {
    timer = setTimeout(() => {
      internalVisible.value = true
    }, props.showAfter)
  } else {
    internalVisible.value = true
  }
}

const handleMouseLeave = () => {
  if (props.disabled || props.visible !== null) return

  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  internalVisible.value = false
}
</script>
