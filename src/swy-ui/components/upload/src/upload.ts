/** File: upload.ts - 上传组件类型定义 */

import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, PropType } from 'vue'

// ========== 文件状态类型 ==========
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFileItem {
  uid: string
  name: string
  size: number
  type: string
  status: UploadStatus
  percent: number
  raw: File
  /** 图片预览 URL（picture / picture-card 模式自动生成） */
  url?: string
  /** 上传成功后服务端返回的响应 */
  response?: unknown
}

// ========== Props ==========
export const uploadProps = buildProps({
  /** 上传地址（不传则仅本地预览，不发送请求） */
  action: String,
  /** 是否允许多选 */
  multiple: Boolean,
  /** 是否禁用 */
  disabled: Boolean,
  /** 接受的文件类型，如 image/* */
  accept: String,
  /** 是否显示文件列表 */
  showFileList: {
    type: Boolean,
    default: true,
  },
  /** 是否开启拖拽上传 */
  drag: Boolean,
  /** 列表展示类型 */
  listType: {
    type: String as PropType<'text' | 'picture' | 'picture-card'>,
    default: 'text',
  },
  /** 初始文件列表（受控） */
  fileList: {
    type: Array as PropType<UploadFileItem[]>,
    default: () => [],
  },
  /** 是否自动上传（选择后立即上传） */
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /** 最大文件数量 */
  limit: Number,
  /** 超出数量限制的回调 */
  onExceed: Function as PropType<(files: File[], fileList: UploadFileItem[]) => void>,
  /** 上传前钩子，返回 false 或 Promise.reject 则中止上传 */
  beforeUpload: Function as PropType<(file: File) => boolean | Promise<boolean | File>>,
  /** 删除前钩子，返回 false 则中止删除 */
  beforeRemove: Function as PropType<
    (file: UploadFileItem, fileList: UploadFileItem[]) => boolean | Promise<boolean>
  >,
  /** 请求头 */
  headers: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
  /** 附带的额外 formData 字段 */
  data: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
  /** 文件在 FormData 中的字段名 */
  name: {
    type: String,
    default: 'file',
  },
  /** 是否携带 Cookie */
  withCredentials: Boolean,
} as const)

// ========== Emits ==========
export const uploadEmits = {
  /** 文件状态改变时 */
  change: (_file: UploadFileItem, _list: UploadFileItem[]) => true,
  /** 文件删除时 */
  remove: (_file: UploadFileItem, _list: UploadFileItem[]) => true,
  /** 超出 limit 时 */
  exceed: (_files: File[], _list: UploadFileItem[]) => true,
  /** 上传成功时 */
  success: (_response: unknown, _file: UploadFileItem, _list: UploadFileItem[]) => true,
  /** 上传失败时 */
  error: (_error: Error, _file: UploadFileItem, _list: UploadFileItem[]) => true,
  /** 上传进度时 */
  progress: (_event: ProgressEvent, _file: UploadFileItem, _list: UploadFileItem[]) => true,
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits
