/** File: image.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const imageFits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const

export const imageProps = buildProps({
  /**
   * @description 图片源地址
   */
  src: {
    type: String,
    default: '',
  },
  /**
   * @description 图片如何适应容器
   */
  fit: {
    type: String,
    values: imageFits,
    default: '',
  },
  /**
   * @description 图片描述
   */
  alt: String,
  /**
   * @description 是否懒加载
   */
  lazy: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否可预览
   */
  preview: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 预览图片源列表
   */
  previewSrcList: {
    type: Array,
    default: () => [],
  },
  /**
   * @description 预览图片初始索引
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description 点击遮罩层是否可以关闭预览
   */
  previewTeleported: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 预览查看器层级
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 懒加载容器
   */
  scrollContainer: {
    type: [String, Object],
  },
} as const)

export const imageEmits = {
  load: (evt: Event) => evt instanceof Event,
  error: (evt: Event) => evt instanceof Event,
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImagePropsPublic = ExtractPublicPropTypes<typeof imageProps>
export type ImageEmits = typeof imageEmits

export type ImageFit = ImageProps['fit']
