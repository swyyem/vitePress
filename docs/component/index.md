# ProField 原子组件

## 描述

> 基于 [element-plus](https://element-plus.gitee.io/#/zh-CN/component/input)二次封装.

> 旨在用统一的标签 ProField 不同的 valueType,渲染出不同的组件.

> 让页面结构更加清晰和统一.

> 通过 json 配置渲染组件.

**注意**:

- 默认属性 `valueType`用于表示组件的类型,目前支持组件:

`text` `autocomplete` `inputNumber` `select` `checkbox` `price` `slider` `switch` `avatar` `image` `cascader` `colorPicker` `segmented` `divider` `inputTag` `mention` `selectV2` `timeSelect` `transfer` `treeSelect` `treeSelect` `upload` `button` `upload` `datePicker`

- 属性 `fieldProps`是一个公共属性,但是属性值根据组件不同而不同` valueType对应的组件自己特有支持的属性,placeholder支持的`属性决定,具体请查看组件文档

## 使用示例

### 标签的写法

:::demo

```vue
<template>
  <ProField valueType="text" v-model="state1" :fieldProps="{}" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
const state1 = ref("");
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
import { onMounted, ref } from "vue";
const formData = ref({
  state1: "",
  state2: "",
});

const filedcloums = [
  {
    valueType: "text",
    prop: "state1",
    fildProps: {
      placeholder: "Please Input",
    },
  },
  {
    valueType: "text",
    prop: "state2",
    fildProps: {
      clearable: true,
      placeholder: "Please Input1111",
      type: "number",
    },
  },
];
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
import { onMounted, ref } from "vue";
const state1 = ref("11111");
</script>
```

:::

## renderFormItem 属性

:::demo

```vue
<template>
  <ProField
    valueType="text"
    :renderFormItem="renderFormItem"
    v-model="state1"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref, h } from "vue";
import { ElButton } from "element-plus";

const state1 = ref("11111");
const renderFormItem = (text, props) => {
  return h(ElButton, {}, () => "按钮");
};
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
import { onMounted, ref, h } from "vue";
import { ElButton } from "element-plus";

const state1 = ref("11111");
const render = (text, props) => {
  return h(ElButton, {}, () => "按钮");
};
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
import { onMounted, ref, h } from "vue";
import { ElButton } from "element-plus";

const state1 = ref("11111");
const generateData = (n: number, start?: number, str?: string) => {
  const end = start || 0;
  const total = (n || 10) + end;
  const res: any = [];
  for (let i = end; i < total; i++) {
    res.push({
      label: `测试${i}${str || ""}`,
      value: i,
    });
  }
  return res;
};

const valueEnum = generateData(10);
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
import { onMounted, ref, h } from "vue";
import { ElButton } from "element-plus";

const state1 = ref("11111");

const generateData = (n: number, start?: number, str?: string) => {
  let res = [];
  for (let i = 0; i < 20; i++) {
    res.push({
      label: `测试${i}${str || ""}`,
      value: i,
    });
  }
  return res;
};

const getData = (params: any) => {
  console.log("=params=", params);
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = generateData(params);
      console.log("=list=", list);
      resolve(list);
    }, 2000);
  });
};
</script>
```

:::

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
