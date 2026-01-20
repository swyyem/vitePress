import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const tabPaneProps = buildProps({
  /**
   * @description 标签页标题
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 标签页名称
   */
  name: {
    type: [String, Number],
    required: true,
  },
} as const)

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>
export type TabPanePropsPublic = ExtractPublicPropTypes<typeof tabPaneProps>
