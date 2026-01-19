<template>
  <div :class="[ns.b(), ns.m(size), ns.is('disabled', disabled)]">
    <div
      v-for="item in max"
      :key="item"
      :class="ns.e('item')"
      @click="selectValue(item)"
      @mouseenter="hoverIndex = item"
      @mouseleave="hoverIndex = -1"
    >
      <span
        :class="[
          'swy-rate-icon',
          ns.is('active', item <= activeValue),
          ns.is('hover', item <= hoverIndex),
        ]"
      >
        {{ item <= activeValue ? icon : voidIcon }}
      </span>
    </div>
    <span v-if="showText" :class="ns.e('text')">
      {{ activeValue }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { rateProps, rateEmits } from './rate'

defineOptions({
  name: 'SwyRate',
})

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const ns = useNamespace('rate')

const currentValue = ref(props.modelValue)
const hoverIndex = ref(-1)

const activeValue = computed(() => {
  return hoverIndex.value > 0 ? hoverIndex.value : currentValue.value
})

const selectValue = (value: number) => {
  if (props.disabled) return

  currentValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
