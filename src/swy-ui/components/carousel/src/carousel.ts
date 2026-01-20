import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const carouselProps = buildProps({
  /**
   * @description 当前激活的幻灯片索引
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description 走马灯的高度
   */
  height: {
    type: String,
    default: '',
  },
  /**
   * @description 指示器的触发方式
   */
  trigger: {
    type: String,
    values: ['hover', 'click'],
    default: 'hover',
  },
  /**
   * @description 是否自动切换
   */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自动切换的时间间隔
   */
  interval: {
    type: Number,
    default: 3000,
  },
  /**
   * @description 指示器的位置
   */
  indicatorPosition: {
    type: String,
    values: ['', 'outside', 'none'],
    default: '',
  },
  /**
   * @description 切换箭头的显示时机
   */
  arrow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: 'hover',
  },
} as const)

export const carouselEmits = {
  change: (_current: number, _prev: number) => true,
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselPropsPublic = ExtractPublicPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits
