<template>
  <div :class="segmentedKls">
    <div
      v-for="(item, index) in options"
      :key="getItemValue(item)"
      :class="[
        ns.e('item'),
        ns.is('selected', modelValue === getItemValue(item)),
        ns.is('disabled', getItemDisabled(item) || disabled),
      ]"
      @click="handleItemClick(item, index)"
    >
      <template v-if="typeof item === 'object'">
        <el-icon v-if="item.icon" :class="ns.e('item-icon')">
          <component :is="item.icon" />
        </el-icon>
        <span v-if="item.label" :class="ns.e('item-label')">{{ item.label }}</span>
      </template>
      <template v-else>
        {{ item }}
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { segmentedEmits, segmentedProps } from './segmented'

defineOptions({
  name: 'SwySegmented',
})

const props = defineProps(segmentedProps)
const emit = defineEmits(segmentedEmits)

const ns = useNamespace('segmented')

const segmentedKls = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('block', props.block),
  ns.is('disabled', props.disabled),
])

const getItemValue = (item: string | number | boolean | Record<string, unknown>) => {
  return typeof item === 'object' ? item.value : item
}

const getItemDisabled = (item: string | number | boolean | Record<string, unknown>) => {
  return typeof item === 'object' ? item.disabled : false
}

const handleItemClick = (
  item: string | number | boolean | Record<string, unknown>,
  index: number
) => {
  if (props.disabled || getItemDisabled(item)) return

  const value = getItemValue(item)
  emit('update:modelValue', value)
  emit('change', value, index)
}

defineExpose({
  getItemValue,
})
</script>
