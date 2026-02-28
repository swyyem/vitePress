/** File: time-picker.vue - Vue Component */

<template>
  <div :class="timePickerKls" :style="timePickerStyle">
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
        <div :class="ns.e('content')">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { timePickerEmits, timePickerProps } from './time-picker'

defineOptions({
  name: 'SwyTimePicker',
})

const props = defineProps(timePickerProps)
const emit = defineEmits(timePickerEmits)

const ns = useNamespace('time-picker')
const inputRef = ref()
const visible = ref(false)
const displayValue = ref('')

const timePickerKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

const timePickerStyle = computed(() => ({}))

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

defineExpose({
  inputRef,
  visible,
})
</script>
