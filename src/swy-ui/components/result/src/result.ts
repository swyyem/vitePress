/** File: result.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const resultTypes = ['success', 'warning', 'info', 'error'] as const

export const resultProps = buildProps({
  /**
   * @description 结果类型
   */
  type: {
    type: String,
    values: resultTypes,
    default: 'info',
  },
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 副标题
   */
  subTitle: {
    type: String,
    default: '',
  },
  /**
   * @description 自定义图标
   */
  icon: String,
} as const)

export type ResultProps = ExtractPropTypes<typeof resultProps>
export type ResultPropsPublic = ExtractPublicPropTypes<typeof resultProps>

export type ResultType = ResultProps['type']
