/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3';
import { ElButton, ElRow, ElIcon } from 'element-plus';
import { ProForm, ProField, ProFormTreeSelect } from '../../index';

import type { ProFieldPropsType } from '../../proField/index.type';
import { ref, h } from 'vue';
import { Calendar } from '@element-plus/icons-vue';

const options = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
];

const meta = {
  title: 'Example/ProFormFields/ProFormTreeSelect',
  component: ProForm,
  tags: ['autodocs'],
  argTypes: {
    submitter: {
      control: 'object',
      description: '表单底部的按钮配置',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '基于 ElementPlus 封装的表单组件',
      },
      type: {
        // 自动生成类型文档
        showType: true,
        // 展开嵌套类型
        expandType: true,
      },
    },
  },
} satisfies Meta<typeof ProForm>;

export default meta;
type Story = StoryObj<typeof ProForm>;

type FormValueType = Record<string, unknown>;

const handleSubmit = (values: FormValueType) => {
  console.log('提交数据：', values);
};

const handleChange = (newValues: FormValueType, values: FormValueType) => {
  console.log('valueChange', newValues, values);
  console.log('initialValues=', initialValues);
};

const userEffect = [
  {
    target: 'name',
    decorator: {
      display: "ctx.$self.value === '123' ? 'none' : 'visible'",
    },
  },
];

const submitter = {
  submitText: '提交',
  align: 'center',
};

// default
const initialValues = {
  username: 11,
};

const IPropsData = ref<ProFieldPropsType>({
  mode: 'edit',
  params: 'a',
  debounceTime: 20000,
  fieldProps: {
    options,
    placeholder: '请输入',
    clearable: true,
    onChange: (e: Event) => {
      console.log('onChange', e);
    },
  },
});

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { ProFormTreeSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
    setup() {
      return {
        handleSubmit,
        handleChange,
        userEffect,
        initialValues,
        submitter,
        IPropsData,
      };
    },
    template: `
    <h3>基础用法</h3>
      <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="true"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormTreeSelect
          v-model="initialValues.username"
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormTreeSelect>
      </ProForm>
    `,
  }),
};

// 基础用法
export const Mode: Story = {
  render: () => ({
    components: { ProFormTreeSelect, ElButton, ProForm, ProField, Calendar, ElIcon, ElRow },
    setup() {
      const cliBianji = (type: any) => {
        IPropsData.value.mode = type;
      };

      return {
        handleSubmit,
        handleChange,
        userEffect,
        initialValues,
        submitter,
        IPropsData,
        cliBianji,
      };
    },
    template: `
    <h3>编辑与只读</h3>
    <ElRow style="padding-bottom: 10px">
      <ElButton @click="() => { cliBianji('edit');}">编辑</ElButton>
      <ElButton @click="() => { cliBianji('read') }" type="primary">只读</ElButton>
    </ElRow>

      <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="true"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormTreeSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormTreeSelect>
      </ProForm>
    `,
  }),
};

// 基础用法
export const FieldProps: Story = {
  render: () => ({
    components: { ProFormTreeSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
    setup() {
      return {
        handleSubmit,
        handleChange,
        userEffect,
        initialValues,
        submitter,
        IPropsData,
      };
    },
    template: `
    <h3>ElInput组件原生属性</h3>
      <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="true"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormTreeSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormTreeSelect>
      </ProForm>
    `,
  }),
};

// renderFormItem属性用法
export const RenderFormItem: Story = {
  render: () => ({
    components: { ProFormTreeSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
    setup() {
      const IPropsData = ref<ProFieldPropsType>({
        renderFormItem: (text, props, node) => {
          console.log(node, text);
          //自定义
          return h('button', props, 111);
          // //保持不变
          // return h(node, props, () => text)
        },
      });
      const sizeForm = ref({ name: '@' });
      return {
        IPropsData,
        sizeForm,
      };
    },
    template: `
    <h3>renderFormItem属性用法</h3>
    <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormTreeSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormTreeSelect>
      </ProForm>
    `,
  }),
};

// render属性用法
export const Render: Story = {
  render: () => ({
    components: { ProFormTreeSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
    setup() {
      const IPropsData = ref<ProFieldPropsType>({
        render: (text, props) => {
          return h('div', props, 222 + '' + text);
        },
      });
      const sizeForm = ref({ name: '@' });
      return {
        IPropsData,
        sizeForm,
        userEffect,
      };
    },
    template: `
    <h3>render属性用法</h3>
    <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormTreeSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormTreeSelect>
      </ProForm>
    `,
  }),
};
