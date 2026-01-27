<template>
  <div :class="rootKls">
    <div :class="colorsKls">
      <button
        v-for="(item, index) in rgbaColors"
        :key="rgbaColors[index].value"
        type="button"
        :disabled="disabled"
        :class="colorSelectorKls(item)"
        @click="handleSelect(index)"
      >
        <div :style="{ backgroundColor: item.value }" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions } from 'vue'
import { usePredefine, usePredefineDOM } from '../composables/use-predefine'
import type { Color } from '../utils/color'

defineOptions({
  name: 'SwyColorPredefine',
})

interface PredefineProps {
  colors: string[]
  color: Color
  enableAlpha: boolean
  disabled?: boolean
}

const props = defineProps<PredefineProps>()

const { rgbaColors, handleSelect } = usePredefine(props)
const { rootKls, colorsKls, colorSelectorKls } = usePredefineDOM(props)
</script>
