/** File: rate.vue - Vue Component */

<template>
  <div :class="[ns.b(), ns.m(size), ns.is('disabled', disabled)]">
    <div
      v-for="item in max"
      :key="item"
      :class="ns.e('item')"
      @click="selectValue(item, $event)"
      @mousemove="!disabled && handleMouseMove(item, $event)"
      @mouseenter="!disabled && handleMouseEnter(item)"
      @mouseleave="handleMouseLeave"
    >
      <span
        :class="[
          ns.b('rate-icon'),
          ns.is('active', item <= activeValue),
          ns.is('hover', item <= hoverIndex && !disabled),
        ]"
        :style="getIconStyle(item)"
      >
        <!-- 半星支持 -->
        <template v-if="allowHalf && showHalfStar(item)">
          <span :class="ns.e('decimal')" :style="getDecimalStyle(item)">
            {{ icon }}
          </span>
          <span>{{ voidIcon }}</span>
        </template>
        <span v-else>
          {{ item <= activeValue ? icon : voidIcon }}
        </span>
      </span>
    </div>
    <!-- 文字显示 -->
    <span v-if="showText || showScore" :class="ns.e('text')" :style="textStyle">
      {{ displayText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref, computed, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { rateProps, rateEmits } from './rate'

defineOptions({
  name: 'SwyRate',
})

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const ns = useNamespace('rate')

const currentValue = ref(props.modelValue)
const hoverIndex = ref(-1)
const pointerAtLeftHalf = ref(false)

// 监听外部值变化
watch(
  () => props.modelValue,
  val => {
    currentValue.value = val
  }
)

const activeValue = computed(() => {
  if (hoverIndex.value > 0) {
    return pointerAtLeftHalf.value && props.allowHalf ? hoverIndex.value - 0.5 : hoverIndex.value
  }
  return currentValue.value
})

// 获取图标颜色
const getIconColor = (index: number): string => {
  const { colors } = props
  if (typeof colors === 'string') return colors

  if (Array.isArray(colors)) {
    const threshold = props.max / colors.length
    const colorIndex = Math.ceil(index / threshold) - 1
    return colors[colorIndex] || colors[colors.length - 1]
  }

  return '#F7BA2A'
}

// 获取图标样式
const getIconStyle = (index: number) => {
  const isActive = index <= activeValue.value

  if (isActive) {
    return { color: getIconColor(index) }
  }

  if (props.disabled) {
    return { color: props.disabledVoidColor }
  }

  return { color: props.voidColor }
}

// 获取半星样式
const getDecimalStyle = (index: number) => {
  const value = activeValue.value
  let width = '0%'

  if (value >= index) {
    width = '100%'
  } else if (value >= index - 1 && value < index) {
    width = `${(value - Math.floor(value)) * 100}%`
  }

  return {
    width,
    color: getIconColor(index),
  }
}

// 显示半星
const showHalfStar = (index: number): boolean => {
  const value = activeValue.value
  return value > index - 1 && value < index && props.allowHalf
}

// 文字样式
const textStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.textColor) {
    style.color = props.textColor
  }
  return style
})

// 显示文字
const displayText = computed(() => {
  if (props.showScore) {
    return props.scoreTemplate.replace('{value}', String(currentValue.value))
  }

  if (props.showText) {
    const index = Math.ceil(currentValue.value) - 1
    return props.texts[index] || ''
  }

  return ''
})

// 鼠标移动
const handleMouseMove = (index: number, event: MouseEvent) => {
  if (props.disabled || !props.allowHalf) return

  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const halfWidth = rect.width / 2

  pointerAtLeftHalf.value = offsetX < halfWidth
}

// 鼠标进入
const handleMouseEnter = (index: number) => {
  if (props.disabled) return
  hoverIndex.value = index
}

// 鼠标离开
const handleMouseLeave = () => {
  hoverIndex.value = -1
  pointerAtLeftHalf.value = false
}

// 选择值
const selectValue = (value: number, event: MouseEvent) => {
  if (props.disabled) return

  // 可清空功能
  if (props.clearable && currentValue.value === value) {
    currentValue.value = 0
    emit('update:modelValue', 0)
    emit('change', 0)
    return
  }

  // 半选支持 - 根据点击位置判断
  if (props.allowHalf) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const halfWidth = rect.width / 2

    // 点击左半边，选择 0.5
    if (offsetX < halfWidth) {
      value = value - 0.5
    }
  }

  currentValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

// 暴露方法
const setCurrentValue = (value: number) => {
  if (value < 0) value = 0
  if (value > props.max) value = props.max

  currentValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

const resetValue = () => {
  currentValue.value = 0
  emit('update:modelValue', 0)
  emit('change', 0)
}

defineExpose({
  setCurrentValue,
  resetValue,
})
</script>
