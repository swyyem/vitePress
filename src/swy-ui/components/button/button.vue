<template>
  <button
    :class="[
      'swy-button',
      type ? `swy-button--${type}` : '',
      size ? `swy-button--${size}` : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="swy-button__loading"></span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

defineOptions({
  name: 'SwyButton', // 或 'MdButton', 'UIButton' 等多单词名称
})

interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'large' | 'medium' | 'small'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: undefined,
  size: 'medium',
  disabled: false,
  loading: false,
})

console.log('props', props)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.swy-button {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s;
}

.swy-button:hover {
  background-color: #f5f7fa;
  border-color: #c0c4cc;
  color: #606266;
}

.swy-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.swy-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.swy-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.swy-button.is-loading {
  cursor: default;
}
</style>
