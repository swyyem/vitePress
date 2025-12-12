/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3';
import { ElButton, ElRow } from 'element-plus';
import { ProForm, ProFormAutocomplete } from '../../index';
import type { ProFieldPropsType } from '../../proField/index.type';
import { ref, h } from 'vue';

interface LinkItem {
  value: string;
  link: string;
}
const links = ref<LinkItem[]>([
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' },
]);
const querySearch = (queryString: string, cb: (results: LinkItem[]) => void) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value;
  // call callback function to return suggestion objects
  cb(results);
};

const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const meta = {
  title: 'Example/ProFormFields/ProFormAutocomplete',
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
  username: 'v',
};

const IPropsData = ref<ProFieldPropsType>({
  mode: 'edit',
  params: 'a',

  debounceTime: 20000,
  fieldProps: {
    fetchSuggestions: querySearch,
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
    components: { ProFormAutocomplete, ProForm },
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
        <ProFormAutocomplete
          v-model="initialValues.username"
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
    components: { ProFormAutocomplete, ElButton, ProForm, ElRow },
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
        <ProFormAutocomplete
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
    components: { ProFormAutocomplete, ProForm },
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
    <h3>ElAutocomplete组件原生属性</h3>
      <ProForm
        :initialValues="initialValues"
        :submitter="submitter"
        :autoFocusFirstInput="true"
        @submit="handleSubmit"
        @valuesChange="handleChange"
      >
        <ProFormAutocomplete
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
    components: { ProFormAutocomplete, ProForm },
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
        <ProFormAutocomplete
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
    components: { ProFormAutocomplete, ProForm },
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
        <ProFormAutocomplete
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

// 支持饿了吗组件库原生插槽
export const Slots: Story = {
  render: () => ({
    components: { ProFormAutocomplete, ProForm },
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
        <ProFormAutocomplete
          v-model="initialValues.username"
          name="username"
          label="用户名1"
          label-width="80px"
          :effects="userEffect"
          v-bind="IPropsData"
          >
          <template #default>
            <div>vue1</div>
          </template>
          <template #prepend>
            <div>prefix之前</div>
          </template>
          <template #prefix>
            <div>前置内容</div>
          </template>
          <template #suffix>
            <div>后置内容</div>
          </template>
          <template #append>
            <div>suffix之后</div>
          </template>
          </ProFormAutocomplete>
      </ProForm>
    `,
  }),
};
