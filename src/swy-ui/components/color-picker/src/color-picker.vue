<template>
  <div :class="colorPickerKls">
    <div :class="ns.e('trigger')" @click="handleTriggerClick">
      <div :class="ns.e('color')" :style="{ backgroundColor: modelValue }">
        <div v-if="!modelValue" :class="ns.e('empty')">
          <el-icon><component :is="'Close'" /></el-icon>
        </div>
      </div>
      <el-icon v-if="showPanelColor" :class="ns.e('icon')">
        <component :is="'ArrowDown'" />
      </el-icon>
    </div>
    <transition name="swy-zoom-in-top">
      <div v-show="visible" :class="ns.e('panel')">
        <div :class="ns.e('panel-content')">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { colorPickerEmits, colorPickerProps } from './color-picker'

defineOptions({
  name: 'SwyColorPicker',
})

const props = defineProps(colorPickerProps)
defineEmits(colorPickerEmits)

const ns = useNamespace('color-picker')
const visible = ref(false)

const colorPickerKls = computed(() => [ns.b(), ns.m(props.size), ns.is('disabled', props.disabled)])

const handleTriggerClick = () => {
  if (!props.disabled) {
    visible.value = !visible.value
  }
}

defineExpose({
  visible,
})
</script>
