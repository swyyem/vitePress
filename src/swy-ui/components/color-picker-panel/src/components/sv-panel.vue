/** File: sv-panel.vue - Vue Component */

<template>
  <div :class="rootKls" :style="rootStyle" @click="handleClick">
    <div
      ref="cursorRef"
      :class="cursorKls"
      :style="cursorStyle"
      :tabindex="disabled ? undefined : 0"
      role="slider"
      @keydown="handleKeydown"
    />
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { useSvPanel, useSvPanelDOM } from '../composables/use-sv-panel'
import Color from '../utils/color'

defineOptions({
  name: 'SwySvPanel',
})

interface SvPanelProps {
  color: Color
  disabled?: boolean
}

const props = defineProps<SvPanelProps>()

const { cursorRef, cursorTop, cursorLeft, background, handleClick, handleDrag, handleKeydown } =
  useSvPanel(props)

const { rootKls, cursorKls, rootStyle, cursorStyle, update } = useSvPanelDOM(props, {
  cursorTop,
  cursorLeft,
  background,
  handleDrag,
})

defineExpose({
  update,
})
</script>
