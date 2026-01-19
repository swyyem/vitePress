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

## 简单卡片

:::demo

```vue
<template>
  <SwyCard>
    <div>这是一个简单的卡片内容</div>
  </SwyCard>
</template>
```

:::

## 带阴影

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <SwyCard shadow="always" style="width: 200px;">
      <div>总是显示阴影</div>
    </SwyCard>
    <SwyCard shadow="hover" style="width: 200px;">
      <div>悬停时显示阴影</div>
    </SwyCard>
    <SwyCard shadow="never" style="width: 200px;">
      <div>从不显示阴影</div>
    </SwyCard>
  </div>
</template>
```

:::

## 带页脚

:::demo

```vue
<template>
  <SwyCard>
    <template #header>
      <div>卡片标题</div>
    </template>
    <div>卡片内容区域，可以包含各种元素</div>
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
