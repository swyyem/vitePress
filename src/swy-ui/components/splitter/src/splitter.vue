<template>
  <div :class="splitterKls">
    <div :class="ns.e('panel')" :style="pane1Style">
      <slot name="pane-1" />
    </div>
    <div :class="ns.e('bar')" @mousedown="handleMouseDown">
      <div :class="ns.e('bar-trigger')">
        <slot name="trigger">
          <el-icon><component :is="'More'" /></el-icon>
        </slot>
      </div>
    </div>
    <div :class="ns.e('panel')" :style="pane2Style">
      <slot name="pane-2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { splitterEmits, splitterProps } from './splitter'

defineOptions({
  name: 'SwySplitter',
})

const props = defineProps(splitterProps)
const emit = defineEmits(splitterEmits)

const ns = useNamespace('splitter')
const pane1Size = ref(props.modelValue)

const splitterKls = computed(() => [ns.b(), ns.m(props.direction)])

const pane1Style = computed(() => {
  const size = typeof pane1Size.value === 'number' ? `${pane1Size.value}px` : pane1Size.value
  return props.direction === 'horizontal' ? { width: size } : { height: size }
})

const pane2Style = computed(() => {
  return props.direction === 'horizontal' ? { flex: 1 } : { flex: 1 }
})

const handleMouseDown = (_e: MouseEvent) => {
  // Handle drag to resize
  emit('update:modelValue', pane1Size.value)
}

defineExpose({
  pane1Size,
})
</script>
