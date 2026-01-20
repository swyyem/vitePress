<template>
  <div :class="statisticKls">
    <div v-if="title || $slots.title" :class="ns.e('head')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div :class="ns.e('content')">
      <div v-if="prefix || $slots.prefix" :class="ns.e('prefix')">
        <slot name="prefix">{{ prefix }}</slot>
      </div>
      <div :class="ns.e('number')" :style="valueStyle">
        <slot name="formatter" :value="displayValue">
          {{ displayValue }}
        </slot>
      </div>
      <div v-if="suffix || $slots.suffix" :class="ns.e('suffix')">
        <slot name="suffix">{{ suffix }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { statisticProps } from './statistic'

defineOptions({
  name: 'SwyStatistic',
})

const props = defineProps(statisticProps)

const ns = useNamespace('statistic')

const statisticKls = computed(() => [ns.b()])

const displayValue = computed(() => {
  if (props.formatter) {
    return props.formatter(props.value)
  }

  if (typeof props.value === 'number') {
    return props.value.toLocaleString(props.decimalSeparator, {
      minimumFractionDigits: props.precision,
      maximumFractionDigits: props.precision,
    })
  }

  return props.value
})

const valueStyle = computed(() => ({
  color: props.valueStyle?.color,
}))
</script>
