<template>
  <div :class="cascaderKls" :style="cascaderStyle">
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
        <div :class="ns.e('menus')">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { cascaderEmits, cascaderProps } from './cascader'

defineOptions({
  name: 'SwyCascader',
})

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)

const ns = useNamespace('cascader')
const inputRef = ref()
const visible = ref(false)
const displayValue = ref('')

const cascaderKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

const cascaderStyle = computed(() => ({}))

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
  emit('update:modelValue', [])
  emit('change', [])
  emit('clear')
}

defineExpose({
  inputRef,
  visible,
})
</script>
