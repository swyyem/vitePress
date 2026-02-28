/** File: sub-menu.vue - Vue Component */

<template>
  <li :class="[ns.b('sub-menu'), ns.is('opened', opened), ns.is('disabled', disabled)]">
    <div :class="ns.b('sub-menu__title')" @click="handleTitleClick">
      <slot name="title" />
      <i
        :class="[
          ns.b('sub-menu__icon-arrow'),
          opened ? 'swy-icon-arrow-up' : 'swy-icon-arrow-down',
        ]"
      />
    </div>
    <transition name="swy-menu">
      <ul v-show="opened" :class="ns.b('menu')">
        <slot />
      </ul>
    </transition>
  </li>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { subMenuProps } from './sub-menu'

defineOptions({
  name: 'SwySubMenu',
})

const props = defineProps(subMenuProps)

const ns = useNamespace('swy')

const opened = ref(false)

const handleTitleClick = () => {
  if (!props.disabled) {
    opened.value = !opened.value
  }
}
</script>
