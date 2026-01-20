import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const pageHeaderProps = buildProps({
  icon: {
    type: definePropType<object>(Object),
  },
  title: String,
  content: String,
  back: {
    type: String,
    default: '返回',
  },
} as const)

export const pageHeaderEmits = {
  back: () => true,
}

export type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>
export type PageHeaderEmits = typeof pageHeaderEmits
