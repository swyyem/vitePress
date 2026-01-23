<template>
  <div :class="[ns.b(), ns.m(type)]">
    <div :class="ns.e('header')">
      <div :class="ns.e('nav-wrap')">
        <div :class="ns.e('nav')">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[ns.e('item'), ns.is('active', modelValue === tab.name)]"
            @click="handleTabClick(tab.name)"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
    </div>
    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, toRef } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tabsProps, tabsEmits } from './tabs'

defineOptions({
  name: 'SwyTabs',
})

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const ns = useNamespace('tabs')

const tabs = ref<Array<{ name: string | number; label: string }>>([])

const registerTab = (tab: { name: string | number; label: string }) => {
  tabs.value.push(tab)
}

provide('tabs', {
  registerTab,
  activeTab: toRef(props, 'modelValue'),
})

const handleTabClick = (name: string | number) => {
  emit('update:modelValue', name)
  emit('tab-click', name)
}
</script>
