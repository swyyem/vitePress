# 日期选择器组件

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
  username: '',
}

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const IPropsData = ref<any>({
  name: 'username',
  label: '用户名1',
  effects: userEffect,
  valueType: 'datePicker',
  labelWidth: '80px',
  fieldProps: {
    disabledDate: disabledDate,
  },
})
</script>
```

:::
