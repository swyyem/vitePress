<template>
  <transition name="swy-fade-in">
    <div v-show="visible" :class="backtopKls" :style="backtopStyle" @click="handleClick">
      <slot>
        <div :class="ns.e('icon')">▲</div>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { backtopEmits, backtopProps } from './backtop'

defineOptions({
  name: 'SwyBacktop',
})

const props = defineProps(backtopProps)
const emit = defineEmits(backtopEmits)

const ns = useNamespace('backtop')
const visible = ref(false)

const backtopKls = computed(() => [ns.b()])

const backtopStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.right !== undefined) {
    style.right = typeof props.right === 'number' ? `${props.right}px` : props.right
  }

  if (props.left !== undefined) {
    style.left = typeof props.left === 'number' ? `${props.left}px` : props.left
  }

  if (props.bottom !== undefined) {
    style.bottom = typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom
  }

  return style
})

const handleScroll = () => {
  const target = props.target ? document.querySelector(props.target) : window
  const scrollTop =
    target === window
      ? document.documentElement.scrollTop || document.body.scrollTop
      : (target as Element).scrollTop

  visible.value = scrollTop >= props.visibilityHeight
}

const handleClick = (e: MouseEvent) => {
  const target = props.target ? document.querySelector(props.target) : window

  if (target === window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    ;(target as Element).scrollTo({ top: 0, behavior: 'smooth' })
  }

  emit('click', e)
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
  visible,
})
</script>
