import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const breadcrumbItemProps = buildProps({
  /**
   * @description 路由跳转目标
   */
  to: {
    type: [String, Object],
    default: '',
  },
} as const)

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>
export type BreadcrumbItemPropsPublic = ExtractPublicPropTypes<typeof breadcrumbItemProps>
