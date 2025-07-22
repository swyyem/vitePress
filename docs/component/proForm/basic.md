# 基础用法

<br>
<br>

:::demo

```vue
<template>
  <ProForm
    ref="formRef"
    labelWidth="130px"
    :initialValues="formData"
    :submitter="submitter"
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

const submitter = {
  submitText: '提交',
  align: 'center',
};

const columns = ref([
  {
    label: '病案号',
    name: 'patientId',
    valueType: 'text',
    colProps: {
      span: 12,
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
      span: 12,
    },
    fieldProps: {
      ...comFieldProps,
    },
  },
  {
    label: '身份证号',
    name: 'idNumber',
    valueType: 'text',
    colProps: {
      span: 12,
    },
    fieldProps: {
      ...comFieldProps,
    },
    required: true,
  },
  {
    label: '患者标签',
    name: 'patientTag',
    valueType: 'text',
    required: true,
    colProps: {
      span: 12,
    },
    fieldProps: {
      ...comFieldProps,
    },
  },
  {
    label: '人员类型',
    name: 'personType',
    valueType: 'text',
    required: true,
    colProps: {
      span: 12,
    },
    fieldProps: {
      ...comFieldProps,
    },
  },
  {
    label: '限制时间',
    name: 'limitTime',
    valueType: 'datePicker',
    required: true,
    colProps: {
      span: 12,
    },
    fieldProps: {
      ...comFieldProps,
      style: {
        width: '100%',
      },
      disabledDate: (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 忽略时间部分
        return date < today;
      },
    },
  },
  {
    label: '限制原因',
    valueType: 'text',
    name: 'limitReason',
    colProps: {
      span: 24,
    },
    fieldProps: {
      placeholder: '请输入',
      type: 'textarea',
    },
  },
]);
</script>
```
