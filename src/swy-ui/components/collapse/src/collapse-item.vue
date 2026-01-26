<template>
  <div :class="[ns.b(), ns.is('active', isActive), ns.is('disabled', disabled)]">
    <div :class="ns.e('header')" @click="handleHeaderClick">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <i :class="[ns.e('arrow'), isActive ? 'is-active' : '']">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
          ></path>
        </svg>
      </i>
    </div>
    <transition name="swy-collapse">
      <div v-show="isActive" :class="ns.e('wrap')">
        <div :class="ns.e('content')">
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
import type { CollapseContext } from './collapse'

defineOptions({
  name: 'SwyCollapseItem',
})

const props = defineProps(collapseItemProps)

const ns = useNamespace('collapse-item')

const collapse = inject<CollapseContext>('collapse')

const isActive = computed(() => {
  return collapse?.activeNames.value.includes(props.name)
})

const handleHeaderClick = () => {
  if (!props.disabled) {
    collapse?.handleItemClick(props.name)
  }
}
</script>
