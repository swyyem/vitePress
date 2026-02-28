/** File: step.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

/**
 * SwyStep 单步骤组件 Props 定义
 * 可覆盖父级 SwySteps 自动计算的状态
 */
export const stepProps = buildProps({
  /** 步骤标题（也可通过 #title 插槽自定义） */
  title: String,
  /** 步骤描述文字（也可通过 #description 插槽自定义） */
  description: String,
  /**
   * 自定义图标（字符串或 emoji）
   * - 设置后使用 is-icon 样式（较大字体），不显示步骤序号
   * - 也可通过 #icon 插槽传入自定义图标组件
   */
  icon: String,
  /**
   * 手动指定该步骤的状态（优先级高于父级自动计算）
   * - wait：等待执行
   * - process：进行中（当前步骤默认状态）
   * - finish：已完成（已过步骤默认状态）
   * - error：出错
   * - success：成功
   */
  status: {
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
  },
} as const)

/** SwyStep Props 类型（内部使用） */
export type StepProps = ExtractPropTypes<typeof stepProps>

/** SwyStep Props 类型（外部消费） */
export type StepPublicProps = ExtractPublicPropTypes<typeof stepProps>
