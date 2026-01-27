<template>
  <div :class="rootKls">
    <div ref="bar" :class="barKls" @click="handleClick" />
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
  name: 'SwyColorHueSlider',
})

interface HueSliderProps {
  color: Color
  vertical?: boolean
  disabled?: boolean
}

const props = defineProps<HueSliderProps>()

const minValue = 0
const maxValue = 360

const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, {
  key: 'hue',
  minValue,
  maxValue,
})

const { rootKls, barKls, thumbKls, thumbStyle, thumbTop, update } = useSliderDOM(props, {
  namespace: 'color-hue-slider',
  maxValue,
  currentValue,
  bar,
  thumb,
  handleDrag,
})

defineExpose({
  bar,
  thumb,
  thumbTop,
  update,
})
</script>
