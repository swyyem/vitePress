<template>
  <transition name="swy-message-fade">
    <div
      v-if="visible"
      :class="[ns.b(), ns.m(type), ns.is('center', center), ns.is('plain', true)]"
      role="alert"
    >
      <div v-if="icon" :class="ns.e('icon')">{{ icon }}</div>
      <div :class="ns.e('content')">
        <slot>{{ message }}</slot>
      </div>
      <div v-if="showClose" :class="ns.e('closeBtn')" @click="handleClose">✕</div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { messageProps, messageEmits } from './message'

defineOptions({
  name: 'SwyMessage',
})

const props = defineProps(messageProps)
const emit = defineEmits(messageEmits)

const ns = useNamespace('message')

const visible = ref(false)

onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})

const handleClose = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 400)
}
</script>
