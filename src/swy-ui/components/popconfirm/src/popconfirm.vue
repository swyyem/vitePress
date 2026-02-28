/** File: popconfirm.vue - Vue Component */

<template>
  <div :class="ns.b()" @click="handleToggle">
    <div :class="ns.e('reference')">
      <slot />
    </div>
    <transition name="swy-popconfirm-fade">
      <div v-if="visible" :class="[ns.e('popper'), 'swy-popper', ns.m(placement)]">
        <div :class="ns.e('main')">
          <i v-if="icon" :class="ns.e('icon')">{{ icon }}</i>
          <span>{{ title }}</span>
        </div>
        <div :class="ns.e('action')">
          <button :class="[ns.e('cancel'), 'swy-button']" @click.stop="handleCancel">
            {{ cancelButtonText }}
          </button>
          <button
            :class="[ns.e('confirm'), 'swy-button', `swy-button--${confirmButtonType}`]"
            @click.stop="handleConfirm"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { popconfirmProps, popconfirmEmits } from './popconfirm'

defineOptions({
  name: 'SwyPopconfirm',
})

defineProps(popconfirmProps)
const emit = defineEmits(popconfirmEmits)

const ns = useNamespace('popconfirm')

const visible = ref(false)

const handleToggle = () => {
  visible.value = !visible.value
}

const handleConfirm = () => {
  emit('confirm')
  visible.value = false
}

const handleCancel = () => {
  emit('cancel')
  visible.value = false
}
</script>
