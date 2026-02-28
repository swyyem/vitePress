/** File: steps.vue - Vue Component */

<template>
  <!-- 步骤条容器：根据 direction/simple 应用不同布局 -->
  <div :class="stepsKls">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, provide, reactive, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { stepsEmits, stepsProps } from './steps'

defineOptions({
  name: 'SwySteps',
})

const props = defineProps(stepsProps)
const emit = defineEmits(stepsEmits)

const ns = useNamespace('steps')

// ========== 容器样式类名 ==========
const stepsKls = computed(() => [ns.b(), ns.m(props.direction), ns.is('simple', props.simple)])

// ========== 传递给子步骤的配置（响应式直接传递 props） ==========
// 使用 reactive 包裹 + 完整 watch 同步，保证子组件实时感知父组件 props 变化
const stepsConfig = reactive({
  active: props.active,
  direction: props.direction,
  space: props.space,
  finishStatus: props.finishStatus,
  processStatus: props.processStatus,
  alignCenter: props.alignCenter,
  simple: props.simple,
})

// 同步 active 并触发 change 事件
watch(
  () => props.active,
  (newVal, oldVal) => {
    stepsConfig.active = newVal
    emit('change', newVal, oldVal)
  }
)

// 同步其余所有配置项，确保子步骤响应父组件 props 更新
watch(
  () => props.direction,
  val => {
    stepsConfig.direction = val
  }
)
watch(
  () => props.space,
  val => {
    stepsConfig.space = val
  }
)
watch(
  () => props.finishStatus,
  val => {
    stepsConfig.finishStatus = val
  }
)
watch(
  () => props.processStatus,
  val => {
    stepsConfig.processStatus = val
  }
)
watch(
  () => props.alignCenter,
  val => {
    stepsConfig.alignCenter = val
  }
)
watch(
  () => props.simple,
  val => {
    stepsConfig.simple = val
  }
)

// ========== Step 注册机制 ==========
// 维护已注册步骤的 uid 列表，用于可靠计算每个步骤的 index
const stepUids = reactive<number[]>([])

/**
 * 注册一个子步骤（在 SwyStep onMounted 时调用）
 * @param uid - 组件实例的唯一 uid
 */
function registerStep(uid: number) {
  if (!stepUids.includes(uid)) {
    stepUids.push(uid)
  }
}

/**
 * 取消注册（在 SwyStep onUnmounted 时调用，支持动态增删步骤）
 * @param uid - 组件实例的唯一 uid
 */
function unregisterStep(uid: number) {
  const idx = stepUids.indexOf(uid)
  if (idx !== -1) {
    stepUids.splice(idx, 1)
  }
}

// 向所有子步骤提供上下文
provide('stepsContext', {
  config: stepsConfig, // 响应式配置对象
  stepUids, // 注册顺序列表（响应式），子步骤通过此计算 index
  registerStep, // 注册函数
  unregisterStep, // 取消注册函数
})

defineExpose({
  stepsConfig,
  stepUids,
})
</script>
