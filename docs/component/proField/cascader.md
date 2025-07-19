# 级联选择器组件

:::demo

```vue
<template>
  <ProField
    valueType="cascader"
    v-model="value"
    :fieldProps="{
      options: options,
      props: props,
      onChange: handleChange,
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])

const props = {
  expandTrigger: 'hover' as const,
}

const handleChange = (value) => {
  console.log(value)
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
</script>
```
