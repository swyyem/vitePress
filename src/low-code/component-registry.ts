/**
 * swy-ui 组件注册表
 * 定义低代码平台可用的组件及其可配置属性
 */
import type { ComponentMeta } from './types'

export const componentRegistry: ComponentMeta[] = [
  /* ===================== 基础组件 ===================== */
  {
    type: 'SwyButton',
    label: '按钮',
    category: 'basic',
    icon: '🔘',
    props: [
      {
        key: 'type',
        label: '按钮类型',
        type: 'segment',
        defaultValue: 'default',
        group: 'style',
        options: [
          { label: '默认', value: 'default' },
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '信息', value: 'info' },
        ],
      },
      {
        key: 'size',
        label: '尺寸',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
      {
        key: 'slotContent',
        label: '按钮文字',
        type: 'input',
        defaultValue: '按钮',
        group: 'content',
      },
      { key: 'plain', label: '朴素按钮', type: 'switch', defaultValue: false, group: 'style' },
      { key: 'round', label: '圆角', type: 'switch', defaultValue: false, group: 'style' },
      { key: 'circle', label: '圆形', type: 'switch', defaultValue: false, group: 'style' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'loading', label: '加载中', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'block', label: '块级显示', type: 'switch', defaultValue: false, group: 'size' },
      { key: 'ghost', label: '幽灵按钮', type: 'switch', defaultValue: false, group: 'style' },
    ],
  },
  {
    type: 'SwyLink',
    label: '链接',
    category: 'basic',
    icon: '🔗',
    props: [
      {
        key: 'slotContent',
        label: '链接文字',
        type: 'input',
        defaultValue: '链接',
        group: 'content',
      },
      {
        key: 'type',
        label: '类型',
        type: 'segment',
        defaultValue: 'default',
        group: 'style',
        options: [
          { label: '默认', value: 'default' },
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '信息', value: 'info' },
        ],
      },
      { key: 'underline', label: '下划线', type: 'switch', defaultValue: true, group: 'style' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
    ],
  },
  {
    type: 'SwyTag',
    label: '标签',
    category: 'basic',
    icon: '🏷️',
    props: [
      {
        key: 'slotContent',
        label: '标签文字',
        type: 'input',
        defaultValue: '标签',
        group: 'content',
      },
      {
        key: 'type',
        label: '类型',
        type: 'segment',
        defaultValue: '',
        group: 'style',
        options: [
          { label: '默认', value: '' },
          { label: '成功', value: 'success' },
          { label: '信息', value: 'info' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
        ],
      },
      { key: 'closable', label: '可关闭', type: 'switch', defaultValue: false, group: 'behavior' },
      {
        key: 'effect',
        label: '主题',
        type: 'segment',
        defaultValue: 'light',
        group: 'style',
        options: [
          { label: '浅色', value: 'light' },
          { label: '深色', value: 'dark' },
          { label: '纯色', value: 'plain' },
        ],
      },
      { key: 'round', label: '圆角', type: 'switch', defaultValue: false, group: 'style' },
    ],
  },
  {
    type: 'SwyText',
    label: '文本',
    category: 'basic',
    icon: '📝',
    props: [
      {
        key: 'slotContent',
        label: '文本内容',
        type: 'textarea',
        defaultValue: '这是一段文本',
        group: 'content',
      },
      {
        key: 'type',
        label: '类型',
        type: 'segment',
        defaultValue: '',
        group: 'style',
        options: [
          { label: '默认', value: '' },
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '信息', value: 'info' },
        ],
      },
      {
        key: 'size',
        label: '尺寸',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
      { key: 'truncated', label: '截断', type: 'switch', defaultValue: false, group: 'style' },
      { key: 'tag', label: '标签名', type: 'input', defaultValue: 'span', group: 'advanced' },
    ],
  },
  {
    type: 'SwyDivider',
    label: '分割线',
    category: 'basic',
    icon: '➖',
    props: [
      {
        key: 'direction',
        label: '方向',
        type: 'segment',
        defaultValue: 'horizontal',
        group: 'style',
        options: [
          { label: '水平', value: 'horizontal' },
          { label: '垂直', value: 'vertical' },
        ],
      },
      { key: 'slotContent', label: '文字内容', type: 'input', defaultValue: '', group: 'content' },
      {
        key: 'content-position',
        label: '文字位置',
        type: 'segment',
        defaultValue: 'center',
        group: 'style',
        options: [
          { label: '左', value: 'left' },
          { label: '中', value: 'center' },
          { label: '右', value: 'right' },
        ],
      },
    ],
  },
  {
    type: 'SwyAvatar',
    label: '头像',
    category: 'basic',
    icon: '👤',
    props: [
      {
        key: 'size',
        label: '尺寸',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
      {
        key: 'shape',
        label: '形状',
        type: 'segment',
        defaultValue: 'circle',
        group: 'style',
        options: [
          { label: '圆形', value: 'circle' },
          { label: '方形', value: 'square' },
        ],
      },
      { key: 'src', label: '图片地址', type: 'input', defaultValue: '', group: 'content' },
      { key: 'slotContent', label: '文字内容', type: 'input', defaultValue: 'U', group: 'content' },
    ],
  },

  /* ===================== 表单组件 ===================== */
  {
    type: 'SwyInput',
    label: '输入框',
    category: 'form',
    icon: '✏️',
    props: [
      {
        key: 'placeholder',
        label: '占位文本',
        type: 'input',
        defaultValue: '请输入',
        group: 'content',
      },
      {
        key: 'type',
        label: '类型',
        type: 'segment',
        defaultValue: 'text',
        group: 'style',
        options: [
          { label: '文本', value: 'text' },
          { label: '密码', value: 'password' },
          { label: '文本域', value: 'textarea' },
          { label: '数字', value: 'number' },
        ],
      },
      {
        key: 'size',
        label: '尺寸',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
      { key: 'clearable', label: '可清空', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'readonly', label: '只读', type: 'switch', defaultValue: false, group: 'behavior' },
      {
        key: 'maxlength',
        label: '最大长度',
        type: 'number',
        defaultValue: undefined,
        group: 'advanced',
      },
      {
        key: 'showPassword',
        label: '密码切换',
        type: 'switch',
        defaultValue: false,
        group: 'behavior',
      },
    ],
  },
  {
    type: 'SwyInputNumber',
    label: '数字输入',
    category: 'form',
    icon: '🔢',
    props: [
      {
        key: 'placeholder',
        label: '占位文本',
        type: 'input',
        defaultValue: '请输入数字',
        group: 'content',
      },
      { key: 'min', label: '最小值', type: 'number', defaultValue: undefined, group: 'behavior' },
      { key: 'max', label: '最大值', type: 'number', defaultValue: undefined, group: 'behavior' },
      { key: 'step', label: '步长', type: 'number', defaultValue: 1, group: 'behavior' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'controls', label: '控制按钮', type: 'switch', defaultValue: true, group: 'style' },
    ],
  },
  {
    type: 'SwySelect',
    label: '选择器',
    category: 'form',
    icon: '📋',
    props: [
      {
        key: 'placeholder',
        label: '占位文本',
        type: 'input',
        defaultValue: '请选择',
        group: 'content',
      },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'clearable', label: '可清空', type: 'switch', defaultValue: false, group: 'behavior' },
      {
        key: 'size',
        label: '尺寸',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
    ],
  },
  {
    type: 'SwyRadio',
    label: '单选框',
    category: 'form',
    icon: '🔘',
    props: [
      { key: 'label', label: '标签文字', type: 'input', defaultValue: '选项', group: 'content' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'border', label: '边框', type: 'switch', defaultValue: false, group: 'style' },
      {
        key: 'size',
        label: '尺寸',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
    ],
  },
  {
    type: 'SwyCheckbox',
    label: '多选框',
    category: 'form',
    icon: '☑️',
    props: [
      { key: 'label', label: '标签文字', type: 'input', defaultValue: '选项', group: 'content' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'border', label: '边框', type: 'switch', defaultValue: false, group: 'style' },
      {
        key: 'indeterminate',
        label: '半选',
        type: 'switch',
        defaultValue: false,
        group: 'behavior',
      },
    ],
  },
  {
    type: 'SwySwitch',
    label: '开关',
    category: 'form',
    icon: '🔀',
    props: [
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      { key: 'activeText', label: '开启文本', type: 'input', defaultValue: '', group: 'content' },
      { key: 'inactiveText', label: '关闭文本', type: 'input', defaultValue: '', group: 'content' },
      {
        key: 'size',
        label: '尺寸',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
    ],
  },
  {
    type: 'SwySlider',
    label: '滑块',
    category: 'form',
    icon: '🎚️',
    props: [
      { key: 'min', label: '最小值', type: 'number', defaultValue: 0, group: 'behavior' },
      { key: 'max', label: '最大值', type: 'number', defaultValue: 100, group: 'behavior' },
      { key: 'step', label: '步长', type: 'number', defaultValue: 1, group: 'behavior' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      {
        key: 'showInput',
        label: '显示输入框',
        type: 'switch',
        defaultValue: false,
        group: 'style',
      },
    ],
  },
  {
    type: 'SwyRate',
    label: '评分',
    category: 'form',
    icon: '⭐',
    props: [
      { key: 'max', label: '最大分值', type: 'number', defaultValue: 5, group: 'behavior' },
      { key: 'disabled', label: '禁用', type: 'switch', defaultValue: false, group: 'behavior' },
      {
        key: 'allowHalf',
        label: '允许半选',
        type: 'switch',
        defaultValue: false,
        group: 'behavior',
      },
    ],
  },

  /* ===================== 数据展示 ===================== */
  {
    type: 'SwyCard',
    label: '卡片',
    category: 'data',
    icon: '🃏',
    isContainer: true,
    props: [
      { key: 'header', label: '标题', type: 'input', defaultValue: '卡片标题', group: 'content' },
      {
        key: 'shadow',
        label: '阴影',
        type: 'segment',
        defaultValue: 'always',
        group: 'style',
        options: [
          { label: '始终', value: 'always' },
          { label: '悬停', value: 'hover' },
          { label: '无', value: 'never' },
        ],
      },
      {
        key: 'slotContent',
        label: '内容',
        type: 'textarea',
        defaultValue: '卡片内容',
        group: 'content',
      },
    ],
  },
  {
    type: 'SwyAlert',
    label: '警告',
    category: 'data',
    icon: '⚠️',
    props: [
      { key: 'title', label: '标题', type: 'input', defaultValue: '提示信息', group: 'content' },
      { key: 'description', label: '描述', type: 'input', defaultValue: '', group: 'content' },
      {
        key: 'type',
        label: '类型',
        type: 'segment',
        defaultValue: 'info',
        group: 'style',
        options: [
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '信息', value: 'info' },
          { label: '错误', value: 'error' },
        ],
      },
      { key: 'closable', label: '可关闭', type: 'switch', defaultValue: true, group: 'behavior' },
      { key: 'showIcon', label: '显示图标', type: 'switch', defaultValue: false, group: 'style' },
      {
        key: 'effect',
        label: '主题',
        type: 'segment',
        defaultValue: 'light',
        group: 'style',
        options: [
          { label: '浅色', value: 'light' },
          { label: '深色', value: 'dark' },
        ],
      },
    ],
  },
  {
    type: 'SwyBadge',
    label: '徽章',
    category: 'data',
    icon: '🔴',
    props: [
      { key: 'value', label: '值', type: 'input', defaultValue: '1', group: 'content' },
      { key: 'max', label: '最大值', type: 'number', defaultValue: 99, group: 'behavior' },
      { key: 'isDot', label: '小圆点', type: 'switch', defaultValue: false, group: 'style' },
      { key: 'hidden', label: '隐藏', type: 'switch', defaultValue: false, group: 'behavior' },
      {
        key: 'type',
        label: '类型',
        type: 'segment',
        defaultValue: 'danger',
        group: 'style',
        options: [
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '信息', value: 'info' },
        ],
      },
      { key: 'slotContent', label: '内容', type: 'input', defaultValue: '内容', group: 'content' },
    ],
  },
  {
    type: 'SwyProgress',
    label: '进度条',
    category: 'data',
    icon: '📊',
    props: [
      { key: 'percentage', label: '百分比', type: 'number', defaultValue: 50, group: 'content' },
      {
        key: 'type',
        label: '类型',
        type: 'segment',
        defaultValue: 'line',
        group: 'style',
        options: [
          { label: '线形', value: 'line' },
          { label: '圆形', value: 'circle' },
          { label: '仪表盘', value: 'dashboard' },
        ],
      },
      {
        key: 'status',
        label: '状态',
        type: 'segment',
        defaultValue: '',
        group: 'style',
        options: [
          { label: '无', value: '' },
          { label: '成功', value: 'success' },
          { label: '异常', value: 'exception' },
          { label: '警告', value: 'warning' },
        ],
      },
      { key: 'strokeWidth', label: '宽度', type: 'number', defaultValue: 6, group: 'size' },
      { key: 'textInside', label: '文字内显', type: 'switch', defaultValue: false, group: 'style' },
    ],
  },
  {
    type: 'SwyEmpty',
    label: '空状态',
    category: 'data',
    icon: '📭',
    props: [
      {
        key: 'description',
        label: '描述',
        type: 'input',
        defaultValue: '暂无数据',
        group: 'content',
      },
      { key: 'imageSize', label: '图片大小', type: 'number', defaultValue: 100, group: 'size' },
    ],
  },
  {
    type: 'SwyResult',
    label: '结果页',
    category: 'data',
    icon: '✅',
    props: [
      { key: 'title', label: '标题', type: 'input', defaultValue: '操作成功', group: 'content' },
      {
        key: 'subTitle',
        label: '副标题',
        type: 'input',
        defaultValue: '请根据提示进行操作',
        group: 'content',
      },
      {
        key: 'icon',
        label: '图标类型',
        type: 'segment',
        defaultValue: 'success',
        group: 'style',
        options: [
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '信息', value: 'info' },
          { label: '错误', value: 'error' },
        ],
      },
    ],
  },

  /* ===================== 布局组件 ===================== */
  {
    type: 'SwyRow',
    label: '行容器',
    category: 'layout',
    icon: '📐',
    isContainer: true,
    props: [
      { key: 'gutter', label: '间距', type: 'number', defaultValue: 0, group: 'size' },
      {
        key: 'justify',
        label: '水平排列',
        type: 'select',
        defaultValue: 'start',
        group: 'size',
        options: [
          { label: '左对齐', value: 'start' },
          { label: '居中', value: 'center' },
          { label: '右对齐', value: 'end' },
          { label: '两端对齐', value: 'space-between' },
          { label: '等间距', value: 'space-around' },
          { label: '均匀分布', value: 'space-evenly' },
        ],
      },
      {
        key: 'align',
        label: '垂直对齐',
        type: 'segment',
        defaultValue: 'top',
        group: 'size',
        options: [
          { label: '顶部', value: 'top' },
          { label: '居中', value: 'middle' },
          { label: '底部', value: 'bottom' },
        ],
      },
    ],
  },
  {
    type: 'SwySpace',
    label: '间距',
    category: 'layout',
    icon: '↔️',
    isContainer: true,
    props: [
      {
        key: 'direction',
        label: '方向',
        type: 'segment',
        defaultValue: 'horizontal',
        group: 'size',
        options: [
          { label: '水平', value: 'horizontal' },
          { label: '垂直', value: 'vertical' },
        ],
      },
      {
        key: 'size',
        label: '间距大小',
        type: 'segment',
        defaultValue: 'default',
        group: 'size',
        options: [
          { label: '小', value: 'small' },
          { label: '默认', value: 'default' },
          { label: '大', value: 'large' },
        ],
      },
      { key: 'wrap', label: '自动换行', type: 'switch', defaultValue: false, group: 'behavior' },
    ],
  },

  /* ===================== 反馈组件 ===================== */
  {
    type: 'SwyDialog',
    label: '对话框',
    category: 'feedback',
    icon: '💬',
    isContainer: true,
    props: [
      { key: 'title', label: '标题', type: 'input', defaultValue: '对话框标题', group: 'content' },
      { key: 'width', label: '宽度', type: 'input', defaultValue: '50%', group: 'size' },
      { key: 'fullscreen', label: '全屏', type: 'switch', defaultValue: false, group: 'size' },
      {
        key: 'showClose',
        label: '关闭按钮',
        type: 'switch',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'closeOnClickModal',
        label: '点击遮罩关闭',
        type: 'switch',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'slotContent',
        label: '内容',
        type: 'textarea',
        defaultValue: '对话框内容',
        group: 'content',
      },
    ],
  },
]

/** 根据类型获取组件元信息 */
export function getComponentMeta(type: string): ComponentMeta | undefined {
  return componentRegistry.find(c => c.type === type)
}

/** 按分类分组 */
export function getGroupedComponents(): Record<string, ComponentMeta[]> {
  const groups: Record<string, ComponentMeta[]> = {}
  for (const comp of componentRegistry) {
    if (!groups[comp.category]) groups[comp.category] = []
    groups[comp.category].push(comp)
  }
  return groups
}
