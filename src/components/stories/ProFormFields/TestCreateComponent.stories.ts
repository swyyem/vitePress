import type { Meta, StoryObj } from '@storybook/vue3'
import { ProField } from '../../index'
import { registerComponent } from '../../proField/utils'
import Carousel from './Carousel.vue'
import Breadcrumb from './Breadcrumb.vue'
import Dropdown from './Dropdown.vue'
// 注册单个自定义组件
registerComponent('Carousel', Carousel)
// 注册多个自定义组件
registerComponent({ Breadcrumb: Breadcrumb, Dropdown })

const meta = {
  title: 'Example/TestCreateProField',
  component: ProField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '基于 ElementPlus 封装的表单组件',
        story:
          '这是一个基础用法的示例，展示了如何使用 `ProField` 组件来创建一个Carousel。<br/>例如:<b>🌠单次注册</b>`registerComponent(name, component);`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>🌠批量注册</b>`registerComponent({name:component,...})`',
      },
      type: {
        // 自动生成类型文档
        showType: true,
        // 展开嵌套类型
        expandType: true,
      },
    },
  },
} satisfies Meta<typeof ProField>

export default meta
type Story = StoryObj<typeof ProField>

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { ProField },
    setup() {
      return {}
    },
    template: `
    <ProField valueType="Carousel"/>
    <ProField valueType="Breadcrumb"/>
    <ProField valueType="Dropdown"/>
    `,
  }),
}
