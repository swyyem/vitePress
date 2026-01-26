<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('without-controls', !controls),
      ns.is('controls-right', controlsPosition === 'right'),
    ]"
  >
    <span
      v-if="controls && controlsPosition !== 'right'"
      :class="[ns.e('decrease'), ns.is('disabled', minDisabled)]"
      @click="decrease"
    >
      -
    </span>
    <span
      v-if="controls && controlsPosition !== 'right'"
      :class="[ns.e('increase'), ns.is('disabled', maxDisabled)]"
      @click="increase"
    >
      +
    </span>
    <SwyInput
      :model-value="displayValue"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      @update:model-value="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <template v-if="controls && controlsPosition === 'right'">
      <span :class="[ns.e('increase'), ns.is('disabled', maxDisabled)]" @click="increase">+</span>
      <span :class="[ns.e('decrease'), ns.is('disabled', minDisabled)]" @click="decrease">-</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { inputNumberProps, inputNumberEmits } from './input-number'
import SwyInput from '../../input'

defineOptions({
  name: 'SwyInputNumber',
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const ns = useNamespace('input-number')

const currentValue = ref(props.modelValue)

const minDisabled = computed(() => currentValue.value <= props.min)
const maxDisabled = computed(() => currentValue.value >= props.max)

const displayValue = computed(() => {
  if (props.precision !== undefined) {
    return currentValue.value.toFixed(props.precision)
  }
  return String(currentValue.value)
})

watch(
  () => props.modelValue,
  val => {
    currentValue.value = val
  }
)

const setCurrentValue = (value: number) => {
  const oldVal = currentValue.value
  let newVal = value

  if (props.precision !== undefined) {
    newVal = parseFloat(newVal.toFixed(props.precision))
  }

  if (newVal >= props.max) newVal = props.max
  if (newVal <= props.min) newVal = props.min

  if (oldVal === newVal) return

  currentValue.value = newVal
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

const increase = () => {
  if (props.disabled || maxDisabled.value) return
  const value = currentValue.value + props.step
  setCurrentValue(value)
}

const decrease = () => {
  if (props.disabled || minDisabled.value) return
  const value = currentValue.value - props.step
  setCurrentValue(value)
}

const handleInput = (value: string) => {
  const newVal = Number(value)
  if (!isNaN(newVal)) {
    setCurrentValue(newVal)
  }
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>
