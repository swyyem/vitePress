<template>
  <div :class="uploadKls">
    <div :class="ns.e('trigger')" @click="handleClick">
      <slot v-if="$slots.trigger" name="trigger" />
      <slot v-else />
    </div>
    <input
      ref="inputRef"
      type="file"
      :class="ns.e('input')"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      @change="handleChange"
    />
    <div v-if="$slots.tip" :class="ns.e('tip')">
      <slot name="tip" />
    </div>
    <div v-if="showFileList" :class="ns.e('list')">
      <div
        v-for="(file, index) in fileList"
        :key="index"
        :class="[ns.e('list-item'), ns.is(file.status)]"
      >
        <div :class="ns.e('list-item-name')">
          {{ file.name }}
        </div>
        <div :class="ns.e('list-item-actions')">
          <button
            v-if="!disabled"
            type="button"
            :class="ns.e('list-item-delete')"
            @click="handleRemove(index)"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { uploadEmits, uploadProps } from './upload'

defineOptions({
  name: 'SwyUpload',
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)

const ns = useNamespace('upload')
const inputRef = ref<HTMLInputElement>()
const fileList = ref<Record<string, unknown>[]>([])

const uploadKls = computed(() => [
  ns.b(),
  ns.m(props.listType),
  ns.is('disabled', props.disabled),
  ns.is('drag', props.drag),
])

const handleClick = () => {
  if (!props.disabled) {
    inputRef.value?.click()
  }
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files) return

  const fileArray = Array.from(files)
  fileArray.forEach(file => {
    const fileItem = {
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'ready',
      raw: file,
    }
    fileList.value.push(fileItem)
    emit('change', fileItem, fileList.value)
  })

  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

const handleRemove = (index: number) => {
  const file = fileList.value[index]
  fileList.value.splice(index, 1)
  emit('remove', file, fileList.value)
}

defineExpose({
  inputRef,
  fileList,
})
</script>
