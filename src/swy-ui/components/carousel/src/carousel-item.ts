import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const carouselItemProps = buildProps({
  /**
   * @description 幻灯片的名字
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * @description 幻灯片的标题
   */
  label: {
    type: String,
    default: '',
  },
} as const)

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>
export type CarouselItemPropsPublic = ExtractPublicPropTypes<typeof carouselItemProps>
