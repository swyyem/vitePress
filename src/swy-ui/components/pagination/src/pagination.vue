/** File: pagination.vue - Vue Component */

<template>
  <div :class="[ns.b(), ns.m(small ? 'small' : ''), ns.is('background', background)]">
    <button class="btn-prev" :disabled="currentPage <= 1" @click="handlePrev">‹</button>
    <button
      v-for="page in pages"
      :key="page"
      :class="['swy-pager', { 'is-active': currentPage === page }]"
      @click="handleClick(page)"
    >
      {{ page }}
    </button>
    <button class="btn-next" :disabled="currentPage >= totalPages" @click="handleNext">›</button>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { paginationProps, paginationEmits } from './pagination'

defineOptions({
  name: 'SwyPagination',
})

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const ns = useNamespace('pagination')

const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

const pages = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  const result: number[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      result.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        result.push(i)
      }
    } else if (current >= total - 3) {
      for (let i = total - 4; i <= total; i++) {
        result.push(i)
      }
    } else {
      for (let i = current - 2; i <= current + 2; i++) {
        result.push(i)
      }
    }
  }

  return result
})

const handleClick = (page: number) => {
  if (page === props.currentPage) return
  emit('update:currentPage', page)
  emit('current-change', page)
}

const handlePrev = () => {
  if (props.currentPage > 1) {
    handleClick(props.currentPage - 1)
  }
}

const handleNext = () => {
  if (props.currentPage < totalPages.value) {
    handleClick(props.currentPage + 1)
  }
}
</script>
