import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const scrollbarProps = buildProps({
  height: [String, Number],
  maxHeight: [String, Number],
  native: Boolean,
  wrapStyle: [String, Object, Array],
  wrapClass: [String, Array],
  viewClass: [String, Array],
  viewStyle: [String, Array],
  noresize: Boolean,
  tag: {
    type: String,
    default: 'div',
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20,
  },
} as const)

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
