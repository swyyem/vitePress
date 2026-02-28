/** File: color-picker-panel.vue - Vue Component */

<template>
  <div
    :class="[ns.b(), ns.is('disabled', disabled), ns.is('border', border)]"
    @focusout="handleFocusout"
  >
    <div :class="ns.e('wrapper')">
      <hue-slider ref="hueRef" class="hue-slider" :color="color" vertical :disabled="disabled" />
      <sv-panel ref="svRef" :color="color" :disabled="disabled" />
    </div>
    <alpha-slider v-if="showAlpha" ref="alphaRef" :color="color" :disabled="disabled" />
    <predefine
      v-if="predefine"
      ref="predefine"
      :enable-alpha="showAlpha"
      :color="color"
      :colors="predefine"
      :disabled="disabled"
    />
    <div :class="ns.e('footer')">
      <swy-input
        ref="inputRef"
        v-model="customInput"
        size="small"
        :disabled="disabled"
        @change="handleConfirm"
      />
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, inject, nextTick, onMounted, provide, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import SwyInput from '@swy-ui/components/input'
import { useNamespace } from '@swy-ui/hooks'
import AlphaSlider from './components/alpha-slider.vue'
import HueSlider from './components/hue-slider.vue'
import Predefine from './components/predefine.vue'
import SvPanel from './components/sv-panel.vue'
import {
  ROOT_COMMON_COLOR_INJECTION_KEY,
  colorPickerPanelContextKey,
  colorPickerPanelEmits,
  colorPickerPanelProps,
} from './color-picker-panel'
import { useCommonColor } from './composables/use-common-color'

defineOptions({
  name: 'SwyColorPickerPanel',
})

const props = defineProps(colorPickerPanelProps)
const emit = defineEmits(colorPickerPanelEmits)

const ns = useNamespace('color-picker-panel')
const hueRef = ref<InstanceType<typeof HueSlider>>()
const svRef = ref<InstanceType<typeof SvPanel>>()
const alphaRef = ref<InstanceType<typeof AlphaSlider>>()
const inputRef = ref<ComponentPublicInstance>()
const customInput = ref('')

const { color } = inject(ROOT_COMMON_COLOR_INJECTION_KEY, () => useCommonColor(props, emit), true)

function handleConfirm() {
  color.fromString(customInput.value)
  if (color.value !== customInput.value) {
    customInput.value = color.value
  }
}

function handleFocusout() {
  // 简化处理
}

function update() {
  hueRef.value?.update()
  svRef.value?.update()
  alphaRef.value?.update()
}

onMounted(() => {
  if (props.modelValue) {
    customInput.value = color.value
  }
  nextTick(update)
})

watch(
  () => props.modelValue,
  newVal => {
    if (newVal !== color.value) {
      if (newVal) {
        color.fromString(newVal)
      } else {
        color.clear()
      }
    }
  }
)

watch(
  () => color.value,
  val => {
    emit('update:modelValue', val)
    customInput.value = val
  }
)

provide(colorPickerPanelContextKey, {
  currentColor: computed(() => color.value),
})

defineExpose({
  color,
  inputRef,
  update,
})
</script>
