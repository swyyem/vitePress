/** File: notification.vue - Vue Component */

<template>
  <transition name="swy-notification-fade">
    <div
      v-if="visible"
      :class="[ns.b(), type && ns.m(type), positionSide]"
      :style="positionStyle"
      role="alert"
    >
      <!-- 类型图标 -->
      <span v-if="type" :class="[ns.e('icon'), ns.is(type)]" aria-hidden="true">
        {{ typeIcon }}
      </span>

      <!-- 内容区域 -->
      <div :class="ns.e('group')">
        <h2 v-if="title" :class="ns.e('title')">{{ title }}</h2>
        <div :class="ns.e('content')">
          <slot>{{ message }}</slot>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <span v-if="showClose" :class="ns.e('closeBtn')" aria-label="关闭" @click="handleClose">
        ×
      </span>
    </div>
  </transition>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { ref, computed, onMounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { notificationProps, notificationEmits } from './notification'

defineOptions({
  name: 'SwyNotification',
})

const props = defineProps(notificationProps)
const emit = defineEmits(notificationEmits)

// ── 命名空间 ──────────────────────────────────────────────────────
const ns = useNamespace('notification')

// ── 显示状态 ──────────────────────────────────────────────────────
/** 控制通知是否可见（onMounted 时设为 true 以触发入场动画） */
const visible = ref(false)

// ── 动态偏移（支持多通知叠放重排）───────────────────────────────────
/**
 * 当前偏移量（px）。
 * 初始值来自 props.offset；命令式 API 在其他通知关闭后
 * 会调用 setOffset() 更新此值，触发 top/bottom 的平滑位移动画。
 */
const offsetValue = ref(props.offset)

// ── 计算属性 ──────────────────────────────────────────────────────

/**
 * 根据 position 提取左/右方向 class（供 CSS 入场动画匹配）：
 * SCSS 里 .swy-notification-fade-enter-from 依赖 &.right / &.left
 * 来决定从哪侧滑入，所以必须挂载纯粹的 "right" 或 "left" class。
 */
const positionSide = computed(() => (props.position.includes('right') ? 'right' : 'left'))

/**
 * fixed 定位样式：只设 top 或 bottom，水平方向由 SCSS .right/.left 处理。
 * 使用 offsetValue 而非 props.offset，以便叠放重排时平滑动画生效。
 */
const positionStyle = computed(() => ({
  [props.position.includes('top') ? 'top' : 'bottom']: `${offsetValue.value}px`,
}))

/** 类型对应的图标字符 */
const typeIcon = computed(() => {
  const iconMap: Record<string, string> = {
    success: '✓',
    warning: '！',
    info: 'i',
    error: '✕',
  }
  return iconMap[props.type] || ''
})

// ── 关闭逻辑 ──────────────────────────────────────────────────────
const handleClose = () => {
  visible.value = false
  emit('close')
}

// ── 生命周期 ──────────────────────────────────────────────────────
onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    setTimeout(handleClose, props.duration)
  }
})

// ── 暴露给命令式 API ──────────────────────────────────────────────
defineExpose({
  /** 手动关闭通知 */
  close: handleClose,
  /**
   * 更新偏移量（由 showNotification 在其他通知关闭后调用）
   * 会触发 CSS transition: top 0.4s 的平滑位移动画
   */
  setOffset: (val: number) => {
    offsetValue.value = val
  },
})
</script>
