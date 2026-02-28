/** File: result.vue - Vue Component */

<template>
  <div :class="ns.b()">
    <div :class="ns.e('icon')">
      <slot name="icon">
        <div :class="['icon-' + type]">
          <component v-if="icon" :is="icon" />
          <svg v-else-if="type === 'success'" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"
              fill="currentColor"
            />
            <path d="M17 24L22 29L32 19" stroke="white" stroke-width="3" />
          </svg>
          <svg v-else-if="type === 'error'" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
              fill="currentColor"
            />
            <path d="M29.6569 18.3431L18.3431 29.6569" stroke="white" stroke-width="3" />
            <path d="M18.3431 18.3431L29.6569 29.6569" stroke="white" stroke-width="3" />
          </svg>
          <svg v-else-if="type === 'warning'" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
              fill="currentColor"
            />
            <path d="M24 20V24V28" stroke="white" stroke-width="3" />
            <circle cx="24" cy="32" r="2" fill="white" />
          </svg>
          <svg v-else viewBox="0 0 48 48" fill="none">
            <path
              d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
              fill="currentColor"
            />
            <path d="M24 12V24" stroke="white" stroke-width="3" />
            <circle cx="24" cy="32" r="2" fill="white" />
          </svg>
        </div>
      </slot>
    </div>
    <div v-if="title || $slots.title" :class="ns.e('title')">
      <slot name="title">
        <p>{{ title }}</p>
      </slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" :class="ns.e('subtitle')">
      <slot name="subTitle">
        <p>{{ subTitle }}</p>
      </slot>
    </div>
    <div v-if="$slots.extra" :class="ns.e('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { useNamespace } from '@swy-ui/hooks'
import { resultProps } from './result'

defineOptions({
  name: 'SwyResult',
})

defineProps(resultProps)

const ns = useNamespace('result')
</script>
