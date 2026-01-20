import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const overlayProps = buildProps({
  visible: Boolean,
  mask: {
    type: Boolean,
    default: true,
  },
  zIndex: Number,
} as const)

export const overlayEmits = {
  click: () => true,
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayEmits = typeof overlayEmits
