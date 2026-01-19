# 数据展示组件

## Image 图片

### 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <SwyImage
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      style="width: 200px; height: 200px;"
    />
  </div>
</template>
```

:::

### 图片适应方式

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <div v-for="fit in fits" :key="fit" style="width: 150px;">
      <div style="margin-bottom: 8px; text-align: center;">{{ fit }}</div>
      <SwyImage
        :src="url"
        :fit="fit"
        style="width: 150px; height: 150px; border: 1px solid #ddd;"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
```

:::

### 加载失败

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <SwyImage src="invalid-url" style="width: 200px; height: 200px;" />
    <SwyImage src="invalid-url" style="width: 200px; height: 200px;">
      <template #error>
        <div style="text-align: center;">自定义错误提示</div>
      </template>
    </SwyImage>
  </div>
</template>
```

:::

---

## Descriptions 描述列表

### 基础用法

:::demo

```vue
<template>
  <SwyDescriptions title="用户信息">
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <div>
        <div style="color: #909399; margin-bottom: 8px;">用户名</div>
        <div>张三</div>
      </div>
      <div>
        <div style="color: #909399; margin-bottom: 8px;">手机号</div>
        <div>18100000000</div>
      </div>
      <div>
        <div style="color: #909399; margin-bottom: 8px;">居住地</div>
        <div>北京市朝阳区</div>
      </div>
      <div>
        <div style="color: #909399; margin-bottom: 8px;">备注</div>
        <div>这是一段备注信息</div>
      </div>
      <div>
        <div style="color: #909399; margin-bottom: 8px;">联系地址</div>
        <div>北京市朝阳区芍药居</div>
      </div>
    </div>
  </SwyDescriptions>
</template>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <SwyDescriptions title="大号尺寸" size="large">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div>
          <div style="color: #909399; margin-bottom: 8px;">用户名</div>
          <div>张三</div>
        </div>
        <div>
          <div style="color: #909399; margin-bottom: 8px;">手机号</div>
          <div>18100000000</div>
        </div>
      </div>
    </SwyDescriptions>

    <SwyDescriptions title="默认尺寸">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div>
          <div style="color: #909399; margin-bottom: 8px;">用户名</div>
          <div>张三</div>
        </div>
        <div>
          <div style="color: #909399; margin-bottom: 8px;">手机号</div>
          <div>18100000000</div>
        </div>
      </div>
    </SwyDescriptions>

    <SwyDescriptions title="小号尺寸" size="small">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div>
          <div style="color: #909399; margin-bottom: 8px;">用户名</div>
          <div>张三</div>
        </div>
        <div>
          <div style="color: #909399; margin-bottom: 8px;">手机号</div>
          <div>18100000000</div>
        </div>
      </div>
    </SwyDescriptions>
  </div>
</template>
```

:::

### 带操作按钮

:::demo

```vue
<template>
  <SwyDescriptions title="用户信息">
    <template #extra>
      <SwyButton type="primary" size="small">编辑</SwyButton>
    </template>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <div>
        <div style="color: #909399; margin-bottom: 8px;">用户名</div>
        <div>张三</div>
      </div>
      <div>
        <div style="color: #909399; margin-bottom: 8px;">手机号</div>
        <div>18100000000</div>
      </div>
      <div>
        <div style="color: #909399; margin-bottom: 8px;">居住地</div>
        <div>北京市朝阳区</div>
      </div>
    </div>
  </SwyDescriptions>
</template>
```

:::
