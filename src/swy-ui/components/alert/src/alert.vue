/** File: alert.vue - Vue Component */

<template>
  <transition name="swy-alert-fade">
    <div
      v-show="visible"
      :class="[ns.b(), ns.m(type), ns.is(effect), ns.is('center', center)]"
      role="alert"
    >
      <span v-if="showIcon" :class="[ns.e('icon'), description && ns.is('big')]">
        <slot name="icon">
          <component v-if="iconComponent" :is="iconComponent" />
        </slot>
      </span>
      <div :class="ns.e('content')">
        <span
          v-if="title || $slots.title"
          :class="[ns.e('title'), description && 'with-description']"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="description || $slots.default" :class="ns.e('description')">
          <slot>{{ description }}</slot>
        </p>
      </div>
      <div
        v-if="closable"
        :class="[ns.e('close-btn'), closeText && ns.is('customed')]"
        @click="handleClose"
      >
        <span v-if="closeText">{{ closeText }}</span>
        <span v-else>×</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { alertProps, alertEmits } from './alert'

defineOptions({
  name: 'SwyAlert',
})

defineProps(alertProps)
const emit = defineEmits(alertEmits)

const ns = useNamespace('alert')
const visible = ref(true)

const iconComponent = computed(() => {
  // 可以根据 type 返回不同的图标组件
  // 这里简化处理
  return null
})

const handleClose = (event: MouseEvent) => {
  visible.value = false
  emit('close', event)
}
</script>
