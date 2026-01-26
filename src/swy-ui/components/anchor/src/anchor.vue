<template>
  <div :class="anchorKls">
    <div :class="ns.e('line')" />
    <div :class="ns.e('marker')" :style="markerStyle" />
    <div :class="ns.e('list')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { anchorEmits, anchorProps } from './anchor'

defineOptions({
  name: 'SwyAnchor',
})

defineProps(anchorProps)
const emit = defineEmits(anchorEmits)

const ns = useNamespace('anchor')
const activeLink = ref('')
const markerTop = ref(0)
const markerHeight = ref(0)

const anchorKls = computed(() => [ns.b()])

const markerStyle = computed(() => ({
  top: `${markerTop.value}px`,
  left: 0,
  width: '2px',
  height: `${markerHeight.value}px`,
}))

const handleLinkClick = (href: string, element: HTMLElement) => {
  activeLink.value = href

  // 更新 marker 位置
  const rect = element.getBoundingClientRect()
  const anchorRect = element.closest('.swy-anchor')?.getBoundingClientRect()
  if (anchorRect) {
    markerTop.value = rect.top - anchorRect.top
    markerHeight.value = rect.height
  }

  emit('click', href)
  emit('change', href)
}

provide('anchor', {
  activeLink,
  handleLinkClick,
})

defineExpose({
  activeLink,
})
</script>
