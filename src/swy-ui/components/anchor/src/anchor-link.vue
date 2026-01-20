<template>
  <div :class="anchorLinkKls" @click="handleClick">
    <a :href="href" :class="ns.e('title')">
      <slot>{{ title }}</slot>
    </a>
    <div v-if="$slots.default" :class="ns.e('list')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { anchorLinkProps } from './anchor-link'

defineOptions({
  name: 'SwyAnchorLink',
})

const props = defineProps(anchorLinkProps)

const ns = useNamespace('anchor-link')
const anchor = inject<{ activeLink?: string; handleLinkClick?: (href: string) => void }>(
  'anchor',
  {}
)

const anchorLinkKls = computed(() => [ns.b(), ns.is('active', anchor.activeLink === props.href)])

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
  anchor.handleLinkClick?.(props.href)

  const target = document.querySelector(props.href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
