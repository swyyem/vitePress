/** File: autocomplete.vue - Vue Component */

<template>
  <div :class="autocompleteKls">
    <el-input
      ref="inputRef"
      v-model="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :clearable="clearable"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    />
    <transition name="swy-zoom-in-top">
      <div v-show="visible && suggestions.length > 0" :class="ns.e('suggestions')">
        <div
          v-for="(item, index) in suggestions"
          :key="index"
          :class="[ns.e('suggestion'), ns.is('active', index === highlightedIndex)]"
          @click="handleSelect(item)"
        >
          <slot :item="item">
            {{ item[valueKey] }}
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { autocompleteEmits, autocompleteProps } from './autocomplete'

defineOptions({
  name: 'SwyAutocomplete',
})

const props = defineProps(autocompleteProps)
const emit = defineEmits(autocompleteEmits)

const ns = useNamespace('autocomplete')
const inputRef = ref()
const inputValue = ref(props.modelValue)
const visible = ref(false)
const suggestions = ref<Record<string, unknown>[]>([])
const highlightedIndex = ref(-1)

const autocompleteKls = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
])

const handleInput = (value: string) => {
  emit('update:modelValue', value)
  emit('input', value)

  if (props.fetchSuggestions) {
    props.fetchSuggestions(value, (data: Record<string, unknown>[]) => {
      suggestions.value = data
      visible.value = data.length > 0
    })
  }
}

const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  setTimeout(() => {
    visible.value = false
  }, 200)
  emit('blur')
}

const handleClear = () => {
  inputValue.value = ''
  suggestions.value = []
  visible.value = false
  emit('update:modelValue', '')
  emit('clear')
}

const handleSelect = (item: Record<string, unknown>) => {
  inputValue.value = item[props.valueKey] as string
  visible.value = false
  emit('update:modelValue', item[props.valueKey] as string)
  emit('select', item)
}

watch(
  () => props.modelValue,
  val => {
    inputValue.value = val
  }
)

defineExpose({
  inputRef,
  visible,
  suggestions,
})
</script>
