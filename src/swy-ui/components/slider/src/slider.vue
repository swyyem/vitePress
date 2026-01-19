<template>
  <div :class="[ns.b(), ns.m(size), ns.is('disabled', disabled)]">
    <div ref="runwayRef" :class="ns.e('runway')" @click="onSliderClick">
      <div :class="ns.e('bar')" :style="{ width: barWidth }" />
      <div :class="ns.e('button-wrapper')" :style="{ left: barWidth }" @mousedown="onButtonDown">
        <div :class="ns.e('button')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { sliderProps, sliderEmits } from './slider'

defineOptions({
  name: 'SwySlider',
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const ns = useNamespace('slider')

const currentValue = ref(props.modelValue)
const runwayRef = ref<HTMLElement>()
const dragging = ref(false)

const barWidth = computed(() => {
  const percentage = ((currentValue.value - props.min) / (props.max - props.min)) * 100
  return `${percentage}%`
})

const setCurrentValue = (newValue: number) => {
  if (props.disabled) return

  let value = Math.round(newValue / props.step) * props.step
  value = Math.max(props.min, Math.min(props.max, value))

  if (value === currentValue.value) return

  currentValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

const onSliderClick = (event: MouseEvent) => {
  if (props.disabled || dragging.value) return

  const runway = runwayRef.value
  if (!runway) return

  const rect = runway.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const percentage = offsetX / rect.width
  const value = props.min + percentage * (props.max - props.min)

  setCurrentValue(value)
}

const onButtonDown = (event: MouseEvent) => {
  if (props.disabled) return

  event.preventDefault()
  dragging.value = true

  const handleMouseMove = (e: MouseEvent) => {
    if (!runwayRef.value) return

    const rect = runwayRef.value.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width))
    const value = props.min + percentage * (props.max - props.min)

    setCurrentValue(value)
  }

  const handleMouseUp = () => {
    dragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}
</script>
