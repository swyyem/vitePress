/** File: steps.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

/**
 * SwySteps 组件 Props 定义
 * 控制步骤条的全局配置，所有子 SwyStep 通过 inject 读取这些配置
 */
export const stepsProps = buildProps({
  /** 当前激活的步骤索引（从 0 开始） */
  active: {
    type: Number,
    default: 0,
  },
  /** 步骤条方向 */
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
  /**
   * 每个步骤的固定宽度/高度
   * - 数字：单位为 px
   * - 字符串：任意 CSS 长度值（如 '200px', '25%'）
   * - 未设置则自动均分剩余空间
   */
  space: [String, Number],
  /** 已完成步骤的展示状态 */
  finishStatus: {
    type: String,
    default: 'finish',
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
  /** 当前进行中步骤的展示状态 */
  processStatus: {
    type: String,
    default: 'process',
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
  /** 是否居中对齐步骤的图标与标题 */
  alignCenter: Boolean,
  /** 是否使用简洁风格（步骤之间使用箭头分隔） */
  simple: Boolean,
} as const)

/**
 * SwySteps 组件 Emits 定义
 */
export const stepsEmits = {
  /**
   * active 变化时触发
   * @param newVal - 新的激活步骤索引
   * @param oldVal - 变化前的步骤索引
   */
  change: (_newVal: number, _oldVal: number) => true,
}

/** SwySteps Props 类型（内部使用） */
export type StepsProps = ExtractPropTypes<typeof stepsProps>

/** SwySteps Props 类型（外部消费） */
export type StepsPublicProps = ExtractPublicPropTypes<typeof stepsProps>

/** SwySteps Emits 类型 */
export type StepsEmits = typeof stepsEmits
