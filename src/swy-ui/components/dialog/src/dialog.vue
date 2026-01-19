<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div v-if="modelValue" :class="ns.e('wrapper')" @click="handleWrapperClick">
        <div
          :class="[ns.b(), ns.is('fullscreen', fullscreen)]"
          :style="{ width: fullscreen ? '' : width }"
          @click.stop
        >
          <div v-if="title || $slots.header" :class="ns.e('header')">
            <slot name="header">
              <div :class="ns.e('title')">{{ title }}</div>
            </slot>
            <button v-if="showClose" :class="ns.e('headerbtn')" type="button" @click="handleClose">
              <span :class="ns.e('close')">✕</span>
            </button>
          </div>
          <div :class="ns.e('body')">
            <slot />
          </div>
          <div v-if="$slots.footer" :class="ns.e('footer')">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { dialogProps, dialogEmits } from './dialog'

defineOptions({
  name: 'SwyDialog',
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const ns = useNamespace('dialog')

watch(
  () => props.modelValue,
  val => {
    if (val) {
      emit('open')
    } else {
      emit('close')
    }
  }
)

const handleClose = () => {
  emit('update:modelValue', false)
}

const handleWrapperClick = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}
</script>
