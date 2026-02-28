/** File: popover.vue - Vue Component */

<template>
  <!-- 根容器：处理 hover/click 触发事件 -->
  <div
    :class="[ns.b(), ns.is('disabled', props.disabled)]"
    @mouseenter="props.trigger === 'hover' && !props.disabled && handleMouseEnterTrigger()"
    @mouseleave="props.trigger === 'hover' && !props.disabled && handleMouseLeaveTrigger()"
    @click="props.trigger === 'click' && !props.disabled && handleToggle()"
  >
    <!-- 触发元素容器（支持 focus 触发） -->
    <div
      :class="ns.e('reference')"
      ref="referenceRef"
      :tabindex="props.trigger === 'focus' ? 0 : -1"
      @focus="props.trigger === 'focus' && !props.disabled && handleShow()"
      @blur="props.trigger === 'focus' && !props.disabled && handleHide()"
    >
      <slot />
    </div>

    <!-- Teleport 到 body，避免父容器 overflow:hidden 裁切 -->
    <teleport to="body">
      <transition name="swy-popover-fade">
        <div
          v-if="visible"
          ref="popperRef"
          role="tooltip"
          :class="[ns.e('popper'), ns.m(props.placement)]"
          :style="posStyle"
          @mouseenter="props.trigger === 'hover' && clearHideTimer()"
          @mouseleave="props.trigger === 'hover' && startHide()"
          @keydown.escape="handleHide"
        >
          <!-- 箭头 -->
          <div v-if="props.showArrow" :class="ns.e('arrow')" />
          <!-- 标题 -->
          <div v-if="props.title" :class="ns.e('title')">{{ props.title }}</div>
          <!-- 内容区 -->
          <div :class="ns.e('content')">
            <slot name="content">{{ props.content }}</slot>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { popoverProps, popoverEmits } from './popover'

defineOptions({
  name: 'SwyPopover',
})

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

// ========== 命名空间 ==========
const ns = useNamespace('popover')

// ========== DOM 引用 ==========
/** 触发元素引用 */
const referenceRef = ref<HTMLElement>()
/** 弹出框面板引用 */
const popperRef = ref<HTMLElement>()

// ========== 显示状态 ==========
/** 弹出框是否可见 */
const visible = ref(false)

// ========== 定位样式 ==========
/** fixed 定位样式（top/left/width） */
const posStyle = ref<Record<string, string>>({})

/**
 * 计算并更新弹出框位置（使用 position:fixed + viewport 坐标，无需计算 scrollOffset）
 * 在 nextTick 后执行以确保 popperRef 已挂载且可读取宽高
 */
async function updatePosition() {
  await nextTick()
  if (!referenceRef.value || !popperRef.value) return

  const triggerRect = referenceRef.value.getBoundingClientRect()
  const popperRect = popperRef.value.getBoundingClientRect()
  const gap = props.offset
  const vw = window.innerWidth
  const vh = window.innerHeight

  let top = 0
  let left = 0

  // 根据 placement 计算初始位置（相对 viewport，fixed 定位直接用）
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
    default:
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
  }

  // 边界保护：确保弹出框不超出视口
  left = Math.max(8, Math.min(left, vw - popperRect.width - 8))
  top = Math.max(8, Math.min(top, vh - popperRect.height - 8))

  posStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  }
}

// 监听 visible 变化：显示时更新位置，隐藏时清空
watch(visible, val => {
  if (val) {
    updatePosition()
  } else {
    posStyle.value = {}
  }
})

// ========== 计时器（hover 触发延迟控制） ==========
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

/** 清除显示计时器 */
function clearShowTimer() {
  if (showTimer !== null) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

/** 清除隐藏计时器 */
function clearHideTimer() {
  if (hideTimer !== null) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

// ========== 核心显示/隐藏方法 ==========

/** 立即显示弹出框 */
function handleShow() {
  if (props.disabled) return
  clearHideTimer()
  visible.value = true
  emit('show')
}

/** 立即隐藏弹出框 */
function handleHide() {
  clearShowTimer()
  clearHideTimer()
  visible.value = false
  emit('hide')
}

/** 点击切换显示/隐藏 */
function handleToggle() {
  if (visible.value) {
    handleHide()
  } else {
    handleShow()
  }
}

/**
 * 触发区 mouseenter（hover 模式）
 * 若设置了 showAfter，则延迟显示；否则立即显示
 */
function handleMouseEnterTrigger() {
  clearHideTimer()
  if (props.showAfter > 0) {
    clearShowTimer()
    showTimer = setTimeout(() => {
      handleShow()
      showTimer = null
    }, props.showAfter)
  } else {
    handleShow()
  }
}

/**
 * 触发区 mouseleave（hover 模式）
 * 启动 hideAfter 延迟（给用户滑入弹层的时间）
 */
function handleMouseLeaveTrigger() {
  clearShowTimer()
  startHide()
}

/**
 * 启动延迟隐藏计时（鼠标离开触发区或弹层时调用）
 * 若 hideAfter 为 0，立即隐藏
 */
function startHide() {
  clearHideTimer()
  if (props.hideAfter > 0) {
    hideTimer = setTimeout(() => {
      visible.value = false
      emit('hide')
      hideTimer = null
    }, props.hideAfter)
  } else {
    handleHide()
  }
}

// ========== 点击外部关闭（click 触发专用） ==========

/** 当前绑定的外部点击处理器引用（用于后续解绑） */
let clickOutsideHandler: ((e: MouseEvent) => void) | null = null

/** 注册点击外部关闭 */
function setupClickOutside() {
  removeClickOutside()
  clickOutsideHandler = (e: MouseEvent) => {
    const target = e.target as Node
    if (referenceRef.value?.contains(target) || popperRef.value?.contains(target)) return
    handleHide()
  }
  // 延迟一帧注册，避免打开弹层的那次 click 事件立刻把弹层关掉
  setTimeout(() => {
    document.addEventListener('click', clickOutsideHandler!)
  }, 0)
}

/** 移除点击外部关闭 */
function removeClickOutside() {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler)
    clickOutsideHandler = null
  }
}

// 监听 visible：click 触发时绑定/解绑外部点击监听
watch(visible, val => {
  if (props.trigger === 'click') {
    if (val) {
      setupClickOutside()
    } else {
      removeClickOutside()
    }
  }
})

// ========== 滚动 / 窗口变化跟随 ==========

/** scroll / resize 事件回调：弹层显示时保持位置同步 */
function handleScrollOrResize() {
  if (visible.value) {
    updatePosition()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScrollOrResize, { capture: true })
  window.addEventListener('resize', handleScrollOrResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollOrResize, true)
  window.removeEventListener('resize', handleScrollOrResize)
  removeClickOutside()
  clearShowTimer()
  clearHideTimer()
})
</script>
