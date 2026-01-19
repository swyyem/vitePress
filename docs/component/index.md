# ProField 原子组件

## 描述

> 基于 [element-plus](https://element-plus.gitee.io/#/zh-CN/component/input)二次封装.

> 旨在用统一的标签 ProField 不同的 valueType,渲染出不同的组件.

> 让页面结构更加清晰和统一.

> 通过 json 配置渲染组件.

**注意**:

- 默认属性 `valueType`用于表示组件的类型,目前支持组件:

`SwyButton` `SwyCard` `SwyCheckbox` `SwyForm` `SwyInput` `SwySelect` `SwySwitch` `SwyTable` `SwyTabs` `SwyTag` `SwyTree` `SwyUpload`

- 属性 `fieldProps`是一个公共属性,但是属性值根据组件不同而不同` valueType对应的组件自己特有支持的属性,placeholder支持的`属性决定,具体请查看组件文档

## 使用示例

### 标签的写法

:::demo

```vue
<template>
  <ProField valueType="text" v-model="state1" :fieldProps="{}" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const state1 = ref('')
</script>
```

:::

### json 的写法

:::demo

```vue
<template>
  <ProField
    v-for="filed in filedcloums"
    :key="filed.prop"
    :valueType="filed.valueType"
    v-model="formData[filed.prop]"
    :fieldProps="filed.fildProps"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const formData = ref({
  state1: '',
  state2: '',
})

const filedcloums = [
  {
    valueType: 'text',
    prop: 'state1',
    fildProps: {
      placeholder: 'Please Input',
    },
  },
  {
    valueType: 'text',
    prop: 'state2',
    fildProps: {
      clearable: true,
      placeholder: 'Please Input1111',
      type: 'number',
    },
  },
]
</script>
```

:::

## mode 属性的用法

:::demo

```vue
<template>
  <ProField valueType="text" mode="read" v-model="state1" :fieldProps="{}" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const state1 = ref('11111')
</script>
```

:::

## renderFormItem 属性

:::demo

```vue
<template>
  <ProField valueType="text" :renderFormItem="renderFormItem" v-model="state1" />
</template>
<script lang="ts" setup>
import { onMounted, ref, h } from 'vue'
import { ElButton } from 'element-plus'

const state1 = ref('11111')
const renderFormItem = (text, props) => {
  return h(ElButton, {}, () => '按钮')
}
</script>
```

:::

## render 属性

:::demo

```vue
<template>
  <ProField valueType="text" mode="read" :render="render" v-model="state1" />
</template>
<script lang="ts" setup>
import { onMounted, ref, h } from 'vue'
import { ElButton } from 'element-plus'

const state1 = ref('11111')
const render = (text, props) => {
  return h(ElButton, {}, () => '按钮')
}
</script>
```

:::

## valueEnum 属性

** 优先级 ** `request>valueEnum>fieldProps.options>fieldProps.valueEnum`

:::demo

```vue
<template>
  <ProField valueType="select" :valueEnum="valueEnum" v-model="state1" />
</template>
<script lang="ts" setup>
import { onMounted, ref, h } from 'vue'
import { ElButton } from 'element-plus'

const state1 = ref('11111')
const generateData = (n: number, start?: number, str?: string) => {
  const end = start || 0
  const total = (n || 10) + end
  const res: any = []
  for (let i = end; i < total; i++) {
    res.push({
      label: `测试${i}${str || ''}`,
      value: i,
    })
  }
  return res
}

const valueEnum = generateData(10)
</script>
```

:::

## request 属性

** 优先级 ** `request>valueEnum>fieldProps.options>fieldProps.valueEnum`

:::demo

```vue
<template>
  <ProField
    valueType="select"
    :request="getData"
    :params="{
      n: 1,
      start: 0,
      str: '测试',
    }"
    v-model="state1"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref, h } from 'vue'
import { ElButton } from 'element-plus'

const state1 = ref('11111')

const generateData = (n: number, start?: number, str?: string) => {
  let res = []
  for (let i = 0; i < 20; i++) {
    res.push({
      label: `测试${i}${str || ''}`,
      value: i,
    })
  }
  return res
}

const getData = (params: any) => {
  console.log('=params=', params)
  return new Promise(resolve => {
    setTimeout(() => {
      const list = generateData(params)
      console.log('=list=', list)
      resolve(list)
    }, 2000)
  })
}
</script>
```

:::

## TypeScript 类型提示

### 获取 valueType 的类型提示

当使用 TypeScript 时，ProField 组件会自动提供 `valueType` 属性的类型提示。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <!-- 当你输入 valueType=" 时，IDE 会自动提示所有可用的组件类型 -->
    <ProField
      valueType="SwyInput"
      v-model="username"
      :filedProps="{ placeholder: '请输入用户名' }"
    />

    <ProField
      valueType="SwySelect"
      v-model="city"
      :filedProps="{
        options: [
          { label: '北京', value: 'bj' },
          { label: '上海', value: 'sh' },
        ],
      }"
    />

    <ProField valueType="SwyCheckbox" v-model="checked" :filedProps="{ label: '同意协议' }" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ValueType } from '@swy-ui/proField'

const username = ref('')
const city = ref('')
const checked = ref(false)

// 也可以使用 ValueType 类型来约束变量
const dynamicType: ValueType = 'SwyButton'
</script>
```

:::

**可用的 valueType 类型：**

- `'SwyButton'` - 按钮组件
- `'SwyCard'` - 卡片组件
- `'SwyCheckbox'` - 复选框组件
- `'SwyForm'` - 表单组件
- `'SwyInput'` - 输入框组件
- `'SwyModal'` - 模态框组件
- `'SwySelect'` - 选择器组件
- `'SwySwitch'` - 开关组件
- `'SwyTable'` - 表格组件
- `'SwyTabs'` - 标签页组件
- `'SwyTag'` - 标签组件
- `'SwyTree'` - 树形组件
- `'SwyUpload'` - 上传组件

**在 VSCode 中使用：**

1. 当你输入 `valueType="` 时，会自动弹出所有可用的组件类型
2. 可以通过 `Ctrl + Space` (Windows) 或 `Cmd + Space` (Mac) 手动触发智能提示
3. 如果输入了不存在的类型，TypeScript 会给出错误提示

**导入类型定义：**

```typescript
import type { ValueType, ProFieldProps } from '@swy-ui/proField'

// 使用类型
const config: { type: ValueType; props: any } = {
  type: 'SwyInput',
  props: { placeholder: '请输入' },
}
```

## 属性列表

| 属性名                 |                    说明                     |                                          类型                                           |                     默认值                     |
| ---------------------- | :-----------------------------------------: | :-------------------------------------------------------------------------------------: | :--------------------------------------------: |
| mode                   |            组件模式：只读或编辑             |                                     `read \| edit`                                      |                      edit                      |
| emptyText              |  当 mode 等于`read`,并且值为空时显示的文本  |                                        `string`                                         |                       -                        |
| **valueType**          |             **渲染的组件类型**              |              [ProFieldValueType](https://swyyem.github.io/vitePress/api/)               |                      text                      |
| fieldProps             |     传递给 valueType 对应组件特有的属性     |         [ProFieldValueTypeWithFieldProps](https://swyyem.github.io/vitePress/)          |                    unknown                     |
| `modelValue \|v-model` |                双向绑定的值                 |                                         unknown                                         |                       -                        |
| renderFormItem         |      当 mode 等于`edit`,渲染自定义组件      |                       `(text: unknown, props: unknown) => VNode`                        | `示例：(text,props)=>h('div',{...props},text)` |
| render                 |      当 mode 等于`read`,渲染自定义组件      |                                         `同上`                                          |                    `不示例`                    |
| valueEnum              |     枚举数据,用于有子项时.比如说 select     |   `Array<`[ProSchemaValueEnumType](https://swyyem.github.io/vitePress/) `\| string>`    |                       -                        |
| request                | 远程获取枚举数据,用于有子项时.比如说 select | ` Promise<Array<`[ProSchemaValueEnumType](https://swyyem.github.io/vitePress/) `\| T>>` |                       -                        |
| params                 |   与 request 搭配只用,用于 request 的参数   |                                       `unknown `                                        |                   undefined                    |

## 表单组件示例

### Checkbox 复选框

:::示例

```vue
<template>
  <ProField valueType="SwyCheckbox" v-model="checked" :filedProps="{ label: '同意协议' }" />
  <p>选中状态: {{ checked }}</p>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
```

:::

### Select 选择器

:::示例

```vue
<template>
  <ProField
    valueType="SwySelect"
    v-model="selectedValue"
    :filedProps="{
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
      ],
      placeholder: '请选择',
    }"
  />
  <p>选中的值: {{ selectedValue }}</p>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const selectedValue = ref('')
</script>
```

:::

### Switch 开关

:::示例

```vue
<template>
  <ProField
    valueType="SwySwitch"
    v-model="switchValue"
    :filedProps="{
      activeText: '开启',
      inactiveText: '关闭',
    }"
  />
  <p>开关状态: {{ switchValue ? '开启' : '关闭' }}</p>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const switchValue = ref(false)
</script>
```

:::

### 组合使用示例

:::示例

```vue
<template>
  <div style="max-width: 500px;">
    <div style="margin-bottom: 15px;">
      <label>用户名：</label>
      <ProField
        valueType="SwyInput"
        v-model="formData.username"
        :filedProps="{ placeholder: '请输入用户名' }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <label>城市：</label>
      <ProField
        valueType="SwySelect"
        v-model="formData.city"
        :filedProps="{
          options: cityOptions,
          placeholder: '请选择城市',
        }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <ProField
        valueType="SwyCheckbox"
        v-model="formData.agree"
        :filedProps="{ label: '同意用户协议' }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <label>接收通知：</label>
      <ProField
        valueType="SwySwitch"
        v-model="formData.notification"
        :filedProps="{
          activeText: '开',
          inactiveText: '关',
        }"
      />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">表单数据：</h4>
      <pre style="margin: 0;">{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  city: '',
  agree: false,
  notification: false,
})

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
</script>
```

:::
