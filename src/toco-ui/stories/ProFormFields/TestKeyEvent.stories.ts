import type { Meta, StoryObj } from '@storybook/vue3';
import testKeyEvent from './testKeyEvent.vue';
import testKeyEvent1 from './testKeyEvent1.vue';
import ProFieldEvent from './ProFieldEvent.vue';

import { ElDivider } from 'element-plus';

const meta = {
  title: 'Example/TestKeyEvent',
  component: testKeyEvent,
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
} satisfies Meta<typeof testKeyEvent>;

export default meta;
type Story = StoryObj<typeof testKeyEvent>;

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { testKeyEvent, testKeyEvent1, ElDivider, ProFieldEvent },
    setup() {
      return {};
    },
    template: `
      <ElDivider>Enter Event</ElDivider>
      <testKeyEvent/>
      <ElDivider>ArrowRight Event</ElDivider>
      <testKeyEvent1/>
      <ElDivider>ProField Event</ElDivider>
      <ProFieldEvent/>
    `,
  }),
};
