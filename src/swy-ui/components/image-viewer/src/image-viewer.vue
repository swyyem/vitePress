/** File: image-viewer.vue - Vue Component */

<template>
  <teleport to="body">
    <transition name="swy-fade">
      <div v-if="modelValue" :class="imageViewerKls" @click.self="handleMaskClick">
        <div :class="ns.e('mask')" />
        <div :class="ns.e('close')" @click="handleClose">
          <el-icon><component :is="'Close'" /></el-icon>
        </div>
        <div :class="ns.e('canvas')">
          <img :src="currentUrl" :class="ns.e('img')" :style="imageStyle" />
        </div>
        <div :class="ns.e('actions')">
          <el-icon @click="handleZoomOut"><component :is="'ZoomOut'" /></el-icon>
          <el-icon @click="handleZoomIn"><component :is="'ZoomIn'" /></el-icon>
          <el-icon @click="handleRotateLeft"><component :is="'RefreshLeft'" /></el-icon>
          <el-icon @click="handleRotateRight"><component :is="'RefreshRight'" /></el-icon>
        </div>
        <div v-if="urlList.length > 1" :class="ns.e('btn')">
          <el-icon :class="ns.e('prev')" @click="handlePrev">
            <component :is="'ArrowLeft'" />
          </el-icon>
          <el-icon :class="ns.e('next')" @click="handleNext">
            <component :is="'ArrowRight'" />
          </el-icon>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { imageViewerEmits, imageViewerProps } from './image-viewer'

defineOptions({
  name: 'SwyImageViewer',
})

const props = defineProps(imageViewerProps)
const emit = defineEmits(imageViewerEmits)

const ns = useNamespace('image-viewer')
const currentIndex = ref(props.initialIndex)
const scale = ref(1)
const rotate = ref(0)

const imageViewerKls = computed(() => [ns.b()])

const currentUrl = computed(() => props.urlList[currentIndex.value])

const imageStyle = computed(() => ({
  transform: `scale(${scale.value}) rotate(${rotate.value}deg)`,
}))

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handlePrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.urlList.length - 1
  }
  emit('switch', currentIndex.value)
}

const handleNext = () => {
  if (currentIndex.value < props.urlList.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  emit('switch', currentIndex.value)
}

const handleZoomIn = () => {
  scale.value += 0.2
}

const handleZoomOut = () => {
  if (scale.value > 0.2) {
    scale.value -= 0.2
  }
}

const handleRotateLeft = () => {
  rotate.value -= 90
}

const handleRotateRight = () => {
  rotate.value += 90
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      scale.value = 1
      rotate.value = 0
    }
  }
)

defineExpose({
  currentIndex,
  scale,
  rotate,
})
</script>
