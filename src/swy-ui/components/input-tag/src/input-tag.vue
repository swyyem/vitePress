<template>
  <div :class="inputTagKls" @click="handleWrapperClick">
    <span v-for="(tag, index) in tags" :key="index" :class="ns.e('tag')">
      <span :class="ns.e('tag-text')">{{ tag }}</span>
      <el-icon :class="ns.e('tag-close')" @click.stop="handleRemoveTag(index)">
        <component :is="'Close'" />
      </el-icon>
    </span>
    <input
      ref="inputRef"
      v-model="inputValue"
      :class="ns.e('input')"
      :placeholder="tags.length === 0 ? placeholder : ''"
      :disabled="disabled"
      @keydown.enter="handleInputConfirm"
      @keydown.delete="handleDelete"
      @blur="handleInputConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { inputTagEmits, inputTagProps } from './input-tag'

defineOptions({
  name: 'SwyInputTag',
})

const props = defineProps(inputTagProps)
const emit = defineEmits(inputTagEmits)

const ns = useNamespace('input-tag')
const inputRef = ref<HTMLInputElement>()
const inputValue = ref('')
const tags = ref<string[]>(props.modelValue || [])

const inputTagKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

const handleWrapperClick = () => {
  inputRef.value?.focus()
}

const handleInputConfirm = () => {
  const value = inputValue.value.trim()
  if (value && !tags.value.includes(value)) {
    tags.value.push(value)
    inputValue.value = ''
    emit('update:modelValue', tags.value)
    emit('change', tags.value)
  }
}

const handleRemoveTag = (index: number) => {
  const removed = tags.value.splice(index, 1)[0]
  emit('update:modelValue', tags.value)
  emit('remove', removed, tags.value)
}

const handleDelete = () => {
  if (inputValue.value === '' && tags.value.length > 0) {
    handleRemoveTag(tags.value.length - 1)
  }
}

defineExpose({
  inputRef,
  tags,
})
</script>
