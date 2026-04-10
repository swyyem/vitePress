/**
 * 预置页面模板
 */
import type { ComponentInstance } from './types'

export interface PageTemplate {
  name: string
  icon: string
  description: string
  factory: () => ComponentInstance[]
}

let _seq = 0
function id(): string {
  return `tpl_${Date.now()}_${++_seq}`
}

export const pageTemplates: PageTemplate[] = [
  {
    name: '登录表单',
    icon: '🔐',
    description: '包含输入框、密码框和登录按钮的标准登录页',
    factory: () => [
      {
        id: id(),
        type: 'SwyCard',
        props: { header: '用户登录', shadow: 'always' },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwyInput',
        props: { placeholder: '请输入用户名', size: 'large', clearable: true },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwyInput',
        props: { placeholder: '请输入密码', type: 'password', size: 'large', showPassword: true },
        slotContent: '',
      },
      { id: id(), type: 'SwyCheckbox', props: { label: '记住我' }, slotContent: '' },
      {
        id: id(),
        type: 'SwyButton',
        props: { type: 'primary', size: 'large', block: true },
        slotContent: '登 录',
      },
      {
        id: id(),
        type: 'SwyDivider',
        props: { direction: 'horizontal', 'content-position': 'center' },
        slotContent: '其他方式',
      },
      { id: id(), type: 'SwyLink', props: { type: 'primary' }, slotContent: '忘记密码？' },
    ],
  },
  {
    name: '数据仪表盘',
    icon: '📊',
    description: '统计卡片、进度条、标签组成的仪表盘页面',
    factory: () => [
      {
        id: id(),
        type: 'SwyAlert',
        props: {
          title: '欢迎回来！今日数据已更新',
          type: 'success',
          showIcon: true,
          closable: true,
        },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwyCard',
        props: { header: '本月销售额', shadow: 'hover' },
        slotContent: '¥ 128,560.00',
      },
      {
        id: id(),
        type: 'SwyProgress',
        props: { percentage: 72, status: 'success', strokeWidth: 12, textInside: true },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwyCard',
        props: { header: '用户活跃度', shadow: 'hover' },
        slotContent: '日活: 12,893',
      },
      {
        id: id(),
        type: 'SwyProgress',
        props: { percentage: 45, status: '', strokeWidth: 12, textInside: true },
        slotContent: '',
      },
      { id: id(), type: 'SwyDivider', props: { direction: 'horizontal' }, slotContent: '标签概览' },
      {
        id: id(),
        type: 'SwyTag',
        props: { type: 'success', effect: 'dark' },
        slotContent: '已完成 56',
      },
      {
        id: id(),
        type: 'SwyTag',
        props: { type: 'warning', effect: 'dark' },
        slotContent: '进行中 23',
      },
      {
        id: id(),
        type: 'SwyTag',
        props: { type: 'danger', effect: 'dark' },
        slotContent: '待处理 8',
      },
      {
        id: id(),
        type: 'SwyTag',
        props: { type: 'info', effect: 'dark' },
        slotContent: '已归档 120',
      },
    ],
  },
  {
    name: '详情展示页',
    icon: '📄',
    description: '适用于展示详情内容的结构化页面',
    factory: () => [
      {
        id: id(),
        type: 'SwyResult',
        props: {
          title: '提交成功',
          subTitle: '订单号: 2024070112345，预计3个工作日内发货',
          icon: 'success',
        },
        slotContent: '',
      },
      { id: id(), type: 'SwyDivider', props: { direction: 'horizontal' }, slotContent: '订单详情' },
      {
        id: id(),
        type: 'SwyCard',
        props: { header: '商品信息', shadow: 'never' },
        slotContent: 'Vue3 高级实战教程 × 1\n价格: ¥ 99.00',
      },
      {
        id: id(),
        type: 'SwyCard',
        props: { header: '收货地址', shadow: 'never' },
        slotContent: '张三 · 138****1234\n北京市朝阳区建国路88号',
      },
      { id: id(), type: 'SwyButton', props: { type: 'primary' }, slotContent: '查看物流' },
      { id: id(), type: 'SwyButton', props: { type: 'default' }, slotContent: '返回首页' },
    ],
  },
  {
    name: '表单收集页',
    icon: '📝',
    description: '多类型表单控件组合的信息收集页面',
    factory: () => [
      {
        id: id(),
        type: 'SwyAlert',
        props: { title: '请填写以下信息', type: 'info', showIcon: true, closable: false },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwyInput',
        props: { placeholder: '请输入姓名', clearable: true },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwyInput',
        props: { placeholder: '请输入邮箱', clearable: true },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwySelect',
        props: { placeholder: '请选择部门', clearable: true },
        slotContent: '',
      },
      {
        id: id(),
        type: 'SwyInput',
        props: { placeholder: '请输入备注信息', type: 'textarea' },
        slotContent: '',
      },
      { id: id(), type: 'SwyRadio', props: { label: '男', border: true }, slotContent: '' },
      { id: id(), type: 'SwyRadio', props: { label: '女', border: true }, slotContent: '' },
      {
        id: id(),
        type: 'SwySwitch',
        props: { activeText: '公开', inactiveText: '私密' },
        slotContent: '',
      },
      { id: id(), type: 'SwyRate', props: { max: 5, allowHalf: true }, slotContent: '' },
      { id: id(), type: 'SwyDivider', props: { direction: 'horizontal' }, slotContent: '' },
      {
        id: id(),
        type: 'SwyButton',
        props: { type: 'primary', size: 'large' },
        slotContent: '提交',
      },
      { id: id(), type: 'SwyButton', props: { size: 'large' }, slotContent: '重置' },
    ],
  },
]
