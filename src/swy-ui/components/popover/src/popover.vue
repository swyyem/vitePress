/** File: popover.vue - Vue Component */

<template>
  <div
    :class="ns.b()"
    @mouseenter="trigger === 'hover' && handleShow()"
    @mouseleave="trigger === 'hover' && handleHide()"
    @click="trigger === 'click' && handleToggle()"
  >
    <div
      :class="ns.e('reference')"
      ref="referenceRef"
      :tabindex="trigger === 'focus' ? 0 : -1"
      @focus="trigger === 'focus' && handleShow()"
      @blur="trigger === 'focus' && handleHide()"
      @keydown.enter="trigger === 'focus' && handleToggle()"
      @keydown.space="trigger === 'focus' && handleToggle()"
    >
      <slot />
    </div>
    <teleport to="body">
      <transition name="swy-popover-fade">
        <div
          v-if="visible"
          ref="popperRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'popover-title' : undefined"
          :aria-describedby="'popover-content'"
          :class="[ns.e('popper'), 'swy-popper', ns.m(placement)]"
          :style="popperStyle"
          :data-popper-placement="placement"
          @keydown.escape="handleHide"
        >
          <div v-if="title" :class="ns.e('title')" :id="'popover-title'">
            {{ title }}
          </div>
          <div :class="ns.e('content')" :id="'popover-content'">
            <p v-if="content">{{ content }}</p>
            <div v-if="$slots.content"><slot name="content" /></div>
          </div>
          <div v-if="showArrow" :class="ns.e('arrow')" ref="arrowRef" />
          <!-- 关闭按钮，提升可访问性 -->
          <button
            v-if="trigger !== 'hover'"
            :class="ns.e('close-btn')"
            :aria-label="'Close popover'"
            @click="handleHide"
            @mousedown.prevent
          >
            ×
          </button>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref, computed, nextTick } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { popoverProps, popoverEmits } from './popover'

defineOptions({
  name: 'SwyPopover',
})

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

const ns = useNamespace('popover')
const referenceRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

const visible = ref(false)

const popperStyle = computed(() => {
  if (!referenceRef.value || !popperRef.value) {
    return {}
  }

  const referenceRect = referenceRef.value.getBoundingClientRect()
  const popperRect = popperRef.value.getBoundingClientRect()

  let top = 0
  let left = 0

  // 简单的位置计算逻辑
  switch (props.placement) {
    case 'top':
      top = referenceRect.top - popperRect.height - 8
      left = referenceRect.left + (referenceRect.width - popperRect.width) / 2
      break
    case 'bottom':
      top = referenceRect.bottom + 8
      left = referenceRect.left + (referenceRect.width - popperRect.width) / 2
      break
    case 'left':
      top = referenceRect.top + (referenceRect.height - popperRect.height) / 2
      left = referenceRect.left - popperRect.width - 8
      break
    case 'right':
      top = referenceRect.top + (referenceRect.height - popperRect.height) / 2
      left = referenceRect.right + 8
      break
  }

  // 边界检测
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  left = Math.max(8, Math.min(left, viewportWidth - popperRect.width - 8))
  top = Math.max(8, Math.min(top, viewportHeight - popperRect.height - 8))

  // 转换为相对于文档的坐标
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  return {
    top: `${scrollTop + top}px`,
    left: `${scrollLeft + left}px`,
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  }
})

const handleShow = () => {
  visible.value = true
  // 在弹出框显示后将焦点设置到弹出框上，提高可访问性
  nextTick(() => {
    if (popperRef.value) {
      popperRef.value.focus({ preventScroll: true })
    }
  })
  emit('show')
}

const handleHide = () => {
  visible.value = false
  emit('hide')
}

const handleToggle = () => {
  if (visible.value) {
    handleHide()
  } else {
    handleShow()
  }
}
</script>
