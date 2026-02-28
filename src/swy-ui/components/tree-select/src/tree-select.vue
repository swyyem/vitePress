/** File: tree-select.vue - Vue Component */

<template>
  <div :class="treeSelectKls">
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
        <swy-tree
          ref="treeRef"
          :data="data"
          :props="props"
          :node-key="nodeKey"
          @node-click="handleNodeClick"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { treeSelectEmits, treeSelectProps } from './tree-select'

defineOptions({
  name: 'SwyTreeSelect',
})

const props = defineProps(treeSelectProps)
const emit = defineEmits(treeSelectEmits)

const ns = useNamespace('tree-select')
const inputRef = ref()
const treeRef = ref()
const visible = ref(false)
const displayValue = ref('')

const treeSelectKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

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

const handleNodeClick = (data: Record<string, unknown>, node: Record<string, unknown>) => {
  if (!props.multiple) {
    displayValue.value = data[props.props.label] as string
    visible.value = false
  }
  emit('update:modelValue', data[props.nodeKey])
  emit('change', data[props.nodeKey], data, node)
}

defineExpose({
  inputRef,
  treeRef,
  visible,
})
</script>
