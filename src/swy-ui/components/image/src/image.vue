<template>
  <div :class="ns.b()">
    <img
      v-if="!loadError"
      :class="[ns.e('inner'), ns.is('loading', loading)]"
      :src="src"
      :alt="alt"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
      @click="handleClick"
    />
    <div v-if="loading" :class="ns.e('placeholder')">
      <slot name="placeholder">
        <div>加载中...</div>
      </slot>
    </div>
    <div v-if="loadError" :class="ns.e('error')">
      <slot name="error">
        <div>加载失败</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { imageProps, imageEmits } from './image'

defineOptions({
  name: 'SwyImage',
})

const props = defineProps(imageProps)
const emit = defineEmits(imageEmits)

const ns = useNamespace('image')

const loading = ref(true)
const loadError = ref(false)

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
    // 预览功能可以在这里实现
    console.log('Preview image:', props.src)
  }
}
</script>
