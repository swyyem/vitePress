<template>
  <div
    :class="[ns.b(), ns.m(size), ns.is('vertical', vertical), ns.is('disabled', disabled)]"
    :style="sliderStyle"
    role="slider"
    :aria-label="label"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="Array.isArray(modelValue) ? modelValue[0] : modelValue"
    :aria-disabled="disabled"
  >
    <div
      ref="runwayRef"
      :class="[ns.e('runway'), { 'show-input': showInput }]"
      @click="onSliderClick"
    >
      <!-- 进度条 -->
      <div :class="ns.e('bar')" :style="barStyle" />

      <!-- 间断点 -->
      <template v-if="showStops && step > 0">
        <div
          v-for="(stop, index) in stops"
          :key="index"
          :class="ns.e('stop')"
          :style="getStopStyle(stop)"
        />
      </template>

      <!-- 标记 -->
      <template v-if="marks">
        <div
          v-for="(label, value) in marks"
          :key="value"
          :class="ns.e('marks')"
          :style="getMarkStyle(Number(value))"
        >
          <div :class="ns.e('marks-text')">{{ label }}</div>
        </div>
      </template>

      <!-- 第一个滑块（或单个滑块） -->
      <div
        ref="button1Ref"
        :class="[ns.e('button-wrapper'), { dragging: dragging1, hover: hovering1 }]"
        :style="button1Style"
        @mousedown="onButtonDown($event, 0)"
        @mouseenter="hovering1 = true"
        @mouseleave="hovering1 = false"
      >
        <SwyTooltip
          v-if="showTooltip"
          :visible="tooltipVisible1"
          :content="displayTooltip1"
          placement="top"
        >
          <div :class="[ns.e('button'), { hover: hovering1, dragging: dragging1 }]" />
        </SwyTooltip>
        <div v-else :class="[ns.e('button'), { hover: hovering1, dragging: dragging1 }]" />
      </div>

      <!-- 第二个滑块（范围选择时） -->
      <div
        v-if="range"
        ref="button2Ref"
        :class="[ns.e('button-wrapper'), { dragging: dragging2, hover: hovering2 }]"
        :style="button2Style"
        @mousedown="onButtonDown($event, 1)"
        @mouseenter="hovering2 = true"
        @mouseleave="hovering2 = false"
      >
        <SwyTooltip
          v-if="showTooltip"
          :visible="tooltipVisible2"
          :content="displayTooltip2"
          placement="top"
        >
          <div :class="[ns.e('button'), { hover: hovering2, dragging: dragging2 }]" />
        </SwyTooltip>
        <div v-else :class="[ns.e('button'), { hover: hovering2, dragging: dragging2 }]" />
      </div>
    </div>

    <!-- 输入框 -->
    <SwyInputNumber
      v-if="showInput && !range"
      v-model="inputValue"
      :class="ns.e('input')"
      :min="min"
      :max="max"
      :step="step"
      :size="size"
      :disabled="disabled"
      :controls="showInputControls"
      @change="onInputChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { sliderProps, sliderEmits } from './slider'
import SwyTooltip from '../../tooltip'
import SwyInputNumber from '../../input-number'

defineOptions({
  name: 'SwySlider',
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const ns = useNamespace('slider')

const runwayRef = ref<HTMLElement>()
const button1Ref = ref<HTMLElement>()
const button2Ref = ref<HTMLElement>()
const dragging1 = ref(false)
const dragging2 = ref(false)
const hovering1 = ref(false)
const hovering2 = ref(false)
const tooltipVisible1 = ref(false)
const tooltipVisible2 = ref(false)

// 当前值（内部状态）
const currentValue = ref<number | number[]>(
  Array.isArray(props.modelValue) ? [...props.modelValue] : props.modelValue
)

// 监听外部值变化
watch(
  () => props.modelValue,
  val => {
    currentValue.value = Array.isArray(val) ? [...val] : val
  }
)

// 输入框绑定值
const inputValue = computed({
  get: () => (Array.isArray(currentValue.value) ? currentValue.value[0] : currentValue.value),
  set: val => {
    if (!Array.isArray(currentValue.value)) {
      setCurrentValue(val)
    }
  },
})

// 滑块容器样式
const sliderStyle = computed(() => {
  if (props.vertical && props.height) {
    return { height: props.height }
  }
  return {}
})

// 获取值数组
const values = computed(() => {
  if (Array.isArray(currentValue.value)) {
    return [...currentValue.value].sort((a, b) => a - b)
  }
  return [currentValue.value]
})

// 进度条样式
const barStyle = computed(() => {
  const percentage1 = getPercentage(values.value[0])

  if (props.range && values.value.length === 2) {
    const percentage2 = getPercentage(values.value[1])
    if (props.vertical) {
      return {
        height: `${percentage2 - percentage1}%`,
        bottom: `${percentage1}%`,
      }
    }
    return {
      width: `${percentage2 - percentage1}%`,
      left: `${percentage1}%`,
    }
  }

  if (props.vertical) {
    return {
      height: `${percentage1}%`,
      bottom: '0%',
    }
  }
  return {
    width: `${percentage1}%`,
    left: '0%',
  }
})

// 第一个按钮样式
const button1Style = computed(() => {
  const percentage = getPercentage(values.value[0])
  if (props.vertical) {
    return { bottom: `${percentage}%` }
  }
  return { left: `${percentage}%` }
})

// 第二个按钮样式（范围选择）
const button2Style = computed(() => {
  if (!props.range || values.value.length < 2) return {}
  const percentage = getPercentage(values.value[1])
  if (props.vertical) {
    return { bottom: `${percentage}%` }
  }
  return { left: `${percentage}%` }
})

// 间断点
const stops = computed(() => {
  if (!props.showStops || props.step === 0) return []
  const stopCount = (props.max - props.min) / props.step
  const result: number[] = []
  for (let i = 1; i < stopCount; i++) {
    result.push(props.min + i * props.step)
  }
  return result
})

// Tooltip 显示内容
const displayTooltip1 = computed(() => {
  const value = values.value[0]
  return props.formatTooltip ? props.formatTooltip(value) : String(value)
})

const displayTooltip2 = computed(() => {
  if (!props.range || values.value.length < 2) return ''
  const value = values.value[1]
  return props.formatTooltip ? props.formatTooltip(value) : String(value)
})

// 获取百分比
const getPercentage = (value: number): number => {
  return ((value - props.min) / (props.max - props.min)) * 100
}

// 获取间断点样式
const getStopStyle = (value: number) => {
  const percentage = getPercentage(value)
  if (props.vertical) {
    return { bottom: `${percentage}%` }
  }
  return { left: `${percentage}%` }
}

// 获取标记样式
const getMarkStyle = (value: number) => {
  const percentage = getPercentage(value)
  if (props.vertical) {
    return { bottom: `${percentage}%` }
  }
  return { left: `${percentage}%` }
}

// 设置值
const setCurrentValue = (newValue: number | number[], index?: number) => {
  if (props.disabled) return

  let value: number | number[]

  if (Array.isArray(newValue)) {
    value = newValue
      .map(v => {
        const val = Math.round(v / props.step) * props.step
        return Math.max(props.min, Math.min(props.max, val))
      })
      .sort((a, b) => a - b)
  } else {
    let val = Math.round(newValue / props.step) * props.step
    val = Math.max(props.min, Math.min(props.max, val))

    if (props.range && Array.isArray(currentValue.value)) {
      value = [...currentValue.value]
      if (index !== undefined) {
        value[index] = val
        value.sort((a, b) => a - b)
      }
    } else {
      value = val
    }
  }

  // 值未改变则不触发
  if (JSON.stringify(value) === JSON.stringify(currentValue.value)) return

  currentValue.value = value
  emit('update:modelValue', value)
  emit('input', value)
  nextTick(() => {
    emit('change', value)
  })
}

// 点击滑轨
const onSliderClick = (event: MouseEvent) => {
  if (props.disabled || dragging1.value || dragging2.value) return

  const runway = runwayRef.value
  if (!runway) return

  const rect = runway.getBoundingClientRect()
  const offset = props.vertical ? rect.bottom - event.clientY : event.clientX - rect.left
  const total = props.vertical ? rect.height : rect.width
  const percentage = Math.max(0, Math.min(1, offset / total))
  const value = props.min + percentage * (props.max - props.min)

  if (props.range && Array.isArray(currentValue.value)) {
    // 范围选择：找最近的滑块
    const mid = (currentValue.value[0] + currentValue.value[1]) / 2
    const index = value < mid ? 0 : 1
    setCurrentValue(value, index)
  } else {
    setCurrentValue(value)
  }
}

// 按钮按下
const onButtonDown = (event: MouseEvent, index: number) => {
  if (props.disabled) return

  event.preventDefault()
  event.stopPropagation()

  if (index === 0) {
    dragging1.value = true
    tooltipVisible1.value = true
  } else {
    dragging2.value = true
    tooltipVisible2.value = true
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!runwayRef.value) return

    const rect = runwayRef.value.getBoundingClientRect()
    const offset = props.vertical ? rect.bottom - e.clientY : e.clientX - rect.left
    const total = props.vertical ? rect.height : rect.width
    const percentage = Math.max(0, Math.min(1, offset / total))
    const value = props.min + percentage * (props.max - props.min)

    setCurrentValue(value, props.range ? index : undefined)
  }

  const handleMouseUp = () => {
    dragging1.value = false
    dragging2.value = false

    setTimeout(() => {
      tooltipVisible1.value = false
      tooltipVisible2.value = false
    }, 100)

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  document.body.style.cursor = props.vertical ? 'ns-resize' : 'ew-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 输入框改变
const onInputChange = (val: number) => {
  setCurrentValue(val)
}

// 暴露方法
const focus = () => {
  runwayRef.value?.focus()
}

const blur = () => {
  runwayRef.value?.blur()
}

defineExpose({
  focus,
  blur,
})
</script>
