/** File: radio-group.vue - Vue Component */

<template>
  <div
    :id="groupId"
    ref="radioGroupRef"
    :class="ns.b('group')"
    role="radiogroup"
    :aria-label="!isLabeledByFormItem ? ariaLabel || 'radio-group' : undefined"
    :aria-labelledby="isLabeledByFormItem ? formItem!.labelId : undefined"
  >
    <slot>
      <component
        :is="optionComponent"
        v-for="(item, index) in options"
        :key="index"
        v-bind="getOptionProps(item)"
      />
    </slot>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, nextTick, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { useFormItem, useFormItemInputId } from '@swy-ui/components/form'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@swy-ui/constants'
import { useId, useNamespace } from '@swy-ui/hooks'
import { debugWarn } from '@swy-ui/utils'
import { radioDefaultProps, radioGroupEmits, radioGroupProps } from './radio-group'
import { radioGroupKey } from './constants'
import { isEqual, omit } from 'lodash-unified'
import SwyRadio from './radio.vue'
import SwyRadioButton from './radio-button.vue'

import type { RadioGroupProps } from './radio-group'

defineOptions({
  name: 'SwyRadioGroup',
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const ns = useNamespace('radio')
const radioId = useId()
const radioGroupRef = ref<HTMLDivSwyement>()
const { formItem } = useFormItem()
const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
  formItemContext: formItem,
})

const changeEvent = (value: RadioGroupProps['modelValue']) => {
  emit(UPDATE_MODEL_EVENT, value)
  nextTick(() => emit(CHANGE_EVENT, value))
}

onMounted(() => {
  const radios = radioGroupRef.value!.querySelectorAll<HTMLInputSwyement>('[type=radio]')
  const firstLabel = radios[0]
  if (!Array.from(radios).some(radio => radio.checked) && firstLabel) {
    firstLabel.tabIndex = 0
  }
})

const name = computed(() => {
  return props.name || radioId.value
})

const aliasProps = computed(() => ({
  ...radioDefaultProps,
  ...props.props,
}))
const getOptionProps = (option: Record<string, any>) => {
  const { label, value, disabled } = aliasProps.value
  const base = {
    label: option[label],
    value: option[value],
    disabled: option[disabled],
  }
  return { ...omit(option, [label, value, disabled]), ...base }
}

const optionComponent = computed(() => (props.type === 'button' ? SwyRadioButton : SwyRadio))

provide(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent,
    name,
  })
)

watch(
  () => props.modelValue,
  (newVal, oldValue) => {
    if (props.validateEvent && !isEqual(newVal, oldValue)) {
      formItem?.validate('change').catch(err => debugWarn(err))
    }
  }
)
</script>
