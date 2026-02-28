/** File: affix.vue - Vue Component */

<template>
  <div ref="rootRef" :class="affixKls" :style="rootStyle">
    <div :class="affixInnerClass" :style="affixStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'
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

// 计算 affix 的类名
const affixInnerClass = computed(() => [
  ns.e('inner'),
  {
    [ns.is('fixed')]: fixed.value,
    [ns.m(props.position)]: !!props.position,
  },
])

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
    top: props.position === 'top' ? `${offset}px` : 'auto',
    bottom: props.position === 'bottom' ? `${offset}px` : 'auto',
    left: 0,
    right: 0,
    zIndex: props.zIndex,
  }
})

// 获取目标容器的滚动信息
const getScrollInfo = (target: HTMLElement | Window) => {
  if (target === window) {
    return {
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
      scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
      clientHeight: document.documentElement.clientHeight,
      scrollHeight: document.documentElement.scrollHeight,
    }
  } else {
    const el = target as HTMLElement
    return {
      scrollTop: el.scrollTop,
      scrollLeft: el.scrollLeft,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
    }
  }
}

// 检查是否超出容器边界
const checkBoundary = (target: HTMLElement | Window) => {
  if (!rootRef.value) return false

  const scrollInfo = getScrollInfo(target)

  // 如果目标不是window，需要获取容器的位置信息
  if (target !== window) {
    const targetRect = (target as HTMLElement).getBoundingClientRect()
    const containerTop = targetRect.top
    const containerBottom = targetRect.bottom

    if (props.position === 'top') {
      // 顶部固定：当容器顶部到达偏移位置时固定
      return containerTop <= props.offset
    } else {
      // 底部固定：当容器底部接近视口底部时固定
      return containerBottom >= scrollInfo.clientHeight - props.offset
    }
  } else {
    // 对于 window 的情况
    const elementHeight = rootRef.value.offsetHeight
    if (props.position === 'top') {
      return scrollInfo.scrollTop >= props.offset
    } else {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
      return (
        scrollInfo.scrollTop + scrollInfo.clientHeight >=
        documentHeight - elementHeight - props.offset
      )
    }
  }
}

const handleScroll = () => {
  if (!rootRef.value) return

  const target = props.target ? document.querySelector<HTMLElement>(props.target) : window

  if (!target) return

  const shouldFix = checkBoundary(target)

  if (shouldFix !== fixed.value) {
    fixed.value = shouldFix
    emit('change', shouldFix)
  }

  // 发送滚动事件
  const scrollInfo = getScrollInfo(target)
  emit('scroll', {
    scrollTop: scrollInfo.scrollTop,
    fixed: fixed.value,
  })
}

onMounted(() => {
  nextTick(() => {
    const target = props.target ? document.querySelector<HTMLElement>(props.target) : window

    if (target) {
      target.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }
  })
})

onUnmounted(() => {
  const target = props.target ? document.querySelector<HTMLElement>(props.target) : window

  if (target) {
    target.removeEventListener('scroll', handleScroll)
  }
})

defineExpose({
  fixed,
})
</script>
