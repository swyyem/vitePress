# 自动补全输入框

:::demo

```vue
<template>
  <ProForm
    :initialValues="initialValues"
    :submitter="submitter"
    :autoFocusFirstInput="true"
    @submit="handleSubmit"
    @valuesChange="handleChange"
  >
    <ProFormField
      v-model="initialValues.username"
      name="username"
      label="用户名1"
      label-width="80px"
      :effects="userEffect"
      v-bind="IPropsData"
      valueType="autocomplete"
    />
  </ProForm>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const links = ref<any[]>([
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' },
])
const querySearch = (queryString: string, cb: (results: any[]) => void) => {
  const results = queryString ? links.value.filter(createFilter(queryString)) : links.value
  // call callback function to return suggestion objects
  cb(results)
}

const createFilter = (queryString: string) => {
  return (restaurant: any) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

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

const submitter = {
  submitText: '提交',
  align: 'center',
}

// default
const initialValues = {
  username: 'v',
}

const IPropsData = ref<any>({
  mode: 'edit',
  params: 'a',

  debounceTime: 20000,
  fieldProps: {
    fetchSuggestions: querySearch,
    placeholder: '请输入',
    clearable: true,
    onChange: (e: Event) => {
      console.log('onChange', e)
    },
  },
})
</script>
```
