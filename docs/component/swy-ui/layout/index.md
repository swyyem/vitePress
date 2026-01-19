# 布局组件

## Container 容器布局

### 基础布局

:::demo

```vue
<template>
  <SwyContainer>
    <SwyHeader style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
      Header
    </SwyHeader>
    <SwyMain style="background: #e9eef3; color: #333; text-align: center; line-height: 160px;">
      Main
    </SwyMain>
  </SwyContainer>
</template>
```

:::

### 带侧边栏

:::demo

```vue
<template>
  <SwyContainer>
    <SwyHeader style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
      Header
    </SwyHeader>
    <SwyContainer>
      <SwyAside style="background: #d3dce6; color: #333; text-align: center; line-height: 200px;">
        Aside
      </SwyAside>
      <SwyMain style="background: #e9eef3; color: #333; text-align: center; line-height: 200px;">
        Main
      </SwyMain>
    </SwyContainer>
  </SwyContainer>
</template>
```

:::

### 完整布局

:::demo

```vue
<template>
  <SwyContainer>
    <SwyHeader style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
      Header
    </SwyHeader>
    <SwyContainer>
      <SwyAside
        width="200px"
        style="background: #d3dce6; color: #333; text-align: center; line-height: 200px;"
      >
        Aside
      </SwyAside>
      <SwyMain style="background: #e9eef3; color: #333; text-align: center; line-height: 200px;">
        Main
      </SwyMain>
    </SwyContainer>
    <SwyFooter style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
      Footer
    </SwyFooter>
  </SwyContainer>
</template>
```

:::

### 侧边栏在右侧

:::demo

```vue
<template>
  <SwyContainer>
    <SwyHeader style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
      Header
    </SwyHeader>
    <SwyContainer>
      <SwyMain style="background: #e9eef3; color: #333; text-align: center; line-height: 200px;">
        Main
      </SwyMain>
      <SwyAside
        width="200px"
        style="background: #d3dce6; color: #333; text-align: center; line-height: 200px;"
      >
        Aside
      </SwyAside>
    </SwyContainer>
    <SwyFooter style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
      Footer
    </SwyFooter>
  </SwyContainer>
</template>
```

:::

### 左右布局

:::demo

```vue
<template>
  <SwyContainer>
    <SwyAside
      width="200px"
      style="background: #d3dce6; color: #333; text-align: center; line-height: 300px;"
    >
      Aside
    </SwyAside>
    <SwyContainer>
      <SwyHeader style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
        Header
      </SwyHeader>
      <SwyMain style="background: #e9eef3; color: #333; text-align: center; line-height: 160px;">
        Main
      </SwyMain>
      <SwyFooter style="background: #b3c0d1; color: #333; text-align: center; line-height: 60px;">
        Footer
      </SwyFooter>
    </SwyContainer>
  </SwyContainer>
</template>
```

:::
