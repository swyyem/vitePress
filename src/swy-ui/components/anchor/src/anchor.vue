<template>
  <div :class="anchorKls">
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

const props = defineProps(anchorProps)
const emit = defineEmits(anchorEmits)

const ns = useNamespace('anchor')
const activeLink = ref('')
const markerTop = ref(0)

const anchorKls = computed(() => [ns.b(), ns.m(props.direction)])

const markerStyle = computed(() => ({
  top: `${markerTop.value}px`,
}))

const handleLinkClick = (href: string) => {
  activeLink.value = href
  emit('click', href)
  emit('change', href)
}

provide('anchor', {
  activeLink,
  direction: props.direction,
  handleLinkClick,
})

defineExpose({
  activeLink,
})
</script>
