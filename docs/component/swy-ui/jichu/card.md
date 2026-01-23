# Card 卡片

## 基础用法

:::demo

```vue
<template>
  <SwyCard>
    <template #header>
      <div>卡片标题</div>
    </template>
    <div>卡片内容区域</div>
  </SwyCard>
</template>
```

:::

## 简单卡

:::demo

```vue
<template>
  <SwyCard>
    <div>这是一个简单的卡片内容</div>
  </SwyCard>
</template>
```

:::

## 带阴

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <SwyCard shadow="always" style="width: 200px;">
      <div>总是显示阴影</div>
    </SwyCard>
    <SwyCard shadow="hover" style="width: 200px;">
      <div>悬停时显示阴</div>
    </SwyCard>
    <SwyCard shadow="never" style="width: 200px;">
      <div>从不显示阴影</div>
    </SwyCard>
  </div>
</template>
```

:::

## 带页

:::demo

```vue
<template>
  <SwyCard>
    <template #header>
      <div>卡片标题</div>
    </template>
    <div>卡片内容区域，可以包含各种元</div>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <SwyButton size="small">取消</SwyButton>
        <SwyButton type="primary" size="small">确定</SwyButton>
      </div>
    </template>
  </SwyCard>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <ProField valueType="Card">
    <template #header>
      <div>卡片标题</div>
    </template>
    <div>卡片内容区域，可以包含各种元</div>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <SwyButton size="small">取消</SwyButton>
        <SwyButton type="primary" size="small">确定</SwyButton>
      </div>
    </template>
  </ProField>
</template>
```

:::

## Card 属性

| 属性名       | 说明                                        | 类型                    | 可选值                 | 默认值 |
| ------------ | ------------------------------------------- | ----------------------- | ---------------------- | ------ |
| header       | 卡片标题，也可通过 slot#header 传入 DOM     | string                  | —                      | —      |
| footer       | 卡片底部内容，也可通过 slot#footer 传入 DOM | string                  | —                      | —      |
| body-style   | 卡片主体的 CSS 样式                         | string / object / array | —                      | —      |
| body-class   | 卡片主体的自定义类名                        | string                  | —                      | —      |
| header-class | 卡片头部的自定义类名                        | string                  | —                      | —      |
| footer-class | 卡片底部的自定义类名                        | string                  | —                      | —      |
| shadow       | 阴影显示时机                                | string                  | always / hover / never | —      |

## Card 插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 卡片主体内容 |
| header  | 卡片头部内容 |
| footer  | 卡片底部内容 |
