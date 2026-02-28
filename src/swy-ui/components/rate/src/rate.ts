/** File: rate.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const rateSizes = ['large', 'default', 'small'] as const

export const rateProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最大分数
   */
  max: {
    type: Number,
    default: 5,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否允许半选
   */
  allowHalf: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 尺寸
   */
  size: {
    type: String,
    values: rateSizes,
    default: 'default',
  },
  /**
   * @description 是否显示辅助文字
   */
  showText: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示当前分数
   */
  showScore: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 辅助文字颜色
   */
  textColor: {
    type: String,
    default: '',
  },
  /**
   * @description 辅助文字数组
   */
  texts: {
    type: definePropType<string[]>(Array),
    default: () => ['极差', '失望', '一般', '满意', '惊喜'],
  },
  /**
   * @description 分数显示模板
   */
  scoreTemplate: {
    type: String,
    default: '{value}',
  },
  /**
   * @description 图标颜色数组
   */
  colors: {
    type: definePropType<string[] | string>([Array, String]),
    default: () => ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
  },
  /**
   * @description 未选中图标颜色
   */
  voidColor: {
    type: String,
    default: '#C6D1DE',
  },
  /**
   * @description 只读时未选中图标颜色
   */
  disabledVoidColor: {
    type: String,
    default: '#EFF2F7',
  },
  /**
   * @description 自定义图标（空星）
   */
  voidIcon: {
    type: String,
    default: '☆',
  },
  /**
   * @description 自定义图标（满星）
   */
  icon: {
    type: String,
    default: '★',
  },
  /**
   * @description 低分图标类名
   */
  iconClasses: {
    type: definePropType<string[]>(Array),
    default: () => [],
  },
  /**
   * @description 是否可清空
   */
  clearable: {
    type: Boolean,
    default: false,
  },
} as const)

export const rateEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number',
}

export type RateProps = ExtractPropTypes<typeof rateProps>
export type RatePropsPublic = ExtractPublicPropTypes<typeof rateProps>
export type RateEmits = typeof rateEmits
