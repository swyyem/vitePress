/** File: loading.vue - Vue Component */

<template>
  <!--
    局部加载（默认）：用 swy-loading-container 包裹插槽内容，
    遮罩 position:absolute 叠在内容上方。
  -->
  <div v-if="!props.fullscreen" :class="ns.b('container')">
    <!-- 被覆盖的内容区域 -->
    <slot />

    <!-- 局部遮罩 -->
    <transition name="swy-loading-fade">
      <div v-if="props.loading" :class="ns.b('mask')" :style="maskStyle">
        <div :class="ns.b('spinner')" :style="spinnerStyle">
          <!-- 自定义 spinner 插槽，默认为 SVG 环形 -->
          <slot name="spinner">
            <svg class="circular" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" />
            </svg>
          </slot>
          <p v-if="props.text" :class="ns.b('text')">{{ props.text }}</p>
        </div>
      </div>
    </transition>
  </div>

  <!--
    全屏加载：遮罩通过 teleport 挂载到 body，
    不受父元素 overflow/z-index 影响，可真正覆盖整个页面。
  -->
  <teleport v-else to="body">
    <transition name="swy-loading-fade">
      <div v-if="props.loading" :class="[ns.b('mask'), ns.is('fullscreen')]" :style="maskStyle">
        <div :class="ns.b('spinner')" :style="spinnerStyle">
          <slot name="spinner">
            <svg class="circular" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" />
            </svg>
          </slot>
          <p v-if="props.text" :class="ns.b('text')">{{ props.text }}</p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { loadingProps } from './loading'

defineOptions({
  name: 'SwyLoading',
})

const props = defineProps(loadingProps)

// ── 命名空间（对应 SCSS @include b(loading-xxx)） ────────────────
const ns = useNamespace('loading')

// ── 遮罩背景样式 ────────────────────────────────────────────────
/** 若传了 background prop，则覆盖 SCSS 默认的半透明背景色 */
const maskStyle = computed(() => (props.background ? { backgroundColor: props.background } : {}))

// ── Spinner 颜色样式 ─────────────────────────────────────────────
/**
 * 通过局部覆盖 CSS 变量 --swy-color-primary 实现自定义颜色，
 * SCSS 里 .path 和 .swy-loading-text 均使用 getCssVar('color-primary')。
 */
const spinnerStyle = computed(() => (props.color ? { '--swy-color-primary': props.color } : {}))

// ── 全屏加载时锁定页面滚动 ──────────────────────────────────────
watch(
  () => props.loading && props.fullscreen && props.lock,
  shouldLock => {
    document.body.style.overflow = shouldLock ? 'hidden' : ''
  },
  { immediate: true }
)
</script>
