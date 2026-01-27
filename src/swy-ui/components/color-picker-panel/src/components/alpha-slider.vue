<template>
  <div :class="rootKls">
    <div ref="bar" :class="barKls" :style="barStyle" @click="handleClick" />
    <div
      ref="thumb"
      :class="thumbKls"
      :style="thumbStyle"
      role="slider"
      :tabindex="disabled ? undefined : 0"
      @keydown="handleKeydown"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions, defineExpose } from 'vue'
import { useSlider, useSliderDOM } from '../composables/use-slider'
import type { Color } from '../utils/color'

defineOptions({
  name: 'SwyColorAlphaSlider',
})

interface AlphaSliderProps {
  color: Color
  vertical?: boolean
  disabled?: boolean
}

const props = defineProps<AlphaSliderProps>()

const minValue = 0
const maxValue = 100

const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, {
  key: 'alpha',
  minValue,
  maxValue,
})

const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } = useSliderDOM(props, {
  namespace: 'color-alpha-slider',
  maxValue,
  currentValue,
  bar,
  thumb,
  handleDrag,
  getBackground,
})

function getBackground() {
  if (props.color && props.color.value) {
    const { r, g, b } = props.color.toRgb()
    return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`
  }
  return ''
}

defineExpose({
  update,
  bar,
  thumb,
})
</script>
