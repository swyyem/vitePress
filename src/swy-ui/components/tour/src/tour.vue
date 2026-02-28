<!-- File: tour.vue - Tour 漫游引导组件 -->

<template>
  <teleport to="body">
    <transition name="swy-tour-fade">
      <div v-if="modelValue" :class="ns.b()" :style="wrapStyle">
        <!-- ① 遮罩点击捕获层（透明覆盖层，用于 maskClosable 点击检测） -->
        <div v-if="props.mask" :class="ns.e('mask')" @click="handleMaskClick" />

        <!-- ② 高亮聚焦框（box-shadow 制造背景暗化 + 目标高亮效果） -->
        <div v-if="props.mask && targetRect" :class="ns.e('spotlight')" :style="spotlightStyle" />

        <!-- ③ 内容面板（position:fixed，由 updatePosition 动态设置 top/left） -->
        <div
          ref="contentRef"
          :class="[ns.e('content'), props.type === 'primary' && ns.m('primary')]"
          :style="contentPosStyle"
        >
          <!-- 箭头（指向目标元素方向） -->
          <div
            v-if="props.showArrow && targetRect"
            :class="[ns.e('arrow'), `${ns.e('arrow')}--${arrowSide}`]"
          />

          <!-- 自定义插槽（可完全替换面板内容） -->
          <slot :step="currentStep" :current="current" :total="props.steps.length">
            <!-- ──────── 默认面板内容 ──────── -->

            <!-- 标题行 + 关闭按钮 -->
            <div :class="[ns.e('header'), props.showClose && 'show-close']">
              <div :class="ns.e('title')">{{ currentStep?.title }}</div>
              <button v-if="props.showClose" :class="ns.e('closebtn')" @click="handleClose">
                <span :class="ns.e('close')">✕</span>
              </button>
            </div>

            <!-- 描述内容 -->
            <div :class="ns.e('body')">
              <p :class="ns.e('description')">{{ currentStep?.description }}</p>
            </div>

            <!-- 底部：步骤点 + 导航按钮 -->
            <div :class="ns.e('footer')">
              <!-- 步骤点指示器 -->
              <div :class="ns.e('indicators')">
                <span
                  v-for="(_, i) in props.steps"
                  :key="i"
                  :class="[ns.e('indicator'), ns.is('active', i === current)]"
                />
              </div>

              <!-- 导航按钮 -->
              <div :class="ns.e('buttons')">
                <button v-if="current > 0" :class="ns.b('btn')" @click="handlePrev">上一步</button>
                <button
                  v-if="current < props.steps.length - 1"
                  :class="[ns.b('btn'), ns.bm('btn', 'primary')]"
                  @click="handleNext"
                >
                  下一步
                </button>
                <button
                  v-else
                  :class="[ns.b('btn'), ns.bm('btn', 'primary')]"
                  @click="handleFinish"
                >
                  完成
                </button>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { tourEmits, tourProps } from './tour'
import type { TourStep } from './tour'

defineOptions({ name: 'SwyTour' })

const props = defineProps(tourProps)
const emit = defineEmits(tourEmits)

// ────────────────────────────────────────────────────────────────
// BEM 命名空间
// ────────────────────────────────────────────────────────────────

const ns = useNamespace('tour')

// ────────────────────────────────────────────────────────────────
// 状态
// ────────────────────────────────────────────────────────────────

/** 内容面板 DOM 引用（用于读取尺寸以计算定位） */
const contentRef = ref<HTMLElement | null>(null)

/** 内部当前步骤索引（由导航按钮维护，同时支持外部 current prop 同步） */
const current = ref(0)

/** 目标元素的视口矩形（null = 无目标，面板居中） */
const targetRect = ref<DOMRect | null>(null)

/** 内容面板定位 style（position:fixed + top/left） */
const contentPosStyle = ref<Record<string, string>>({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

// ────────────────────────────────────────────────────────────────
// 常量
// ────────────────────────────────────────────────────────────────

/** 面板与目标元素之间的间距（px） */
const OFFSET = 12

/** 高亮框在目标四周多出的内边距（px） */
const SPOTLIGHT_PAD = 4

// ────────────────────────────────────────────────────────────────
// 计算属性
// ────────────────────────────────────────────────────────────────

/** 当前步骤数据 */
const currentStep = computed<TourStep | undefined>(() => props.steps[current.value])

/** 外层 wrapper 的 z-index（通过 props 控制） */
const wrapStyle = computed(() => ({ zIndex: props.zIndex }))

/** 高亮聚焦框定位：覆盖目标元素，四周留 SPOTLIGHT_PAD 的空间 */
const spotlightStyle = computed(() => {
  if (!targetRect.value) return {}
  const { top, left, width, height } = targetRect.value
  return {
    top: `${top - SPOTLIGHT_PAD}px`,
    left: `${left - SPOTLIGHT_PAD}px`,
    width: `${width + SPOTLIGHT_PAD * 2}px`,
    height: `${height + SPOTLIGHT_PAD * 2}px`,
  }
})

/**
 * 箭头所在边（content 面板的哪一侧显示箭头，使其指向目标）：
 *   placement = 'bottom' → 面板在目标下方 → 箭头在面板顶部 → 'top'
 *   placement = 'top'    → 面板在目标上方 → 箭头在面板底部 → 'bottom'
 *   placement = 'left'   → 面板在目标左侧 → 箭头在面板右侧 → 'right'
 *   placement = 'right'  → 面板在目标右侧 → 箭头在面板左侧 → 'left'
 */
const arrowSide = computed(() => {
  const p = (currentStep.value?.placement || props.placement || 'bottom') as string
  if (p.startsWith('bottom')) return 'top'
  if (p.startsWith('top')) return 'bottom'
  if (p.startsWith('left')) return 'right'
  if (p.startsWith('right')) return 'left'
  return 'top'
})

// ────────────────────────────────────────────────────────────────
// 定位核心逻辑
// ────────────────────────────────────────────────────────────────

/** 居中样式（无目标 / 找不到目标时使用） */
const CENTER_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

/**
 * 根据当前步骤的 target / placement 更新面板位置。
 * 需在 nextTick 后调用，保证 DOM 已渲染。
 */
async function updatePosition() {
  await nextTick()

  const step = currentStep.value

  // 无 target → 居中展示
  if (!step?.target) {
    targetRect.value = null
    contentPosStyle.value = { ...CENTER_STYLE }
    return
  }

  const targetEl = document.querySelector(step.target)
  if (!targetEl) {
    targetRect.value = null
    contentPosStyle.value = { ...CENTER_STYLE }
    return
  }

  // 记录目标元素的视口矩形
  targetRect.value = targetEl.getBoundingClientRect()

  // 再等一帧，保证面板尺寸已稳定（首次渲染时内容面板刚出现）
  await nextTick()
  if (!contentRef.value) return

  const cRect = contentRef.value.getBoundingClientRect()
  const { top: tT, left: tL, width: tW, height: tH } = targetRect.value
  const { width: cW, height: cH } = cRect
  const vw = window.innerWidth
  const vh = window.innerHeight

  const placement = (step.placement || props.placement || 'bottom') as string
  let top = 0
  let left = 0

  // 根据方位计算面板初始 top / left
  if (placement.startsWith('bottom')) {
    top = tT + tH + OFFSET
    left =
      placement === 'bottom-start'
        ? tL
        : placement === 'bottom-end'
          ? tL + tW - cW
          : tL + tW / 2 - cW / 2
  } else if (placement.startsWith('top')) {
    top = tT - cH - OFFSET
    left =
      placement === 'top-start' ? tL : placement === 'top-end' ? tL + tW - cW : tL + tW / 2 - cW / 2
  } else if (placement.startsWith('left')) {
    left = tL - cW - OFFSET
    top =
      placement === 'left-start'
        ? tT
        : placement === 'left-end'
          ? tT + tH - cH
          : tT + tH / 2 - cH / 2
  } else if (placement.startsWith('right')) {
    left = tL + tW + OFFSET
    top =
      placement === 'right-start'
        ? tT
        : placement === 'right-end'
          ? tT + tH - cH
          : tT + tH / 2 - cH / 2
  } else {
    // center
    top = vh / 2 - cH / 2
    left = vw / 2 - cW / 2
  }

  // 限制在视口边界内（留 8px 安全边距）
  left = Math.max(8, Math.min(left, vw - cW - 8))
  top = Math.max(8, Math.min(top, vh - cH - 8))

  contentPosStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    transform: 'none',
  }
}

// ────────────────────────────────────────────────────────────────
// 步骤导航
// ────────────────────────────────────────────────────────────────

/** 上一步 */
function handlePrev() {
  if (current.value > 0) {
    current.value--
    emit('change', current.value)
    updatePosition()
  }
}

/** 下一步 */
function handleNext() {
  if (current.value < props.steps.length - 1) {
    current.value++
    emit('change', current.value)
    updatePosition()
  }
}

/** 完成（最后一步按钮） */
function handleFinish() {
  emit('update:modelValue', false)
  emit('finish')
  current.value = 0
}

/** 关闭（× 按钮 / ESC / 遮罩点击） */
function handleClose() {
  emit('update:modelValue', false)
  emit('close', current.value)
}

/** 点击遮罩 */
function handleMaskClick() {
  if (props.maskClosable) handleClose()
}

// ────────────────────────────────────────────────────────────────
// 键盘 / 滚动 / 窗口大小监听
// ────────────────────────────────────────────────────────────────

/** ESC 键关闭 */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue && props.closeOnPressEscape) {
    handleClose()
  }
}

/** 滚动 / 窗口大小变化时重新计算定位 */
function onScrollResize() {
  if (props.modelValue) updatePosition()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScrollResize, true)
  window.addEventListener('resize', onScrollResize)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScrollResize, true)
  window.removeEventListener('resize', onScrollResize)
})

// ────────────────────────────────────────────────────────────────
// 监听 v-model 打开 / 外部 current prop 受控
// ────────────────────────────────────────────────────────────────

/** 打开时重置到第 0 步并更新定位 */
watch(
  () => props.modelValue,
  val => {
    if (val) {
      current.value = 0
      updatePosition()
    }
  }
)

/** 外部传入 current prop 时同步内部状态 */
watch(
  () => props.current,
  val => {
    if (props.modelValue && val !== current.value) {
      current.value = val
      updatePosition()
    }
  }
)

// ────────────────────────────────────────────────────────────────
// 暴露内部状态（供父组件通过 ref 读取当前步骤）
// ────────────────────────────────────────────────────────────────

defineExpose({ current })
</script>
