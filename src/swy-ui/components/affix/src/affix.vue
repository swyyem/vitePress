<template>
  <div ref="rootRef" :class="affixKls" :style="rootStyle">
    <div :class="{ [ns.is('fixed')]: fixed }" :style="affixStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { affixEmits, affixProps } from './affix'

defineOptions({
  name: 'SwyAffix',
})

const props = defineProps(affixProps)
const emit = defineEmits(affixEmits)

const ns = useNamespace('affix')
const rootRef = ref<HTMLElement>()
const fixed = ref(false)
const scrollTop = ref(0)

const affixKls = computed(() => [ns.b()])

const rootStyle = computed(() => ({
  height: fixed.value ? `${rootRef.value?.offsetHeight}px` : '',
  width: fixed.value ? `${rootRef.value?.offsetWidth}px` : '',
}))

const affixStyle = computed(() => {
  if (!fixed.value) return {}

  const offset = props.offset || 0
  return {
    position: 'fixed',
    top: props.position === 'top' ? `${offset}px` : '',
    bottom: props.position === 'bottom' ? `${offset}px` : '',
    zIndex: props.zIndex,
  }
})

const handleScroll = () => {
  const target = props.target ? document.querySelector(props.target) : window
  scrollTop.value =
    target === window
      ? document.documentElement.scrollTop || document.body.scrollTop
      : (target as Element).scrollTop

  const offset = props.offset || 0
  const shouldFix = scrollTop.value >= offset

  if (shouldFix !== fixed.value) {
    fixed.value = shouldFix
    emit('change', shouldFix)
  }
}

onMounted(() => {
  const target = props.target ? document.querySelector(props.target) : window
  target?.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  const target = props.target ? document.querySelector(props.target) : window
  target?.removeEventListener('scroll', handleScroll)
})

defineExpose({
  fixed,
})
</script>
