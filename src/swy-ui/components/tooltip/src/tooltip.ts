/** File: tooltip.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tooltipProps = buildProps({
  /**
   * 显示的文字内容
   * 也可通过 #content 插槽自定义内容
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * Tooltip 的出现位置
   */
  placement: {
    type: String,
    values: [
      'top',
      'bottom',
      'left',
      'right',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-start',
      'left-end',
      'right-start',
      'right-end',
    ] as const,
    default: 'top',
  },
  /**
   * 主题风格
   * - dark：深色背景（默认）
   * - light：白色背景 + 边框
   */
  effect: {
    type: String,
    values: ['dark', 'light'],
    default: 'dark',
  },
  /**
   * 是否禁用 Tooltip
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 延迟显示，单位毫秒
   * 鼠标移入后等待指定时间再显示
   */
  showAfter: {
    type: Number,
    default: 0,
  },
  /**
   * 延迟隐藏，单位毫秒
   * 鼠标移出后等待指定时间再隐藏（enterable 模式下也用此值）
   * 默认 0 表示立即隐藏
   */
  hideAfter: {
    type: Number,
    default: 0,
  },
  /**
   * Tooltip 与触发元素之间的间距（单位 px）
   */
  offset: {
    type: Number,
    default: 8,
  },
  /**
   * 鼠标是否可以进入 Tooltip 弹层
   * - true（默认）：鼠标可以移入 Tooltip，适用于内容可交互场景
   * - false：鼠标离开触发元素后立即触发隐藏逻辑
   */
  enterable: {
    type: Boolean,
    default: true,
  },
  /**
   * 手动控制显示状态
   * - null（默认）：由鼠标事件自动控制
   * - true / false：外部强制控制显示/隐藏
   */
  visible: {
    type: Boolean,
    default: null,
  },
} as const)

/** TooltipProps（内部使用） */
export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

/** TooltipProps（外部消费） */
export type TooltipPropsPublic = ExtractPublicPropTypes<typeof tooltipProps>
