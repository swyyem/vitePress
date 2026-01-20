import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const backtopProps = buildProps({
  target: String,
  visibilityHeight: {
    type: Number,
    default: 200,
  },
  right: {
    type: [Number, String],
    default: 40,
  },
  bottom: {
    type: [Number, String],
    default: 40,
  },
} as const)

export const backtopEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type BacktopProps = ExtractPropTypes<typeof backtopProps>
export type BacktopEmits = typeof backtopEmits
