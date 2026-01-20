import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const popconfirmProps = buildProps({
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 确认按钮文字
   */
  confirmButtonText: {
    type: String,
    default: '确定',
  },
  /**
   * @description 取消按钮文字
   */
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  /**
   * @description 确认按钮类型
   */
  confirmButtonType: {
    type: String,
    values: ['primary', 'success', 'warning', 'danger', 'info'],
    default: 'primary',
  },
  /**
   * @description 图标
   */
  icon: {
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
} as const)

export const popconfirmEmits = {
  confirm: () => true,
  cancel: () => true,
}

export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>
export type PopconfirmPropsPublic = ExtractPublicPropTypes<typeof popconfirmProps>
export type PopconfirmEmits = typeof popconfirmEmits
