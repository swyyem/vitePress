import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const asideProps = buildProps({
  /**
   * @description 侧边栏宽度
   */
  width: {
    type: String,
    default: '300px',
  },
} as const)

export type AsideProps = ExtractPropTypes<typeof asideProps>
export type AsidePropsPublic = ExtractPublicPropTypes<typeof asideProps>
