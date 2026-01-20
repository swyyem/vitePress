import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const uploadProps = buildProps({
  action: String,
  multiple: Boolean,
  disabled: Boolean,
  accept: String,
  showFileList: {
    type: Boolean,
    default: true,
  },
  drag: Boolean,
  listType: {
    type: String,
    default: 'text',
    values: ['text', 'picture', 'picture-card'],
  },
  fileList: {
    type: Array,
    default: () => [],
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  limit: Number,
  onExceed: Function,
  beforeUpload: Function,
  beforeRemove: Function,
  onRemove: Function,
  onChange: Function,
  onProgress: Function,
  onSuccess: Function,
  onError: Function,
} as const)

export const uploadEmits = {
  change: (_file: Record<string, unknown>, _fileList: Record<string, unknown>[]) => true,
  remove: (_file: Record<string, unknown>, _fileList: Record<string, unknown>[]) => true,
  exceed: (_files: Record<string, unknown>[], _fileList: Record<string, unknown>[]) => true,
  success: (
    _response: unknown,
    _file: Record<string, unknown>,
    _fileList: Record<string, unknown>[]
  ) => true,
  error: (_error: unknown, _file: Record<string, unknown>, _fileList: Record<string, unknown>[]) =>
    true,
  progress: (
    _event: unknown,
    _file: Record<string, unknown>,
    _fileList: Record<string, unknown>[]
  ) => true,
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits
