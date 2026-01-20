<template>
  <transition name="swy-loading-fade">
    <div
      v-if="loading"
      :class="[ns.b('loading-mask'), ns.is('fullscreen', fullscreen)]"
      :style="{ backgroundColor: background }"
    >
      <div :class="ns.b('loading-spinner')">
        <svg class="circular" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" />
        </svg>
        <p v-if="text" :class="ns.b('loading-text')">
          {{ text }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'
import { loadingProps } from './loading'

defineOptions({
  name: 'SwyLoading',
})

defineProps(loadingProps)

const ns = useNamespace('swy')
</script>
