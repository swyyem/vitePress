import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const mainProps = buildProps({} as const)

export type MainProps = ExtractPropTypes<typeof mainProps>
export type MainPropsPublic = ExtractPublicPropTypes<typeof mainProps>
