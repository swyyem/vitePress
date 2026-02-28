/** File: loading.directive.ts - v-loading 指令 */

// ========== Dependencies Import ==========
import type { Directive } from 'vue'

// ────────────────────────────────────────────────────────────────
// 类型扩展：在 HTMLElement 上附加遮罩 DOM 引用，避免 any 类型
// ────────────────────────────────────────────────────────────────

/** 扩展 HTMLElement，挂载遮罩 DOM 引用 */
interface LoadingEl extends HTMLElement {
  __swyLoadingMask__?: HTMLElement
}

// ────────────────────────────────────────────────────────────────
// 常量
// ────────────────────────────────────────────────────────────────

/** 挂载到 el 上保存遮罩 DOM 引用的内部 key */
const MASK_KEY = '__swyLoadingMask__' as const

/** CSS class 前缀 */
const NS = 'swy'

// ────────────────────────────────────────────────────────────────
// DOM 工具函数
// ────────────────────────────────────────────────────────────────

/**
 * 创建加载遮罩 DOM 结构（纯 DOM 操作，无需 Vue 组件实例）。
 * 结构与 loading.vue 保持一致，复用同一套 SCSS。
 *
 * @param text  加载文案，为空时不渲染文字
 * @param color 自定义旋转颜色（覆盖 --swy-color-primary）
 */
function createMaskEl(text?: string, color?: string): HTMLElement {
  // 遮罩容器：.swy-loading-mask
  const mask = document.createElement('div')
  mask.className = `${NS}-loading-mask`

  // spinner 容器：.swy-loading-spinner
  const spinner = document.createElement('div')
  spinner.className = `${NS}-loading-spinner`

  // 若有自定义颜色，通过 CSS 变量注入
  if (color) {
    spinner.style.setProperty('--swy-color-primary', color)
  }

  // SVG 环形动画
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('class', 'circular')
  svg.setAttribute('viewBox', '0 0 50 50')

  const circle = document.createElementNS(svgNS, 'circle')
  circle.setAttribute('class', 'path')
  circle.setAttribute('cx', '25')
  circle.setAttribute('cy', '25')
  circle.setAttribute('r', '20')
  circle.setAttribute('fill', 'none')

  svg.appendChild(circle)
  spinner.appendChild(svg)

  // 可选文字：.swy-loading-text
  if (text) {
    const p = document.createElement('p')
    p.className = `${NS}-loading-text`
    p.textContent = text
    spinner.appendChild(p)
  }

  mask.appendChild(spinner)
  return mask
}

// ────────────────────────────────────────────────────────────────
// 显示 / 隐藏帮助函数
// ────────────────────────────────────────────────────────────────

function showMask(el: LoadingEl): void {
  // 读取扩展属性（data-loading-text / data-loading-color）
  const text = el.getAttribute('data-loading-text') || ''
  const color = el.getAttribute('data-loading-color') || ''

  const mask = createMaskEl(text, color)
  el[MASK_KEY] = mask

  // 若元素是 static 定位，补充 relative（保证 mask absolute 有参照）
  const pos = getComputedStyle(el).position
  if (!pos || pos === 'static') {
    el.classList.add(`${NS}-loading-parent--relative`)
  }

  // 防止滚动穿透
  el.classList.add(`${NS}-loading-parent--hidden`)
  el.appendChild(mask)
}

function hideMask(el: LoadingEl): void {
  const mask = el[MASK_KEY]
  if (mask && el.contains(mask)) {
    el.removeChild(mask)
  }
  el.classList.remove(`${NS}-loading-parent--hidden`)
}

// ────────────────────────────────────────────────────────────────
// 指令定义
// ────────────────────────────────────────────────────────────────

/**
 * v-loading 指令
 *
 * @example
 * <!-- 基础用法 -->
 * <div v-loading="isLoading">内容</div>
 *
 * <!-- 自定义文字和颜色 -->
 * <div v-loading="isLoading" data-loading-text="加载中..." data-loading-color="#f56c6c">
 *   内容
 * </div>
 */
export const vLoading: Directive<LoadingEl> = {
  mounted(el, binding) {
    if (binding.value) {
      showMask(el)
    }
  },

  updated(el, binding) {
    if (binding.value === binding.oldValue) return

    if (binding.value) {
      // 切换为 loading 状态：若 mask 不在 DOM 中则重建并插入
      if (!el[MASK_KEY] || !el.contains(el[MASK_KEY])) {
        showMask(el)
      }
    } else {
      // 切换为非 loading 状态：移除 mask
      hideMask(el)
    }
  },

  unmounted(el) {
    hideMask(el)
    el.classList.remove(`${NS}-loading-parent--relative`)
    delete el[MASK_KEY]
  },
}
