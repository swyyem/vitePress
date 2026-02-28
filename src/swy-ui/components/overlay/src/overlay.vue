/** File: overlay.vue - Vue Component */

<template>
  <transition :name="ns.b()">
    <div v-show="visible" :class="overlayKls" :style="overlayStyle" @click="handleClick">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { overlayEmits, overlayProps } from './overlay'

defineOptions({
  name: 'SwyOverlay',
})

const props = defineProps(overlayProps)
const emit = defineEmits(overlayEmits)

const ns = useNamespace('overlay')

const overlayKls = computed(() => [ns.b()])

const overlayStyle = computed(() => ({
  zIndex: props.zIndex,
}))

const handleClick = () => {
  if (props.mask) {
    emit('click')
  }
}
</script>
