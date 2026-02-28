/** File: loading.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const loadingProps = buildProps({
  /**
   * 是否显示加载遮罩
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 遮罩内的加载文案（为空则不显示文字）
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * 是否全屏显示（通过 teleport 挂载到 body，遮盖整个页面）
   * 为 false 时为局部加载，覆盖最近的定位祖先元素
   */
  fullscreen: {
    type: Boolean,
    default: false,
  },
  /**
   * 遮罩背景色（覆盖默认的半透明白色）
   * 例如：'rgba(0,0,0,0.8)'
   */
  background: {
    type: String,
    default: '',
  },
  /**
   * 旋转图标和文字的主色（覆盖默认主题色 --swy-color-primary）
   * 例如：'#409eff'
   */
  color: {
    type: String,
    default: '',
  },
  /**
   * 全屏加载时是否锁定页面滚动（防止用户滚动背后内容）
   */
  lock: {
    type: Boolean,
    default: false,
  },
} as const)

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
export type LoadingPropsPublic = ExtractPublicPropTypes<typeof loadingProps>
