/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3';
import { ElButton, ElRow, ElIcon } from 'element-plus';
import { ProForm, ProField, ProFormSelect } from '../../index';

import type { ProFieldPropsType } from '../../proField/index.type';
import { ref, h } from 'vue';
import { Calendar } from '@element-plus/icons-vue';

const options = [
  { label: '全部1', value: 'all', disabled: true, status: 'Default', color: 'red' },
  { label: '未解决1', status: 'Error', color: 'red', value: 'open' },
  { label: '已解决1', value: 'closed' },
  {
    label: '解决中1',
    value: 'processing',
  },
];
const getValueEnmu = (data: any) => {
  return [
    { label: `全部${data}`, value: 'all', disabled: true, status: 'Default', color: 'red' },
    { label: '未解决1', status: 'Error', color: 'red', value: 'open' },
    { label: '已解决1', value: 'closed' },
    {
      label: '解决中1',
      value: 'processing',
    },
  ];
};

const meta = {
  title: 'Example/ProFormFields/ProFormSelect',
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
    components: { ProFormSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
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
        <ProFormSelect
          v-model="initialValues.username"
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormSelect>
      </ProForm>
    `,
  }),
};

// 基础用法
export const Mode: Story = {
  render: () => ({
    components: { ProFormSelect, ElButton, ProForm, ProField, Calendar, ElIcon, ElRow },
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
        <ProFormSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormSelect>
      </ProForm>
    `,
  }),
};

// 基础用法
export const FieldProps: Story = {
  render: () => ({
    components: { ProFormSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
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
        <ProFormSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormSelect>
      </ProForm>
    `,
  }),
};

// renderFormItem属性用法
export const RenderFormItem: Story = {
  render: () => ({
    components: { ProFormSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
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
        <ProFormSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormSelect>
      </ProForm>
    `,
  }),
};

// render属性用法
export const Render: Story = {
  render: () => ({
    components: { ProFormSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
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
        <ProFormSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormSelect>
      </ProForm>
    `,
  }),
};

// ValueEnum属性用法
export const ValueEnum: Story = {
  render: () => ({
    components: { ProFormSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
    setup() {
      const putValueEnum = () => {
        const data = Math.random() * 99 + 1;
        IPropsData.value.valueEnum = getValueEnmu(data) as any;
      };
      const sizeForm = ref({ name: '@' });
      return {
        IPropsData,
        sizeForm,
        putValueEnum,
        userEffect,
      };
    },
    template: `
    <h3>ValueEnum属性用法</h3>
    <ElRow style="margin-bottom: 10px">
      <ElButton @click="putValueEnum">Put ValueEnum</ElButton>
    </ElRow>
    <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="true"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormSelect>
      </ProForm>
    `,
  }),
};

// Request属性用法
export const Request: Story = {
  render: () => ({
    components: { ProFormSelect, ElButton, ProForm, ProField, Calendar, ElIcon },
    setup() {
      const requestData = async (data: any) => {
        console.log('datadata', data.value);

        const res = await Promise.resolve([
          {
            label: `全部${data.value}`,
            value: 'all',
            disabled: true,
            status: 'Default',
            color: 'red',
          },
          {
            label: `未解决${data.value}`,
            value: 'open',
          },
          {
            label: `已解决${data.value}`,
            value: 'closed',
          },
          {
            label: `解决中${data.value}`,
            value: 'processing',
          },
        ]);
        return res;
      };
      const putRequest = () => {
        const data = Math.random() * 99 + 1;
        IPropsData.value.params = data.toString();
      };
      const IPropsData = ref<ProFieldPropsType>({
        mode: 'edit',
        params: 'a',
        debounceTime: 1000,
        fieldProps: {
          options,
          placeholder: '请输入',
          clearable: true,
          onChange: (e: Event) => {
            console.log('onChange', e);
          },
        },
        request: requestData,
      });
      return {
        IPropsData,
        putRequest,
        userEffect,
        initialValues,
        submitter,
        handleSubmit,
      };
    },
    template: `
    <h3>ValueEnum属性用法</h3>
    <ElRow style="margin-bottom: 10px">
      <ElButton @click="putRequest">Put Request</ElButton>
    </ElRow>
    <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="true"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormSelect
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          </ProFormSelect>
      </ProForm>
    `,
  }),
};
