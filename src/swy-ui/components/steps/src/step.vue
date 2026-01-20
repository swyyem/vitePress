<template>
  <div :class="stepKls" :style="stepStyle">
    <div :class="ns.e('head')">
      <div :class="ns.e('line')">
        <i :class="ns.e('line-inner')" :style="lineStyle" />
      </div>
      <div :class="[ns.e('icon'), ns.is(currentStatus)]">
        <slot v-if="currentStatus !== 'success' && currentStatus !== 'error'" name="icon">
          <div v-if="!icon" :class="ns.e('icon-inner')">{{ index + 1 }}</div>
          <el-icon v-else :class="ns.e('icon-inner')">
            <component :is="icon" />
          </el-icon>
        </slot>
        <el-icon v-else :class="[ns.e('icon-inner'), ns.is('status')]">
          <component :is="currentStatus === 'success' ? 'Check' : 'Close'" />
        </el-icon>
      </div>
    </div>
    <div :class="ns.e('main')">
      <div :class="[ns.e('title'), ns.is(currentStatus)]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="description || $slots.description"
        :class="[ns.e('description'), ns.is(currentStatus)]"
      >
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
}>('steps', {})
const instance = getCurrentInstance()

const currentStatus = computed(() => {
  if (props.status) return props.status
  const active = steps.active || 0
  if (active > index.value) return steps.finishStatus
  if (active === index.value) return steps.processStatus
  return 'wait'
})

const stepKls = computed(() => [
  ns.b(),
  ns.is(steps.direction),
  ns.is('flex', !steps.space),
  ns.is('center', steps.alignCenter),
  ns.is(currentStatus.value),
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
  return {
    transitionDelay: `${index.value * 150}ms`,
    borderWidth: active <= index.value ? '0' : undefined,
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
