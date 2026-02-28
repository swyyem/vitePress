/** File: switch.vue - Vue Component */

<template>
  <div
    :class="[ns.b(), ns.m(size), ns.is('disabled', disabled), ns.is('checked', checked)]"
    @click="handleClick"
  >
    <input
      ref="inputRef"
      :class="ns.e('input')"
      type="checkbox"
      :disabled="disabled"
      @change="handleChange"
    />
    <span :class="ns.e('core')">
      <span :class="ns.e('action')" />
    </span>
    <span v-if="activeText || inactiveText" :class="ns.e('label')">
      <span v-if="checked && activeText">{{ activeText }}</span>
      <span v-if="!checked && inactiveText">{{ inactiveText }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { switchProps, switchEmits } from './switch'

defineOptions({
  name: 'SwySwitch',
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const ns = useNamespace('switch')
const inputRef = ref<HTMLInputElement>()

const checked = computed(() => props.modelValue === props.activeValue)

const handleClick = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleChange = (e: Event) => {
  e.stopPropagation()
}

defineExpose({
  inputRef,
  checked,
})
</script>
