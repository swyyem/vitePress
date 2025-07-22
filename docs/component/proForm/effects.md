# 组件间的联动

<br>
<br>

## 控制 ProFormField 的属性配置

:::demo

```vue
<template>
  <ProForm
    ref="formRef"
    labelWidth="130px"
    :initialValues="formData"
    :submitter="false"
    :inline="false"
    :gutter="0"
    :columns="columns"
    :colon="true"
    @submit="handleSubmit"
    @valuesChange="handleChange"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

// 表单ref
const formRef = ref();
// 表单数据
const formData = ref({});

const handleSubmit = (values: any) => {
  console.log('提交数据：', values);
};

const handleChange = (newValues: any, values: any) => {
  console.log('valueChange', newValues, values);
  console.log('initialValues=', formData.value);
};

const comFieldProps = {
  filterable: true,
  placeholder: '请输入',
};
const patientEffect = [
  {
    // 控制的字段
    target: 'name',
    /** ProFormField 的属性配置 */
    decorator: {
      value: "ctx.$self.value === '123' ? '234' : '345'",
    },
  },
];

const columns = ref([
  {
    label: '病案号',
    name: 'patient',
    valueType: 'text',
    effects: patientEffect,
    colProps: {
      span: 24,
    },
    required: true,
    fieldProps: {
      ...comFieldProps,
    },
  },
  {
    label: '患者姓名',
    name: 'name',
    valueType: 'text',
    required: true,
    colProps: {
      span: 24,
    },
    fieldProps: {
      ...comFieldProps,
    },
  },
]);
</script>
```

:::

## 控制 ProFormField 内子组件的配置

:::demo

```vue
<template>
  <ProForm
    ref="formRef"
    labelWidth="130px"
    :initialValues="formData"
    :submitter="false"
    :inline="false"
    :gutter="0"
    :columns="columns"
    :colon="true"
    @submit="handleSubmit"
    @valuesChange="handleChange"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

// 表单ref
const formRef = ref();
// 表单数据
const formData = ref({});

const handleSubmit = (values: any) => {
  console.log('提交数据：', values);
};

const handleChange = (newValues: any, values: any) => {
  console.log('valueChange', newValues, values);
  console.log('initialValues=', formData.value);
};

const comFieldProps = {
  filterable: true,
  placeholder: '请输入',
};
const patientEffect = [
  {
    // 控制的字段
    target: 'name',
    /** ProFormField 内子组件的配置 */
    component: {
      placeholder: "ctx.$self.value === '123' ? '234' : '345'",
    },
  },
];

const columns = ref([
  {
    label: '病案号',
    name: 'patient',
    valueType: 'text',
    effects: patientEffect,
    colProps: {
      span: 24,
    },
    required: true,
    fieldProps: {
      ...comFieldProps,
    },
  },
  {
    label: '患者姓名',
    name: 'name',
    valueType: 'text',
    required: true,
    colProps: {
      span: 24,
    },
    fieldProps: {
      ...comFieldProps,
    },
  },
]);
</script>
```

:::

## 异步一对多的场景

:::demo

```vue
<template>
  <ProForm
    ref="formRef"
    labelWidth="130px"
    :initialValues="formData"
    :submitter="false"
    :inline="false"
    :gutter="0"
    :columns="columns"
    :colon="true"
    @submit="handleSubmit"
    @valuesChange="handleChange"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

// 表单ref
const formRef = ref();
// 表单数据
const formData = ref({});

const handleSubmit = (values: any) => {
  console.log('提交数据：', values);
};

const handleChange = (newValues: any, values: any) => {
  console.log('valueChange', newValues, values);
  console.log('initialValues=', formData.value);
};

const comFieldProps = {
  filterable: true,
  placeholder: '请输入',
};
const patientEffect = [
  {
    // 控制的字段
    target: 'name',
    /** 异步一对多的场景 */
    batchLogic: (value, { setFormValues, getValue }) => {
      console.log('value', value);
    },
  },
];

const columns = ref([
  {
    label: '病案号',
    name: 'patient',
    valueType: 'text',
    effects: patientEffect,
    colProps: {
      span: 24,
    },
    required: true,
    fieldProps: {
      ...comFieldProps,
    },
  },
  {
    label: '患者姓名',
    name: 'name',
    valueType: 'text',
    required: true,
    colProps: {
      span: 24,
    },
    fieldProps: {
      ...comFieldProps,
    },
  },
  {
    label: '患者性别',
    name: 'gender',
    valueType: 'text',
    required: true,
    colProps: {
      span: 24,
    },
    fieldProps: {
      ...comFieldProps,
    },
  },
]);
</script>
```

:::
