<template>
  <div
    :class="ns.b()"
    @mouseenter="trigger === 'hover' && handleShow()"
    @mouseleave="trigger === 'hover' && handleHide()"
    @click="trigger === 'click' && handleToggle()"
  >
    <div :class="ns.e('reference')">
      <slot />
    </div>
    <transition name="swy-popover-fade">
      <div
        v-if="visible"
        :class="[ns.e('popper'), 'swy-popper', ns.m(placement)]"
        :style="{ width: widthValue }"
      >
        <div v-if="title" :class="ns.e('title')">
          {{ title }}
        </div>
        <div :class="ns.e('content')">
          {{ content }}
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { popoverProps, popoverEmits } from './popover'

defineOptions({
  name: 'SwyPopover',
})

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

const ns = useNamespace('popover')

const visible = ref(false)

const widthValue = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

const handleShow = () => {
  visible.value = true
  emit('show')
}

const handleHide = () => {
  visible.value = false
  emit('hide')
}

const handleToggle = () => {
  if (visible.value) {
    handleHide()
  } else {
    handleShow()
  }
}
</script>
