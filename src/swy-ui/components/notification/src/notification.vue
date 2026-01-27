<template>
  <transition name="swy-notification-fade">
    <div v-if="visible" :class="[ns.b(), ns.m(type), position]" :style="positionStyle">
      <i v-if="type" :class="[ns.e('icon'), ns.is(type)]">
        {{ typeIcon }}
      </i>
      <div :class="ns.e('group')">
        <h2 v-if="title" :class="ns.e('title')">
          {{ title }}
        </h2>
        <div :class="ns.e('content')">
          <p>{{ message }}</p>
          <slot />
        </div>
      </div>
      <i v-if="showClose" :class="ns.e('closeBtn')" @click="handleClose">×</i>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { notificationProps, notificationEmits } from './notification'

defineOptions({
  name: 'SwyNotification',
})

const props = defineProps(notificationProps)
const emit = defineEmits(notificationEmits)

const ns = useNamespace('notification')

const visible = ref(false)

const typeIcon = computed(() => {
  const iconMap: Record<string, string> = {
    success: '✓',
    warning: '!',
    info: 'ℹ',
    error: '×',
  }
  return iconMap[props.type] || ''
})

const positionStyle = computed(() => {
  const style: Record<string, string> = {
    [props.position.includes('top') ? 'top' : 'bottom']: `${props.offset}px`,
  }
  return style
})

const handleClose = () => {
  visible.value = false
  emit('close')
}

onMounted(() => {
  visible.value = true

  if (props.duration > 0) {
    setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})
</script>
