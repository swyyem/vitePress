<template>
  <!-- 分页器根容器：hideOnSinglePage 为 true 且总页数只有一页时隐藏整个组件 -->
  <div
    v-if="!props.hideOnSinglePage || zongYeShu > 1"
    :class="[
      ns.b(),
      ns.m(props.small ? 'small' : ''),
      ns.is('background', props.background),
      ns.is('disabled', props.disabled),
    ]"
  >
    <!-- ===== 总条目数显示 ===== -->
    <span v-if="showTotal" :class="ns.e('total')" :disabled="props.disabled ? 'true' : undefined">
      共 {{ props.total }} 条
    </span>

    <!-- ===== 每页条数选择器 ===== -->
    <span v-if="showSizes" :class="ns.e('sizes')">
      <swy-select
        :model-value="props.pageSize"
        :options="pageSizeOptions"
        :disabled="props.disabled"
        :size="props.small ? 'small' : 'default'"
        @update:model-value="handleSizeChange"
      />
    </span>

    <!-- ===== 上一页按钮 ===== -->
    <!-- 注意：class 必须使用 btn-prev，与 SCSS 中 .btn-prev 选择器匹配 -->
    <button
      class="btn-prev"
      :disabled="props.disabled || props.currentPage <= 1"
      @click="handlePrev"
    >
      ‹
    </button>

    <!-- ===== 页码区域（受 layout 控制是否渲染） ===== -->
    <template v-if="showPager">
      <!-- 第一页（始终展示） -->
      <button
        v-if="zongYeShu > 0"
        :class="[
          'swy-pager',
          ns.is('active', props.currentPage === 1),
          ns.is('disabled', props.disabled),
        ]"
        :disabled="props.disabled"
        @click="handleClick(1)"
      >
        1
      </button>

      <!-- 前省略号（当前页距第一页超过阈值时显示，点击向前快速翻页） -->
      <button
        v-if="showPrevMore"
        class="swy-pager btn-quickprev"
        :disabled="props.disabled"
        @click="handlePrevMore"
      >
        •••
      </button>

      <!-- 中间页码按钮列表 -->
      <button
        v-for="page in zhongJianYeMa"
        :key="page"
        :class="[
          'swy-pager',
          ns.is('active', props.currentPage === page),
          ns.is('disabled', props.disabled),
        ]"
        :disabled="props.disabled"
        @click="handleClick(page)"
      >
        {{ page }}
      </button>

      <!-- 后省略号（当前页距最后一页超过阈值时显示，点击向后快速翻页） -->
      <button
        v-if="showNextMore"
        class="swy-pager btn-quicknext"
        :disabled="props.disabled"
        @click="handleNextMore"
      >
        •••
      </button>

      <!-- 最后一页（总页数 > 1 时始终展示） -->
      <button
        v-if="zongYeShu > 1"
        :class="[
          'swy-pager',
          ns.is('active', props.currentPage === zongYeShu),
          ns.is('disabled', props.disabled),
        ]"
        :disabled="props.disabled"
        @click="handleClick(zongYeShu)"
      >
        {{ zongYeShu }}
      </button>
    </template>

    <!-- ===== 下一页按钮 ===== -->
    <!-- 注意：class 必须使用 btn-next，与 SCSS 中 .btn-next 选择器匹配 -->
    <button
      class="btn-next"
      :disabled="props.disabled || props.currentPage >= zongYeShu"
      @click="handleNext"
    >
      ›
    </button>

    <!-- ===== 跳转器：前往第 N 页 ===== -->
    <span v-if="showJumper" :class="ns.e('jump')" :disabled="props.disabled ? 'true' : undefined">
      <span :class="ns.e('goto')">前往</span>
      <input
        v-model.number="jumperVal"
        :class="[ns.e('editor'), `${ns.namespace.value}-input__inner`]"
        type="number"
        :min="1"
        :max="zongYeShu"
        :disabled="props.disabled"
        @keydown.enter="handleJump"
        @blur="handleJump"
      />
      <span :class="ns.e('classifier')">页</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import SwySelect from '@swy-ui/components/select'
import type { SelectOption } from '@swy-ui/components/select'
import { paginationProps, paginationEmits } from './pagination'

// 注册组件名称
defineOptions({
  name: 'SwyPagination',
})

// 接收父组件传入的 props，声明组件事件
const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

// ========== 命名空间（BEM 类名生成工具） ==========
const ns = useNamespace('pagination')

// ========== 解析 layout 控制各区域显示/隐藏 ==========
/** showTotal - 是否显示总条目数（layout 包含 'total' 时显示） */
const showTotal = computed(() => props.layout.includes('total'))
/** showSizes - 是否显示每页条数选择器（layout 包含 'sizes' 时显示） */
const showSizes = computed(() => props.layout.includes('sizes'))
/** showPager - 是否显示页码区域（layout 包含 'pager' 时显示） */
const showPager = computed(() => props.layout.includes('pager'))
/** showJumper - 是否显示跳转器（layout 包含 'jumper' 时显示） */
const showJumper = computed(() => props.layout.includes('jumper'))

// ========== 跳转器本地状态 ==========
/** jumperVal - 跳转输入框的本地值，跟随 currentPage 同步 */
const jumperVal = ref(props.currentPage)
watch(
  () => props.currentPage,
  val => {
    jumperVal.value = val
  }
)

// ========== 每页条数选择器选项列表 ==========
/**
 * pageSizeOptions - 将 pageSizes 数组转换为 SwySelect 所需的 SelectOption 格式
 * 例：[10, 20] → [{ label: '10 条/页', value: 10 }, ...]
 */
const pageSizeOptions = computed<SelectOption[]>(() =>
  props.pageSizes.map(size => ({ label: `${size} 条/页`, value: size }))
)

// ========== 核心计算属性 ==========
/** zongYeShu - 总页数，total 为 0 或负数时返回 0 */
const zongYeShu = computed(() => {
  return props.total <= 0 ? 0 : Math.ceil(props.total / props.pageSize)
})

/**
 * zhongJianYeMa - 中间页码列表（不含第一页和最后一页）
 *   - 总页数 <= pagerCount + 2 时：直接展示所有中间页，无省略号
 *   - 否则：以当前页为中心，两侧各展示 halfPager 个页码
 */
const zhongJianYeMa = computed(() => {
  const total = zongYeShu.value // 总页数
  const current = props.currentPage // 当前页
  const pagerCount = props.pagerCount // 最大展示页码数（不含首尾）

  // 页数不多时，直接展示全部中间页（第 2 页到倒数第 2 页）
  if (total <= pagerCount + 2) {
    return Array.from({ length: Math.max(0, total - 2) }, (_, i) => i + 2)
  }

  const halfPager = Math.floor(pagerCount / 2) // 以当前页为中心，左右各展示的页码数
  let start = Math.max(2, current - halfPager)
  let end = Math.min(total - 1, current + halfPager)

  // 当前页靠近首部时，end 右移保证数量足够
  if (current - halfPager <= 1) {
    end = Math.min(total - 1, pagerCount)
  }

  // 当前页靠近尾部时，start 左移保证数量足够
  if (current + halfPager >= total) {
    start = Math.max(2, total - pagerCount + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
})

/** showPrevMore - 是否显示前省略号（中间页码首元素 > 2，说明前面有被省略的页） */
const showPrevMore = computed(() => {
  if (zongYeShu.value <= props.pagerCount + 2) return false
  return zhongJianYeMa.value.length > 0 && zhongJianYeMa.value[0] > 2
})

/** showNextMore - 是否显示后省略号（中间页码末元素 < 总页数 - 1，说明后面有被省略的页） */
const showNextMore = computed(() => {
  if (zongYeShu.value <= props.pagerCount + 2) return false
  const pages = zhongJianYeMa.value
  return pages.length > 0 && pages[pages.length - 1] < zongYeShu.value - 1
})

// ========== 事件处理函数 ==========
/**
 * handleClick - 点击页码按钮跳转至指定页
 * @param page 目标页码
 */
const handleClick = (page: number) => {
  if (page === props.currentPage || props.disabled) return
  // 边界保护：将页码限制在 [1, totalPages] 范围内
  const targetPage = Math.max(1, Math.min(page, zongYeShu.value))
  emit('update:currentPage', targetPage)
  emit('current-change', targetPage)
}

/** handlePrev - 点击上一页按钮 */
const handlePrev = () => {
  if (props.currentPage > 1 && !props.disabled) {
    handleClick(props.currentPage - 1)
  }
}

/** handleNext - 点击下一页按钮 */
const handleNext = () => {
  if (props.currentPage < zongYeShu.value && !props.disabled) {
    handleClick(props.currentPage + 1)
  }
}

/** handlePrevMore - 点击前省略号，向前快速翻 pagerCount 页 */
const handlePrevMore = () => {
  handleClick(Math.max(1, props.currentPage - props.pagerCount))
}

/** handleNextMore - 点击后省略号，向后快速翻 pagerCount 页 */
const handleNextMore = () => {
  handleClick(Math.min(zongYeShu.value, props.currentPage + props.pagerCount))
}

/**
 * handleSizeChange - 每页条数变更
 * @param val SwySelect 传回的新值（string | number）
 */
const handleSizeChange = (val: string | number) => {
  const newSize = Number(val)
  emit('update:pageSize', newSize)
  emit('size-change', newSize)
  // 切换每页条数后重置到第一页，防止当前页越界
  emit('update:currentPage', 1)
  emit('current-change', 1)
}

/** handleJump - 跳转器回车或失焦时执行跳转，跳转后还原 input 值 */
const handleJump = () => {
  const page = Number(jumperVal.value)
  if (!isNaN(page) && page >= 1) {
    handleClick(page)
  }
  // 还原显示值为真实当前页（防止无效输入残留）
  jumperVal.value = props.currentPage
}
</script>
