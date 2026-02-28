/** File: tooltip.vue - Vue Component */

<template>
  <!-- 触发容器：鼠标事件绑定在此 -->
  <div
    :class="[ns.b(), ns.is('disabled', props.disabled)]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 触发器包裹层 -->
    <div :class="[ns.e('trigger'), ns.is('disabled', props.disabled)]" ref="triggerRef">
      <slot />
    </div>

    <!-- 弹层：teleport 到 body，避免被父级 overflow 裁切 -->
    <teleport to="body">
      <transition name="swy-tooltip-fade">
        <div
          v-if="shouldShow"
          ref="popperRef"
          :class="[ns.e('popper'), ns.m(props.placement), ns.is(props.effect)]"
          :style="posStyle"
          @mouseenter="handlePopperMouseEnter"
          @mouseleave="handlePopperMouseLeave"
        >
          <div :class="[ns.e('arrow'), ns.m(props.placement)]" />
          <slot name="content">
            {{ props.content }}
          </slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tooltipProps } from './tooltip'

defineOptions({
  name: 'SwyTooltip',
})

const props = defineProps(tooltipProps)

const ns = useNamespace('tooltip')
const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()

// ========== 显示状态 ==========
const internalVisible = ref(false)

/**
 * 最终显示状态：
 * - disabled → 始终隐藏
 * - visible 不为 null → 外部手动控制
 * - 否则由内部鼠标事件控制
 */
const shouldShow = computed(() => {
  if (props.disabled) return false
  if (props.visible !== null) return props.visible
  return internalVisible.value
})

// ========== 定位样式（position: fixed，使用视口坐标） ==========
const posStyle = ref<Record<string, string>>({})

/**
 * 计算并更新弹层位置
 * 使用 position: fixed + 视口坐标，无需额外处理滚动偏移
 * 必须在 nextTick 后调用，确保 popperRef DOM 已挂载且具备正确尺寸
 */
async function updatePosition() {
  await nextTick()
  if (!triggerRef.value || !popperRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popperRect = popperRef.value.getBoundingClientRect()
  const gap = props.offset

  let top = 0
  let left = 0

  switch (props.placement) {
    case 'top':
      top = triggerRect.top - popperRect.height - gap
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'top-start':
      top = triggerRect.top - popperRect.height - gap
      left = triggerRect.left
      break
    case 'top-end':
      top = triggerRect.top - popperRect.height - gap
      left = triggerRect.right - popperRect.width
      break
    case 'bottom':
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'bottom-start':
      top = triggerRect.bottom + gap
      left = triggerRect.left
      break
    case 'bottom-end':
      top = triggerRect.bottom + gap
      left = triggerRect.right - popperRect.width
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.left - popperRect.width - gap
      break
    case 'left-start':
      top = triggerRect.top
      left = triggerRect.left - popperRect.width - gap
      break
    case 'left-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.left - popperRect.width - gap
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.right + gap
      break
    case 'right-start':
      top = triggerRect.top
      left = triggerRect.right + gap
      break
    case 'right-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.right + gap
      break
  }

  // 边界检测：确保弹层不超出视口
  const vw = window.innerWidth
  const vh = window.innerHeight
  left = Math.max(8, Math.min(left, vw - popperRect.width - 8))
  top = Math.max(8, Math.min(top, vh - popperRect.height - 8))

  posStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  }
}

/**
 * 监听显示状态变化
 * - 显示时：等 DOM 更新后重新计算位置
 * - 隐藏时：清空位置样式（下次打开时重新计算）
 */
watch(shouldShow, val => {
  if (val) {
    updatePosition()
  } else {
    posStyle.value = {}
  }
})

// ========== 滚动 & 窗口resize 时跟随更新位置 ==========
function handleViewportChange() {
  if (shouldShow.value) updatePosition()
}

onMounted(() => {
  // capture: true 确保捕获所有元素的滚动事件（包括父级容器滚动）
  window.addEventListener('scroll', handleViewportChange, { capture: true, passive: true })
  window.addEventListener('resize', handleViewportChange, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleViewportChange, true)
  window.removeEventListener('resize', handleViewportChange)
  clearTimer(showTimer)
  clearTimer(hideTimer)
})

// ========== 计时器管理 ==========
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function clearTimer(timer: ReturnType<typeof setTimeout> | null) {
  if (timer !== null) {
    clearTimeout(timer)
  }
}

/**
 * 触发隐藏
 * - enterable 模式：给鼠标留 150ms 时间滑入弹层
 * - 若 hideAfter > 0：使用 hideAfter 作为延迟
 * - 取两者中的较大值，确保体验流畅
 */
function startHide() {
  clearTimer(hideTimer)
  const delay = props.enterable ? Math.max(150, props.hideAfter) : props.hideAfter

  if (delay > 0) {
    hideTimer = setTimeout(() => {
      internalVisible.value = false
      hideTimer = null
    }, delay)
  } else {
    internalVisible.value = false
  }
}

// ========== 触发器鼠标事件 ==========

/** 鼠标进入触发器：取消隐藏计时器，按 showAfter 延迟显示 */
const handleMouseEnter = () => {
  if (props.disabled || props.visible !== null) return

  clearTimer(hideTimer)
  hideTimer = null

  if (props.showAfter > 0) {
    showTimer = setTimeout(() => {
      internalVisible.value = true
      showTimer = null
    }, props.showAfter)
  } else {
    internalVisible.value = true
  }
}

/** 鼠标离开触发器：清除显示计时器，启动隐藏逻辑 */
const handleMouseLeave = () => {
  if (props.disabled || props.visible !== null) return

  clearTimer(showTimer)
  showTimer = null
  startHide()
}

// ========== 弹层鼠标事件（enterable 支持） ==========

/**
 * 鼠标进入弹层：取消隐藏计时器
 * 仅在 enterable: true 时生效
 */
const handlePopperMouseEnter = () => {
  if (!props.enterable || props.disabled) return
  clearTimer(hideTimer)
  hideTimer = null
}

/**
 * 鼠标离开弹层：重新触发隐藏逻辑
 * 仅在 enterable: true 时生效
 */
const handlePopperMouseLeave = () => {
  if (!props.enterable || props.disabled) return

  clearTimer(hideTimer)
  if (props.hideAfter > 0) {
    hideTimer = setTimeout(() => {
      internalVisible.value = false
      hideTimer = null
    }, props.hideAfter)
  } else {
    internalVisible.value = false
  }
}
</script>
