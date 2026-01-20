<template>
  <teleport to="body">
    <transition name="swy-fade">
      <div v-if="visible" :class="messageBoxKls" @click.self="handleMaskClick">
        <div :class="ns.e('wrapper')">
          <div :class="ns.e('header')">
            <div :class="ns.e('title')">{{ title }}</div>
            <el-icon v-if="showClose" :class="ns.e('close')" @click="handleClose">
              <component :is="'Close'" />
            </el-icon>
          </div>
          <div :class="ns.e('content')">
            <div v-if="type" :class="ns.e('icon')">
              <el-icon><component :is="iconMap[type]" /></el-icon>
            </div>
            <div :class="ns.e('message')">{{ message }}</div>
          </div>
          <div :class="ns.e('footer')">
            <el-button v-if="showCancelButton" :size="buttonSize" @click="handleCancel">
              {{ cancelButtonText }}
            </el-button>
            <el-button :type="confirmButtonType" :size="buttonSize" @click="handleConfirm">
              {{ confirmButtonText }}
            </el-button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { messageBoxEmits, messageBoxProps } from './message-box'

defineOptions({
  name: 'SwyMessageBox',
})

const props = defineProps(messageBoxProps)
const emit = defineEmits(messageBoxEmits)

const ns = useNamespace('message-box')
const visible = ref(false)

const iconMap: Record<string, string> = {
  success: 'CircleCheck',
  warning: 'Warning',
  error: 'CircleClose',
  info: 'InfoFilled',
}

const messageBoxKls = computed(() => [ns.b(), ns.m(props.type)])

const handleMaskClick = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleCancel = () => {
  visible.value = false
  emit('cancel')
}

const handleConfirm = () => {
  visible.value = false
  emit('confirm')
}

defineExpose({
  visible,
})
</script>
