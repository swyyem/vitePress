<template>
  <div :class="stepsKls">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { stepsEmits, stepsProps } from './steps'

defineOptions({
  name: 'SwySteps',
})

const props = defineProps(stepsProps)
const emit = defineEmits(stepsEmits)

const ns = useNamespace('steps')

const stepsKls = computed(() => [
  ns.b(),
  ns.m(props.direction),
  ns.m(props.space ? 'space' : 'flex'),
])

const steps = reactive({
  active: props.active,
  direction: props.direction,
  space: props.space,
  finishStatus: props.finishStatus,
  processStatus: props.processStatus,
  alignCenter: props.alignCenter,
})

provide('steps', steps)

watch(
  () => props.active,
  newVal => {
    emit('change', newVal)
  }
)

defineExpose({
  steps,
})
</script>
