# 级联选择器组件

:::demo

```vue
<template>
  <ProForm
    :initialValues="initialValues"
    :autoFocusFirstInput="true"
    @submit="handleSubmit"
    @valuesChange="handleChange"
  >
    <ProFormField v-model="initialValues.username" v-bind="IPropsData" />
  </ProForm>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const handleSubmit = (values: any) => {
  console.log('提交数据：', values)
}

const handleChange = (newValues: any, values: any) => {
  console.log('valueChange', newValues, values)
  console.log('initialValues=', initialValues)
}

const userEffect = [
  {
    target: 'name',
    decorator: {
      display: "ctx.$self.value === '123' ? 'none' : 'visible'",
    },
  },
]

// default
const initialValues = {
  username: 'consistency',
}

const props = {
  expandTrigger: 'hover' as const,
}

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
]

const IPropsData = ref<any>({
  name: 'username',
  label: '用户名1',
  effects: userEffect,
  valueType: 'cascader',
  labelWidth: '80px',
  fieldProps: {
    options: options,
    props: props,
  },
})
</script>
```

:::
