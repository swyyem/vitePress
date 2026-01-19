import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const dialogProps = buildProps({
  /**
   * @description 对话框标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 对话框宽度
   */
  width: {
    type: String,
    default: '50%',
  },
  /**
   * @description 是否全屏显示
   */
  fullscreen: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示遮罩层
   */
  modal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否可以通过点击遮罩关闭
   */
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Dialog 是否可见
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
} as const)

export const dialogEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  open: () => true,
  close: () => true,
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogPropsPublic = ExtractPublicPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
