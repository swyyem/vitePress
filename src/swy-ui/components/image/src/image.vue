<template>
  <div ref="containerRef" :class="[ns.b(), $attrs.class]" :style="containerStyle">
    <img
      v-if="imageSrc !== undefined && !loadError"
      :class="[ns.e('inner'), ns.is('loading', loading), { [ns.e('preview')]: preview }]"
      :src="imageSrc"
      :alt="alt"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
      @click="handleClick"
    />
    <div v-if="loading" :class="ns.e('wrapper')">
      <slot name="placeholder">
        <div :class="ns.e('placeholder')">
          <SwyIcon name="loading" :class="ns.is('loading')" />
        </div>
      </slot>
    </div>
    <div v-if="loadError" :class="ns.e('wrapper')">
      <slot name="error">
        <div :class="ns.e('error')">
          <SwyIcon name="warning" />
          <span>加载失败</span>
        </div>
      </slot>
    </div>
    <template v-if="preview">
      <SwyImageViewer
        v-if="showViewer"
        :z-index="zIndex"
        :initial-index="initialIndex"
        :url-list="previewUrls"
        @close="closeViewer"
        @switch="handleSwitch"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, useAttrs, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { getScrollContainer } from '@swy-ui/utils'
import { imageProps, imageEmits } from './image'
import SwyImageViewer from '../../image-viewer'
import SwyIcon from '../../icon'

defineOptions({
  name: 'SwyImage',
  inheritAttrs: false,
})

const props = defineProps(imageProps)
const emit = defineEmits(imageEmits)

const ns = useNamespace('image')
const attrs = useAttrs()

const loading = ref(true)
const loadError = ref(false)
const showViewer = ref(false)
const containerRef = ref<HTMLElement>()
const imageSrc = ref<string | undefined>()

const containerStyle = computed(() => attrs.style as any)

const previewUrls = computed(() => {
  if (props.previewSrcList && props.previewSrcList.length > 0) {
    return props.previewSrcList as string[]
  }
  return [props.src]
})

const imageStyle = computed(() => {
  if (props.fit) {
    return {
      objectFit: props.fit,
    }
  }
  return {}
})

const handleLoad = (event: Event) => {
  loading.value = false
  loadError.value = false
  emit('load', event)
}

const handleError = (event: Event) => {
  loading.value = false
  loadError.value = true
  emit('error', event)
}

const handleClick = () => {
  if (props.preview) {
    showViewer.value = true
  }
}

const closeViewer = () => {
  showViewer.value = false
}

const handleSwitch = (_index: number) => {
  // 可以触发 switch 事件
}

// 懒加载逻辑
let observer: IntersectionObserver | undefined

const loadImage = () => {
  imageSrc.value = props.src
}

const initLazyLoad = () => {
  if (!containerRef.value) return

  let root: HTMLElement | null = null
  if (typeof props.scrollContainer === 'string') {
    root = document.querySelector(props.scrollContainer)
  } else if (props.scrollContainer instanceof HTMLElement) {
    root = props.scrollContainer
  } else if (containerRef.value) {
    const scrollContainer = getScrollContainer(containerRef.value)
    if (scrollContainer instanceof HTMLElement) {
      root = scrollContainer
    }
  }

  observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        loadImage()
        stopLazyLoad()
      }
    },
    {
      root,
    }
  )

  observer.observe(containerRef.value)
}

const stopLazyLoad = () => {
  if (observer) {
    observer.disconnect()
    observer = undefined
  }
}

watch(
  () => props.src,
  () => {
    if (props.lazy && observer) {
      // 如果 src 改变且正在观察，不需要重新开始，除非已经加载过
      if (imageSrc.value) {
        loadImage()
      }
    } else {
      loadImage()
    }
  }
)

onMounted(() => {
  if (props.lazy) {
    initLazyLoad()
  } else {
    loadImage()
  }
})

onUnmounted(() => {
  stopLazyLoad()
})
</script>
