<template>
  <div :class="stepKls" :style="stepStyle">
    <div :class="[ns.e('head'), ns.is(status)]">
      <div :class="[ns.e('line'), ns.is(status)]">
        <i :class="ns.e('line-inner')" :style="lineStyle" />
      </div>
      <div :class="[ns.e('icon'), ns.is(status), ns.is('text', !icon)]">
        <slot v-if="status !== 'success' && status !== 'error'" name="icon">
          <div v-if="!icon" :class="ns.e('icon-inner')">{{ index + 1 }}</div>
          <div v-else :class="ns.e('icon-inner')">{{ icon }}</div>
        </slot>
        <div v-else :class="[ns.e('icon-inner'), ns.is('status')]">
          {{ status === 'success' ? '✓' : '✗' }}
        </div>
      </div>
    </div>
    <div :class="ns.e('main')">
      <div :class="[ns.e('title'), ns.is(status)]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" :class="[ns.e('description'), ns.is(status)]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { stepProps } from './step'

defineOptions({
  name: 'SwyStep',
})

const props = defineProps(stepProps)

const ns = useNamespace('step')
const index = ref(0)
const steps = inject<{
  active?: number
  finishStatus?: string
  processStatus?: string
  direction?: string
  space?: string | number
  alignCenter?: boolean
  simple?: boolean
}>('steps', {})
const instance = getCurrentInstance()

const currentStatus = computed(() => {
  if (props.status) return props.status
  const active = steps.active || 0
  if (active > index.value) return steps.finishStatus
  if (active === index.value) return steps.processStatus
  return 'wait'
})

const status = computed(() => currentStatus.value || 'wait')

const stepKls = computed(() => [
  ns.b(),
  ns.is(steps.direction || 'horizontal'),
  ns.is('flex', !steps.space),
  ns.is('center', steps.alignCenter),
  ns.is('simple', steps.simple),
])

const stepStyle = computed(() => {
  const style: Record<string, string> = {}
  if (steps.space) {
    style.flexBasis = typeof steps.space === 'number' ? `${steps.space}px` : steps.space
  }
  return style
})

const lineStyle = computed(() => {
  const active = steps.active || 0
  const direction = steps.direction || 'horizontal'
  const isCompleted = active > index.value

  if (direction === 'horizontal') {
    return {
      transitionDelay: `${index.value * 150}ms`,
      width: isCompleted ? '100%' : '0',
    }
  } else {
    return {
      transitionDelay: `${index.value * 150}ms`,
      height: isCompleted ? '100%' : '0',
    }
  }
})

onMounted(() => {
  const parent = instance?.parent
  if (parent) {
    const children = parent.subTree.children as Array<{ type?: { name?: string } }>
    index.value = children.filter(child => child.type?.name === 'SwyStep').indexOf(instance.vnode)
  }
})

defineExpose({
  index,
  currentStatus,
})
</script>
