/** File: popover.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const popoverProps = buildProps({
  /**
   * 弹出框标题（为空则不渲染标题区域）
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 弹出框文字内容（也可通过 #content 插槽自定义）
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * 弹出框出现的位置，支持 12 个方向
   */
  placement: {
    type: String,
    values: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ] as const,
    default: 'bottom',
  },
  /**
   * 触发方式
   * - click：点击触发（默认，适合需要用户主动操作的场景）
   * - hover：鼠标悬停触发
   * - focus：聚焦触发（适合表单输入框旁的提示）
   */
  trigger: {
    type: String,
    values: ['click', 'hover', 'focus'],
    default: 'click',
  },
  /**
   * 弹出框宽度（数字单位为 px，也可传入 CSS 字符串如 '50%'）
   */
  width: {
    type: [String, Number],
    default: 200,
  },
  /**
   * 是否显示箭头指示器
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否禁用弹出框
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 弹出框与触发元素之间的间距（单位 px）
   */
  offset: {
    type: Number,
    default: 8,
  },
  /**
   * 延迟显示（单位毫秒，仅 hover 触发生效）
   */
  showAfter: {
    type: Number,
    default: 0,
  },
  /**
   * 延迟隐藏（单位毫秒，hover 触发时给鼠标滑入弹层的时间）
   * 设置为 0 表示立即隐藏
   */
  hideAfter: {
    type: Number,
    default: 200,
  },
} as const)

export const popoverEmits = {
  /** 弹出框显示时触发 */
  show: () => true,
  /** 弹出框隐藏时触发 */
  hide: () => true,
}

/** PopoverProps（内部使用） */
export type PopoverProps = ExtractPropTypes<typeof popoverProps>

/** PopoverProps（外部消费） */
export type PopoverPropsPublic = ExtractPublicPropTypes<typeof popoverProps>

/** PopoverEmits 类型 */
export type PopoverEmits = typeof popoverEmits
