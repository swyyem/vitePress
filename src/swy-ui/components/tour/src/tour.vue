/** File: tour.vue - Vue Component */

<template>
  <teleport to="body">
    <transition name="swy-fade">
      <div v-if="modelValue" :class="tourKls">
        <div :class="ns.e('mask')" @click="handleMaskClick" />
        <div :class="ns.e('content')" :style="contentStyle">
          <div :class="ns.e('header')">
            <div :class="ns.e('title')">{{ currentStep?.title }}</div>
            <el-icon :class="ns.e('close')" @click="handleClose">
              <component :is="'Close'" />
            </el-icon>
          </div>
          <div :class="ns.e('body')">
            <div :class="ns.e('description')">
              {{ currentStep?.description }}
            </div>
          </div>
          <div :class="ns.e('footer')">
            <div :class="ns.e('indicators')">{{ current + 1 }} / {{ steps.length }}</div>
            <div :class="ns.e('buttons')">
              <el-button v-if="current > 0" size="small" @click="handlePrev">上一步</el-button>
              <el-button
                v-if="current < steps.length - 1"
                type="primary"
                size="small"
                @click="handleNext"
              >
                下一步
              </el-button>
              <el-button v-else type="primary" size="small" @click="handleFinish">完成</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { tourEmits, tourProps } from './tour'

defineOptions({
  name: 'SwyTour',
})

const props = defineProps(tourProps)
const emit = defineEmits(tourEmits)

const ns = useNamespace('tour')
const current = ref(0)

const tourKls = computed(() => [ns.b()])

const currentStep = computed(() => props.steps[current.value])

const contentStyle = computed(() => ({}))

const handlePrev = () => {
  if (current.value > 0) {
    current.value--
    emit('change', current.value)
  }
}

const handleNext = () => {
  if (current.value < props.steps.length - 1) {
    current.value++
    emit('change', current.value)
  }
}

const handleFinish = () => {
  emit('update:modelValue', false)
  emit('finish')
  current.value = 0
}

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close', current.value)
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      current.value = 0
    }
  }
)

defineExpose({
  current,
})
</script>
