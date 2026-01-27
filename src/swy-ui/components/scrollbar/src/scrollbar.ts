import { buildProps, definePropType, isNumber } from '@swy-ui/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'
import type Scrollbar from './scrollbar.vue'

export const scrollbarProps = buildProps({
  /**
   * @description 触发距离 (px)
   */
  distance: {
    type: Number,
    default: 0,
  },
  /**
   * @description 滚动条高度
   */
  height: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 滚动条最大高度
   */
  maxHeight: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 是否使用原生滚动条
   */
  native: Boolean,
  /**
   * @description 包裹层样式
   */
  wrapStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: '',
  },
  /**
   * @description 包裹层类名
   */
  wrapClass: {
    type: [String, Array],
    default: '',
  },
  /**
   * @description 视图层类名
   */
  viewClass: {
    type: [String, Array],
    default: '',
  },
  /**
   * @description 视图层样式
   */
  viewStyle: {
    type: [String, Array, Object],
    default: '',
  },
  /**
   * @description 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能
   */
  noresize: Boolean,
  /**
   * @description 视图层的元素标签
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * @description 总是显示
   */
  always: Boolean,
  /**
   * @description 滚动条最小尺寸
   */
  minSize: {
    type: Number,
    default: 20,
  },
  /**
   * @description 包裹层 tabindex
   */
  tabindex: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description 视图层 id
   */
  id: String,
  /**
   * @description 视图层 role
   */
  role: String,
  /**
   * @description aria-label
   */
  ariaLabel: String,
  /**
   * @description aria-orientation
   */
  ariaOrientation: String,
} as const)

export const scrollbarEmits = {
  'end-reached': (direction: ScrollbarDirection) =>
    ['left', 'right', 'top', 'bottom'].includes(direction),
  scroll: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) =>
    [scrollTop, scrollLeft].every(isNumber),
}

export type ScrollbarEmits = typeof scrollbarEmits
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
export type ScrollbarDirection = 'top' | 'bottom' | 'left' | 'right'
export type ScrollbarInstance = InstanceType<typeof Scrollbar>
