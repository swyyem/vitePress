<template>
  <span :class="checkTagKls" @click="handleClick">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { checkTagEmits, checkTagProps } from './check-tag'

defineOptions({
  name: 'SwyCheckTag',
})

const props = defineProps(checkTagProps)
const emit = defineEmits(checkTagEmits)

const ns = useNamespace('check-tag')

const checkTagKls = computed(() => [ns.b(), ns.is('checked', props.checked)])

const handleClick = () => {
  if (!props.disabled) {
    emit('update:checked', !props.checked)
    emit('change', !props.checked)
  }
}
</script>
