# Scrollbar 滚动�?

用于替换浏览器原生滚动条�?

## 基础用法

:::demo

```vue
<template>
  <SwyScrollbar height="300px">
    <p v-for="i in 30" :key="i" style="padding: 10px 15px; border-bottom: 1px solid #f0f0f0;">
      �?{{ i }} 行内�?
    </p>
  </SwyScrollbar>
</template>
```

:::

## 横向滚动

:::demo

```vue
<template>
  <SwyScrollbar>
    <div style="display: flex; gap: 10px; padding: 10px;">
      <div
        v-for="i in 20"
        :key="i"
        style="
          min-width: 150px;
          height: 100px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          font-weight: bold;
        "
      >
        卡片 {{ i }}
      </div>
    </div>
  </SwyScrollbar>
</template>
```

:::

## 最大高�?

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyScrollbar max-height="200px">
      <div style="padding: 15px;">
        <h4 style="margin-top: 0;">文章内容</h4>
        <p v-for="i in 20" :key="i" style="line-height: 1.8;">
          这是�?{{ i }} 段文字内容。滚动条会在内容超过最大高度时自动出现�?        </p>
      </div>
    </SwyScrollbar>

    <div style="color: #909399; font-size: 14px;">提示：内容超�?00px时会出现滚动�?/div>
  </div>
</template>
```

:::

## 自定义样�?

:::demo

```vue
<template>
  <SwyScrollbar
    height="250px"
    :native="false"
    wrap-style="background: #f5f7fa; border-radius: 8px;"
    view-style="padding: 20px;"
  >
    <div v-for="i in 15" :key="i" style="margin-bottom: 15px;">
      <div
        style="
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      "
      >
        <h4 style="margin: 0 0 8px 0;">项目 {{ i }}</h4>
        <p style="margin: 0; color: #606266;">这是项目的描述内�?/p></p>
      </div>
    </div>
  </SwyScrollbar>
</template>
```

:::

## 永远显示滚动�?

:::demo

```vue
<template>
  <SwyScrollbar height="200px" always>
    <p v-for="i in 10" :key="i" style="padding: 10px 15px; border-bottom: 1px solid #f0f0f0;">
      滚动条始终显�?- �?{{ i }} �?
    </p>
  </SwyScrollbar>
</template>
```

:::

## API

### Scrollbar Props

| 参数      | 说明             | 类型              | 默认�? |
| --------- | ---------------- | ----------------- | ------ |
| height    | 滚动条高�?       | `string / number` | �?     |
| maxHeight | 滚动条最大高�?   | `string / number` | �?     |
| native    | 是否使用原生滚动 | `boolean`         | false  |
| wrapStyle | 包裹层样�?       | `string / object` | �?     |
| viewStyle | 视图层样�?       | `string / object` | �?     |
| always    | 滚动条总是显示   | `boolean`         | false  |

### Scrollbar Events

| 事件�? | 说明       | 参数                          |
| ------ | ---------- | ----------------------------- |
| scroll | 滚动时触�? | `({ scrollTop, scrollLeft })` |

### Scrollbar Methods

| 方法�?        | 说明                   | 参数                   |
| ------------- | ---------------------- | ---------------------- |
| setScrollTop  | 设置滚动条到顶部的距�? | `(scrollTop: number)`  |
| setScrollLeft | 设置滚动条到左边的距�? | `(scrollLeft: number)` |
| update        | 更新滚动条状�?         | �?                     |
