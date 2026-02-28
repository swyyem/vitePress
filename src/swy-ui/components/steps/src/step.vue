/** File: step.vue - Vue Component */

<template>
  <!-- 单个步骤项：根据 direction/simple/center 应用不同布局 -->
  <div :class="stepKls" :style="stepStyle">
    <!-- 步骤头部：包含连接线和图标 -->
    <div :class="[ns.e('head'), ns.is(status)]">
      <!-- 步骤连接线（最后一步通过 CSS :last-of-type 隐藏） -->
      <div :class="[ns.e('line'), ns.is(status)]">
        <i :class="ns.e('line-inner')" :style="lineStyle" />
      </div>

      <!--
        步骤图标区域：
        - 有自定义图标时：is-icon（较大字体，无边框背景）
        - 无图标时：is-text（显示序号，圆形边框）
      -->
      <div
        :class="[
          ns.e('icon'),
          ns.is(status),
          props.icon || $slots.icon ? ns.is('icon', true) : ns.is('text', true),
        ]"
      >
        <!-- 状态图标：success/error 时显示内置状态图标 -->
        <template v-if="status === 'success' || status === 'error'">
          <div :class="[ns.e('icon-inner'), ns.is('status')]">
            {{ status === 'success' ? '✓' : '✗' }}
          </div>
        </template>

        <!-- 自定义图标或默认步骤序号 -->
        <template v-else>
          <slot name="icon">
            <div :class="ns.e('icon-inner')">
              {{ props.icon !== undefined && props.icon !== '' ? props.icon : index + 1 }}
            </div>
          </slot>
        </template>
      </div>
    </div>

    <!-- 步骤主内容：标题 + 描述 -->
    <div :class="ns.e('main')">
      <div :class="[ns.e('title'), ns.is(status)]">
        <slot name="title">{{ props.title }}</slot>
      </div>
      <div
        v-if="props.description || $slots.description"
        :class="[ns.e('description'), ns.is(status)]"
      >
        <slot name="description">{{ props.description }}</slot>
      </div>
    </div>

    <!-- 简洁模式箭头分隔符（最后一步通过 CSS :last-of-type 隐藏） -->
    <div v-if="stepsCtx.config?.simple" :class="ns.e('arrow')" />
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, getCurrentInstance, inject, onUnmounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { stepProps } from './step'

defineOptions({
  name: 'SwyStep',
})

const props = defineProps(stepProps)

const ns = useNamespace('step')

// ========== 注入父级 Steps 上下文 ==========
interface StepsConfig {
  active?: number
  direction?: string
  space?: string | number
  finishStatus?: string
  processStatus?: string
  alignCenter?: boolean
  simple?: boolean
}

interface StepsContext {
  config: StepsConfig
  stepUids: number[]
  registerStep: (uid: number) => void
  unregisterStep: (uid: number) => void
}

const stepsCtx = inject<StepsContext>('stepsContext', {
  config: {},
  stepUids: [],
  registerStep: () => {},
  unregisterStep: () => {},
})

// ========== 步骤索引（基于注册顺序，响应式可靠） ==========
const instance = getCurrentInstance()!
const uid = instance.uid

/**
 * 在 setup 阶段（而非 onMounted）同步注册
 * Vue 3 中同级组件的 setup() 按 DOM 顺序依次执行，
 * 因此注册顺序等于组件在模板中的顺序，可保证 index 正确
 * 首次渲染时 stepUids 已包含当前 uid，避免显示序号 "0" 或连接线状态错乱
 */
stepsCtx.registerStep(uid)

/**
 * 通过注册列表计算当前步骤的 index（响应式，支持动态增删步骤）
 */
const index = computed(() => {
  return stepsCtx.stepUids.indexOf(uid)
})

onUnmounted(() => {
  // 组件销毁时从注册列表中移除，支持动态步骤列表
  stepsCtx.unregisterStep(uid)
})

// ========== 步骤状态计算 ==========
/**
 * 根据 active、index 及父级 finishStatus/processStatus 计算当前步骤状态
 * 优先使用 props.status 覆盖自动计算
 */
const currentStatus = computed<string>(() => {
  if (props.status) return props.status
  const active = stepsCtx.config.active ?? 0
  if (active > index.value) return stepsCtx.config.finishStatus ?? 'finish'
  if (active === index.value) return stepsCtx.config.processStatus ?? 'process'
  return 'wait'
})

/** 最终状态（兜底为 wait） */
const status = computed(() => currentStatus.value || 'wait')

// ========== 样式类名 ==========
const stepKls = computed(() => [
  ns.b(),
  ns.is(stepsCtx.config.direction || 'horizontal'),
  ns.is('flex', !stepsCtx.config.space),
  ns.is('center', stepsCtx.config.alignCenter),
  ns.is('simple', stepsCtx.config.simple),
])

// ========== 固定宽度样式（space prop 生效时） ==========
const stepStyle = computed(() => {
  const style: Record<string, string> = {}
  if (stepsCtx.config.space) {
    style.flexBasis =
      typeof stepsCtx.config.space === 'number'
        ? `${stepsCtx.config.space}px`
        : stepsCtx.config.space
  }
  return style
})

// ========== 连接线动画样式 ==========
/**
 * 水平模式：通过 width 0->100% 动画表示进度
 * 垂直模式：通过 height 0->100% 动画表示进度
 */
const lineStyle = computed(() => {
  const active = stepsCtx.config.active ?? 0
  const direction = stepsCtx.config.direction || 'horizontal'
  const isCompleted = active > index.value

  const transitionDelay = `${Math.max(0, index.value) * 150}ms`

  if (direction === 'horizontal') {
    return { transitionDelay, width: isCompleted ? '100%' : '0' }
  } else {
    return { transitionDelay, height: isCompleted ? '100%' : '0' }
  }
})

defineExpose({
  index,
  currentStatus,
})
</script>
