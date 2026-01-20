import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const imageViewerProps = buildProps({
  modelValue: Boolean,
  urlList: {
    type: Array,
    default: () => [],
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
  infinite: {
    type: Boolean,
    default: true,
  },
  hideOnClickModal: Boolean,
  maskClosable: {
    type: Boolean,
    default: true,
  },
  zIndex: Number,
  zoomRate: {
    type: Number,
    default: 1.2,
  },
} as const)

export const imageViewerEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  close: () => true,
  switch: (index: number) => typeof index === 'number',
}

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>
export type ImageViewerEmits = typeof imageViewerEmits
