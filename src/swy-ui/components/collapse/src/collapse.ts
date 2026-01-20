import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const collapseProps = buildProps({
  /**
   * @description 当前激活的面板
   */
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  /**
   * @description 是否手风琴模式
   */
  accordion: {
    type: Boolean,
    default: false,
  },
} as const)

export const collapseEmits = {
  'update:modelValue': (_value: string | number | (string | number)[]) => true,
  change: (_value: string | number | (string | number)[]) => true,
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapsePropsPublic = ExtractPublicPropTypes<typeof collapseProps>
export type CollapseEmits = typeof collapseEmits
