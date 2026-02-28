<!-- File: affix.vue - 固钉组件 -->
<template>
  <!-- 占位根节点：固定时保持原始尺寸防止布局跳动 -->
  <div ref="rootRef" :class="ns.b()" :style="rootStyle">
    <!-- 实际内容：固定时使用 position:fixed -->
    <div :class="[ns.e('inner'), ns.is('fixed', fixed)]" :style="affixStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== 依赖导入 ==========
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { affixEmits, affixProps } from './affix'

defineOptions({ name: 'SwyAffix' })

const props = defineProps(affixProps)
const emit = defineEmits(affixEmits)

// ========== 命名空间 ==========
const ns = useNamespace('affix')

// ========== 状态 ==========
/** 根节点 ref */
const rootRef = ref<HTMLElement>()
/** 当前是否处于固定状态 */
const fixed = ref(false)

// 记录元素未固定时的原始位置信息（用于 fixed 后保持宽度和占位）
const rectLeft = ref(0)
const rectWidth = ref(0)
const rectHeight = ref(0)

// ========== 样式计算 ==========

/** 根节点占位样式：固定时撑起原始高度防止布局跳动 */
const rootStyle = computed(() => ({
  height: fixed.value ? `${rectHeight.value}px` : '',
  width: fixed.value ? `${rectWidth.value}px` : '',
}))

/** 固定时的内联样式：保留元素原始 left/width，不拉伸至全视口 */
const affixStyle = computed(() => {
  if (!fixed.value) return {}
  return {
    position: 'fixed' as const,
    top: props.position === 'top' ? `${props.offset}px` : 'auto',
    bottom: props.position === 'bottom' ? `${props.offset}px` : 'auto',
    left: `${rectLeft.value}px`,
    width: `${rectWidth.value}px`,
    zIndex: props.zIndex,
  }
})

// ========== 工具函数 ==========

/** 在元素未固定时更新原始 Rect 信息 */
function updateRect() {
  if (!rootRef.value || fixed.value) return
  const rect = rootRef.value.getBoundingClientRect()
  rectLeft.value = rect.left
  rectWidth.value = rect.width
  rectHeight.value = rect.height
}

/** 获取滚动容器的可视高度 */
function getClientHeight(el: HTMLElement | Window): number {
  return el === window ? document.documentElement.clientHeight : (el as HTMLElement).clientHeight
}

/** 获取滚动容器的 scrollTop */
function getScrollTop(el: HTMLElement | Window): number {
  return el === window
    ? document.documentElement.scrollTop || document.body.scrollTop
    : (el as HTMLElement).scrollTop
}

// ========== 核心滚动处理 ==========

const handleScroll = () => {
  if (!rootRef.value) return

  // 找到监听的滚动容器（没有 target 则为 window）
  const scrollEl: HTMLElement | Window = props.target
    ? (document.querySelector<HTMLElement>(props.target) ?? window)
    : window

  // 用 getBoundingClientRect 获取元素相对视口的实时位置
  const rect = rootRef.value.getBoundingClientRect()
  const clientH = getClientHeight(scrollEl)
  let shouldFix = false

  if (props.position === 'top') {
    // 元素顶部到达偏移位置时固定
    shouldFix = rect.top <= props.offset
  } else {
    // 元素底部到达视口底部偏移位置时固定
    shouldFix = rect.bottom >= clientH - props.offset
  }

  // 有 target 容器时：防止固定元素浮出容器外
  if (props.target && shouldFix) {
    const containerEl = document.querySelector<HTMLElement>(props.target)
    if (containerEl) {
      const cRect = containerEl.getBoundingClientRect()
      if (props.position === 'top') {
        // 容器底部需高于 offset + 元素自身高度，才允许保持固定
        shouldFix = cRect.bottom > props.offset + rectHeight.value
      } else {
        // 容器顶部需低于视口底部偏移处减去元素高度
        shouldFix = cRect.top < clientH - props.offset - rectHeight.value
      }
    }
  }

  // 取消固定前先更新 Rect 快照（供下次固定时使用）
  if (!shouldFix) updateRect()

  // 仅在状态变化时 emit change
  if (shouldFix !== fixed.value) {
    fixed.value = shouldFix
    emit('change', shouldFix)
  }

  // 每次滚动都 emit scroll
  emit('scroll', {
    scrollTop: getScrollTop(scrollEl),
    fixed: fixed.value,
  })
}

// ========== 生命周期 ==========

onMounted(() => {
  nextTick(() => {
    // 初始化 Rect 快照
    updateRect()

    const scrollEl: HTMLElement | Window = props.target
      ? (document.querySelector<HTMLElement>(props.target) ?? window)
      : window

    scrollEl.addEventListener('scroll', handleScroll, { passive: true })
    // 窗口缩放时同步更新位置
    window.addEventListener('resize', handleScroll, { passive: true })
    // 初始检测
    handleScroll()
  })
})

onUnmounted(() => {
  const scrollEl: HTMLElement | Window = props.target
    ? (document.querySelector<HTMLElement>(props.target) ?? window)
    : window

  scrollEl.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})

// ========== 暴露 ==========
defineExpose({ fixed })
</script>
