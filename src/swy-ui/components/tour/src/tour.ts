/** File: tour.ts - Tour 漫游引导组件 Props / Emits / 类型定义 */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, PropType } from 'vue'

// ────────────────────────────────────────────────────────────────
// 步骤定义接口
// ────────────────────────────────────────────────────────────────

/** 单个引导步骤的配置 */
export interface TourStep {
  /** 目标元素 CSS 选择器，如 '#my-btn'；为空时面板居中显示 */
  target?: string
  /** 步骤标题 */
  title?: string
  /** 步骤描述文案 */
  description?: string
  /**
   * 覆盖全局 placement，为本步骤单独指定弹出方位。
   * 支持 top / bottom / left / right 及其 start / end 变体，以及 center（居中）。
   */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'center'
  /** 附加字段，供自定义 slot 使用（如 icon、image 等） */
  [key: string]: unknown
}

// ────────────────────────────────────────────────────────────────
// Props 定义
// ────────────────────────────────────────────────────────────────

export const tourProps = buildProps({
  /** 是否显示（v-model 双向绑定） */
  modelValue: Boolean,

  /** 引导步骤列表 */
  steps: {
    type: Array as PropType<TourStep[]>,
    default: () => [],
  },

  /** 当前步骤索引（受控模式，外部传入时同步内部状态） */
  current: {
    type: Number,
    default: 0,
  },

  /** 是否显示背景遮罩和目标高亮框 */
  mask: {
    type: Boolean,
    default: true,
  },

  /** 点击遮罩区域是否关闭引导 */
  maskClosable: {
    type: Boolean,
    default: true,
  },

  /** 是否显示右上角关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },

  /** 按 ESC 是否关闭引导 */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },

  /** 是否显示箭头（指向目标元素） */
  showArrow: {
    type: Boolean,
    default: true,
  },

  /** 全局默认弹出方位，每步可通过 step.placement 单独覆盖 */
  placement: {
    type: String as PropType<TourStep['placement']>,
    default: 'bottom',
  },

  /** 主题类型：default（白底）或 primary（品牌色底） */
  type: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default',
  },

  /** 面板层叠顺序 */
  zIndex: {
    type: Number,
    default: 2000,
  },
} as const)

// ────────────────────────────────────────────────────────────────
// Emits 定义
// ────────────────────────────────────────────────────────────────

export const tourEmits = {
  /** v-model 更新 */
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  /** 步骤切换时触发，参数为新步骤索引 */
  change: (current: number) => typeof current === 'number',
  /** 点击关闭按钮 / 遮罩 / ESC 时触发，参数为当前步骤索引 */
  close: (current: number) => typeof current === 'number',
  /** 点击最后一步"完成"按钮时触发 */
  finish: () => true,
}

// ────────────────────────────────────────────────────────────────
// 类型导出
// ────────────────────────────────────────────────────────────────

export type TourProps = ExtractPropTypes<typeof tourProps>
export type TourEmits = typeof tourEmits
