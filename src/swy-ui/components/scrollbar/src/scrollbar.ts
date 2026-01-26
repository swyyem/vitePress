import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'

export const scrollbarProps = buildProps({
  height: {
    type: [String, Number],
  },
  maxHeight: {
    type: [String, Number],
  },
  native: Boolean,
  wrapStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
  },
  wrapClass: {
    type: [String, Array],
  },
  viewClass: {
    type: [String, Array],
  },
  viewStyle: {
    type: [String, Array],
  },
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

export const scrollbarEmits = {
  scroll: (_: { scrollTop: number; scrollLeft: number }) => true,
}

export type ScrollbarEmits = typeof scrollbarEmits
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
