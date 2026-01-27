# Autocomplete 自动完成

输入建议的输入框

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">搜索用户</div>
      <SwyAutocomplete
        v-model="value1"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      输入内容：{{ value1 }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')

const restaurants = [
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember.js' },
]

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.filter(item => item.label.toLowerCase().includes(queryString.toLowerCase()))
    : restaurants
  cb(results)
}

const handleSelect = (item: any) => {
  console.log('选中', item)
}
</script>
```

:::

## 自定义模

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyAutocomplete
      v-model="value2"
      :fetch-suggestions="querySearchAsync"
      placeholder="搜索技术栈"
    >
      <template #default="{ item }">
        <div style="display: flex; align-items: center; gap: 10px; padding: 5px 0;">
          <span style="font-size: 20px;">{{ item.icon }}</span>
          <div style="flex: 1;">
            <div style="font-weight: 500;">{{ item.label }}</div>
            <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
          </div>
        </div>
      </template>
    </SwyAutocomplete>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value2 = ref('')

const techStack = [
  { value: 'javascript', label: 'JavaScript', icon: '🟨', desc: '编程语言' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷', desc: 'JS超集' },
  { value: 'nodejs', label: 'Node.js', icon: '🟢', desc: '运行时环境' },
  { value: 'webpack', label: 'Webpack', icon: '📦', desc: '打包工具' },
  { value: 'vite', label: 'Vite', icon: '⚡', desc: '构建工具' },
]

const querySearchAsync = (queryString: string, cb: any) => {
  setTimeout(() => {
    const results = queryString
      ? techStack.filter(
          item =>
            item.label.toLowerCase().includes(queryString.toLowerCase()) ||
            item.desc.includes(queryString)
        )
      : techStack
    cb(results)
  }, 200)
}
</script>
```

:::

## 远程搜索

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">搜索城市</div>
      <SwyAutocomplete
        v-model="value3"
        :fetch-suggestions="fetchCities"
        placeholder="输入城市名称"
        :debounce="300"
      />
    </div>

    <div v-if="value3" style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      搜索：{{ value3 }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref('')

const cities = [
  { value: '北京', code: 'BJ' },
  { value: '上海', code: 'SH' },
  { value: '广州', code: 'GZ' },
  { value: '深圳', code: 'SZ' },
  { value: '杭州', code: 'HZ' },
  { value: '成都', code: 'CD' },
  { value: '重庆', code: 'CQ' },
  { value: '武汉', code: 'WH' },
]

const fetchCities = (queryString: string, cb: any) => {
  // 模拟远程搜索
  setTimeout(() => {
    const results = queryString
      ? cities.filter(
          item =>
            item.value.includes(queryString) ||
            item.code.toLowerCase().includes(queryString.toLowerCase())
        )
      : cities
    cb(results)
  }, 300)
}
</script>
```

:::

## API

### Autocomplete Props

| 参数                 | 说明               | 类型                                          | 默认  |
| -------------------- | ------------------ | --------------------------------------------- | ----- |
| modelValue / v-model | 绑定值             | `string`                                      |       |
| placeholder          | 占位文本           | `string`                                      |       |
| fetchSuggestions     | 获取建议的方法     | `(queryString: string, cb: Function) => void` |       |
| Debounce             | 去抖延迟，单位毫秒 | `number`                                      | 300   |
| disabled             | 是否禁用           | `boolean`                                     | false |
| clearable            | 是否可清空         | `boolean`                                     | false |

### Autocomplete Events

| 事件   | 说明                 | 参数              |
| ------ | -------------------- | ----------------- |
| select | 点击选中建议项时触发 | `(item)`          |
| change | 值改变时触发         | `(value: string)` |

### Autocomplete Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 自定义建议项内容 |
| prefix  | 输入框头部内容   |
| suffix  | 输入框尾部内容   |
