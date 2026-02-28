/** File: container.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const containerProps = buildProps({
  /**
   * @description 布局方向
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: '',
  },
} as const)

export type ContainerProps = ExtractPropTypes<typeof containerProps>
export type ContainerPropsPublic = ExtractPublicPropTypes<typeof containerProps>
