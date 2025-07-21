# 头像组件

:::demo

```vue
<template>
  <ProForm
    :autoFocusFirstInput="true"
    @submit="handleSubmit"
    @valuesChange="handleChange"
  >
    <ProFormField v-bind="IPropsData" />
  </ProForm>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const handleSubmit = (values: any) => {
  console.log("提交数据：", values);
};

const handleChange = (newValues: any, values: any) => {
  console.log("valueChange", newValues, values);
};

const userEffect = [
  {
    target: "name",
    decorator: {
      display: "ctx.$self.value === '123' ? 'none' : 'visible'",
    },
  },
];

const IPropsData = ref<any>({
  label: "用户名1",
  name: "username",
  effects: userEffect,
  valueType: "avatar",
  labelWidth: "80px",
  fieldProps: {
    size: 50,
    src: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  },
});
</script>
```

:::
