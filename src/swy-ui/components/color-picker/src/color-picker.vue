/** File: color-picker.vue - Vue Component */

<template>
  <swy-tooltip
    ref="popper"
    :visible="showPicker"
    placement="bottom"
    :effect="'light'"
    :disabled="colorDisabled"
    :teleported="teleported"
    :persistent="persistent"
    @hide="setShowPicker(false)"
  >
    <template #content>
      <swy-color-picker-panel
        ref="pickerPanelRef"
        v-bind="panelProps"
        v-click-outside:[triggerRef]="handleClickOutside"
        :border="false"
        @keydown.esc="handleEsc"
      >
        <template #footer>
          <div :class="ns.e('footer')">
            <swy-button :class="ns.be('footer', 'link-btn')" link size="small" @click="clear">
              清空
            </swy-button>
            <swy-button plain size="small" :class="ns.be('footer', 'btn')" @click="confirmValue">
              确定
            </swy-button>
          </div>
        </template>
      </swy-color-picker-panel>
    </template>

    <template #default>
      <div
        :id="id"
        ref="triggerRef"
        :class="btnKls"
        role="button"
        :tabindex="colorDisabled ? undefined : tabindex"
        @keydown="handleKeyDown"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <div :class="ns.be('picker', 'trigger')" @click="handleTrigger">
          <span :class="[ns.be('picker', 'color'), ns.is('alpha', showAlpha)]">
            <span
              :class="ns.be('picker', 'color-inner')"
              :style="{
                backgroundColor: displayedColor,
              }"
            >
              <el-icon
                v-show="modelValue || showPanelColor"
                :class="[ns.be('picker', 'icon'), ns.is('icon-arrow-down')]"
              >
                <component :is="'ArrowDown'" />
              </el-icon>
              <el-icon
                v-show="!modelValue && !showPanelColor"
                :class="[ns.be('picker', 'empty'), ns.is('icon-close')]"
              >
                <component :is="'Close'" />
              </el-icon>
            </span>
          </span>
        </div>
      </div>
    </template>
  </swy-tooltip>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, nextTick, provide, ref, watch } from 'vue'
import { debounce, pick } from 'lodash-unified'
import ElIcon from '@swy-ui/components/icon'
import { reactiveComputed } from '@vueuse/core'
import { SwyTooltip } from '@swy-ui/components/tooltip'
import SwyButton from '@swy-ui/components/button'
import { useFormDisabled, useFormItem, useFormSize } from '@swy-ui/components/form'
import { useFocusController, useNamespace, useEmptyValues } from '@swy-ui/hooks'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@swy-ui/constants'
import { ClickOutside as vClickOutside } from '@swy-ui/directives'
import { colorPickerEmits, colorPickerProps } from './color-picker'
import {
  SwyColorPickerPanel,
  ROOT_COMMON_COLOR_INJECTION_KEY,
  colorPickerPanelProps,
} from '@swy-ui/components/color-picker-panel'
import Color from '@swy-ui/components/color-picker-panel/src/utils/color'
import { useCommonColor } from '@swy-ui/components/color-picker-panel/src/composables/use-common-color'

defineOptions({
  name: 'SwyColorPicker',
})

const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const ns = useNamespace('color')
const { formItem } = useFormItem()
const colorSize = useFormSize()
const colorDisabled = useFormDisabled()

// 这里的 useEmptyValues 需要确保在 swy-ui/hooks 中可用，如果不完全一致则简化
const { valueOnClear, isEmptyValue } = useEmptyValues(props, null)
const commonColor = useCommonColor(props, emit)

const triggerRef = ref()
const pickerPanelRef = ref<any>()
const showPicker = ref(false)
const showPanelColor = ref(false)

let shouldActiveChange = true

const { isFocused, handleFocus, handleBlur } = useFocusController(triggerRef, {
  disabled: colorDisabled,
  beforeBlur(event) {
    return (
      pickerPanelRef.value?.$el?.contains(event.relatedTarget as Node) ||
      triggerRef.value?.contains(event.relatedTarget as Node)
    )
  },
  afterBlur() {
    setShowPicker(false)
    resetColor()
    if (props.validateEvent) {
      formItem?.validate?.('blur').catch(() => {})
    }
  },
})

function handleClickOutside() {
  if (!showPicker.value) return
  hide()
}

const color = reactiveComputed(() => pickerPanelRef.value?.color ?? commonColor.color) as Color

const panelProps = computed(() => pick(props, Object.keys(colorPickerPanelProps)))

const displayedColor = computed(() => {
  if (!props.modelValue && !showPanelColor.value) {
    return 'transparent'
  }
  return displayedRgb(color, props.showAlpha)
})

const currentColor = computed(() => {
  return !props.modelValue && !showPanelColor.value ? '' : color.value
})

const btnKls = computed(() => {
  return [
    ns.b('picker'),
    ns.is('disabled', colorDisabled.value),
    ns.bm('picker', colorSize.value),
    ns.is('focused', isFocused.value),
  ]
})

function displayedRgb(color: Color, showAlpha: boolean) {
  const { r, g, b, a } = color.toRgb()
  return showAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
}

function setShowPicker(value: boolean) {
  showPicker.value = value
}

const debounceSetShowPicker = debounce(setShowPicker, 100, { leading: true })

function show() {
  if (colorDisabled.value) return
  setShowPicker(true)
}

function hide() {
  debounceSetShowPicker(false)
  resetColor()
}

function resetColor() {
  nextTick(() => {
    if (props.modelValue) {
      color.fromString(props.modelValue)
    } else {
      color.value = ''
      nextTick(() => {
        showPanelColor.value = false
      })
    }
  })
}

function handleTrigger() {
  if (colorDisabled.value) return
  if (showPicker.value) {
    resetColor()
  }
  debounceSetShowPicker(!showPicker.value)
}

function confirmValue() {
  const value = isEmptyValue(color.value) ? valueOnClear.value : color.value
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)
  if (props.validateEvent) {
    formItem?.validate('change').catch(() => {})
  }
  debounceSetShowPicker(false)
  nextTick(() => {
    const newColor = new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || '',
      value: props.modelValue,
    })
    if (!color.compare(newColor)) {
      resetColor()
    }
  })
}

function clear() {
  debounceSetShowPicker(false)
  emit(UPDATE_MODEL_EVENT, valueOnClear.value)
  emit(CHANGE_EVENT, valueOnClear.value)
  if (props.modelValue !== valueOnClear.value && props.validateEvent) {
    formItem?.validate('change').catch(() => {})
  }
  resetColor()
}

function handleEsc() {
  setShowPicker(false)
  resetColor()
}

function handleKeyDown(event: KeyboardEvent) {
  const code = event.code
  if (code === 'Enter' || code === 'Space') {
    event.preventDefault()
    show()
  } else if (code === 'Escape') {
    handleEsc(event)
  }
}

watch(
  () => currentColor.value,
  val => {
    if (shouldActiveChange) {
      emit('activeChange', val)
    }
    shouldActiveChange = true
  }
)

watch(
  () => color.value,
  () => {
    if (!props.modelValue && !showPanelColor.value) {
      showPanelColor.value = true
    }
  }
)

watch(
  () => props.modelValue,
  newVal => {
    if (!newVal) {
      showPanelColor.value = false
    } else if (newVal && newVal !== color.value) {
      shouldActiveChange = false
      color.fromString(newVal)
    }
  }
)

watch(
  () => showPicker.value,
  () => {
    if (pickerPanelRef.value) {
      nextTick(pickerPanelRef.value.update)
    }
  }
)

provide(ROOT_COMMON_COLOR_INJECTION_KEY, commonColor)

defineExpose({
  color,
  show,
  hide,
})
</script>
