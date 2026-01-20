<template>
  <div v-if="isActive" :class="ns.b('tab-pane')">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, onMounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tabPaneProps } from './tab-pane'

defineOptions({
  name: 'SwyTabPane',
})

const props = defineProps(tabPaneProps)

const ns = useNamespace('tab')

const tabs = inject<any>('tabs')

const isActive = computed(() => {
  return tabs?.activeTab === props.name
})

onMounted(() => {
  if (tabs?.registerTab) {
    tabs.registerTab({
      name: props.name,
      label: props.label,
    })
  }
})
</script>
