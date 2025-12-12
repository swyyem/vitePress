/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3';
import { ElButton, ElRow, ElCheckbox, ElCheckboxButton } from 'element-plus';
import { ProForm, ProFormCheckbox } from '../../index';

import type { ProFieldPropsType } from '../../proField/index.type';
import { ref, h } from 'vue';

const options = [
  { label: '全部1', value: 'all', disabled: true, status: 'Default', color: 'red' },
  { label: '未解决1', status: 'Error', color: 'red', value: 'open' },
  { label: '已解决1', value: 'closed' },
  {
    label: '解决中1',
    value: 'processing',
  },
];

const meta = {
  title: 'Example/ProFormFields/ProFormCheckbox',
  component: ProFormCheckbox,
  tags: ['autodocs'],
  argTypes: {},
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
} satisfies Meta<typeof ProFormCheckbox>;

export default meta;
type Story = StoryObj<typeof ProFormCheckbox>;

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
  align: 'center',
};

// default
const initialValues = {
  username: [''],
};

const IPropsData = ref<ProFieldPropsType>({
  mode: 'edit',
  params: 'a',
  debounceTime: 20000,
  valueEnum: options,
  fieldProps: {
    readContinue: true,
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
    components: { ProFormCheckbox, ProForm },
    setup() {
      const optionsFirst = [
        { label: '未解决1', status: 'Error', color: 'red', value: 'open' },
        { label: '已解决1', value: 'closed' },
        {
          label: '解决中1',
          value: 'processing',
        },
      ];
      const IPropsDataFirst = ref<ProFieldPropsType>({
        mode: 'edit',
        valueEnum: optionsFirst,
        fieldProps: {
          placeholder: '请输入',
          clearable: true,
          onChange: (e: Event) => {
            console.log('onChange', e);
          },
        },
      });
      const firstValues = {};
      return {
        handleSubmit,
        handleChange,
        userEffect,
        initialValues: firstValues,
        submitter,
        IPropsData: IPropsDataFirst,
      };
    },
    template: `
    <h3>基础用法</h3>
      <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormCheckbox
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          />
      </ProForm>
    `,
  }),
};

// 单个checkbox
export const SingleCheckbox: Story = {
  render: () => ({
    components: { ProFormCheckbox, ProForm },
    setup() {
      const boxProps = {
        fieldProps: {
          multiple: false,
          label: '测试',
          onChange: (e: Event) => {
            console.log('onChange', e);
          },
        },
      };
      const boxValues = {
        username: undefined,
      };
      const handleSgSubmit = (values: FormValueType) => {
        console.log('提交数据：', values);
      };

      const handleSgChange = (newValues: FormValueType, values: FormValueType) => {
        console.log('valueChange', newValues, values);
        console.log('initialValues=', boxValues);
      };
      return {
        handleSgSubmit,
        handleSgChange,
        userEffect,
        boxValues,
        submitter,
        boxProps,
      };
    },
    template: `
    <h3>单个 checkbox</h3>
      <ProForm
        :initialValues="boxValues"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSgSubmit"
        @valuesChange="handleSgChange"
      >
        <ProFormCheckbox
          name="username"
          label="是否选中"
          label-width="80px"
          :effects="userEffect"
          v-bind="boxProps"
          />
      </ProForm>
    `,
  }),
};

// 全选
export const CheckAll: Story = {
  render: () => ({
    components: { ProFormCheckbox, ProForm },
    setup() {
      const optionsFirst = [
        { label: '未解决1', status: 'Error', color: 'red', value: 'open' },
        { label: '已解决1', value: 'closed' },
        {
          label: '解决中1',
          value: 'processing',
        },
      ];
      const IPropsDataFirst = ref<ProFieldPropsType>({
        mode: 'edit',
        valueEnum: optionsFirst,
        fieldProps: {
          checkAll: true,
          gap: 6,
          checkAllText: '全选',
          placeholder: '请输入',
          clearable: true,
          onChange: (e: Event) => {
            console.log('onChange', e);
          },
        },
      });
      const firstValues = {};
      return {
        handleSubmit,
        handleChange,
        userEffect,
        initialValues: firstValues,
        submitter,
        IPropsData: IPropsDataFirst,
      };
    },
    template: `
    <h3>全选</h3>
      <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormCheckbox
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          />
      </ProForm>
    `,
  }),
};

// 编辑与只读
export const Mode: Story = {
  render: () => ({
    components: { ProFormCheckbox, ElButton, ProForm, ElRow },
    setup() {
      const cliBianji = (type: any) => {
        IPropsData.value.mode = type;
      };
      const editInitialValue = {
        username: ['open'],
      };
      return {
        handleSubmit,
        handleChange,
        userEffect,
        editInitialValue,
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
        :initialValues="editInitialValue"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormCheckbox
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          />
      </ProForm>
    `,
  }),
};

// fieldProps属性用法
export const FieldProps: Story = {
  render: () => ({
    components: { ProFormCheckbox, ElButton, ProForm },
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
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormCheckbox
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          />
      </ProForm>
    `,
  }),
};

// renderFormItem属性用法
export const RenderFormItem: Story = {
  render: () => ({
    components: { ProFormCheckbox, ProForm },
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
    <h3>renderFormItem属性用法</h3>
    <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormCheckbox
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          />
      </ProForm>
    `,
  }),
};

// render属性用法
export const Render: Story = {
  render: () => ({
    components: { ProFormCheckbox, ProForm },
    setup() {
      const IPropsData = ref<ProFieldPropsType>({
        mode: 'read',
        render: (text, props) => {
          return h('div', props, 222 + '' + text);
        },
      });
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
    <h3>render属性用法</h3>
    <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormCheckbox
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          />
      </ProForm>
    `,
  }),
};

// 基础用法
export const Slot: Story = {
  render: () => ({
    components: { ProFormCheckbox, ProForm, ElCheckbox, ElCheckboxButton },
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
        :autoFocusFirstInput="false"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormCheckbox
          v-model="initialValues.username"
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          <template #default>
            <ElCheckbox label="Option A" value="Value A" />
          </template>
          </ProFormCheckbox>
      </ProForm>
    `,
  }),
};
