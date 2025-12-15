# 基础用法

<br>
<br>

:::demo

```vue
<template>
  <ElButton type="primary" @click="openModal">打开抽屉</ElButton>
  <DrawerForm
    ref="formRef"
    :open="open"
    title="弹窗"
    :formProps="formProps"
    :onOpenChange="handleChange"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

// 表单ref
const formRef = ref()
// 表单数据
const formData = ref({
  patientId: '123456',
})

const open = ref(false)

const openModal = () => {
  open.value = true
}

const handleChange = (val: boolean) => {
  open.value = val
}

const columns = ref([
  {
    label: '病案号',
    name: 'patientId',
    valueType: 'text',
    colProps: {
      span: 24,
    },
    required: true,
    fieldProps: {
      filterable: true,
      placeholder: '请输入',
      onChange: (val: string) => {
        console.log(formRef.value)
      },
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
  },
])

const formProps = {
  labelWidth: '100px',
  initialValues: formData,
  inline: false,
  gutter: 0,
  columns: columns.value,
  colon: true,
}
</script>
```
