/** File: anchor-link.vue - Vue Component */

<template>
  <div ref="linkRef" :class="anchorLinkKls" @click="handleClick">
    <a :href="href" :class="ns.e('title')">
      <slot>{{ title }}</slot>
    </a>
    <div v-if="$slots.default" :class="ns.e('list')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, inject, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { anchorLinkProps } from './anchor-link'

defineOptions({
  name: 'SwyAnchorLink',
})

const props = defineProps(anchorLinkProps)

const ns = useNamespace('anchor-link')
const linkRef = ref<HTMLElement>()
const anchor = inject<{
  activeLink?: { value: string }
  handleLinkClick?: (href: string, element: HTMLElement) => void
}>('anchor', {})

const anchorLinkKls = computed(() => [
  ns.b(),
  ns.is('active', anchor.activeLink?.value === props.href),
])

const handleClick = (e: MouseEvent) => {
  e.preventDefault()

  if (linkRef.value) {
    anchor.handleLinkClick?.(props.href, linkRef.value)
  }

  const target = document.querySelector(props.href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
