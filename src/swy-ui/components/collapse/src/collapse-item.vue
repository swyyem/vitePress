<template>
  <div :class="[ns.b('collapse-item'), ns.is('active', isActive), ns.is('disabled', disabled)]">
    <div :class="ns.b('collapse-item__header')" @click="handleHeaderClick">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <i :class="[ns.b('collapse-item__arrow'), isActive ? 'is-active' : '']">▶</i>
    </div>
    <transition name="swy-collapse">
      <div v-show="isActive" :class="ns.b('collapse-item__wrap')">
        <div :class="ns.b('collapse-item__content')">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { collapseItemProps } from './collapse-item'

defineOptions({
  name: 'SwyCollapseItem',
})

const props = defineProps(collapseItemProps)

const ns = useNamespace('swy')

const collapse = inject<any>('collapse')

const isActive = computed(() => {
  return collapse?.activeNames.value.includes(props.name)
})

const handleHeaderClick = () => {
  if (!props.disabled) {
    collapse?.handleItemClick(props.name)
  }
}
</script>
