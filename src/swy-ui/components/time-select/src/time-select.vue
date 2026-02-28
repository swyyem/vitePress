/** File: time-select.vue - Vue Component */

<template>
  <div :class="timeSelectKls">
    <el-input
      ref="inputRef"
      v-model="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      :clearable="clearable"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    />
    <transition name="swy-zoom-in-top">
      <div v-show="visible" :class="ns.e('panel')">
        <swy-scrollbar :class="ns.e('content')">
          <div
            v-for="item in timeList"
            :key="item.value"
            :class="[
              ns.e('item'),
              ns.is('selected', item.value === modelValue),
              ns.is('disabled', item.disabled),
            ]"
            @click="handleSelect(item)"
          >
            {{ item.value }}
          </div>
        </swy-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { timeSelectEmits, timeSelectProps } from './time-select'

defineOptions({
  name: 'SwyTimeSelect',
})

const props = defineProps(timeSelectProps)
const emit = defineEmits(timeSelectEmits)

const ns = useNamespace('time-select')
const inputRef = ref()
const visible = ref(false)
const displayValue = ref(props.modelValue)

const timeSelectKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

const timeList = computed(() => {
  const list: Array<{ value: string; disabled: boolean }> = []
  // Generate time list based on start, end, step
  return list
})

const handleFocus = () => {
  if (!props.disabled && !props.readonly) {
    visible.value = true
  }
  emit('focus')
}

const handleBlur = () => {
  setTimeout(() => {
    visible.value = false
  }, 200)
  emit('blur')
}

const handleClear = () => {
  displayValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

const handleSelect = (item: { value: string; disabled: boolean }) => {
  if (item.disabled) return
  displayValue.value = item.value
  visible.value = false
  emit('update:modelValue', item.value)
  emit('change', item.value)
}

defineExpose({
  inputRef,
  visible,
})
</script>
