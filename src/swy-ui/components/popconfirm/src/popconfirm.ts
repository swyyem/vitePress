/** File: popconfirm.ts - TypeScript 类型定义 */

// ========== 依赖导入 ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

// ========== Props 定义 ==========
export const popconfirmProps = buildProps({
  /** 标题文案 */
  title: {
    type: String,
    default: '',
  },
  /** 确认按钮文字 */
  confirmButtonText: {
    type: String,
    default: '确定',
  },
  /** 取消按钮文字 */
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  /** 确认按钮类型 */
  confirmButtonType: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'primary',
  },
  /** 取消按钮类型 */
  cancelButtonType: {
    type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'default',
  },
  /** 图标类型：warning | question | '' */
  icon: {
    type: String as PropType<'warning' | 'question' | ''>,
    default: 'warning',
  },
  /** 图标颜色 */
  iconColor: {
    type: String,
    default: '#e6a23c',
  },
  /** 是否隐藏图标 */
  hideIcon: {
    type: Boolean,
    default: false,
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number],
    default: 200,
  },
  /** 弹出方位 */
  placement: {
    type: String as PropType<
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end'
    >,
    default: 'top',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否显示箭头 */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /** 弹出层与触发元素间距（px） */
  offset: {
    type: Number,
    default: 8,
  },
} as const)

// ========== Emits 定义 ==========
export const popconfirmEmits = {
  /** 点击确认按钮 */
  confirm: () => true,
  /** 点击取消按钮 */
  cancel: () => true,
}

// ========== 类型导出 ==========
export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>
export type PopconfirmPropsPublic = ExtractPublicPropTypes<typeof popconfirmProps>
export type PopconfirmEmits = typeof popconfirmEmits
