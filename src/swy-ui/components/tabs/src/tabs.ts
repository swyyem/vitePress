import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tabsProps = buildProps({
  /**
   * @description 当前激活的标签页
   */
  modelValue: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 标签页类型
   */
  type: {
    type: String,
    values: ['', 'card', 'border-card'],
    default: '',
  },
} as const)

export const tabsEmits = {
  'update:modelValue': (_value: string | number) => true,
  'tab-click': (_name: string | number) => true,
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsPropsPublic = ExtractPublicPropTypes<typeof tabsProps>
export type TabsEmits = typeof tabsEmits
