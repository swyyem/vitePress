# Select 选择�?

当选项过多时，使用下拉菜单展示并选择内容�?

## 基础用法

适用广泛的基础单选�?
:::demo

```vue
<template>
  <div>
    <SwySelect v-model="value1" :options="options1" placeholder="请选择" @change="handleChange" />
    <p>选中的�? {{ value1 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const options1 = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' },
])

const handleChange = val => {
  console.log('select changed:', val)
}
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Select"
      v-model="value1"
      :filedProps="{ options: options1, placeholder: '请选择' }"
      @change="handleChange"
    />
    <p>选中的�? {{ value1 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const options1 = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' },
])

const handleChange = val => {
  console.log('select changed:', val)
}
</script>
```

:::

## 有禁用选项

:::demo

```vue
<template>
  <div>
    <SwySelect v-model="value2" :options="options2" placeholder="请选择" />
    <p>选中的�? {{ value2 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value2 = ref('')
const options2 = ref([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai', disabled: true },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen', disabled: true },
  { label: '杭州', value: 'hangzhou' },
])
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Select"
      v-model="value2"
      :filedProps="{ options: options2, placeholder: '请选择' }"
    />
    <p>选中的�? {{ value2 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value2 = ref('')
const options2 = ref([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai', disabled: true },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen', disabled: true },
  { label: '杭州', value: 'hangzhou' },
])
</script>
```

:::

## 禁用状�?

整个选择器禁用�?
:::demo

```vue
<template>
  <div>
    <SwySelect v-model="value3" :options="options3" placeholder="请选择" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref('option1')
const options3 = ref([
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
])
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Select"
      v-model="value3"
      :filedProps="{ options: options3, placeholder: '请选择', disabled: true }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref('option1')
const options3 = ref([
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
])
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <SwySelect v-model="value4" :options="sizeOptions" placeholder="大尺�? size="large" />
    <SwySelect v-model="value4" :options="sizeOptions" placeholder="默认尺寸" size="default" />
    <SwySelect v-model="value4" :options="sizeOptions" placeholder="小尺�? size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value4 = ref('')
const sizeOptions = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
])
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <ProField
      valueType="Select"
      v-model="value4"
      :filedProps="{ options: sizeOptions, placeholder: '大尺�?, size: 'large' }"
    />
    <ProField
      valueType="Select"
      v-model="value4"
      :filedProps="{ options: sizeOptions, placeholder: '默认尺寸', size: 'default' }"
    />
    <ProField
      valueType="Select"
      v-model="value4"
      :filedProps="{ options: sizeOptions, placeholder: '小尺�?, size: 'small' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value4 = ref('')
const sizeOptions = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
])
</script>
```

:::

## 实际应用示例

选择城市�?
:::demo

```vue
<template>
  <div>
    <SwySelect
      v-model="selectedCity"
      :options="cityOptions"
      placeholder="请选择城市"
      @change="onCityChange"
    />
    <p v-if="selectedCity">您选择的城市是: {{ getCityLabel(selectedCity) }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedCity = ref('')
const cityOptions = ref([
  { label: '北京 - 首都', value: 'beijing' },
  { label: '上海 - 魔都', value: 'shanghai' },
  { label: '广州 - 羊城', value: 'guangzhou' },
  { label: '深圳 - 鹏城', value: 'shenzhen' },
  { label: '成都 - 天府之国', value: 'chengdu' },
  { label: '杭州 - 人间天堂', value: 'hangzhou' },
])

const getCityLabel = value => {
  const city = cityOptions.value.find(item => item.value === value)
  return city ? city.label : ''
}

const onCityChange = value => {
  console.log('选择的城�?', getCityLabel(value))
}
</script>
```

:::

## API

### Props

| 属性名               | 说明     | 类型                                                                  | 默认�?      |
| -------------------- | -------- | --------------------------------------------------------------------- | ----------- |
| modelValue / v-model | 绑定�?   | `string / number`                                                     | `''`        |
| options              | 选项数组 | `Array<{label: string, value: string \| number, disabled?: boolean}>` | `[]`        |
| placeholder          | 占位文本 | `string`                                                              | `'请选择'`  |
| disabled             | 是否禁用 | `boolean`                                                             | `false`     |
| size                 | 尺寸     | `'large' / 'default' / 'small'`                                       | `'default'` |

### Events

| 事件�? | 说明                 | 类型                                |
| ------ | -------------------- | ----------------------------------- |
| change | 选中值发生变化时触发 | `(value: string \| number) => void` |

### Exposes

| 名称      | 说明                  | 类型                     |
| --------- | --------------------- | ------------------------ |
| selectRef | select 的原�?DOM 元素 | `Ref<HTMLSelectElement>` |
