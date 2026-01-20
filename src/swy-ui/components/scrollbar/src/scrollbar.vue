<template>
  <div :class="scrollbarKls" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div ref="wrapRef" :class="ns.e('wrap')" :style="wrapStyle" @scroll="handleScroll">
      <div ref="resizeRef" :class="ns.e('view')" :style="viewStyle">
        <slot />
      </div>
    </div>
    <div
      v-show="!native && thumbVisible"
      :class="[ns.e('bar'), ns.is('vertical')]"
      :style="barStyle"
    >
      <div
        ref="thumbRef"
        :class="ns.e('thumb')"
        :style="thumbStyle"
        @mousedown="handleThumbMouseDown"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { scrollbarProps } from './scrollbar'

defineOptions({
  name: 'SwyScrollbar',
})

const props = defineProps(scrollbarProps)

const ns = useNamespace('scrollbar')
const wrapRef = ref()
const resizeRef = ref()
const thumbRef = ref()
const thumbVisible = ref(false)

const scrollbarKls = computed(() => [ns.b(), ns.is('always', props.always)])

const wrapStyle = computed(() => ({
  height: props.height,
  maxHeight: props.maxHeight,
}))

const viewStyle = computed(() => ({}))

const barStyle = computed(() => ({}))

const thumbStyle = computed(() => ({}))

const handleMouseEnter = () => {
  if (!props.always) {
    thumbVisible.value = true
  }
}

const handleMouseLeave = () => {
  if (!props.always) {
    thumbVisible.value = false
  }
}

const handleScroll = () => {
  // Handle scroll
}

const handleThumbMouseDown = () => {
  // Handle thumb drag
}

defineExpose({
  wrapRef,
  thumbVisible,
})
</script>
