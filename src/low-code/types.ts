/**
 * 低代码平台类型定义
 */

/** 属性编辑器类型 */
export type PropEditorType =
  | 'input'
  | 'number'
  | 'select'
  | 'switch'
  | 'color'
  | 'textarea'
  | 'radio'
  | 'segment'

/** 属性分组类型 */
export type PropGroup = 'content' | 'style' | 'size' | 'behavior' | 'advanced'

/** 分组名称映射 */
export const PROP_GROUP_LABELS: Record<PropGroup, string> = {
  content: '内容',
  style: '外观样式',
  size: '尺寸布局',
  behavior: '交互行为',
  advanced: '高级',
}

/** 分组图标映射 */
export const PROP_GROUP_ICONS: Record<PropGroup, string> = {
  content: '📝',
  style: '🎨',
  size: '📐',
  behavior: '⚡',
  advanced: '🔧',
}

/** 属性配置项 */
export interface PropConfig {
  /** 属性名 */
  key: string
  /** 显示标签 */
  label: string
  /** 编辑器类型 */
  type: PropEditorType
  /** 默认值 */
  defaultValue?: unknown
  /** 选项列表（select/radio/segment 类型使用） */
  options?: Array<{ label: string; value: string | number | boolean }>
  /** 属性描述 */
  tips?: string
  /** 属性分组 */
  group?: PropGroup
}

/** 组件注册信息 */
export interface ComponentMeta {
  /** 组件类型标识 */
  type: string
  /** 显示名称 */
  label: string
  /** 分类 */
  category: 'basic' | 'form' | 'data' | 'layout' | 'feedback' | 'navigation'
  /** 图标（emoji 或 class） */
  icon: string
  /** 可配置的属性列表 */
  props: PropConfig[]
  /** 默认子节点（如容器类） */
  defaultChildren?: string
  /** 是否为容器（可嵌套子组件） */
  isContainer?: boolean
}

/** 自定义样式配置 */
export interface CustomStyle {
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  backgroundColor?: string
  borderRadius?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  opacity?: string
  boxShadow?: string
  display?: string
}

/** 样式属性描述 */
export interface StyleField {
  key: keyof CustomStyle
  label: string
  type: 'text' | 'color' | 'select'
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  group: 'spacing' | 'sizing' | 'appearance' | 'border'
}

/** 样式分组 */
export const STYLE_GROUPS: Record<string, string> = {
  spacing: '📏 间距',
  sizing: '📐 尺寸',
  appearance: '🎨 外观',
  border: '🔲 边框',
}

/** 可配置的样式字段 */
export const STYLE_FIELDS: StyleField[] = [
  { key: 'marginTop', label: '上外距', type: 'text', placeholder: '如 8px', group: 'spacing' },
  { key: 'marginBottom', label: '下外距', type: 'text', placeholder: '如 8px', group: 'spacing' },
  { key: 'marginLeft', label: '左外距', type: 'text', placeholder: '如 8px', group: 'spacing' },
  { key: 'marginRight', label: '右外距', type: 'text', placeholder: '如 8px', group: 'spacing' },
  { key: 'paddingTop', label: '上内距', type: 'text', placeholder: '如 12px', group: 'spacing' },
  { key: 'paddingBottom', label: '下内距', type: 'text', placeholder: '如 12px', group: 'spacing' },
  { key: 'paddingLeft', label: '左内距', type: 'text', placeholder: '如 12px', group: 'spacing' },
  { key: 'paddingRight', label: '右内距', type: 'text', placeholder: '如 12px', group: 'spacing' },
  { key: 'width', label: '宽度', type: 'text', placeholder: '如 100% 或 200px', group: 'sizing' },
  { key: 'height', label: '高度', type: 'text', placeholder: '如 auto 或 120px', group: 'sizing' },
  { key: 'minWidth', label: '最小宽度', type: 'text', placeholder: '如 100px', group: 'sizing' },
  { key: 'maxWidth', label: '最大宽度', type: 'text', placeholder: '如 600px', group: 'sizing' },
  { key: 'backgroundColor', label: '背景色', type: 'color', group: 'appearance' },
  { key: 'opacity', label: '透明度', type: 'text', placeholder: '0~1', group: 'appearance' },
  {
    key: 'boxShadow',
    label: '阴影',
    type: 'text',
    placeholder: '如 0 2px 8px rgba(0,0,0,.1)',
    group: 'appearance',
  },
  { key: 'borderRadius', label: '圆角', type: 'text', placeholder: '如 8px', group: 'border' },
  { key: 'borderWidth', label: '边框宽度', type: 'text', placeholder: '如 1px', group: 'border' },
  { key: 'borderColor', label: '边框颜色', type: 'color', group: 'border' },
  {
    key: 'borderStyle',
    label: '边框样式',
    type: 'select',
    group: 'border',
    options: [
      { label: '无', value: '' },
      { label: '实线', value: 'solid' },
      { label: '虚线', value: 'dashed' },
      { label: '点线', value: 'dotted' },
    ],
  },
  {
    key: 'display',
    label: '显示方式',
    type: 'select',
    group: 'appearance',
    options: [
      { label: '默认', value: '' },
      { label: '块级', value: 'block' },
      { label: '行内', value: 'inline-block' },
      { label: '弹性', value: 'flex' },
      { label: '隐藏', value: 'none' },
    ],
  },
]

/** 画布上的组件实例 */
export interface ComponentInstance {
  /** 唯一 ID */
  id: string
  /** 组件类型（对应 ComponentMeta.type） */
  type: string
  /** 当前属性值 */
  props: Record<string, unknown>
  /** 子组件（容器类） */
  children?: ComponentInstance[]
  /** 插槽内容（简单文本） */
  slotContent?: string
  /** 自定义样式覆盖 */
  customStyle?: CustomStyle
  /** 是否锁定（防止误操作） */
  locked?: boolean
}

/** 页面 Schema */
export interface PageSchema {
  /** 页面标题 */
  title: string
  /** 组件列表 */
  components: ComponentInstance[]
}

/** 分类名称映射 */
export const CATEGORY_LABELS: Record<ComponentMeta['category'], string> = {
  basic: '基础组件',
  form: '表单组件',
  data: '数据展示',
  layout: '布局组件',
  feedback: '反馈组件',
  navigation: '导航组件',
}
