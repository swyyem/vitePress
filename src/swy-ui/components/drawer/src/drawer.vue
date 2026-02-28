/** File: drawer.vue - Vue Component */

<template>
  <teleport to="body">
    <transition name="swy-drawer-fade">
      <div v-if="modelValue" class="swy-overlay is-drawer" @click="handleWrapperClick">
        <div :class="[ns.b(), direction]" :style="drawerStyle" @click.stop>
          <div :class="ns.e('header')">
            <slot name="header">
              <span :class="ns.e('title')">{{ title }}</span>
            </slot>
            <button v-if="showClose" :class="ns.e('close-btn')" type="button" @click="handleClose">
              ✕
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
// ========== Dependencies Import ==========
import { computed, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { drawerProps, drawerEmits } from './drawer'

defineOptions({
  name: 'SwyDrawer',
})

const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)

const ns = useNamespace('drawer')

const drawerStyle = computed(() => {
  const isHorizontal = props.direction === 'ltr' || props.direction === 'rtl'
  return {
    [isHorizontal ? 'width' : 'height']: props.size,
  }
})

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
