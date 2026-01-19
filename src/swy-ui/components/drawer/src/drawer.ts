import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const drawerDirections = ['rtl', 'ltr', 'ttb', 'btt'] as const

export const drawerProps = buildProps({
  /**
   * @description 抽屉标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 抽屉打开的方向
   */
  direction: {
    type: String,
    values: drawerDirections,
    default: 'rtl',
  },
  /**
   * @description 抽屉的宽度/高度
   */
  size: {
    type: String,
    default: '30%',
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
   * @description Drawer 是否可见
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
} as const)

export const drawerEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  open: () => true,
  close: () => true,
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerPropsPublic = ExtractPublicPropTypes<typeof drawerProps>
export type DrawerEmits = typeof drawerEmits
