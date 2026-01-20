import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const popoverProps = buildProps({
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 显示的内容
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description 出现位置
   */
  placement: {
    type: String,
    values: ['top', 'bottom', 'left', 'right'],
    default: 'top',
  },
  /**
   * @description 触发方式
   */
  trigger: {
    type: String,
    values: ['click', 'hover'],
    default: 'hover',
  },
  /**
   * @description 宽度
   */
  width: {
    type: [String, Number],
    default: 150,
  },
  /**
   * @description 是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
} as const)

export const popoverEmits = {
  show: () => true,
  hide: () => true,
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverPropsPublic = ExtractPublicPropTypes<typeof popoverProps>
export type PopoverEmits = typeof popoverEmits
