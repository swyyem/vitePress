# Checkbox 复选框

在一组可选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换。

:::demo

```vue
<template>
  <div>
    <SwyCheckbox v-model="checked1" @change="handleChange">同意用户协议</SwyCheckbox>
    <p>选中状态: {{ checked1 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(false)

const handleChange = val => {
  console.log('checkbox changed:', val)
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
      valueType="SwyCheckbox"
      v-model="checked1"
      :filedProps="{ label: '同意用户协议' }"
      @change="handleChange"
    />
    <p>选中状态: {{ checked1 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(false)

const handleChange = val => {
  console.log('checkbox changed:', val)
}
</script>
```

:::

## 禁用状态

:::demo

```vue
<template>
  <div>
    <SwyCheckbox v-model="checked2" disabled>已禁用的复选框</SwyCheckbox>
    <SwyCheckbox v-model="checked3" disabled>已禁用且选中</SwyCheckbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked2 = ref(false)
const checked3 = ref(true)
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="SwyCheckbox"
      v-model="checked2"
      :filedProps="{ disabled: true, label: '已禁用的复选框' }"
    />
    <ProField
      valueType="SwyCheckbox"
      v-model="checked3"
      :filedProps="{ disabled: true, label: '已禁用且选中' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked2 = ref(false)
const checked3 = ref(true)
</script>
```

:::

## 多个复选框

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <SwyCheckbox v-model="hobby.reading" label="reading">阅读</SwyCheckbox>
      <SwyCheckbox v-model="hobby.sports" label="sports">运动</SwyCheckbox>
      <SwyCheckbox v-model="hobby.music" label="music">音乐</SwyCheckbox>
      <SwyCheckbox v-model="hobby.travel" label="travel">旅行</SwyCheckbox>
    </div>
    <p>已选择: {{ selectedHobbies }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const hobby = ref({
  reading: false,
  sports: true,
  music: false,
  travel: true,
})

const selectedHobbies = computed(() => {
  return Object.entries(hobby.value)
    .filter(([key, val]) => val)
    .map(([key]) => key)
    .join(', ')
})
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <ProField valueType="SwyCheckbox" v-model="hobby.reading" :filedProps="{ label: 'reading' }">
        阅读
      </ProField>
      <ProField valueType="SwyCheckbox" v-model="hobby.sports" :filedProps="{ label: 'sports' }">
        运动
      </ProField>
      <ProField valueType="SwyCheckbox" v-model="hobby.music" :filedProps="{ label: 'music' }">
        音乐
      </ProField>
      <ProField valueType="SwyCheckbox" v-model="hobby.travel" :filedProps="{ label: 'travel' }">
        旅行
      </ProField>
    </div>
    <p>已选择: {{ selectedHobbies }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const hobby = ref({
  reading: false,
  sports: true,
  music: false,
  travel: true,
})

const selectedHobbies = computed(() => {
  return Object.entries(hobby.value)
    .filter(([key, val]) => val)
    .map(([key]) => key)
    .join(', ')
})
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <SwyCheckbox v-model="checked4" size="large">大尺寸</SwyCheckbox>
    <SwyCheckbox v-model="checked5" size="default">默认尺寸</SwyCheckbox>
    <SwyCheckbox v-model="checked6" size="small">小尺寸</SwyCheckbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked4 = ref(true)
const checked5 = ref(true)
const checked6 = ref(true)
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <ProField
      valueType="SwyCheckbox"
      v-model="checked4"
      :filedProps="{ size: 'large', label: '大尺寸' }"
    />
    <ProField
      valueType="SwyCheckbox"
      v-model="checked5"
      :filedProps="{ size: 'default', label: '默认尺寸' }"
    />
    <ProField
      valueType="SwyCheckbox"
      v-model="checked6"
      :filedProps="{ size: 'small', label: '小尺寸' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked4 = ref(true)
const checked5 = ref(true)
const checked6 = ref(true)
</script>
```

:::

## API

### Props

| 属性名               | 说明         | 类型                            | 默认值      |
| -------------------- | ------------ | ------------------------------- | ----------- |
| modelValue / v-model | 绑定值       | `boolean / string / number`     | `false`     |
| label                | 选中状态的值 | `string`                        | —           |
| disabled             | 是否禁用     | `boolean`                       | `false`     |
| size                 | 尺寸         | `'large' / 'default' / 'small'` | `'default'` |

### Events

| 事件名 | 说明               | 类型                       |
| ------ | ------------------ | -------------------------- |
| change | 当绑定值变化时触发 | `(value: boolean) => void` |

### Exposes

| 名称      | 说明                   | 类型                    |
| --------- | ---------------------- | ----------------------- |
| inputRef  | checkbox 的 input 元素 | `Ref<HTMLInputElement>` |
| isChecked | 是否选中               | `ComputedRef<boolean>`  |
