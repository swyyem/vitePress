<!-- File: popconfirm.vue - 气泡确认框组件 -->
<template>
  <!-- 根容器：点击触发，disabled 时忽略 -->
  <div
    :class="[ns.b(), ns.is('disabled', props.disabled)]"
    @click="!props.disabled && handleToggle()"
  >
    <!-- 触发元素容器 -->
    <div ref="referenceRef" :class="ns.e('reference')">
      <slot />
    </div>

    <!-- Teleport 到 body，避免父容器 overflow:hidden 裁切 -->
    <teleport to="body">
      <transition name="swy-popconfirm-fade">
        <div
          v-if="visible"
          ref="popperRef"
          :class="[ns.e('popper'), ns.m(props.placement)]"
          :style="posStyle"
          @click.stop
        >
          <!-- 箭头 -->
          <div v-if="props.showArrow" :class="ns.e('arrow')" />

          <!-- 标题行：图标 + 文字 -->
          <div :class="ns.e('main')">
            <span
              v-if="!props.hideIcon && props.icon"
              :class="ns.e('icon')"
              :style="{ color: props.iconColor }"
            >
              <!-- warning 图标 SVG -->
              <svg
                v-if="props.icon === 'warning'"
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
                />
              </svg>
              <!-- question 图标 SVG -->
              <svg
                v-else-if="props.icon === 'question'"
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                />
                <path
                  d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.4-103.3z"
                />
                <path
                  d="M512 732c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
                />
              </svg>
            </span>
            <span :class="ns.e('title')">{{ props.title }}</span>
          </div>

          <!-- 操作按钮行 -->
          <div :class="ns.e('action')">
            <button
              :class="[ns.e('btn'), ns.em('btn', 'cancel'), ns.em('btn', props.cancelButtonType)]"
              @click.stop="handleCancel"
            >
              {{ props.cancelButtonText }}
            </button>
            <button
              :class="[ns.e('btn'), ns.em('btn', 'confirm'), ns.em('btn', props.confirmButtonType)]"
              @click.stop="handleConfirm"
            >
              {{ props.confirmButtonText }}
            </button>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
// ========== 依赖导入 ==========
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { popconfirmProps, popconfirmEmits } from './popconfirm'

defineOptions({ name: 'SwyPopconfirm' })

const props = defineProps(popconfirmProps)
const emit = defineEmits(popconfirmEmits)

// ========== 命名空间 ==========
const ns = useNamespace('popconfirm')

// ========== DOM 引用 ==========
/** 触发元素引用 */
const referenceRef = ref<HTMLElement>()
/** 弹出层面板引用 */
const popperRef = ref<HTMLElement>()

// ========== 显示状态 ==========
/** 弹出层是否可见 */
const visible = ref(false)

// ========== 面板宽度样式 ==========
/** 弹出层宽度计算 */
const widthStyle = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
)

// ========== 定位样式 ==========
/** fixed 定位样式（top/left/width） */
const posStyle = ref<Record<string, string>>({
  width: widthStyle.value,
})

/**
 * 计算并更新弹出层位置（使用 position:fixed + getBoundingClientRect）
 * 在 nextTick 后执行，确保 popperRef 已挂载且可测量高度
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

  // 边界保护：不超出视口
  left = Math.max(8, Math.min(left, vw - popperRect.width - 8))
  top = Math.max(8, Math.min(top, vh - popperRect.height - 8))

  posStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    width: widthStyle.value,
  }
}

// ========== 显示 / 隐藏 ==========
/** 立即显示弹出层 */
function handleShow() {
  visible.value = true
}

/** 立即隐藏弹出层 */
function handleHide() {
  visible.value = false
}

/** 切换显示/隐藏状态 */
function handleToggle() {
  if (visible.value) {
    handleHide()
  } else {
    handleShow()
  }
}

// ========== 确认 / 取消 ==========
/** 点击确认按钮 */
function handleConfirm() {
  emit('confirm')
  handleHide()
}

/** 点击取消按钮 */
function handleCancel() {
  emit('cancel')
  handleHide()
}

// ========== 点击外部关闭 ==========
/** 当前绑定的外部点击处理器引用 */
let clickOutsideHandler: ((e: MouseEvent) => void) | null = null

/** 注册点击外部关闭事件 */
function setupClickOutside() {
  removeClickOutside()
  clickOutsideHandler = (e: MouseEvent) => {
    const target = e.target as Node
    if (referenceRef.value?.contains(target) || popperRef.value?.contains(target)) return
    handleHide()
  }
  // 延迟注册：避免打开弹层的那次 click 事件立刻触发关闭
  setTimeout(() => {
    document.addEventListener('click', clickOutsideHandler!)
  }, 0)
}

/** 移除点击外部关闭事件 */
function removeClickOutside() {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler)
    clickOutsideHandler = null
  }
}

// 监听 visible：显示时绑定外部点击 + 更新位置；隐藏时解绑
watch(visible, val => {
  if (val) {
    setupClickOutside()
    updatePosition()
  } else {
    removeClickOutside()
  }
})

// ========== 滚动 / 窗口变化跟随 ==========
/** 滚动或窗口变化时更新弹出层位置 */
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
})
</script>
