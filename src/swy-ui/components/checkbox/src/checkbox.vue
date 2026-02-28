/** File: checkbox.vue - Vue Component */

<template>
  <label
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('checked', isChecked),
      ns.is('indeterminate', indeterminate),
    ]"
  >
    <span
      :class="[
        ns.e('input'),
        ns.is('disabled', disabled),
        ns.is('checked', isChecked),
        ns.is('indeterminate', indeterminate),
      ]"
    >
      <span :class="ns.e('inner')" />
      <input
        ref="inputRef"
        v-model="checked"
        :class="ns.e('original')"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { checkboxProps, checkboxEmits } from './checkbox'

defineOptions({
  name: 'SwyCheckbox',
})

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const ns = useNamespace('checkbox')
const inputRef = ref<HTMLInputElement>()

const checked = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const isChecked = computed(() => {
  const value = props.modelValue
  if (Array.isArray(value)) {
    return value.includes(props.label)
  }
  return !!value
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  // 如果是数组绑定，emit 的 val 会由 v-model 自动处理成数组
  emit('change', target.checked)
}

defineExpose({
  inputRef,
  isChecked,
})
</script>
