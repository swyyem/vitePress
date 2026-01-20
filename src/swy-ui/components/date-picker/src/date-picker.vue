<template>
  <div :class="datePickerKls" :style="datePickerStyle">
    <el-input
      ref="inputRef"
      v-model="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      :clearable="clearable"
      :prefix-icon="prefixIcon"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    />
    <transition name="swy-zoom-in-top">
      <div v-show="visible" :class="ns.e('panel')">
        <div :class="ns.e('header')">
          <button type="button" :class="ns.e('prev-btn')" @click="prevYear">&lt;&lt;</button>
          <button type="button" :class="ns.e('prev-btn')" @click="prevMonth">&lt;</button>
          <span>{{ currentYear }}年 {{ currentMonth }}月</span>
          <button type="button" :class="ns.e('next-btn')" @click="nextMonth">&gt;</button>
          <button type="button" :class="ns.e('next-btn')" @click="nextYear">&gt;&gt;</button>
        </div>
        <div :class="ns.e('content')">
          <!-- Date picker content -->
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { datePickerEmits, datePickerProps } from './date-picker'

defineOptions({
  name: 'SwyDatePicker',
})

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const ns = useNamespace('date-picker')
const inputRef = ref()
const visible = ref(false)
const displayValue = ref('')
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)

const datePickerKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

const datePickerStyle = computed(() => ({}))

const handleFocus = () => {
  if (!props.disabled && !props.readonly) {
    visible.value = true
  }
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

const handleClear = () => {
  displayValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

const prevYear = () => {
  currentYear.value--
}

const nextYear = () => {
  currentYear.value++
}

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

defineExpose({
  inputRef,
  visible,
})
</script>
