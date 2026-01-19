<template>
  <div :class="ns.b()">
    <div :class="ns.e('image')" :style="imageStyle">
      <img v-if="image" :src="image" />
      <slot v-else name="image">
        <svg viewBox="0 0 79 86" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-319.000000, -200.000000)">
              <g transform="translate(319.000000, 200.000000)">
                <path
                  d="M0 23.99999 L0 62.000004 Q0 71.000004 8 77.000004 L30 91.500004 Q39.5 97.000004 49 91.500004 L71 77.000004 Q79 71.000004 79 62.000004 L79 23.99999 Q79 14.99999 71 8.99999 L49 -5.50001 Q39.5 -11.00001 30 -5.50001 L8 8.99999 Q0 14.99999 0 23.99999 Z"
                  fill="#F5F7FA"
                />
                <path
                  d="M7.67236 52.0002 L16.67236 40.0002 Q18.67236 37.0002 21.67236 37.0002 L28.67236 37.0002 Q31.67236 37.0002 33.67236 40.0002 L40.67236 50.0002 Q42.67236 53.0002 45.67236 53.0002 L49.67236 53.0002 Q52.67236 53.0002 54.67236 50.0002 L61.67236 40.0002 Q63.67236 37.0002 66.67236 37.0002 L70.67236 37.0002 Q73.67236 37.0002 75.67236 40.0002 L79.00569 45.0002"
                  stroke="#DCDFE6"
                  stroke-width="2"
                />
                <ellipse fill="#DCDFE6" cx="27.5" cy="25" rx="5" ry="5" />
              </g>
            </g>
          </g>
        </svg>
      </slot>
    </div>
    <div :class="ns.e('description')">
      <slot name="description">
        <p>{{ description || '暂无数据' }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" :class="ns.e('bottom')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { emptyProps } from './empty'

defineOptions({
  name: 'SwyEmpty',
})

const props = defineProps(emptyProps)

const ns = useNamespace('empty')

const imageStyle = computed(() => {
  if (props.imageSize) {
    return {
      width: `${props.imageSize}px`,
    }
  }
  return {}
})
</script>
