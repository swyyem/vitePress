<template>
  <span
    v-if="!disableTransitions"
    :class="classes"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <slot />
    <button
      v-if="closable"
      :class="ns.e('close')"
      type="button"
      :aria-label="'关闭标签'"
      @click.stop="handleClose"
    >
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        style="width: 1em; height: 1em; display: block"
      >
        <path
          fill="currentColor"
          d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        />
      </svg>
    </button>
  </span>
  <transition v-else name="swy-zoom-in-center" @after-leave="handleAfterLeave">
    <span v-if="!closed" :class="classes" :style="{ backgroundColor: color }" @click="handleClick">
      <slot />
      <button
        v-if="closable"
        :class="ns.e('close')"
        type="button"
        :aria-label="'关闭标签'"
        @click.stop="handleClose"
      >
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 1em; height: 1em; display: block"
        >
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          />
        </svg>
      </button>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tagProps, tagEmits } from './tag'

defineOptions({
  name: 'SwyTag',
})

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const ns = useNamespace('tag')
const closed = ref(false)

const classes = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.m(props.effect),
  ns.is('hit', props.hit),
  ns.is('round', props.round),
  ns.is('closable', props.closable),
])

const handleClose = (event: MouseEvent) => {
  closed.value = true
  emit('close', event)
}

const handleAfterLeave = () => {
  emit('close', new MouseEvent('close'))
}

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

defineExpose({
  closed,
})
</script>
