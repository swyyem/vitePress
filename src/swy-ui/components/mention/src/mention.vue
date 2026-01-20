<template>
  <div :class="mentionKls">
    <el-input
      ref="inputRef"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <transition name="swy-zoom-in-top">
      <div v-show="visible && filteredOptions.length > 0" :class="ns.e('dropdown')">
        <div
          v-for="(item, index) in filteredOptions"
          :key="index"
          :class="[ns.e('option'), ns.is('selected', index === selectedIndex)]"
          @click="handleSelect(item)"
        >
          <slot name="option" :option="item">
            {{ item[props.options.label] }}
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { mentionEmits, mentionProps } from './mention'

defineOptions({
  name: 'SwyMention',
})

const props = defineProps(mentionProps)
const emit = defineEmits(mentionEmits)

const ns = useNamespace('mention')
const inputRef = ref()
const inputValue = ref('')
const visible = ref(false)
const selectedIndex = ref(0)
const filterText = ref('')

const mentionKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

const filteredOptions = computed(() => {
  if (!filterText.value) return props.options
  return props.options.filter((item: Record<string, string>) =>
    item[props.options.label].includes(filterText.value)
  )
})

const handleInput = (value: string) => {
  const lastAtIndex = value.lastIndexOf(props.prefix)
  if (lastAtIndex !== -1) {
    filterText.value = value.substring(lastAtIndex + 1)
    visible.value = true
  } else {
    visible.value = false
  }
  emit('update:modelValue', value)
  emit('search', filterText.value)
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

const handleSelect = (item: Record<string, string>) => {
  const lastAtIndex = inputValue.value.lastIndexOf(props.prefix)
  if (lastAtIndex !== -1) {
    inputValue.value =
      inputValue.value.substring(0, lastAtIndex) + props.prefix + item[props.options.value] + ' '
  }
  visible.value = false
  emit('update:modelValue', inputValue.value)
  emit('select', item)
}

defineExpose({
  inputRef,
  visible,
})
</script>
